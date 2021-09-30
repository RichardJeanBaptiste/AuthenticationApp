import React from 'react';
import { Typography, Box, Card, Button, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { useTheme }  from '@mui/material/styles';
import DevLightIcon from './components/DevLightIcon';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import GoogleLink from './assets/Google.svg';
import FacebookLink from './assets/Facebook.svg';
import TwitterLink from './assets/Twitter.svg';
import GithubLink from './assets/Gihub.svg';

/**
 *  TODO
 *  - Create Breakpoints for mobile login/reg
 *  - Add Login Page
 *  - Create Personal Info
 *  - Create Personal Info mobile
 */


const Root = styled('div')(({theme}) => ({
    position:'absolute',
    top:'50%',
    left:'50%',
    transform:'translate(-50%, -50%)'
}));


function App() {


  return (
    <>
    <Root>
      <Box>
          <Card style={{ border:'1px solid #BDBDBD', borderRadius: '24px', height: '45em', width: '30em'}}>
            <Box style={{ marginTop:'12%', marginLeft: '16%'}}>
                <DevLightIcon Fill='#F0402C' Fill2='#282051'/>
                <Typography component='p' style={{color:'#333333', fontSize:'18px', lineHeight:'25px', letterSpacing:'-0.035em', fontWeight:'600', whiteSpace:'pre-wrap', marginTop:'8%'}}>{"Join thousands of learners from \naround the world"}</Typography>
                <Typography component='p' style={{ color:'#333333', fontSize:'16px', lineHeight:'22px', letterSpacing:'-0.035em', fontWeight:'normal', whiteSpace:'pre-wrap', marginTop: '7%'}}>{'Master web development by making real-life \nprojects. There are multiple paths for you to \nchoose'}</Typography>

                <TextField 
                  variant='outlined' 
                  placeholder='Email'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                          <EmailIcon/>
                      </InputAdornment>
                    )
                  }}
                  style={{ width: '84%', marginTop: '7%', }}
                />
                
                 <TextField 
                  variant='outlined' 
                  placeholder='Password'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                          <LockIcon/>
                      </InputAdornment>
                    )
                  }}
                  style={{ width: '84%', marginTop: '5%', borderRadius:'8px'}}
                />

                <Button variant='contained' style={{ width: '84%', marginTop: '6%', borderRadius:'8px'}}>Start coding now</Button>

                <Typography style={{ marginTop:'8%', marginLeft:'16%', color:'#828282' ,fontSize:'14px', lineHeight:'19px', letterSpacing:'-0.035em', fontWeight:'normal'}}>or continue with these social profiles</Typography>
                <Box style={{ display: 'flex', flexDirection:'row', marginTop:'7%', marginLeft: '14%'}}>
                    <img src={GoogleLink} alt="google icon" width='40px' height='40px'/>
                    <img src={FacebookLink} alt="facebook icon" width='40px' height='40px' style={{ marginLeft:'5%'}}/>
                    <img src={TwitterLink} alt="twitter icon" width='40px' height='40px' style={{ marginLeft:'5%'}}/>
                    <img src={GithubLink} alt="github icon" width='40px' height='40px' style={{ marginLeft:'5%'}}/>
                </Box>

                <Typography style={{ marginTop:'8%', marginLeft:'22%' ,color:'#828282', fontSize:'14px', lineHeight:'19px', letterSpacing:'-0.035em', fontWeight:'normal'}}>
                  Already a member? <a style={{color:'blue'}}>Login</a>
                </Typography>
            </Box>
            
          </Card>
        <Box style={{ display: 'flex', flexDirection: 'row', marginTop: '5%'}}>
              <Typography component="p" style={{fontWeight:'normal', fontSize:'14px', lineHeight:'19px', letterSpacing:'-0.035em', color:'#828282'}}>created by Richinbk</Typography>
              <Typography component="p" style={{marginLeft:'20em' ,fontWeight:'normal', fontSize:'14px', lineHeight:'19px', letterSpacing:'-0.035em', color:'#828282'}}>devChallenges.io</Typography>
        </Box>
      </Box>
      </Root>
    </>
  );
}

export default App;
