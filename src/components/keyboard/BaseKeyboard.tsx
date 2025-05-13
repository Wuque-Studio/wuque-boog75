import { useState } from 'react'
import { useTheme } from '@mui/material/styles';
import { useIntl } from "react-intl";
import BaseKey from '../key/BaseKey';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { KEYCODE_DICT } from '@/types/VkCodeDict';


const baseKeyMap: API.Keyboard.KeyObject[][] = [
  [{ vkCode: KEYCODE_DICT.VK_ESCAPE, keyText: "Esc" }, { vkCode: -1, keyText: "Empty" }, { vkCode: KEYCODE_DICT.VK_F1, keyText: "F1" }, { vkCode: KEYCODE_DICT.VK_F2, keyText: "F2" }, { vkCode: KEYCODE_DICT.VK_F3, keyText: "F3" }, { vkCode: KEYCODE_DICT.VK_F4, keyText: "F4", cssStyle: { marginRight: 30 } }, { vkCode: KEYCODE_DICT.VK_F5, keyText: "F5" }, { vkCode: KEYCODE_DICT.VK_F6, keyText: "F6" }, { vkCode: KEYCODE_DICT.VK_F7, keyText: "F7" }, { vkCode: KEYCODE_DICT.VK_F8, keyText: "F8", cssStyle: { marginRight: 30 } }, { vkCode: KEYCODE_DICT.VK_F9, keyText: "F9" }, { vkCode: KEYCODE_DICT.VK_F10, keyText: "F10" }, { vkCode: KEYCODE_DICT.VK_F11, keyText: "F11" }, { vkCode: KEYCODE_DICT.VK_F12, keyText: "F12", cssStyle: { marginRight: 15 } }, { vkCode: KEYCODE_DICT.VK_PRINT, keyText: "Print\nScreen" }, { vkCode: KEYCODE_DICT.VK_SCROLL, keyText: "Scroll\nLock" }, { vkCode: KEYCODE_DICT.VK_PAUSE, keyText: "Pause", cssStyle: { marginRight: 15 } }, { vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }],
  [{ vkCode: KEYCODE_DICT.VK_OEM_3, keyText: "`" }, { vkCode: KEYCODE_DICT.VK_1, keyText: "1" }, { vkCode: KEYCODE_DICT.VK_2, keyText: "2" }, { vkCode: KEYCODE_DICT.VK_3, keyText: "3" }, { vkCode: KEYCODE_DICT.VK_4, keyText: "4" }, { vkCode: KEYCODE_DICT.VK_5, keyText: "5" }, { vkCode: KEYCODE_DICT.VK_6, keyText: "6" }, { vkCode: KEYCODE_DICT.VK_7, keyText: "7" }, { vkCode: KEYCODE_DICT.VK_8, keyText: "8" }, { vkCode: KEYCODE_DICT.VK_9, keyText: "9" }, { vkCode: KEYCODE_DICT.VK_0, keyText: "0" }, { vkCode: KEYCODE_DICT.VK_OEM_MINUS, keyText: "-" }, { vkCode: KEYCODE_DICT.VK_OEM_PLUS, keyText: "=" }, { vkCode: KEYCODE_DICT.VK_BACK, keyText: "Backspace", cssStyle: { width: 85, marginRight: 15 } }, { vkCode: KEYCODE_DICT.VK_INSERT, keyText: "Insert" }, { vkCode: KEYCODE_DICT.VK_HOME, keyText: "Home" }, { vkCode: KEYCODE_DICT.VK_PRIOR, keyText: "Page\nUp", cssStyle: { marginRight: 15 } }, { vkCode: KEYCODE_DICT.VK_NUMLOCK, keyText: "Num\nLock" }, { vkCode: KEYCODE_DICT.VK_DIVIDE, keyText: "Num/" }, { vkCode: KEYCODE_DICT.VK_MULTIPLY, keyText: "Num*" }, { vkCode: KEYCODE_DICT.VK_SUBTRACT, keyText: "Num-" }],
  [{ vkCode: KEYCODE_DICT.VK_TAB, keyText: "Tab", cssStyle: { width: 60 } }, { vkCode: KEYCODE_DICT.VK_Q, keyText: "Q" }, { vkCode: KEYCODE_DICT.VK_W, keyText: "W" }, { vkCode: KEYCODE_DICT.VK_E, keyText: "E" }, { vkCode: KEYCODE_DICT.VK_R, keyText: "R" }, { vkCode: KEYCODE_DICT.VK_T, keyText: "T" }, { vkCode: KEYCODE_DICT.VK_Y, keyText: "Y" }, { vkCode: KEYCODE_DICT.VK_U, keyText: "U" }, { vkCode: KEYCODE_DICT.VK_I, keyText: "I" }, { vkCode: KEYCODE_DICT.VK_O, keyText: "O" }, { vkCode: KEYCODE_DICT.VK_P, keyText: "P" }, { vkCode: KEYCODE_DICT.VK_OEM_4, keyText: "[" }, { vkCode: KEYCODE_DICT.VK_OEM_6, keyText: "]" }, { vkCode: KEYCODE_DICT.VK_OEM_5, keyText: "\\", cssStyle: { width: 60, marginRight: 15 } }, { vkCode: KEYCODE_DICT.VK_DELETE, keyText: "Delete" }, { vkCode: KEYCODE_DICT.VK_END, keyText: "End" }, { vkCode: KEYCODE_DICT.VK_NEXT, keyText: "Page\nDown", cssStyle: { marginRight: 15 } }, { vkCode: KEYCODE_DICT.VK_NUMPAD7, keyText: "Num7" }, { vkCode: KEYCODE_DICT.VK_NUMPAD8, keyText: "Num8" }, { vkCode: KEYCODE_DICT.VK_NUMPAD9, keyText: "Num9" }, { vkCode: KEYCODE_DICT.VK_ADD, keyText: "Num+" }],
  [{ vkCode: KEYCODE_DICT.VK_CAPITAL, keyText: "Caps\nLock", cssStyle: { width: 70 } }, { vkCode: KEYCODE_DICT.VK_A, keyText: "A" }, { vkCode: KEYCODE_DICT.VK_S, keyText: "S" }, { vkCode: KEYCODE_DICT.VK_D, keyText: "D" }, { vkCode: KEYCODE_DICT.VK_F, keyText: "F" }, { vkCode: KEYCODE_DICT.VK_G, keyText: "G" }, { vkCode: KEYCODE_DICT.VK_H, keyText: "H" }, { vkCode: KEYCODE_DICT.VK_J, keyText: "J" }, { vkCode: KEYCODE_DICT.VK_K, keyText: "K" }, { vkCode: KEYCODE_DICT.VK_L, keyText: "L" }, { vkCode: KEYCODE_DICT.VK_OEM_1, keyText: ";" }, { vkCode: KEYCODE_DICT.VK_OEM_7, keyText: "\'" }, { vkCode: KEYCODE_DICT.VK_RETURN, keyText: "Enter", cssStyle: { width: 90, marginRight: 145 } }, { vkCode: KEYCODE_DICT.VK_NUMPAD4, keyText: "Num4" }, { vkCode: KEYCODE_DICT.VK_NUMPAD5, keyText: "Num5" }, { vkCode: KEYCODE_DICT.VK_NUMPAD6, keyText: "Num6" }, { vkCode: KEYCODE_DICT.VK_OEM_COMMA, keyText: "," }],
  [{ vkCode: KEYCODE_DICT.VK_LSHIFT, keyText: "Left Shift", cssStyle: { width: 90 } }, { vkCode: KEYCODE_DICT.VK_Z, keyText: "Z" }, { vkCode: KEYCODE_DICT.VK_X, keyText: "X" }, { vkCode: KEYCODE_DICT.VK_C, keyText: "C" }, { vkCode: KEYCODE_DICT.VK_V, keyText: "V" }, { vkCode: KEYCODE_DICT.VK_B, keyText: "B" }, { vkCode: KEYCODE_DICT.VK_N, keyText: "N" }, { vkCode: KEYCODE_DICT.VK_M, keyText: "M" }, { vkCode: KEYCODE_DICT.VK_OEM_COMMA, keyText: "," }, { vkCode: KEYCODE_DICT.VK_OEM_PERIOD, keyText: "." }, { vkCode: KEYCODE_DICT.VK_OEM_2, keyText: "/" }, { vkCode: KEYCODE_DICT.VK_RSHIFT, keyText: "Right Shift", cssStyle: { width: 110, marginRight: 55 } }, { vkCode: KEYCODE_DICT.VK_UP, keyText: "Up", cssStyle: { marginRight: 55 } }, { vkCode: KEYCODE_DICT.VK_NUMPAD1, keyText: "Num1" }, { vkCode: KEYCODE_DICT.VK_NUMPAD2, keyText: "Num2" }, { vkCode: KEYCODE_DICT.VK_NUMPAD3, keyText: "Num3" }, { vkCode: KEYCODE_DICT.VK_OEM_PLUS, keyText: "=" }],
  [{ vkCode: KEYCODE_DICT.VK_LCONTROL, keyText: "Left\nCtrl", cssStyle: { width: 48 } }, { vkCode: KEYCODE_DICT.VK_LWIN, keyText: "Left\nOS", cssStyle: { width: 48 } }, { vkCode: KEYCODE_DICT.VK_LMENU, keyText: "Left\nAlt", cssStyle: { width: 48 } }, { vkCode: KEYCODE_DICT.VK_SPACE, keyText: "Space", cssStyle: { width: 230 } }, { vkCode: KEYCODE_DICT.VK_RMENU, keyText: "Right\nAlt", cssStyle: { width: 48 } }, { vkCode: KEYCODE_DICT.VK_RWIN, keyText: "Right\nOS", cssStyle: { width: 48 } }, { vkCode: KEYCODE_DICT.VK_FN, keyText: "Fn", cssStyle: { width: 52 } }, { vkCode: KEYCODE_DICT.VK_RCONTROL, keyText: "Right\nCtrl", cssStyle: { width: 48, marginRight: 15 } }, { vkCode: KEYCODE_DICT.VK_LEFT, keyText: "Left" }, { vkCode: KEYCODE_DICT.VK_DOWN, keyText: "Down" }, { vkCode: KEYCODE_DICT.VK_RIGHT, keyText: "Right", cssStyle: { marginRight: 15 } }, { vkCode: KEYCODE_DICT.VK_NUMPAD0, keyText: "Num0", cssStyle: { width: 75 } }, { vkCode: KEYCODE_DICT.VK_DECIMAL, keyText: "." }, { vkCode: KEYCODE_DICT.VK_SEPARATOR, keyText: "Enter" }]
]
const multimediaKeyMap: API.Keyboard.KeyObject[][] = [
  [{ vkCode: KEYCODE_DICT.VK_MEDIA_PREV_TRACK, keyText: "Prev\nTrack" }, { vkCode: KEYCODE_DICT.VK_MEDIA_NEXT_TRACK, keyText: "Next\nTrack" }, { vkCode: KEYCODE_DICT.VK_VOLUME_MUTE, keyText: "Vol\nMute" }, { vkCode: KEYCODE_DICT.VK_VOLUME_DOWN, keyText: "Vol-" }, { vkCode: KEYCODE_DICT.VK_VOLUME_UP, keyText: "Vol+" }, { vkCode: KEYCODE_DICT.VK_MEDIA_STOP, keyText: "Media\nStop" }, { vkCode: KEYCODE_DICT.VK_MEDIA_PLAY_PAUSE, keyText: "Play\nPause" }, { vkCode: KEYCODE_DICT.VK_CALL_MUTE, keyText: "Call\nMute", cssStyle: { marginRight: 15 }  }, { vkCode: KEYCODE_DICT.VK_BROWSER_HOME, keyText: "IE\nHome" }, { vkCode: KEYCODE_DICT.VK_BROWSER_SEARCH, keyText: "IE\nSearch" }, { vkCode: KEYCODE_DICT.VK_BROWSER_BACK, keyText: "IE\nBack" }, { vkCode: KEYCODE_DICT.VK_BROWSER_FORWARD, keyText: "IE\nForward", cssStyle: { marginRight: 15 }  }, { vkCode: KEYCODE_DICT.VK_MY_COMPUTER, keyText: "My\nPC" }, { vkCode: KEYCODE_DICT.VK_CALCULATOR, keyText: "Calcu\nlator" }],
]
const mouseKeyMap: API.Keyboard.KeyObject[][] = [
  [{ vkCode: KEYCODE_DICT.VK_LBUTTON, keyText: "Mouse\nL" }, { vkCode: KEYCODE_DICT.VK_RBUTTON, keyText: "Mouse\nR" }, { vkCode: KEYCODE_DICT.VK_MBUTTON, keyText: "Mouse\nM" }, { vkCode: KEYCODE_DICT.VK_XBUTTON1, keyText: "Mouse\n4" }, { vkCode: KEYCODE_DICT.VK_XBUTTON2, keyText: "Mouse\n5" }],
]
const extraFnKeyMap: API.Keyboard.KeyObject[][] = [
  [{ vkCode: KEYCODE_DICT.VK_F13, keyText: "F13" }, { vkCode: KEYCODE_DICT.VK_F14, keyText: "F14" }, { vkCode: KEYCODE_DICT.VK_F15, keyText: "F15" }, { vkCode: KEYCODE_DICT.VK_F16, keyText: "F16", cssStyle: { marginRight: 15 } }, { vkCode: KEYCODE_DICT.VK_F17, keyText: "F17" }, { vkCode: KEYCODE_DICT.VK_F18, keyText: "F18" }, { vkCode: KEYCODE_DICT.VK_F19, keyText: "F19" }, { vkCode: KEYCODE_DICT.VK_F20, keyText: "F20", cssStyle: { marginRight: 15 } }, { vkCode: KEYCODE_DICT.VK_F21, keyText: "F21" }, { vkCode: KEYCODE_DICT.VK_F22, keyText: "F22" }, { vkCode: KEYCODE_DICT.VK_F23, keyText: "F23" }, { vkCode: KEYCODE_DICT.VK_F24, keyText: "F24", cssStyle: { marginRight: 15 }  }, { vkCode: KEYCODE_DICT.VK_RGB_SWITH, keyText: "RGB\nSwitch" }, { vkCode: KEYCODE_DICT.VK_RGB_Effect, keyText: "RGB\nEffet" }, { vkCode: KEYCODE_DICT.VK_RGB_Color, keyText: "RGB\nColor" }, { vkCode: KEYCODE_DICT.VK_RGB_BRIGHT1, keyText: "RGB\nBright+" }, { vkCode: KEYCODE_DICT.VK_RGB_BRIGHT0, keyText: "RGB\nBright-" }, { vkCode: KEYCODE_DICT.VK_RGB_SPEED1, keyText: "RGB\nSpeed+" }, { vkCode: KEYCODE_DICT.VK_RGB_SPEED0, keyText: "RGB\nSpeed-", cssStyle: { marginRight: 15 }  }, { vkCode: KEYCODE_DICT.VK_RT, keyText: "RT" }, { vkCode: KEYCODE_DICT.VK_DISABLE_LGUI, keyText: "Disable\nLgui" }]
]

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

