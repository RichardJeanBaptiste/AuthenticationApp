import { React, useState } from 'react';
import { Box, Typography, FormControl, InputLabel, OutlinedInput, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
 

export default function EditProfile(props){

    const styles = {
        root: {
            marginTop: '1%',
            marginLeft: '22%',
            width: '67em',
            height: '53em',
            border: '1px solid #E0E0E0',
            borderRadius: '12px',
        },
        title: {
            marginTop: '4%',
            marginLeft: '5.5%'
        },
        photoStyle: {
            display: 'flex',
            flexDirection: 'row',
            marginTop: '3.5%',
            marginLeft: '5.5%'
        },
        formPos: {
            marginTop: '4%',
            marginLeft: '5.5%',
        },
        formStyle: {
            width: '40em',
            borderRadius: '12px'
        }
    }

    const history = useHistory();

    const [ UserData ] = useState(props.UserInfo);

    const [ name, setName ] = useState("");

    const [ bio, setBio ] = useState("");

    const [ phone, setPhone ] = useState("");

    const [ email, setEmail ] = useState("");

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleBioChange(e) {
        setBio(e.target.value);
    }

    function handlePhoneChange(e) {
        setPhone(e.target.value);
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function SaveChanges(){

        let UserChanges = {
            'user_id': props.id,
            'name': name === "" ? UserData.name : name,
            'bio': bio === "" ? UserData.bio : bio,
            'phone': phone === "" ? UserData.phone : phone,
            'email': email === "" ? UserData.email : email 
        }

        fetch('/edit_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(UserChanges)
        }).then(() => {
            history.push(`/profile/${props.id}`)
        })

    }


    return (
        <>
           <Box sx={styles.root}>

               <Box sx={styles.title}>
                    <Typography variant='h3'
                    sx={{ 
                        fontFamily: 'Noto Sans Display', 
                        fontWeight: '400', 
                        fontStyle:'normal',
                        fontSize: '24px',
                        lineHeight: '33px',
                        letterSpacing: '-0.035em'
                    }}>Change Info</Typography>
                    <Typography variant='subtitle1' sx={{
                       fontFamily: 'Noto Sans Display',
                       fontWeight: '500',
                       fontStyle: 'normal',
                       fontSize: '13px',
                       lineHeight: '18px',
                       letterSpacing: '-0.035em',
                       color: '#828282',
                       marginTop: '1%'
                    }}>Changes will be reflected to every services</Typography>
               </Box>
            
            <Box sx={{ display:'flex', flexDirection: 'column'}}>

                
               <Box sx={styles.photoStyle}>
                    <img src={UserData.profile_pic} alt="stock 1" style={{ width: '60px', height: '60px', borderRadius: '8px'}}/>
                    <Typography sx={{
                        fontFamily:'Noto Sans Display',
                        fontWeight: '500',
                        fontStyle: 'normal',
                        fontSize: '13px',
                        lineHeight: '18px',
                        letterSpacing: '-0.035em',
                        color: '#828282',
                        marginLeft: '4%',
                        marginTop:'1%'
                    }}>CHANGE PHOTO</Typography>
               </Box>

              
               <FormControl variant="outlined" sx={styles.formPos}>
                    <InputLabel htmlFor="name-input" sx={{marginTop: '-1%'}}>Name</InputLabel>
                    <OutlinedInput id="name-input"  placeholder="Enter Your Name" value={name} onChange={handleNameChange}
                    sx={styles.formStyle}/>
               </FormControl>

               <FormControl variant="outlined" sx={styles.formPos}>
                    <InputLabel htmlFor="bio-input" sx={{marginTop: '-1%'}}>Bio</InputLabel>
                    <OutlinedInput id="bio-input" multiline={true} placeholder="Enter Your Bio" value={bio} onChange={handleBioChange}
                    sx={{
                        width: '40em',
                        height: '13em',
                        borderRadius: '12px'
                    }}/>
               </FormControl>

               <FormControl variant="outlined" sx={styles.formPos}>
                    <InputLabel htmlFor="phone-input" sx={{marginTop: '-1%'}}>Phone</InputLabel>
                    <OutlinedInput id="phone-input" placeholder="Enter Your Phone Number" value={phone} onChange={handlePhoneChange}
                    sx={styles.formStyle}/>
               </FormControl>

               <FormControl variant="outlined" sx={styles.formPos}>
                    <InputLabel htmlFor="email-input" sx={{marginTop: '-1%'}}>Email</InputLabel>
                    <OutlinedInput id="email-input" placeholder="Enter Your Email" value={email} onChange={handleEmailChange}
                    sx={styles.formStyle}/>
               </FormControl>
             
                <Button variant="contained" onClick={SaveChanges} sx={{
                    marginTop:'2%',
                    marginLeft: '5.5%',
                    width: '7em'
                }}>
                    Save
                </Button>

                </Box>
               
            </Box> 
        </>
    )

    
}