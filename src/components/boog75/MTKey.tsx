import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import styles from './MTKey.module.css';


interface MTKeyProps {
    mtKey?: API.Keyboard.MTKey
    onChangeKey: (key: API.Keyboard.MTKey) => void
    onClick: () => void
}
const MTKey: React.FC<MTKeyProps> = (props) => {

    const handleClickKey = (e: any) => {
        props.onClick()
        props.onChangeKey({ vkCode: undefined, keyText: '' })
        const keyItems = document.getElementsByClassName("MT_KEY_ITEM");
        for (let i = 0; i < keyItems.length; i++) {
            keyItems[i].classList.remove(styles.selected_key)
        }

        e.target.classList.add(styles.selected_key)
    }

    const handleEnter = (e: any) => {
        e.preventDefault()
    }

    const handleOver = (e: any) => {
        e.preventDefault()
    }

    const handleLeave = (e: any) => {
        e.preventDefault()
    }

    const handleDrop = (e: any) => {
        e.stopPropagation();
        e.preventDefault()
        const keyText = e.dataTransfer.getData('text')
        const vkCode = e.dataTransfer.getData('vkCode')
        props.onChangeKey({ vkCode: vkCode, keyText: keyText })
        e.target.classList.remove(styles.selected_key)
    }


    return (
        <>
            <KeyItem 
                className='MT_KEY_ITEM'
               
                onClick={handleClickKey}
                onDragEnter={handleEnter}
                onDragOver={handleOver}
                onDragLeave={handleLeave}
                onDrop={handleDrop}
            >
                {props.mtKey?.keyText}
            </KeyItem>
        </>
    )
}

const KeyItem = styled(Box)(({ theme }) => ({
    width: '55px',
    height: '55px',
    border: '1px solid',
    borderRadius: '5px',
    boxSizing: 'border-box',
    color: theme.palette.mode === 'dark' ? 'white' : '#1a1a1a',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontSize: '14px',
    lineHeight: '18px',
    whiteSpace: 'pre-line',
    cursor: 'grab',
    float: 'left'
}));

export default MTKey;