interface BaseKeyboardProps {
  macroList?: Array<API.Keyboard.Macro>
  zoom?: number
}

export default function BaseKeyboard(props: BaseKeyboardProps) {
  const intl = useIntl()
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const isDarkMode = theme.palette.mode === 'dark';

  const baseKeyboard = baseKeyMap.map((col, index) => {
    return <Grid key={index} >{col.map((keyObj, idx) => <BaseKey key={"base_" + index + "_" + idx + "_" + keyObj.vkCode} keyObj={keyObj}></BaseKey>)}</Grid>
  })
  const multimediaKeyboard = multimediaKeyMap.map((col, index) => {
    return <Grid key={index} xs={12}>{col.map((keyObj, idx) => <BaseKey key={"multi_" + index + "_" + idx + "_" + keyObj.vkCode} keyObj={keyObj}></BaseKey>)}</Grid>
  })
  const mouseKeyboard = mouseKeyMap.map((col, index) => {
    return <Grid key={index} xs={12}>{col.map((keyObj, idx) => <BaseKey key={"mouse_" + index + "_" + idx + "_" + keyObj.vkCode} keyObj={keyObj}></BaseKey>)}</Grid>
  })
  const extraFnKeyboard = extraFnKeyMap.map((col, index) => {
    return <Grid key={index} xs={12}>{col.map((keyObj, idx) => <BaseKey key={"extra_" + index + "_" + idx + "_" + keyObj.vkCode} keyObj={keyObj}></BaseKey>)}</Grid>
  })

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper elevation={0} variant="outlined"
      sx={{
        p: 2,
        borderRadius: '10px 10px 0px 0px',
        minWidth: '968px',
        height: '370px',
        backgroundColor: isDarkMode ? '#20232a' : '#fff',
        zoom: props.zoom
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)' }}>
        <Tabs value={value} onChange={handleChange} >
          <Tab label={intl.formatMessage({ id: "keyboard.basePanel" })} {...a11yProps(0)} sx={{ color: '#798192', fontWeight: 'bolder' }} />
          <Tab label={intl.formatMessage({ id: "keyboard.mediaAndMousePanel" })} {...a11yProps(1)} sx={{ color: '#798192', fontWeight: 'bolder' }} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box sx={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Grid container sx={{ width: '910px' }}>
            {baseKeyboard}
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant='overline' sx={{ textAlign: 'left', color: '#798192' }}>{intl.formatMessage({ id: "keyboard.multimediaKeys" })}</Typography>
        <Grid container>
          {multimediaKeyboard}
        </Grid>
        <Typography variant='overline' sx={{ textAlign: 'left', color: '#798192' }}>{intl.formatMessage({ id: "keyboard.mouseKeys" })}</Typography>
        <Grid container>
          {mouseKeyboard}
        </Grid>
        <Typography variant='overline' sx={{ textAlign: 'left', color: '#798192' }}>{intl.formatMessage({ id: "keyboard.extraFnKeys" })}</Typography>
        <Grid container>
          {extraFnKeyboard}
        </Grid>
        {props.macroList && props.macroList.filter(m => { if (m.sync && !m.del) return m }).length > 0 &&
          <>
            <Typography variant='overline' sx={{ textAlign: 'left', color: '#798192' }}>{intl.formatMessage({ id: "keyboard.macros" })}</Typography>
            <Grid container>
              <Grid xs={12}>
                {props.macroList.map((item, index) => {
                  if (item.sync && !item.del) {
                    return (
                      <BaseKey key={item.title} keyObj={{ vkCode: KEYCODE_DICT.VK_MACRO, keyText: item.title, keyTextBreak: true, isMacro: true, macroId: item.id }}></BaseKey>
                    )
                  }
                })}
              </Grid>
            </Grid>
          </>
        }

      </TabPanel>
    </Paper >
  );


  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            {children}
          </Box>
        )}
      </Box>
    );
  }
}
