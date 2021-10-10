import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Menu, MenuItem, IconButton, Button, Divider, ListItemIcon, ListItemText } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import DevLightIcon from './DevLightIcon';
import profPic from '../assets/joseph-gonzalez-iFgRcqHznqg-unsplash.jpg';


export default function Profile(){

    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    let { id } = useParams();

    useEffect(() => {

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
        // es-lint-disable-next-line
    },[id])

    function DropDownMenu() {

        const [ anchorEl, setAnchorEl ] = useState(null);
        const open = Boolean(anchorEl);

        const handleClick = (e) => {
            setAnchorEl(e.currentTarget);
        }

        const handleClose = () => {
            setAnchorEl(null);
        }

        return (
            <>
                <IconButton 
                    aria-label='Dropdown Menu' 
                    id='Dropdown-menu'
                    onClick={handleClick}
                    sx={{ marginLeft: '-6%'}}
                >
                    <ArrowDropDownIcon/>
                </IconButton>
                <Menu
                    id='basic-menu'
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'Dropdown-menu'
                    }}
                    sx={{ marginTop: '.5%', marginLeft: '-2%', border:'1px solid #E0E0E0', borderRadius:'12px'}}
                >
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <AccountCircleIcon sx={{ color: '#4F4F4F'}}/>
                        </ListItemIcon>
                        <ListItemText sx={{ color: '#4F4F4F'}}>Profile</ListItemText>
                    </MenuItem>
                   
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <GroupIcon sx={{ color: '#4F4F4F'}}/>
                        </ListItemIcon>
                        <ListItemText sx={{ color: '#4F4F4F'}} >Group Chat</ListItemText>
                    </MenuItem>

                    <Divider/>

                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <LogoutIcon sx={{ color: '#EB5757'}}/>
                        </ListItemIcon>
                        <ListItemText sx={{ color: '#EB5757' }}>Logout</ListItemText>
                    </MenuItem>
                </Menu>

            </>
        )
    }

    const ProfilePage = () => {
        if(isLoggedIn){
            return (
                <>
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
                        marginLeft: '17%',
                        width: '75em',
                        height: '35em',
                        border: '1px solid #E0E0E0',
                        borderRadius: '12px',
                    }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', height:'7.5em'}}>
                            <Box sx={{ marginTop:'3%', marginLeft:'5%'}}>
                                <Typography sx={{ fontFamily: 'Noto Sans Display', fontWeight: 'normal', fontSize:'24px', lineHeight:'33px', letterSpacing:'-0.035em'}}>Profile</Typography>
                                <Typography sx={{ fontFamily: 'Noto Sans Display', fontWeight:'500', fontSize:'13px', lineHeight:'18px', letterSpacing:'-0.035em'}}>Some info may be visible to other people</Typography>
                            </Box>
                            <Button variant='outlined'sx={{ height: '3em', border:'1px solid #828282', borderRadius:'12px', marginLeft: '65%', marginTop:'3%'}}>
                                <Typography sx={{ fontFamily: 'Noto Sans Display', color:'#828282',fontSize: '16px', lineHeight: '22px', letterSpacing:'-0.035em'}}>Edit</Typography>
                            </Button>
                        </Box>
                        <Divider/>

                        <Box sx={{ display: 'flex', flexDirection: 'row', height: '8.5em'}}>
                            <Typography sx={{ fontFamily:'Noto Sans Display', fontSize:'13px', lineHeight:'18px', color:'#BDBDBD', letterSpacing:'-0.035em'}}>
                                Photo
                            </Typography>
                            <img src={profPic} alt="stock 2"style={{ borderRadius: '8px', width: '6em', height: '6em', marginTop:'1.5%', marginLeft:'18%' }}/>
                        </Box>
                        <Divider/>

                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                            <Typography>Name</Typography>
                            <Typography>Test Name</Typography>
                        </Box>
                        <Divider/>
                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                            <Typography>Bio</Typography>
                            <Typography>Software developer</Typography>
                        </Box>
                        <Divider/>
                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                            <Typography>Photo</Typography>
                            <Typography>9023454657</Typography>
                        </Box>
                        <Divider/>
                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                            <Typography>Email</Typography>
                            <Typography>abc123@gmail.com</Typography>
                        </Box>
                        <Divider/>
                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                            <Typography>Password</Typography>
                            <Typography>***********</Typography>
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
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100vw',
            }}>
                <Box sx={{ marginTop:'.5%', marginLeft: '2%'}}>
                    <DevLightIcon/>
                </Box>
                {/** Profile Dropdown */}
                <Box sx={{ marginLeft: '77%'}}>
                    <img src={profPic} alt="Stock 1" width='32px' height='36px' style={{ marginTop:'9.5%', marginLeft: '-32%', borderRadius: '8px'}}/>
                    <Box sx={{ marginTop: '-34%', marginLeft: '4%'}}>
                        <Typography variant='p'> Test Name </Typography>
                        <DropDownMenu/>
                    </Box>
                </Box>      
                {/** Profile Dropdown */}
            </Box>
            <ProfilePage/>
        </>
    )
}