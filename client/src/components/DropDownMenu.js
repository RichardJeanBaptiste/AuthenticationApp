import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Menu, MenuItem, IconButton, ListItemIcon, ListItemText, Divider  } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';



export default function DropDownMenu() {

    let history = useHistory();

    const [ anchorEl, setAnchorEl ] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    function LogoutUser() {
        fetch('https://richinbkauthapp.herokuapp.com/logout',{
            method: 'POST'
        }).then(()=> {
            history.push("/login")
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
            <IconButton 
                aria-label='Dropdown Menu' 
                id='Dropdown-menu'
                onClick={handleClick}
                sx={{ marginLeft: '6%'}}
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
                    <Box onClick={LogoutUser}>
                        <ListItemIcon>
                            <LogoutIcon sx={{ color: '#EB5757'}}/>
                        </ListItemIcon>
                        <ListItemText sx={{ color: '#EB5757' }} >Logout</ListItemText>
                    </Box>
                </MenuItem>
            </Menu>

        </>
    )
}