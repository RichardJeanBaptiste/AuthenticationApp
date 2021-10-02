import {React, useState} from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { Typography,Card, Button, TextField } from '@mui/material';
import { useTheme }  from '@mui/material/styles';
import DevLightIcon from './DevLightIcon';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import GoogleLink from '../assets/Google.svg';
import FacebookLink from '../assets/Facebook.svg';
import TwitterLink from '../assets/Twitter.svg';
import GithubLink from '../assets/Gihub.svg';
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




export default function Register() {
  
  
  const theme = useTheme();
  const styles = useStyles(theme);

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  return (
    <>
      <Box sx={{
          position: 'absolute',
          top:'50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
      }}>
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
                    fontFamily:'Noto Sans Display',
                    fontSize: '18px',
                    lineHeight: '25px',
                    letterSpacing: '-0.035em',
                    fontWeight: '600',
                    whiteSpace: 'pre-wrap',
                    color: '#333333'
                }}>{"Join thousands of learners from \naround the world"}</Typography>
                <Typography component='p' sx={{
                    marginTop: '7%',
                    fontFamily: 'Noto Sans Display',
                    fontSize: '16px',
                    lineHeight: '22px',
                    letterSpacing: '-0.035em',
                    fontWeight: 'normal',
                    whiteSpace: 'pre-wrap',
                    color: '#333333'
                }}
                >{'Master web development by making real-life \nprojects. There are multiple paths for you to \nchoose'}</Typography>

                <form action="http://localhost:5000/register" method="POST">

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
                <Button variant='contained' type='submit' style={{ width: '84%', marginTop: '6%', borderRadius:'8px'}} onClick={() => console.log(email + " " + password)}>
                  <Typography sx={{
                    fontFamily: 'Noto Sans Display',
                  }}
                  >
                      Start coding now
                  </Typography>
                  
                </Button>


                </form>
                

                <Typography sx={{
                    marginTop: '8%',
                    marginLeft: '16%',
                    color: '#828282',
                    fontFamily: 'Noto Sans Display',
                    fontSize: '14px',
                    lineHeight: '19px',
                    letterSpacing:'-0.035em',
                    fontWeight: 'normal'
                }}>or continue with these social profiles</Typography>
                <Box style={{ display: 'flex', flexDirection:'row', marginTop:'7%', marginLeft: '14%'}}>
                    <img src={GoogleLink} alt="google icon" width='40px' height='40px'/>
                    <img src={FacebookLink} alt="facebook icon" width='40px' height='40px' style={{ marginLeft:'5%'}}/>
                    <img src={TwitterLink} alt="twitter icon" width='40px' height='40px' style={{ marginLeft:'5%'}}/>
                    <img src={GithubLink} alt="github icon" width='40px' height='40px' style={{ marginLeft:'5%'}}/>
                </Box>

                <Typography style={{ marginTop:'8%', marginLeft:'22%' ,color:'#828282', fontSize:'14px', lineHeight:'19px', letterSpacing:'-0.035em', fontWeight:'normal'}}>
                  Already a member? 
                  <Link to="/login">
                      <Typography sx={{
                        color: 'blue',
                        textDecoration: 'underline',
                        fontFamily: 'Noto Sans Display'
                      }}>
                          Login
                      </Typography>
                  </Link>
                  

                </Typography>

            </Box>
            
          </Card>
        <Box style={{ display: 'flex', flexDirection: 'row', marginTop: '5%'}}>
              <Typography component="p" sx={{
                fontWeight: 'normal',
                lineHeight: '19px',
                letterSpacing: '-0.035em',
                color: '#828282',
                marginLeft: { xs: '8%'},
                fontFamily: 'Noto Sans Display'
              }}>created by Richinbk</Typography>
              <Typography component="p" sx={{
                marginLeft: { xs: '22%', md:'17em'},
                fontWeight: 'normal',
                fontSize: '14px',
                lineHeight: '19px',
                letterSpacing: '-0.035em',
                color: '#828282',
                fontFamily: 'Noto Sans Display'
              }}>devChallenges.io</Typography>
        </Box>
      </Box>
    </>
  );
}

