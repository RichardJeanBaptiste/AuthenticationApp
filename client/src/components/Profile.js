import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Divider } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import EditProfile from './EditProfile';
import Header from './Header';


export default function Profile(){

    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    let { id } = useParams();


    useEffect(() => {
        if(!isLoggedIn){
            fetch('/check-login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                // es-lint-disable-next-line
                body: JSON.stringify({loginId : id})
              })
              .then((response) => response.text())
              .then((data) => {
                if(data === 'Authenticated'){
                    setIsLoggedIn(true)
                }else{
                    setIsLoggedIn(false)
                }
              })
        }else{
            setIsLoggedIn(true)
        }
        
        // es-lint-disable-next-line
    },[id, isLoggedIn])


    const ProfilePage = () => {

        const profileText = {
            marginTop: '4%',
            marginLeft: '18%',
            fontFamily: 'Noto Sans Display',
            fontWeight: '500',
            fontSize: '18px',
            lineHeight: '25px',
            letterSpacing: '-0.035em',
            color: '#333333'
        }

        const profileTextIntro = {
            fontFamily: 'Noto Sans Display',
            fontSize: '20px',
            lineHeight: '18px',
            color: '#BDBDBD',
            letterSpacing: '-0.035em',
            marginTop:'4%',
            marginLeft: '5%',
        }

         // store user info

         const [ UserData, SetUserData ] = useState([]);

         const [ isEditing, setIsEditing ] = useState(false);


         // get user info

         useEffect(() => {

            fetch('/get_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userid: id})
            })
            .then((response) => response.json())
            .then((data) => {
                SetUserData(data)
            })
            
         },[SetUserData])

         function handleEditing() {
             if(!isEditing){
                 setIsEditing(true)
             }else{
                 setIsEditing(false)
             }
         }


        if(isEditing && isLoggedIn){
            return (
                <>
                    <Header prof_image={UserData.profile_pic}/>
                    <Button variant="text" onClick={handleEditing} startIcon={<ChevronLeftIcon/>} sx={{
                        marginTop: '3.5%',
                        marginLeft: '22%',
                    }}>
                        Back
                    </Button>
                    <EditProfile UserInfo={UserData} id={id}/>
                </>
            )
        }else if(isLoggedIn){

            return (
                <>
                    <Header prof_image={UserData.profile_pic}/>
                    <Box sx={{ marginTop: '1.5%'}}>
                        <Typography variant='h3' align='center' sx={{ 
                            fontFamily:'Noto Sans Display', 
                            fontStyle:'normal',
                            fontSize:'36px',
                            lineHeight: '49px',
                            letterSpacing: '-0.035em', 
                        }}>Personal info</Typography>
                        <Typography variant='subtitle1' align='center'>Basic info, like your name and photo</Typography>
                    </Box>
                    <Box sx={{
                        marginTop: '2%',
                        marginLeft: '22%',
                        width: '67em',
                        height: '53em',
                        border: '1px solid #E0E0E0',
                        borderRadius: '12px',
                    }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', height:'7.5em'}}>
                            <Box sx={{ marginTop:'3%', marginLeft:'5%'}}>
                                <Typography sx={{ fontFamily: 'Noto Sans Display', fontWeight: 'normal', fontSize:'24px', lineHeight:'33px', letterSpacing:'-0.035em'}}>Profile</Typography>
                                <Typography sx={{ fontFamily: 'Noto Sans Display', fontWeight:'500', fontSize:'13px', lineHeight:'18px', letterSpacing:'-0.035em', color:'#828282'}}>Some info may be visible to other people</Typography>
                            </Box>

                            
                            <Button variant='outlined'sx={{ height: '3em', border:'1px solid #828282', borderRadius:'12px', marginLeft: '60%', marginTop:'3%'}} onClick={handleEditing}>
                                <Typography sx={{ fontFamily: 'Noto Sans Display', color:'#828282',fontSize: '16px', lineHeight: '22px', letterSpacing:'-0.035em'}}>Edit</Typography>
                            </Button>
                            
                            
                        </Box>
                        <Divider/>

                        <Box sx={{ display: 'flex', flexDirection: 'row', height: '8.5em'}}>
                            <Typography sx={profileTextIntro}>
                                Photo
                            </Typography>
                            <img src={UserData.profile_pic} alt="stock 2"style={{ borderRadius: '8px', width: '6em', height: '6em', marginTop:'1.5%', marginLeft:'18%' }}/>
                        </Box>
                        <Divider/>

                        <Box sx={{ display: 'flex', flexDirection: 'row', height: '7.5em'}}>
                            <Typography
                                sx={profileTextIntro}
                            >
                                Name
                            </Typography>
                            <Typography
                                sx={profileText}
                            >
                                {UserData.name}
                            </Typography>
                        </Box>
                        <Divider/>

                        <Box sx={{ display: 'flex', flexDirection: 'row', height: '7.5em'}}>
                            <Typography sx={profileTextIntro}>Bio</Typography>
                            <Typography sx={profileText} style={{marginLeft:'20%'}}>{UserData.bio}</Typography>
                        </Box>
                        <Divider/>

                        <Box sx={{ display: 'flex', flexDirection: 'row', height: '7.5em'}}>
                            <Typography sx={profileTextIntro}>Phone Number</Typography>
                            <Typography sx={profileText} style={{marginLeft: '10.5%'}}>{UserData.phone}</Typography>
                        </Box>
                        <Divider/>

                        <Box sx={{ display: 'flex', flexDirection: 'row', height:'7.5em'}}>
                            <Typography sx={profileTextIntro}>Email</Typography>
                            <Typography sx={profileText} style={{marginLeft: '18.5%'}}>{UserData.email}</Typography>
                        </Box>
                        <Divider/>

                        <Box sx={{ display: 'flex', flexDirection: 'row', height:'7.5em'}}>
                            <Typography sx={profileTextIntro}>Password</Typography>
                            <Typography sx={profileText} style={{ marginLeft: '15.5%'}}>***********</Typography>
                        </Box>
                        <Divider/>
                    </Box>
                </>
            )
        }else{
            return (
                <h1>Not Logged In</h1>
            )
        }
    }

    return (
        <>
            <ProfilePage/>
        </>
    )
}
