import { FC, useState } from 'react';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';


interface State {
  displayColorPicker: boolean;
  color: API.Keyboard.Color;
}

interface ColorPickerProps {
  color: API.Keyboard.Color;
  onChange?: (value: API.Keyboard.Color) => void;
}

export const ColorPicker: FC<ColorPickerProps> = ({ color, onChange }) => {
  const [selectColor, setSelectColor] = useState<State>({
    displayColorPicker: false,
    color: color,
  });

  const handleClick = () => {
    setSelectColor({ ...selectColor, displayColorPicker: !selectColor.displayColorPicker });
  };

  const handleClose = () => {
    setSelectColor({ ...selectColor, displayColorPicker: false });
  };

  const handleChange = (color: API.Keyboard.Color) => {
    setSelectColor({ ...selectColor, color: color });
    onChange && onChange(color);
  };

  const styles = reactCSS({
    'default': {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: `rgba(${ selectColor.color.rgb.r }, ${ selectColor.color.rgb.g }, ${ selectColor.color.rgb.b }, ${ selectColor.color.rgb.a })`,
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  return (
    <div>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {selectColor.displayColorPicker ? (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={handleClose} />
          <SketchPicker color={ selectColor.color.rgb } onChange={ handleChange } />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
