import React, { useState } from 'react'
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';


interface HelpPopover {
    content: string
    children: React.ReactNode
}

const HelpPopover: React.FC<HelpPopover> = (props) => {
    const theme = useTheme();
    const [isShow, setIsShow] = useState(false);


    const isDarkMode = theme.palette.mode === 'dark';

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setIsShow(true)
    };

    const handleClose = () => {
        setIsShow(false)
    };



    return (
        <>
            <span
                onMouseEnter={handleOpen}
                onMouseLeave={handleClose}
            >
                {props.children}
                {isShow &&
                    <Paper elevation={5}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            backgroundColor: isDarkMode ? '#20232a' : '#fff',
                            zIndex: 999
                        }}>
                        <Typography variant='body2' sx={{ maxWidth: 350, p: 1, whiteSpace: 'pre-wrap' }}>{props.content}</Typography>
                    </Paper>
                }
            </span>
        </>
    );
}

export default HelpPopover;