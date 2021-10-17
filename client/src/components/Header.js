import { React } from 'react';
import { Box } from '@mui/material';
import DevLightIcon from './DevLightIcon';
import DropDownMenu from './DropDownMenu';



export default function Header(props) {

    const styles = {
        root: {
            position: 'absolute',
            top:'0',
        },
        headerStyle: {
            display: 'flex',
            flexDirection: 'row',
            width: '100vw',
        }
    }

    return (
        <>
            <Box sx={styles.root}>
                <Box sx={styles.headerStyle}>
                    <Box sx={{ marginTop: '1%', marginLeft: '2%'}}>
                        <DevLightIcon/>
                    </Box>
                    <Box sx={{ marginTop: '1%', marginLeft:'82%'}}>
                        <img src={props.prof_image} alt="Stock1" width='32px' height='36px' />
                    </Box>
                    <Box sx={{ marginTop: '.5%'}}>
                        <DropDownMenu/>
                    </Box>
                </Box>
            </Box>
        </>
    )
}