import {React, useState } from 'react';
import Box from '@mui/material/Box';
import { Typography,Card, Button, TextField, IconButton} from '@mui/material';
import { useTheme }  from '@mui/material/styles';
import { GoogleLogin } from 'react-google-login';
import { Link , useHistory } from 'react-router-dom';
import DevLightIcon from './DevLightIcon';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import GoogleLink from '../assets/Google.svg';
import '../App.css';



const useStyles = (theme) => ({
  root: {
    position:'absolute',
    top:'50%',
    left:'50%',
    transform:'translate(-50%, -50%)',
  },
  cardStyle: {
    border: '1px solid #BDBDBD',
    borderRadius: '24px',
    height: '45em',
    width: '30em',
  }
});






export default function Login() {
  
  
  const theme = useTheme();
  const styles = useStyles(theme);

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const history = useHistory();

  const responseGoogle = (response) => {
    //console.log("abcdedfas")
    //console.log(response);
    //console.log(response.profileObj);
  }

  const successLogin = (response) => {
    
     let googleLoginResponse = response.profileObj;
     
     fetch('/google-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(googleLoginResponse)
    })
    .then((response) => response.text())
    .then((data) => {
      if(data === "Exists"){
          history.push(`/profile/${googleLoginResponse.googleId}`)
      }else{
        alert(" account doesn't exist")
        history.push("/")
      }
    })
    
  } 
  

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  return (
    <>
      <Box style={styles.root}>
          <Card sx={{ 
            border: {md: '1px solid #BDBDBD'},
            borderRadius: {md: '24px'},
            height: {xs: '80vh', md: '45em'},
            width: { xs: '100vw', md: '30em'},
            marginTop: { xs: ''}
          }}>
            <Box sx={{
              marginTop: { xs: '5%', md: '12%'},
              marginLeft: { xs:'14%' , md: '16%'}
            }}>
                <DevLightIcon Fill='#F0402C' Fill2='#282051'/>
                <Typography component='p' sx={{
                    marginTop: '8%',
                    fontFamily: 'Noto Sans Display',
                    fontSize: '18px',
                    lineHeight: '25px',
                    letterSpacing: '-0.035em',
                    fontWeight: '600',
                    color: '#333333'

                }}>Login</Typography>

                <form action="/userlogin" method="POST">

                <TextField 
                  variant='outlined' 
                  placeholder='Email'
                  name='email'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                          <EmailIcon/>
                      </InputAdornment>
                    )
                  }}
                  required
                  onChange={handleEmailChange}
                  style={{ width: '84%', marginTop: '7%', }}
                />
                
                 <TextField 
                  variant='outlined' 
                  placeholder='Password'
                  name='password'
                  type='password'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                          <LockIcon/>
                      </InputAdornment>
                    )
                  }}
                  required
                  onChange={handlePasswordChange}
                  style={{ width: '84%', marginTop: '5%', borderRadius:'8px'}}
                />
                <Button variant='contained' type='submit' style={{ width: '84%', marginTop: '6%', borderRadius:'8px'}} onClick={() => console.log(email + " " + password)}>Login</Button>


                </form>
                

                <Typography sx={{
                    marginTop:'8%',
                    marginLeft: '14%',
                    fontFamily: 'Noto Sans Display',
                    fontSize: '14px',
                    lineHeight: '19px',
                    letterSpacing: '-0.035em',
                    fontWeight: 'normal',
                    color: '#828282' 
                }}>or continue with these social profiles</Typography>

                <Box style={{ display: 'flex', flexDirection:'row', marginTop:'7%', marginLeft: '14%'}}>
                  
                    <GoogleLogin
                          clientId="1097732373698-72rm00sovc1v5fhga05p9s2cc8tvbrru.apps.googleusercontent.com"
                          render={renderProps => (
                            <IconButton onClick={renderProps.onClick} disabled={renderProps.disabled}>
                              <img src={GoogleLink} alt="google icon" width='40px' height='40px'/>
                            </IconButton>
                          )}
                          onSuccess={successLogin}
                          onFailure={responseGoogle}
                          cookiePolicy={'single_host_origin'}
                    />  
                    
                </Box>

                <Typography sx={{
                    marginTop: '8%',
                    marginLeft: '22%',
                    fontFamily: 'Noto Sans Display',
                    fontSize: '14px',
                    lineHeight: '19px',
                    letterSpacing: '-0.035em',
                    fontWeight: 'normal',
                    color: '#828282'
                }}>
                  Don't have an account yet? 
                    <Link to="/">
                        <Typography sx={{
                            fontFamily: 'Noto Sans Display',
                            color: 'blue',
                            textDecoration: 'underline'
                        }}>
                            Register
                        </Typography>
                    </Link>
                </Typography>

            </Box>
            
          </Card>
        <Box style={{ display: 'flex', flexDirection: 'row', marginTop: '5%'}}>
              <Typography component="p" sx={{
                fontFamily: 'Noto Sans Display',
                fontWeight: 'normal',
                lineHeight: '19px',
                letterSpacing: '-0.035em',
                color: '#828282',
                marginLeft: { xs: '8%'}
              }}>created by Richinbk</Typography>
              <Typography component="p" sx={{
                fontFamily: 'Noto Sans Display',
                marginLeft: { xs: '22%', md:'17em'},
                fontWeight: 'normal',
                fontSize: '14px',
                lineHeight: '19px',
                letterSpacing: '-0.035em',
                color: '#828282'
              }}>devChallenges.io</Typography>
        </Box>
      </Box>
    </>
  );
}