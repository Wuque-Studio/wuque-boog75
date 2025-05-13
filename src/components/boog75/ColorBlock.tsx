import React, { useRef, Ref, useImperativeHandle } from 'react';
import reactCSS from 'reactcss';

interface ColorBlockProps {
color: API.Keyboard.Color;
onChange: () => void;
onRef: Ref<any>;
}
const ColorBlock: React.FC<ColorBlockProps> = (props) => {
const childRef = useRef<any>(null);
useImperativeHandle(props.onRef, () => ({
    handleClick,
    handleReset
}))
const styles = reactCSS({
    'default': {
    color: {
        width: '48px',
        height: '14px',
        borderRadius: '2px',
        background: `rgba(${ props.color?.rgb.r }, ${ props.color?.rgb.g }, ${ props.color?.rgb.b }, ${ props.color?.rgb.a })`,
    },
    swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
    }
    },
});
const handleClick = () => {
    props.onChange();
    childRef.current.style.boxShadow = '0 0 0 3px rgba(255,193,7, 0.5)'
}
const handleReset = () => {
    childRef.current.style.boxShadow = '0 0 0 1px rgba(0,0,0,.1)'
}
return (
    <div ref={childRef} style={styles.swatch} onClick={handleClick}>
    <div style={styles.color} />
    </div>
)
}

export default ColorBlock;