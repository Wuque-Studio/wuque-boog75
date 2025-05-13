import React, { useRef, Ref, useImperativeHandle, useEffect } from 'react';
import reactCSS from 'reactcss';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

interface ColorBlockProps {
    color: API.Keyboard.Color;
    selected: boolean;
    onChange: () => void;
    onRef: Ref<any>;
}
const ColorBlock: React.FC<ColorBlockProps> = (props) => {
    const theme = useTheme();
    const childRef = useRef<any>(null);
    useImperativeHandle(props.onRef, () => ({ // 暴露给父组件的方法
        handleClick
    }))

    const isDarkMode = theme.palette.mode === 'dark';
    const selectedShadow = isDarkMode ? '0 0 0 3px rgba(255,255,255, 1)' : '0 0 0 3px rgba(26,26,26, 0.3)';

    const styles = reactCSS({
        'default': {
            color: {
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: `rgba(${props.color?.rgb.r}, ${props.color?.rgb.g}, ${props.color?.rgb.b}, ${props.color?.rgb.a})`,
                boxShadow: '0px 0px 1px 1px rgba(26,26,26, 0.5)',
                display: 'inline-block',
                cursor: 'pointer',
            }
        },
    });
    const handleClick = () => {
        props.onChange();
    }
    return (
        <Box
            ref={childRef}
            style={styles.color}
            onClick={handleClick}
            sx={{ boxShadow: `${props.selected ? selectedShadow : '0px 0px 1px 1px rgba(26,26,26, 0.5)'} !important` }}
        >
        </Box>
    )
}

export default ColorBlock;