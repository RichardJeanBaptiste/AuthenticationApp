import { React, useState } from 'react';
import { Box, Typography, FormControl, InputLabel, OutlinedInput, Button, Modal } from '@mui/material';
import { useHistory } from 'react-router-dom';
import {useDropzone} from 'react-dropzone';
import UploadFileIcon from '@mui/icons-material/UploadFile';
const axios = require('axios').default;


 

export default function EditProfile(props){

    const styles = {
        root: {
            marginTop: '1%',
            marginLeft: '22%',
            width: '67em',
            height: '55em',
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
        },
        modalStyle: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            height: 300,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        }
    }

    const history = useHistory();

    const [ UserData ] = useState(props.UserInfo);

    const [ name, setName ] = useState("");

    const [ bio, setBio ] = useState("");

    const [ phone, setPhone ] = useState("");

    const [ email, setEmail ] = useState("");

    const [ newPassword, setNewPassword ] = useState("");

    const [ imageUrl , setImageUrl ] = useState("");

    const [ localImage, setLocalImage ] = useState(false);

    const [ localName, setLocalName ] = useState("");
 

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

    function handlePasswordChange(e){
        setNewPassword(e.target.value);
    }

    function SaveChanges(){
        

        let profUrl;

        if(localImage === false){
            profUrl = imageUrl;
        }else{
            const formData = new FormData();
            formData.append('user_image', localImage)

            axios({
               url: `https://richinbkimageuploader.herokuapp.com/image_upload/${props.id}`,
                method: 'POST',
                data: formData,
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'multipart/form-data',
                }
              }).catch(function (error) {
                console.log(error);
              });

            profUrl = `https://richinbkimageuploader.herokuapp.com/download/${props.id}-${localName}`
            
        }

        let UserChanges = {
            'user_id': props.id,
            'name': name === "" ? UserData.name : name,
            'bio': bio === "" ? UserData.bio : bio,
            'phone': phone === "" ? UserData.phone : phone,
            'email': email === "" ? UserData.email : email,
            'profile_pic': imageUrl === "" ? UserData.profile_pic : profUrl,
            'password': newPassword === "" ? UserData.password : newPassword,
        }

        fetch('https://richinbkauthapp.herokuapp.com/edit_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(UserChanges)
        }).then(() => {
            history.push(`/profile/${props.id}`)
        })

    }


    function UploadHandler(props) {


        const [ stateUrl , setStateUrl ] = useState("");

        const {getRootProps, getInputProps} = useDropzone({

            onDrop: DropCallBack
        });

        function DropCallBack(files) {
            setImageUrl(URL.createObjectURL(files[0]));
            setLocalImage(files[0]);
            setLocalName(files[0].name);
        }
        

        function handleStateChange(e) {
            setStateUrl(e.target.value);
            setLocalImage(false);
        }

        
        function handleUpload(){

            setImageUrl(stateUrl)
        }


        return (
            <>
                <Box sx={{ display: 'flex', flexDirection:'column'}}>
                    <Box {...getRootProps({className: 'dropzone'})}>
                        <input {...getInputProps()} />
                        <Button sx={{ marginTop: '3%', marginLeft: '30%'}} startIcon={<UploadFileIcon/>}>
                            click to select files
                        </Button>
                    </Box>
                    
                    <Typography variant="h4" align='center'>Or</Typography>

                    <input value={stateUrl} placeholder='Enter a url' onChange={handleStateChange}/>
                    <Button variant='outlined' sx={{marginTop: '5%', marginLeft: '23%', width:'20em'}} onClick={handleUpload}>save</Button>
                </Box>
                
            </>
        )
    }

  
  

    function PhotoModal() {

        const [open, setOpen] = useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
        
        return (
            <Box sx={styles.photoStyle}>
                <img src={imageUrl} alt="click here" style={{ width: '7em', height: '5em', borderRadius: '8px'}} onClick={handleOpen}/> 
                <Typography sx={{
                    fontFamily:'Noto Sans Display',
                    fontWeight: '500',
                    fontStyle: 'normal',
                    fontSize: '13px',
                    lineHeight: '18px',
                    letterSpacing: '-0.035em',
                    color: '#828282',
                }}>CHANGE PHOTO</Typography>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styles.modalStyle}>
                        <UploadHandler/>  
                    </Box>
                </Modal>
            </Box>
        );
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

                
               <Box>
                   <PhotoModal/>
               </Box>

              
               <FormControl variant="outlined" sx={{ marginTop: '3.5%', marginLeft: '5.5%'}}>
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

               <FormControl variant="outlined" sx={styles.formPos}>
                    <InputLabel htmlFor="pass-input" sx={{marginTop: '-1%'}}>Password</InputLabel>
                    <OutlinedInput id="pass-input" placeholder="Enter Your Password" value={newPassword} onChange={handlePasswordChange}
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
