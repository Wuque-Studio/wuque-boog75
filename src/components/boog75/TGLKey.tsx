import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import styles from './TGLKey.module.css';


interface TGLKeyProps {
    tglKey?: API.Keyboard.TGLKey
    onChangeKey: (key: API.Keyboard.TGLKey) => void
    onClick: () => void
}
const TGLKey: React.FC<TGLKeyProps> = (props) => {

    const handleClickKey = (e: any) => {
        props.onClick()
        props.onChangeKey({ vkCode: undefined, keyText: '' })
        const keyItems = document.getElementsByClassName("TGL_KEY_ITEM");
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
                className='TGL_KEY_ITEM'
                onClick={handleClickKey}
                onDragEnter={handleEnter}
                onDragOver={handleOver}
                onDragLeave={handleLeave}
                onDrop={handleDrop}
            >
                {props.tglKey?.keyText}
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
    fontSize: '1rem',
    lineHeight: '11px',
    whiteSpace: 'pre-line',
    cursor: 'grab',
    float: 'left'
}));

export default TGLKey;
