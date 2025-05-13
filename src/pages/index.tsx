import React, { useState, useEffect, useRef, useContext, createContext } from 'react';
import { useTheme, createTheme, ThemeProvider, alpha, getContrastRatio } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import MenuItem from '@mui/material/MenuItem';
import { useIntl } from "react-intl";
import Link from "next/link";
import TranslateIcon from '@mui/icons-material/Translate';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import { Fab, PaletteMode } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import KeyboardAltIcon from '@mui/icons-material/KeyboardAlt';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';
import FitbitIcon from '@mui/icons-material/Fitbit';
import SyncIcon from '@mui/icons-material/Sync';
import UndoIcon from '@mui/icons-material/Undo';
import AddIcon from '@mui/icons-material/Add';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IosShareIcon from '@mui/icons-material/IosShare';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlineIcon from '@mui/icons-material/EditOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ApiIcon from '@mui/icons-material/Api';

import BaseKeyboard from '@/components/keyboard/BaseKeyboard'
import CustomKeyboard from '@/components/keyboard/CustomKeyboard';
import ColorCircle from '@/components/boog75/ColorCircle';
import { KEYCODE_DICT, KEY_TEXT_DICT } from '@/types/VkCodeDict';
import { Boog75Constant } from '@/types/Boog75';
import AlertDialog from '@/components/dialog/AlertDialog';
import MacroPanel from '@/components/boog75/MacroPanel'
import Wheel from '@uiw/react-color-wheel';
import ShadeSlider from '@uiw/react-color-shade-slider';
import EditableInput from '@uiw/react-color-editable-input';
import EditableInputRGBA from '@uiw/react-color-editable-input-rgba';
import { rgbaToHsva, hsvaToRgba, hexToHsva, hexToRgba, rgbaToHexa } from '@uiw/color-convert';
import HelpPopover from '@/components/boog75/HelpPopover';
import AdvancedKeyPanel from '@/components/boog75/AdvancedKeyPanel';
import MaterialUISwitch from '@/components/boog75/MaterialUISwitch';
import OrangeSlider from '@/components/boog75/OrangeSlider';
import BlueSlider from '@/components/boog75/BlueSlider';
import StyledMenu from '@/components/boog75/ProfileOperate';
import UploadInput from '@/components/boog75/UploadInput';

import { hex8, parseHexArray } from '@/components/webhid/HexUtil';

import styles from './index.module.css'
import targetKeyStyles from '@/components/key/TargetKey.module.css'

// Augment the palette to include a violet color
declare module '@mui/material/styles' {
  interface Palette {
    _gray: Palette['primary'];
    _green: Palette['primary'];
  }

  interface PaletteOptions {
    _gray?: PaletteOptions['primary'];
    _green?: PaletteOptions['primary'];
  }
}

// Update the Button's color options to include a violet option
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    _gray: true;
    _green: true;
  }
}

const grayBase = '#96a0af';
const grayMain = alpha(grayBase, 0.7)
const greenBase = '#2bd068';
const greenMain = alpha(greenBase, 0.7)

const getDesignTokens = (mode: PaletteMode) => ({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      body {
        background-color: '#0f1316';
      }
    `,
    },
  },
  palette: {
    mode,
    _gray: {
      main: grayMain,
      light: alpha(grayBase, 0.5),
      dark: alpha(grayBase, 0.9),
      contrastText: getContrastRatio(grayMain, '#fff') > 2.6 ? '#fff' : '#111',
    },
    _green: {
      main: greenMain,
      light: alpha(greenBase, 0.5),
      dark: alpha(greenBase, 0.9),
      contrastText: getContrastRatio(greenMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
    ...(mode === 'dark' ? {
      background: {
        default: '#0f1316',
      }
    } : {
      background: {
        default: '#edf2f6',
      }
    }
    ),
    body: {
      ...(mode === 'dark'
        ? {
          primary: '#0f1316',
        }
        : {
          primary: '#edf2f6',
        }),
    },
    text: {
      ...(mode === 'dark'
        ? {
          primary: '#fff',
        }
        : {
          primary: '#1a1a1a',
        }),
    },
  },
})

const ColorModeContext = createContext({ toggleColorMode: () => { } })

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark')
  // const [selectD, setSelectD] = React.useState('0')
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [],
  )
 
  const theme = React.useMemo(
    () =>
      createTheme(getDesignTokens(mode)),
    [mode],
  )
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Boog75 />
    
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

const REPORT_ID: number = 0x00;
const SENSITIVITY_ARR = [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
const enum SCREEN_SIZE { SMALL, MIDDLE, LARGE }

const DEFAULT_KEYBOARD_JSON = {
  isDarkMode: true,
  keyMap: [
    [{ idx: 0, vkCode: KEYCODE_DICT.VK_ESCAPE, keyText: "Esc", cssStyle: { marginRight: 16 } }, { idx: 1, vkCode: KEYCODE_DICT.VK_F1, keyText: "F1" }, { idx: 2, vkCode: KEYCODE_DICT.VK_F2, keyText: "F2" }, { idx: 3, vkCode: KEYCODE_DICT.VK_F3, keyText: "F3" }, { idx: 4, vkCode: KEYCODE_DICT.VK_F4, keyText: "F4", cssStyle: { marginRight: 16 } }, { idx: 5, vkCode: KEYCODE_DICT.VK_F5, keyText: "F5" }, { idx: 6, vkCode: KEYCODE_DICT.VK_F6, keyText: "F6" }, { idx: 7, vkCode: KEYCODE_DICT.VK_F7, keyText: "F7" }, { idx: 8, vkCode: KEYCODE_DICT.VK_F8, keyText: "F8", cssStyle: { marginRight: 16 } }, { idx: 9, vkCode: KEYCODE_DICT.VK_F9, keyText: "F9" }, { idx: 10, vkCode: KEYCODE_DICT.VK_F10, keyText: "F10" }, { idx: 11, vkCode: KEYCODE_DICT.VK_F11, keyText: "F11" }, { idx: 12, vkCode: KEYCODE_DICT.VK_F12, keyText: "F12", cssStyle: { marginRight: 16 } }, { idx: 13, vkCode: KEYCODE_DICT.VK_F13, keyText: "F13" }, { idx: 14, vkCode: KEYCODE_DICT.VK_HOME, keyText: "Home" }],
    [{ idx: 15, vkCode: KEYCODE_DICT.VK_OEM_3, keyText: "`" }, { idx: 16, vkCode: KEYCODE_DICT.VK_1, keyText: "1" }, { idx: 17, vkCode: KEYCODE_DICT.VK_2, keyText: "2" }, { idx: 18, vkCode: KEYCODE_DICT.VK_3, keyText: "3" }, { idx: 19, vkCode: KEYCODE_DICT.VK_4, keyText: "4" }, { idx: 20, vkCode: KEYCODE_DICT.VK_5, keyText: "5" }, { idx: 21, vkCode: KEYCODE_DICT.VK_6, keyText: "6" }, { idx: 22, vkCode: KEYCODE_DICT.VK_7, keyText: "7" }, { idx: 23, vkCode: KEYCODE_DICT.VK_8, keyText: "8" }, { idx: 24, vkCode: KEYCODE_DICT.VK_9, keyText: "9" }, { idx: 25, vkCode: KEYCODE_DICT.VK_0, keyText: "0" }, { idx: 26, vkCode: KEYCODE_DICT.VK_OEM_MINUS, keyText: "-" }, { idx: 27, vkCode: KEYCODE_DICT.VK_OEM_PLUS, keyText: "=" }, { idx: 28, vkCode: KEYCODE_DICT.VK_BACK, keyText: "Backspace", cssStyle: { width: 85 } }, { idx: 29, vkCode: KEYCODE_DICT.VK_DELETE, keyText: "Delete" }],
    [{ idx: 30, vkCode: KEYCODE_DICT.VK_TAB, keyText: "Tab", cssStyle: { width: 62.5 } }, { idx: 31, vkCode: KEYCODE_DICT.VK_Q, keyText: "Q" }, { idx: 32, vkCode: KEYCODE_DICT.VK_W, keyText: "W" }, { idx: 33, vkCode: KEYCODE_DICT.VK_E, keyText: "E" }, { idx: 34, vkCode: KEYCODE_DICT.VK_R, keyText: "R" }, { idx: 35, vkCode: KEYCODE_DICT.VK_T, keyText: "T" }, { idx: 36, vkCode: KEYCODE_DICT.VK_Y, keyText: "Y" }, { idx: 37, vkCode: KEYCODE_DICT.VK_U, keyText: "U" }, { idx: 38, vkCode: KEYCODE_DICT.VK_I, keyText: "I" }, { idx: 39, vkCode: KEYCODE_DICT.VK_O, keyText: "O" }, { idx: 40, vkCode: KEYCODE_DICT.VK_P, keyText: "P" }, { idx: 41, vkCode: KEYCODE_DICT.VK_OEM_4, keyText: "[" }, { idx: 42, vkCode: KEYCODE_DICT.VK_OEM_6, keyText: "]" }, { idx: 43, vkCode: KEYCODE_DICT.VK_OEM_5, keyText: "\\", cssStyle: { width: 62.5 } }, { idx: 44, vkCode: KEYCODE_DICT.VK_PRIOR, keyText: "Page\nUp" }],
    [{ idx: 45, vkCode: KEYCODE_DICT.VK_CAPITAL, keyText: "Caps\nLock", cssStyle: { width: 75 } }, { idx: 46, vkCode: KEYCODE_DICT.VK_A, keyText: "A" }, { idx: 47, vkCode: KEYCODE_DICT.VK_S, keyText: "S" }, { idx: 48, vkCode: KEYCODE_DICT.VK_D, keyText: "D" }, { idx: 49, vkCode: KEYCODE_DICT.VK_F, keyText: "F" }, { idx: 50, vkCode: KEYCODE_DICT.VK_G, keyText: "G" }, { idx: 51, vkCode: KEYCODE_DICT.VK_H, keyText: "H" }, { idx: 52, vkCode: KEYCODE_DICT.VK_J, keyText: "J" }, { idx: 53, vkCode: KEYCODE_DICT.VK_K, keyText: "K" }, { idx: 54, vkCode: KEYCODE_DICT.VK_L, keyText: "L" }, { idx: 55, vkCode: KEYCODE_DICT.VK_OEM_1, keyText: ";" }, { idx: 56, vkCode: KEYCODE_DICT.VK_OEM_7, keyText: "\'" }, { idx: 57, vkCode: KEYCODE_DICT.VK_RETURN, keyText: "Enter", cssStyle: { width: 95 } }, { idx: 58, vkCode: KEYCODE_DICT.VK_NEXT, keyText: "Page\nDown" }],
    [{ idx: 59, vkCode: KEYCODE_DICT.VK_LSHIFT, keyText: "Left Shift", cssStyle: { width: 100 } }, { idx: 60, vkCode: KEYCODE_DICT.VK_Z, keyText: "Z" }, { idx: 61, vkCode: KEYCODE_DICT.VK_X, keyText: "X" }, { idx: 62, vkCode: KEYCODE_DICT.VK_C, keyText: "C" }, { idx: 63, vkCode: KEYCODE_DICT.VK_V, keyText: "V" }, { idx: 64, vkCode: KEYCODE_DICT.VK_B, keyText: "B" }, { idx: 65, vkCode: KEYCODE_DICT.VK_N, keyText: "N" }, { idx: 66, vkCode: KEYCODE_DICT.VK_M, keyText: "M" }, { idx: 67, vkCode: KEYCODE_DICT.VK_OEM_COMMA, keyText: "," }, { idx: 68, vkCode: KEYCODE_DICT.VK_OEM_PERIOD, keyText: "." }, { idx: 69, vkCode: KEYCODE_DICT.VK_OEM_2, keyText: "/" }, { idx: 70, vkCode: KEYCODE_DICT.VK_RSHIFT, keyText: "Right Shift", cssStyle: { width: 70 } }, { idx: 71, vkCode: KEYCODE_DICT.VK_UP, keyText: "Up" }],
    [{ idx: 72, vkCode: KEYCODE_DICT.VK_LCONTROL, keyText: "Left\nCtrl", cssStyle: { width: 50 } }, { idx: 73, vkCode: KEYCODE_DICT.VK_LWIN, keyText: "Left\nOS", cssStyle: { width: 50 } }, { idx: 74, vkCode: KEYCODE_DICT.VK_LMENU, keyText: "Left\nAlt", cssStyle: { width: 50 } }, { idx: 75, vkCode: KEYCODE_DICT.VK_SPACE, keyText: "Space", cssStyle: { width: 280 } }, { idx: 76, vkCode: KEYCODE_DICT.VK_RMENU, keyText: "Right\nAlt", cssStyle: { width: 50 } }, { idx: 77, vkCode: KEYCODE_DICT.VK_FN, keyText: "Fn", cssStyle: { width: 50, marginRight: 30 } }, { idx: 78, vkCode: KEYCODE_DICT.VK_LEFT, keyText: "Left" }, { idx: 79, vkCode: KEYCODE_DICT.VK_DOWN, keyText: "Down" }, { idx: 80, vkCode: KEYCODE_DICT.VK_RIGHT, keyText: "Right" }]
  ],
  keyMap0: [
    [{ idx: 0, vkCode: KEYCODE_DICT.VK_ESCAPE, keyText: "Esc", cssStyle: { marginRight: 16 } }, { idx: 1, vkCode: KEYCODE_DICT.VK_F1, keyText: "F1" }, { idx: 2, vkCode: KEYCODE_DICT.VK_F2, keyText: "F2" }, { idx: 3, vkCode: KEYCODE_DICT.VK_F3, keyText: "F3" }, { idx: 4, vkCode: KEYCODE_DICT.VK_F4, keyText: "F4", cssStyle: { marginRight: 16 } }, { idx: 5, vkCode: KEYCODE_DICT.VK_F5, keyText: "F5" }, { idx: 6, vkCode: KEYCODE_DICT.VK_F6, keyText: "F6" }, { idx: 7, vkCode: KEYCODE_DICT.VK_F7, keyText: "F7" }, { idx: 8, vkCode: KEYCODE_DICT.VK_F8, keyText: "F8", cssStyle: { marginRight: 16 } }, { idx: 9, vkCode: KEYCODE_DICT.VK_F9, keyText: "F9" }, { idx: 10, vkCode: KEYCODE_DICT.VK_F10, keyText: "F10" }, { idx: 11, vkCode: KEYCODE_DICT.VK_F11, keyText: "F11" }, { idx: 12, vkCode: KEYCODE_DICT.VK_F12, keyText: "F12", cssStyle: { marginRight: 16 } }, { idx: 13, vkCode: KEYCODE_DICT.VK_F13, keyText: "F13" }, { idx: 14, vkCode: KEYCODE_DICT.VK_HOME, keyText: "Home" }],
    [{ idx: 15, vkCode: KEYCODE_DICT.VK_OEM_3, keyText: "`" }, { idx: 16, vkCode: KEYCODE_DICT.VK_1, keyText: "1" }, { idx: 17, vkCode: KEYCODE_DICT.VK_2, keyText: "2" }, { idx: 18, vkCode: KEYCODE_DICT.VK_3, keyText: "3" }, { idx: 19, vkCode: KEYCODE_DICT.VK_4, keyText: "4" }, { idx: 20, vkCode: KEYCODE_DICT.VK_5, keyText: "5" }, { idx: 21, vkCode: KEYCODE_DICT.VK_6, keyText: "6" }, { idx: 22, vkCode: KEYCODE_DICT.VK_7, keyText: "7" }, { idx: 23, vkCode: KEYCODE_DICT.VK_8, keyText: "8" }, { idx: 24, vkCode: KEYCODE_DICT.VK_9, keyText: "9" }, { idx: 25, vkCode: KEYCODE_DICT.VK_0, keyText: "0" }, { idx: 26, vkCode: KEYCODE_DICT.VK_OEM_MINUS, keyText: "-" }, { idx: 27, vkCode: KEYCODE_DICT.VK_OEM_PLUS, keyText: "=" }, { idx: 28, vkCode: KEYCODE_DICT.VK_BACK, keyText: "Backspace", cssStyle: { width: 85 } }, { idx: 29, vkCode: KEYCODE_DICT.VK_DELETE, keyText: "Delete" }],
    [{ idx: 30, vkCode: KEYCODE_DICT.VK_TAB, keyText: "Tab", cssStyle: { width: 62.5 } }, { idx: 31, vkCode: KEYCODE_DICT.VK_Q, keyText: "Q" }, { idx: 32, vkCode: KEYCODE_DICT.VK_W, keyText: "W" }, { idx: 33, vkCode: KEYCODE_DICT.VK_E, keyText: "E" }, { idx: 34, vkCode: KEYCODE_DICT.VK_R, keyText: "R" }, { idx: 35, vkCode: KEYCODE_DICT.VK_T, keyText: "T" }, { idx: 36, vkCode: KEYCODE_DICT.VK_Y, keyText: "Y" }, { idx: 37, vkCode: KEYCODE_DICT.VK_U, keyText: "U" }, { idx: 38, vkCode: KEYCODE_DICT.VK_I, keyText: "I" }, { idx: 39, vkCode: KEYCODE_DICT.VK_O, keyText: "O" }, { idx: 40, vkCode: KEYCODE_DICT.VK_P, keyText: "P" }, { idx: 41, vkCode: KEYCODE_DICT.VK_OEM_4, keyText: "[" }, { idx: 42, vkCode: KEYCODE_DICT.VK_OEM_6, keyText: "]" }, { idx: 43, vkCode: KEYCODE_DICT.VK_OEM_5, keyText: "\\", cssStyle: { width: 62.5 } }, { idx: 44, vkCode: KEYCODE_DICT.VK_PRIOR, keyText: "Page\nUp" }],
    [{ idx: 45, vkCode: KEYCODE_DICT.VK_CAPITAL, keyText: "Caps\nLock", cssStyle: { width: 75 } }, { idx: 46, vkCode: KEYCODE_DICT.VK_A, keyText: "A" }, { idx: 47, vkCode: KEYCODE_DICT.VK_S, keyText: "S" }, { idx: 48, vkCode: KEYCODE_DICT.VK_D, keyText: "D" }, { idx: 49, vkCode: KEYCODE_DICT.VK_F, keyText: "F" }, { idx: 50, vkCode: KEYCODE_DICT.VK_G, keyText: "G" }, { idx: 51, vkCode: KEYCODE_DICT.VK_H, keyText: "H" }, { idx: 52, vkCode: KEYCODE_DICT.VK_J, keyText: "J" }, { idx: 53, vkCode: KEYCODE_DICT.VK_K, keyText: "K" }, { idx: 54, vkCode: KEYCODE_DICT.VK_L, keyText: "L" }, { idx: 55, vkCode: KEYCODE_DICT.VK_OEM_1, keyText: ";" }, { idx: 56, vkCode: KEYCODE_DICT.VK_OEM_7, keyText: "\'" }, { idx: 57, vkCode: KEYCODE_DICT.VK_RETURN, keyText: "Enter", cssStyle: { width: 95 } }, { idx: 58, vkCode: KEYCODE_DICT.VK_NEXT, keyText: "Page\nDown" }],
    [{ idx: 59, vkCode: KEYCODE_DICT.VK_LSHIFT, keyText: "Left Shift", cssStyle: { width: 100 } }, { idx: 60, vkCode: KEYCODE_DICT.VK_Z, keyText: "Z" }, { idx: 61, vkCode: KEYCODE_DICT.VK_X, keyText: "X" }, { idx: 62, vkCode: KEYCODE_DICT.VK_C, keyText: "C" }, { idx: 63, vkCode: KEYCODE_DICT.VK_V, keyText: "V" }, { idx: 64, vkCode: KEYCODE_DICT.VK_B, keyText: "B" }, { idx: 65, vkCode: KEYCODE_DICT.VK_N, keyText: "N" }, { idx: 66, vkCode: KEYCODE_DICT.VK_M, keyText: "M" }, { idx: 67, vkCode: KEYCODE_DICT.VK_OEM_COMMA, keyText: "," }, { idx: 68, vkCode: KEYCODE_DICT.VK_OEM_PERIOD, keyText: "." }, { idx: 69, vkCode: KEYCODE_DICT.VK_OEM_2, keyText: "/" }, { idx: 70, vkCode: KEYCODE_DICT.VK_RSHIFT, keyText: "Right Shift", cssStyle: { width: 70 } }, { idx: 71, vkCode: KEYCODE_DICT.VK_UP, keyText: "Up" }],
    [{ idx: 72, vkCode: KEYCODE_DICT.VK_LCONTROL, keyText: "Left\nCtrl", cssStyle: { width: 50 } }, { idx: 73, vkCode: KEYCODE_DICT.VK_LWIN, keyText: "Left\nOS", cssStyle: { width: 50 } }, { idx: 74, vkCode: KEYCODE_DICT.VK_LMENU, keyText: "Left\nAlt", cssStyle: { width: 50 } }, { idx: 75, vkCode: KEYCODE_DICT.VK_SPACE, keyText: "Space", cssStyle: { width: 280 } }, { idx: 76, vkCode: KEYCODE_DICT.VK_RMENU, keyText: "Right\nAlt", cssStyle: { width: 50 } }, { idx: 77, vkCode: KEYCODE_DICT.VK_FN, keyText: "Fn", cssStyle: { width: 50, marginRight: 30 } }, { idx: 78, vkCode: KEYCODE_DICT.VK_LEFT, keyText: "Left" }, { idx: 79, vkCode: KEYCODE_DICT.VK_DOWN, keyText: "Down" }, { idx: 80, vkCode: KEYCODE_DICT.VK_RIGHT, keyText: "Right" }]
  ],
  keyMap1: [
    [{ idx: 0, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "Reset", isDisableChange: true, cssStyle: { marginRight: 16 } }, { idx: 1, vkCode: KEYCODE_DICT.VK_CALL_MUTE, keyText: "Call Mute" }, { idx: 2, vkCode: KEYCODE_DICT.VK_VOLUME_UP, keyText: "Vol+", isDisableChange: true }, { idx: 3, vkCode: KEYCODE_DICT.VK_VOLUME_DOWN, keyText: "Vol-", isDisableChange: true }, { idx: 4, vkCode: KEYCODE_DICT.VK_VOLUME_MUTE, keyText: "Vol Mute", cssStyle: { marginRight: 16 } }, { idx: 5, vkCode: KEYCODE_DICT.VK_MEDIA_PREV_TRACK, keyText: "Prev Track" }, { idx: 6, vkCode: KEYCODE_DICT.VK_MEDIA_PLAY_PAUSE, keyText: "Play\nPause" }, { idx: 7, vkCode: KEYCODE_DICT.VK_MEDIA_NEXT_TRACK, keyText: "Next Track" }, { idx: 8, vkCode: KEYCODE_DICT.VK_MEDIA_STOP, keyText: "Media Stop", cssStyle: { marginRight: 16 } }, { idx: 9, vkCode: KEYCODE_DICT.VK_BROWSER_HOME, keyText: "IE\n Home" }, { idx: 10, vkCode: KEYCODE_DICT.VK_MY_COMPUTER, keyText: "My\nPC" }, { idx: 11, vkCode: KEYCODE_DICT.VK_CALCULATOR, keyText: "Calcu\nlator" }, { idx: 12, vkCode: KEYCODE_DICT.VK_BROWSER_SEARCH, keyText: "IE\nSearch", cssStyle: { marginRight: 16 } }, { idx: 13, vkCode: KEYCODE_DICT.VK_F13, keyText: "F13" }, { idx: 14, vkCode: KEYCODE_DICT.VK_END, keyText: "End" }],
    [{ idx: 15, vkCode: KEYCODE_DICT.VK_OEM_3, keyText: "`" }, { idx: 16, vkCode: KEYCODE_DICT.VK_1, keyText: "1" }, { idx: 17, vkCode: KEYCODE_DICT.VK_2, keyText: "2" }, { idx: 18, vkCode: KEYCODE_DICT.VK_3, keyText: "3" }, { idx: 19, vkCode: KEYCODE_DICT.VK_4, keyText: "4" }, { idx: 20, vkCode: KEYCODE_DICT.VK_5, keyText: "5" }, { idx: 21, vkCode: KEYCODE_DICT.VK_6, keyText: "6" }, { idx: 22, vkCode: KEYCODE_DICT.VK_7, keyText: "7" }, { idx: 23, vkCode: KEYCODE_DICT.VK_8, keyText: "8" }, { idx: 24, vkCode: KEYCODE_DICT.VK_9, keyText: "9" }, { idx: 25, vkCode: KEYCODE_DICT.VK_0, keyText: "0" }, { idx: 26, vkCode: KEYCODE_DICT.VK_OEM_MINUS, keyText: "-" }, { idx: 27, vkCode: KEYCODE_DICT.VK_OEM_PLUS, keyText: "=" }, { idx: 28, vkCode: KEYCODE_DICT.VK_BACK, keyText: "Backspace", cssStyle: { width: 85 } }, { idx: 29, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "Insert" }],
    [{ idx: 30, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "RT", cssStyle: { width: 62.5 } }, { idx: 31, vkCode: KEYCODE_DICT.VK_Q, keyText: "Q" }, { idx: 32, vkCode: KEYCODE_DICT.VK_W, keyText: "W" }, { idx: 33, vkCode: KEYCODE_DICT.VK_E, keyText: "E" }, { idx: 34, vkCode: KEYCODE_DICT.VK_R, keyText: "R" }, { idx: 35, vkCode: KEYCODE_DICT.VK_T, keyText: "T" }, { idx: 36, vkCode: KEYCODE_DICT.VK_Y, keyText: "Y" }, { idx: 37, vkCode: KEYCODE_DICT.VK_U, keyText: "U" }, { idx: 38, vkCode: KEYCODE_DICT.VK_I, keyText: "I" }, { idx: 39, vkCode: KEYCODE_DICT.VK_O, keyText: "O" }, { idx: 40, vkCode: KEYCODE_DICT.VK_P, keyText: "P" }, { idx: 41, vkCode: KEYCODE_DICT.VK_RGB_Color, keyText: "RGB Color" }, { idx: 42, vkCode: KEYCODE_DICT.VK_RGB_Effect, keyText: "RGB Effect" }, { idx: 43, vkCode: KEYCODE_DICT.VK_RGB_SWITH, keyText: "RGB Switch", cssStyle: { width: 62.5 } }, { idx: 44, vkCode: KEYCODE_DICT.VK_PRIOR, keyText: "Page\nUp" }],
    [{ idx: 45, vkCode: KEYCODE_DICT.VK_CAPITAL, keyText: "Caps\nLock", cssStyle: { width: 75 } }, { idx: 46, vkCode: KEYCODE_DICT.VK_A, keyText: "A" }, { idx: 47, vkCode: KEYCODE_DICT.VK_S, keyText: "S" }, { idx: 48, vkCode: KEYCODE_DICT.VK_D, keyText: "D" }, { idx: 49, vkCode: KEYCODE_DICT.VK_F, keyText: "F" }, { idx: 50, vkCode: KEYCODE_DICT.VK_G, keyText: "G" }, { idx: 51, vkCode: KEYCODE_DICT.VK_H, keyText: "H" }, { idx: 52, vkCode: KEYCODE_DICT.VK_J, keyText: "J" }, { idx: 53, vkCode: KEYCODE_DICT.VK_K, keyText: "K" }, { idx: 54, vkCode: KEYCODE_DICT.VK_L, keyText: "L" }, { idx: 55, vkCode: KEYCODE_DICT.VK_OEM_1, keyText: ";" }, { idx: 56, vkCode: KEYCODE_DICT.VK_OEM_7, keyText: "\'" }, { idx: 57, vkCode: KEYCODE_DICT.VK_RETURN, keyText: "Enter", cssStyle: { width: 95 } }, { idx: 58, vkCode: KEYCODE_DICT.VK_NEXT, keyText: "Page\nDown" }],
    [{ idx: 59, vkCode: KEYCODE_DICT.VK_LSHIFT, keyText: "Fn2", isDisableChange: true, cssStyle: { width: 100 } }, { idx: 60, vkCode: KEYCODE_DICT.VK_Z, keyText: "Z" }, { idx: 61, vkCode: KEYCODE_DICT.VK_X, keyText: "X" }, { idx: 62, vkCode: KEYCODE_DICT.VK_C, keyText: "C" }, { idx: 63, vkCode: KEYCODE_DICT.VK_V, keyText: "V" }, { idx: 64, vkCode: KEYCODE_DICT.VK_B, keyText: "B" }, { idx: 65, vkCode: KEYCODE_DICT.VK_N, keyText: "N" }, { idx: 66, vkCode: KEYCODE_DICT.VK_M, keyText: "M" }, { idx: 67, vkCode: KEYCODE_DICT.VK_OEM_COMMA, keyText: "," }, { idx: 68, vkCode: KEYCODE_DICT.VK_OEM_PERIOD, keyText: "." }, { idx: 69, vkCode: KEYCODE_DICT.VK_OEM_2, keyText: "/" }, { idx: 70, vkCode: KEYCODE_DICT.VK_RSHIFT, keyText: "Fn2", isDisableChange: true, cssStyle: { width: 70 } }, { idx: 71, vkCode: KEYCODE_DICT.VK_RGB_BRIGHT1, keyText: "RGB Bright+" }],
    [{ idx: 72, vkCode: KEYCODE_DICT.VK_LCONTROL, keyText: "Left\nCtrl", cssStyle: { width: 50 } }, { idx: 73, vkCode: KEYCODE_DICT.VK_DISABLE_LGUI, keyText: "Diable Lgui", cssStyle: { width: 50 } }, { idx: 74, vkCode: KEYCODE_DICT.VK_LMENU, keyText: "Left\nAlt", cssStyle: { width: 50 } }, { idx: 75, vkCode: KEYCODE_DICT.VK_SPACE, keyText: "Space", cssStyle: { width: 280 } }, { idx: 76, vkCode: KEYCODE_DICT.VK_RMENU, keyText: "Right\nAlt", cssStyle: { width: 50 } }, { idx: 77, vkCode: KEYCODE_DICT.VK_FN, keyText: "Fn", cssStyle: { width: 50, marginRight: 30 } }, { idx: 78, vkCode: KEYCODE_DICT.VK_RGB_SPEED1, keyText: "RGB Speed-" }, { idx: 79, vkCode: KEYCODE_DICT.VK_RGB_BRIGHT0, keyText: "RGB Bright-" }, { idx: 80, vkCode: KEYCODE_DICT.VK_RGB_SPEED0, keyText: "RGB Speed+" }]
  ],
  keyMap2: [
    [{ idx: 0, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { marginRight: 16 } }, { idx: 1, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 2, vkCode: KEYCODE_DICT.VK_VOLUME_UP, keyText: "Vol+", isDisableChange: true }, { idx: 3, vkCode: KEYCODE_DICT.VK_VOLUME_DOWN, keyText: "Vol-", isDisableChange: true }, { idx: 4, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { marginRight: 16 } }, { idx: 5, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 6, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 7, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 8, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { marginRight: 16 } }, { idx: 9, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 10, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 11, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 12, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { marginRight: 16 } }, { idx: 13, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 14, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }],
    [{ idx: 15, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 16, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 17, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 18, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 19, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 20, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 21, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 22, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 23, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 24, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 25, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 26, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 27, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 28, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 85 } }, { idx: 29, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }],
    [{ idx: 30, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 62.5 } }, { idx: 31, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 32, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 33, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 34, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 35, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 36, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 37, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 38, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 39, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 40, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 41, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 42, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 43, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 62.5 } }, { idx: 44, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }],
    [{ idx: 45, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 75 } }, { idx: 46, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 47, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 48, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 49, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 50, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 51, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 52, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 53, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 54, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 55, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 56, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 57, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 95 } }, { idx: 58, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }],
    [{ idx: 59, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 100 } }, { idx: 60, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 61, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 62, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 63, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 64, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 65, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 66, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 67, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 68, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 69, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 70, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 70 } }, { idx: 71, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }],
    [{ idx: 72, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 50 } }, { idx: 73, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 50 } }, { idx: 74, vkCode: KEYCODE_DICT.VK_LMENU, keyText: "Fn3", isDisableChange: true, cssStyle: { width: 50 } }, { idx: 75, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 280 } }, { idx: 76, vkCode: KEYCODE_DICT.VK_RMENU, keyText: "Fn3", isDisableChange: true, cssStyle: { width: 50 } }, { idx: 77, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 50, marginRight: 30 } }, { idx: 78, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 79, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 80, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }]
  ],
  keyMap3: [
    [{ idx: 0, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { marginRight: 16 } }, { idx: 1, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 2, vkCode: KEYCODE_DICT.VK_VOLUME_UP, keyText: "Vol+", isDisableChange: true }, { idx: 3, vkCode: KEYCODE_DICT.VK_VOLUME_DOWN, keyText: "Vol-", isDisableChange: true }, { idx: 4, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { marginRight: 16 } }, { idx: 5, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 6, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 7, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 8, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { marginRight: 16 } }, { idx: 9, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 10, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 11, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 12, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { marginRight: 16 } }, { idx: 13, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 14, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }],
    [{ idx: 15, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 16, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 17, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 18, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 19, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 20, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 21, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 22, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 23, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 24, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 25, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 26, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 27, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 28, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 85 } }, { idx: 29, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }],
    [{ idx: 30, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 62.5 } }, { idx: 31, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 32, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 33, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 34, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 35, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 36, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 37, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 38, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 39, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 40, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 41, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 42, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 43, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 62.5 } }, { idx: 44, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }],
    [{ idx: 45, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 75 } }, { idx: 46, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 47, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 48, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 49, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 50, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 51, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 52, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 53, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 54, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 55, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 56, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 57, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 95 } }, { idx: 58, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }],
    [{ idx: 59, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 100 } }, { idx: 60, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 61, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 62, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 63, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 64, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 65, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 66, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 67, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 68, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 69, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 70, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 70 } }, { idx: 71, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }],
    [{ idx: 72, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 50 } }, { idx: 73, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 50 } }, { idx: 74, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 50 } }, { idx: 75, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 280 } }, { idx: 76, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 50 } }, { idx: 77, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 50, marginRight: 30 } }, { idx: 78, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 79, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 80, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }]
  ],
  rgbEffect: {
    lightOn: Boog75Constant.LIGHT_ON,
    lightEffect: Boog75Constant.LIGHT_EFFECT_DEFAULT,
    lightBrightness: Boog75Constant.LIGHT_BRIGHTNESS_DEFAULT,
    lightSpeed: Boog75Constant.LIGHT_SPEED_DEFAULT,
    currentLedColorIndex: 0,
    lightColor0: { hex: "#ffffff", rgb: { r: 255, g: 255, b: 255, a: 1 }, hsv: { h: 0, s: 0, v: 100, a: 1 } },
    lightColor1: { hex: "#ff0000", rgb: { r: 255, g: 0, b: 0, a: 1 }, hsv: { h: 0, s: 100, v: 100, a: 1 } },
    lightColor2: { hex: "#00ff00", rgb: { r: 0, g: 255, b: 0, a: 1 }, hsv: { h: 120, s: 100, v: 100, a: 1 } },
    lightColor3: { hex: "#0000ff", rgb: { r: 0, g: 0, b: 255, a: 1 }, hsv: { h: 240, s: 100, v: 100, a: 1 } },
    lightColor4: { hex: "#ffff00", rgb: { r: 255, g: 255, b: 0, a: 1 }, hsv: { h: 60, s: 100, v: 100, a: 1 } },
    lightColor5: { hex: "#ff00ff", rgb: { r: 255, g: 0, b: 255, a: 1 }, hsv: { h: 300, s: 100, v: 100, a: 1 } },
    lightColor6: { hex: "#00ffff", rgb: { r: 0, g: 255, b: 255, a: 1 }, hsv: { h: 180, s: 100, v: 100, a: 1 } },
  },
  sensitivity: Boog75Constant.RAPID_TRIGGER_DEFAULT,
  localSensitivity: Boog75Constant.RAPID_TRIGGER_DEFAULT,
  rapidTrigger: { make: 1, break: 1 },
  localRapidTrigger: { make: 1, break: 1 },
  macroList: [],
  advancedKeyList: []
}
const Boog75: React.FC = () => {
  const intl = useIntl()
  const currentLocale = intl.locale;
const productId=12175
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

  const colorBlockRef_0 = useRef<any>(null)
  const colorBlockRef_1 = useRef<any>(null)
  const colorBlockRef_2 = useRef<any>(null)
  const colorBlockRef_3 = useRef<any>(null)
  const colorBlockRef_4 = useRef<any>(null)
  const colorBlockRef_5 = useRef<any>(null)
  const colorBlockRef_6 = useRef<any>(null)
  const importProfileRef = useRef<any>(null)
  const advancedKeyPanelRef = useRef<any>(null)

  const [keyMap, setKeyMap]=useState<API.Keyboard.KeyObject[][]>([
    [{ idx: 0, vkCode: KEYCODE_DICT.VK_ESCAPE, keyText: "Esc", cssStyle: { marginRight: 16 } }, { idx: 1, vkCode: KEYCODE_DICT.VK_F1, keyText: "F1" }, { idx: 2, vkCode: KEYCODE_DICT.VK_F2, keyText: "F2" }, { idx: 3, vkCode: KEYCODE_DICT.VK_F3, keyText: "F3" }, { idx: 4, vkCode: KEYCODE_DICT.VK_F4, keyText: "F4", cssStyle: { marginRight: 16 } }, { idx: 5, vkCode: KEYCODE_DICT.VK_F5, keyText: "F5" }, { idx: 6, vkCode: KEYCODE_DICT.VK_F6, keyText: "F6" }, { idx: 7, vkCode: KEYCODE_DICT.VK_F7, keyText: "F7" }, { idx: 8, vkCode: KEYCODE_DICT.VK_F8, keyText: "F8", cssStyle: { marginRight: 16 } }, { idx: 9, vkCode: KEYCODE_DICT.VK_F9, keyText: "F9" }, { idx: 10, vkCode: KEYCODE_DICT.VK_F10, keyText: "F10" }, { idx: 11, vkCode: KEYCODE_DICT.VK_F11, keyText: "F11" }, { idx: 12, vkCode: KEYCODE_DICT.VK_F12, keyText: "F12", cssStyle: { marginRight: 16 } }, { idx: 13, vkCode: KEYCODE_DICT.VK_F13, keyText: "F13" }, { idx: 14, vkCode: KEYCODE_DICT.VK_HOME, keyText: "Home" }],
    [{ idx: 15, vkCode: KEYCODE_DICT.VK_OEM_3, keyText: "`" }, { idx: 16, vkCode: KEYCODE_DICT.VK_1, keyText: "1" }, { idx: 17, vkCode: KEYCODE_DICT.VK_2, keyText: "2" }, { idx: 18, vkCode: KEYCODE_DICT.VK_3, keyText: "3" }, { idx: 19, vkCode: KEYCODE_DICT.VK_4, keyText: "4" }, { idx: 20, vkCode: KEYCODE_DICT.VK_5, keyText: "5" }, { idx: 21, vkCode: KEYCODE_DICT.VK_6, keyText: "6" }, { idx: 22, vkCode: KEYCODE_DICT.VK_7, keyText: "7" }, { idx: 23, vkCode: KEYCODE_DICT.VK_8, keyText: "8" }, { idx: 24, vkCode: KEYCODE_DICT.VK_9, keyText: "9" }, { idx: 25, vkCode: KEYCODE_DICT.VK_0, keyText: "0" }, { idx: 26, vkCode: KEYCODE_DICT.VK_OEM_MINUS, keyText: "-" }, { idx: 27, vkCode: KEYCODE_DICT.VK_OEM_PLUS, keyText: "=" }, { idx: 28, vkCode: KEYCODE_DICT.VK_BACK, keyText: "Backspace", cssStyle: { width: 85 } }, { idx: 29, vkCode: KEYCODE_DICT.VK_DELETE, keyText: "Delete" }],
    [{ idx: 30, vkCode: KEYCODE_DICT.VK_TAB, keyText: "Tab", cssStyle: { width: 62.5 } }, { idx: 31, vkCode: KEYCODE_DICT.VK_Q, keyText: "Q" }, { idx: 32, vkCode: KEYCODE_DICT.VK_W, keyText: "W" }, { idx: 33, vkCode: KEYCODE_DICT.VK_E, keyText: "E" }, { idx: 34, vkCode: KEYCODE_DICT.VK_R, keyText: "R" }, { idx: 35, vkCode: KEYCODE_DICT.VK_T, keyText: "T" }, { idx: 36, vkCode: KEYCODE_DICT.VK_Y, keyText: "Y" }, { idx: 37, vkCode: KEYCODE_DICT.VK_U, keyText: "U" }, { idx: 38, vkCode: KEYCODE_DICT.VK_I, keyText: "I" }, { idx: 39, vkCode: KEYCODE_DICT.VK_O, keyText: "O" }, { idx: 40, vkCode: KEYCODE_DICT.VK_P, keyText: "P" }, { idx: 41, vkCode: KEYCODE_DICT.VK_OEM_4, keyText: "[" }, { idx: 42, vkCode: KEYCODE_DICT.VK_OEM_6, keyText: "]" }, { idx: 43, vkCode: KEYCODE_DICT.VK_OEM_5, keyText: "\\", cssStyle: { width: 62.5 } }, { idx: 44, vkCode: KEYCODE_DICT.VK_PRIOR, keyText: "Page\nUp" }],
    [{ idx: 45, vkCode: KEYCODE_DICT.VK_CAPITAL, keyText: "Caps\nLock", cssStyle: { width: 75 } }, { idx: 46, vkCode: KEYCODE_DICT.VK_A, keyText: "A" }, { idx: 47, vkCode: KEYCODE_DICT.VK_S, keyText: "S" }, { idx: 48, vkCode: KEYCODE_DICT.VK_D, keyText: "D" }, { idx: 49, vkCode: KEYCODE_DICT.VK_F, keyText: "F" }, { idx: 50, vkCode: KEYCODE_DICT.VK_G, keyText: "G" }, { idx: 51, vkCode: KEYCODE_DICT.VK_H, keyText: "H" }, { idx: 52, vkCode: KEYCODE_DICT.VK_J, keyText: "J" }, { idx: 53, vkCode: KEYCODE_DICT.VK_K, keyText: "K" }, { idx: 54, vkCode: KEYCODE_DICT.VK_L, keyText: "L" }, { idx: 55, vkCode: KEYCODE_DICT.VK_OEM_1, keyText: ";" }, { idx: 56, vkCode: KEYCODE_DICT.VK_OEM_7, keyText: "\'" }, { idx: 57, vkCode: KEYCODE_DICT.VK_RETURN, keyText: "Enter", cssStyle: { width: 95 } }, { idx: 58, vkCode: KEYCODE_DICT.VK_NEXT, keyText: "Page\nDown" }],
    [{ idx: 59, vkCode: KEYCODE_DICT.VK_LSHIFT, keyText: "Left Shift", cssStyle: { width: 100 } }, { idx: 60, vkCode: KEYCODE_DICT.VK_Z, keyText: "Z" }, { idx: 61, vkCode: KEYCODE_DICT.VK_X, keyText: "X" }, { idx: 62, vkCode: KEYCODE_DICT.VK_C, keyText: "C" }, { idx: 63, vkCode: KEYCODE_DICT.VK_V, keyText: "V" }, { idx: 64, vkCode: KEYCODE_DICT.VK_B, keyText: "B" }, { idx: 65, vkCode: KEYCODE_DICT.VK_N, keyText: "N" }, { idx: 66, vkCode: KEYCODE_DICT.VK_M, keyText: "M" }, { idx: 67, vkCode: KEYCODE_DICT.VK_OEM_COMMA, keyText: "," }, { idx: 68, vkCode: KEYCODE_DICT.VK_OEM_PERIOD, keyText: "." }, { idx: 69, vkCode: KEYCODE_DICT.VK_OEM_2, keyText: "/" }, { idx: 70, vkCode: KEYCODE_DICT.VK_RSHIFT, keyText: "Right Shift", cssStyle: { width: 70 } }, { idx: 71, vkCode: KEYCODE_DICT.VK_UP, keyText: "Up" }],
    [{ idx: 72, vkCode: KEYCODE_DICT.VK_LCONTROL, keyText: "Left\nCtrl", cssStyle: { width: 50 } }, { idx: 73, vkCode: KEYCODE_DICT.VK_LWIN, keyText: "Left\nOS", cssStyle: { width: 50 } }, { idx: 74, vkCode: KEYCODE_DICT.VK_LMENU, keyText: "Left\nAlt", cssStyle: { width: 50 } }, { idx: 75, vkCode: KEYCODE_DICT.VK_SPACE, keyText: "Space", cssStyle: { width: 280 } }, { idx: 76, vkCode: KEYCODE_DICT.VK_RMENU, keyText: "Right\nAlt", cssStyle: { width: 50 } }, { idx: 77, vkCode: KEYCODE_DICT.VK_FN, keyText: "Fn", cssStyle: { width: 50, marginRight: 30 } }, { idx: 78, vkCode: KEYCODE_DICT.VK_LEFT, keyText: "Left" }, { idx: 79, vkCode: KEYCODE_DICT.VK_DOWN, keyText: "Down" }, { idx: 80, vkCode: KEYCODE_DICT.VK_RIGHT, keyText: "Right" }]
  ])
  const [keyMap0, setKeyMap0]=useState<API.Keyboard.KeyObject[][]>([
    [{ idx: 0, vkCode: KEYCODE_DICT.VK_ESCAPE, keyText: "Esc", cssStyle: { marginRight: 16 } }, { idx: 1, vkCode: KEYCODE_DICT.VK_F1, keyText: "F1" }, { idx: 2, vkCode: KEYCODE_DICT.VK_F2, keyText: "F2" }, { idx: 3, vkCode: KEYCODE_DICT.VK_F3, keyText: "F3" }, { idx: 4, vkCode: KEYCODE_DICT.VK_F4, keyText: "F4", cssStyle: { marginRight: 16 } }, { idx: 5, vkCode: KEYCODE_DICT.VK_F5, keyText: "F5" }, { idx: 6, vkCode: KEYCODE_DICT.VK_F6, keyText: "F6" }, { idx: 7, vkCode: KEYCODE_DICT.VK_F7, keyText: "F7" }, { idx: 8, vkCode: KEYCODE_DICT.VK_F8, keyText: "F8", cssStyle: { marginRight: 16 } }, { idx: 9, vkCode: KEYCODE_DICT.VK_F9, keyText: "F9" }, { idx: 10, vkCode: KEYCODE_DICT.VK_F10, keyText: "F10" }, { idx: 11, vkCode: KEYCODE_DICT.VK_F11, keyText: "F11" }, { idx: 12, vkCode: KEYCODE_DICT.VK_F12, keyText: "F12", cssStyle: { marginRight: 16 } }, { idx: 13, vkCode: KEYCODE_DICT.VK_F13, keyText: "F13" }, { idx: 14, vkCode: KEYCODE_DICT.VK_HOME, keyText: "Home" }],
    [{ idx: 15, vkCode: KEYCODE_DICT.VK_OEM_3, keyText: "`" }, { idx: 16, vkCode: KEYCODE_DICT.VK_1, keyText: "1" }, { idx: 17, vkCode: KEYCODE_DICT.VK_2, keyText: "2" }, { idx: 18, vkCode: KEYCODE_DICT.VK_3, keyText: "3" }, { idx: 19, vkCode: KEYCODE_DICT.VK_4, keyText: "4" }, { idx: 20, vkCode: KEYCODE_DICT.VK_5, keyText: "5" }, { idx: 21, vkCode: KEYCODE_DICT.VK_6, keyText: "6" }, { idx: 22, vkCode: KEYCODE_DICT.VK_7, keyText: "7" }, { idx: 23, vkCode: KEYCODE_DICT.VK_8, keyText: "8" }, { idx: 24, vkCode: KEYCODE_DICT.VK_9, keyText: "9" }, { idx: 25, vkCode: KEYCODE_DICT.VK_0, keyText: "0" }, { idx: 26, vkCode: KEYCODE_DICT.VK_OEM_MINUS, keyText: "-" }, { idx: 27, vkCode: KEYCODE_DICT.VK_OEM_PLUS, keyText: "=" }, { idx: 28, vkCode: KEYCODE_DICT.VK_BACK, keyText: "Backspace", cssStyle: { width: 85 } }, { idx: 29, vkCode: KEYCODE_DICT.VK_DELETE, keyText: "Delete" }],
    [{ idx: 30, vkCode: KEYCODE_DICT.VK_TAB, keyText: "Tab", cssStyle: { width: 62.5 } }, { idx: 31, vkCode: KEYCODE_DICT.VK_Q, keyText: "Q" }, { idx: 32, vkCode: KEYCODE_DICT.VK_W, keyText: "W" }, { idx: 33, vkCode: KEYCODE_DICT.VK_E, keyText: "E" }, { idx: 34, vkCode: KEYCODE_DICT.VK_R, keyText: "R" }, { idx: 35, vkCode: KEYCODE_DICT.VK_T, keyText: "T" }, { idx: 36, vkCode: KEYCODE_DICT.VK_Y, keyText: "Y" }, { idx: 37, vkCode: KEYCODE_DICT.VK_U, keyText: "U" }, { idx: 38, vkCode: KEYCODE_DICT.VK_I, keyText: "I" }, { idx: 39, vkCode: KEYCODE_DICT.VK_O, keyText: "O" }, { idx: 40, vkCode: KEYCODE_DICT.VK_P, keyText: "P" }, { idx: 41, vkCode: KEYCODE_DICT.VK_OEM_4, keyText: "[" }, { idx: 42, vkCode: KEYCODE_DICT.VK_OEM_6, keyText: "]" }, { idx: 43, vkCode: KEYCODE_DICT.VK_OEM_5, keyText: "\\", cssStyle: { width: 62.5 } }, { idx: 44, vkCode: KEYCODE_DICT.VK_PRIOR, keyText: "Page\nUp" }],
    [{ idx: 45, vkCode: KEYCODE_DICT.VK_CAPITAL, keyText: "Caps\nLock", cssStyle: { width: 75 } }, { idx: 46, vkCode: KEYCODE_DICT.VK_A, keyText: "A" }, { idx: 47, vkCode: KEYCODE_DICT.VK_S, keyText: "S" }, { idx: 48, vkCode: KEYCODE_DICT.VK_D, keyText: "D" }, { idx: 49, vkCode: KEYCODE_DICT.VK_F, keyText: "F" }, { idx: 50, vkCode: KEYCODE_DICT.VK_G, keyText: "G" }, { idx: 51, vkCode: KEYCODE_DICT.VK_H, keyText: "H" }, { idx: 52, vkCode: KEYCODE_DICT.VK_J, keyText: "J" }, { idx: 53, vkCode: KEYCODE_DICT.VK_K, keyText: "K" }, { idx: 54, vkCode: KEYCODE_DICT.VK_L, keyText: "L" }, { idx: 55, vkCode: KEYCODE_DICT.VK_OEM_1, keyText: ";" }, { idx: 56, vkCode: KEYCODE_DICT.VK_OEM_7, keyText: "\'" }, { idx: 57, vkCode: KEYCODE_DICT.VK_RETURN, keyText: "Enter", cssStyle: { width: 95 } }, { idx: 58, vkCode: KEYCODE_DICT.VK_NEXT, keyText: "Page\nDown" }],
    [{ idx: 59, vkCode: KEYCODE_DICT.VK_LSHIFT, keyText: "Left Shift", cssStyle: { width: 100 } }, { idx: 60, vkCode: KEYCODE_DICT.VK_Z, keyText: "Z" }, { idx: 61, vkCode: KEYCODE_DICT.VK_X, keyText: "X" }, { idx: 62, vkCode: KEYCODE_DICT.VK_C, keyText: "C" }, { idx: 63, vkCode: KEYCODE_DICT.VK_V, keyText: "V" }, { idx: 64, vkCode: KEYCODE_DICT.VK_B, keyText: "B" }, { idx: 65, vkCode: KEYCODE_DICT.VK_N, keyText: "N" }, { idx: 66, vkCode: KEYCODE_DICT.VK_M, keyText: "M" }, { idx: 67, vkCode: KEYCODE_DICT.VK_OEM_COMMA, keyText: "," }, { idx: 68, vkCode: KEYCODE_DICT.VK_OEM_PERIOD, keyText: "." }, { idx: 69, vkCode: KEYCODE_DICT.VK_OEM_2, keyText: "/" }, { idx: 70, vkCode: KEYCODE_DICT.VK_RSHIFT, keyText: "Right Shift", cssStyle: { width: 70 } }, { idx: 71, vkCode: KEYCODE_DICT.VK_UP, keyText: "Up" }],
    [{ idx: 72, vkCode: KEYCODE_DICT.VK_LCONTROL, keyText: "Left\nCtrl", cssStyle: { width: 50 } }, { idx: 73, vkCode: KEYCODE_DICT.VK_LWIN, keyText: "Left\nOS", cssStyle: { width: 50 } }, { idx: 74, vkCode: KEYCODE_DICT.VK_LMENU, keyText: "Left\nAlt", cssStyle: { width: 50 } }, { idx: 75, vkCode: KEYCODE_DICT.VK_SPACE, keyText: "Space", cssStyle: { width: 280 } }, { idx: 76, vkCode: KEYCODE_DICT.VK_RMENU, keyText: "Right\nAlt", cssStyle: { width: 50 } }, { idx: 77, vkCode: KEYCODE_DICT.VK_FN, keyText: "Fn", cssStyle: { width: 50, marginRight: 30 } }, { idx: 78, vkCode: KEYCODE_DICT.VK_LEFT, keyText: "Left" }, { idx: 79, vkCode: KEYCODE_DICT.VK_DOWN, keyText: "Down" }, { idx: 80, vkCode: KEYCODE_DICT.VK_RIGHT, keyText: "Right" }]
  ])
  const [keyMap1, setKeyMap1]=useState<API.Keyboard.KeyObject[][]>([
    [{ idx: 0, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "Reset", isDisableChange: true, cssStyle: { marginRight: 16 } }, { idx: 1, vkCode: KEYCODE_DICT.VK_CALL_MUTE, keyText: "Call Mute" }, { idx: 2, vkCode: KEYCODE_DICT.VK_VOLUME_UP, keyText: "Vol+", isDisableChange: true }, { idx: 3, vkCode: KEYCODE_DICT.VK_VOLUME_DOWN, keyText: "Vol-", isDisableChange: true }, { idx: 4, vkCode: KEYCODE_DICT.VK_VOLUME_MUTE, keyText: "Vol Mute", cssStyle: { marginRight: 16 } }, { idx: 5, vkCode: KEYCODE_DICT.VK_MEDIA_PREV_TRACK, keyText: "Prev Track" }, { idx: 6, vkCode: KEYCODE_DICT.VK_MEDIA_PLAY_PAUSE, keyText: "Play\nPause" }, { idx: 7, vkCode: KEYCODE_DICT.VK_MEDIA_NEXT_TRACK, keyText: "Next Track" }, { idx: 8, vkCode: KEYCODE_DICT.VK_MEDIA_STOP, keyText: "Media Stop", cssStyle: { marginRight: 16 } }, { idx: 9, vkCode: KEYCODE_DICT.VK_BROWSER_HOME, keyText: "IE\n Home" }, { idx: 10, vkCode: KEYCODE_DICT.VK_MY_COMPUTER, keyText: "My\nPC" }, { idx: 11, vkCode: KEYCODE_DICT.VK_CALCULATOR, keyText: "Calcu\nlator" }, { idx: 12, vkCode: KEYCODE_DICT.VK_BROWSER_SEARCH, keyText: "IE\nSearch", cssStyle: { marginRight: 16 } }, { idx: 13, vkCode: KEYCODE_DICT.VK_F13, keyText: "F13" }, { idx: 14, vkCode: KEYCODE_DICT.VK_END, keyText: "End" }],
    [{ idx: 15, vkCode: KEYCODE_DICT.VK_OEM_3, keyText: "`" }, { idx: 16, vkCode: KEYCODE_DICT.VK_1, keyText: "1" }, { idx: 17, vkCode: KEYCODE_DICT.VK_2, keyText: "2" }, { idx: 18, vkCode: KEYCODE_DICT.VK_3, keyText: "3" }, { idx: 19, vkCode: KEYCODE_DICT.VK_4, keyText: "4" }, { idx: 20, vkCode: KEYCODE_DICT.VK_5, keyText: "5" }, { idx: 21, vkCode: KEYCODE_DICT.VK_6, keyText: "6" }, { idx: 22, vkCode: KEYCODE_DICT.VK_7, keyText: "7" }, { idx: 23, vkCode: KEYCODE_DICT.VK_8, keyText: "8" }, { idx: 24, vkCode: KEYCODE_DICT.VK_9, keyText: "9" }, { idx: 25, vkCode: KEYCODE_DICT.VK_0, keyText: "0" }, { idx: 26, vkCode: KEYCODE_DICT.VK_OEM_MINUS, keyText: "-" }, { idx: 27, vkCode: KEYCODE_DICT.VK_OEM_PLUS, keyText: "=" }, { idx: 28, vkCode: KEYCODE_DICT.VK_BACK, keyText: "Backspace", cssStyle: { width: 85 } }, { idx: 29, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "Insert" }],
    [{ idx: 30, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "RT", cssStyle: { width: 62.5 } }, { idx: 31, vkCode: KEYCODE_DICT.VK_Q, keyText: "Q" }, { idx: 32, vkCode: KEYCODE_DICT.VK_W, keyText: "W" }, { idx: 33, vkCode: KEYCODE_DICT.VK_E, keyText: "E" }, { idx: 34, vkCode: KEYCODE_DICT.VK_R, keyText: "R" }, { idx: 35, vkCode: KEYCODE_DICT.VK_T, keyText: "T" }, { idx: 36, vkCode: KEYCODE_DICT.VK_Y, keyText: "Y" }, { idx: 37, vkCode: KEYCODE_DICT.VK_U, keyText: "U" }, { idx: 38, vkCode: KEYCODE_DICT.VK_I, keyText: "I" }, { idx: 39, vkCode: KEYCODE_DICT.VK_O, keyText: "O" }, { idx: 40, vkCode: KEYCODE_DICT.VK_P, keyText: "P" }, { idx: 41, vkCode: KEYCODE_DICT.VK_RGB_Color, keyText: "RGB Color" }, { idx: 42, vkCode: KEYCODE_DICT.VK_RGB_Effect, keyText: "RGB Effect" }, { idx: 43, vkCode: KEYCODE_DICT.VK_RGB_SWITH, keyText: "RGB Switch", cssStyle: { width: 62.5 } }, { idx: 44, vkCode: KEYCODE_DICT.VK_PRIOR, keyText: "Page\nUp" }],
    [{ idx: 45, vkCode: KEYCODE_DICT.VK_CAPITAL, keyText: "Caps\nLock", cssStyle: { width: 75 } }, { idx: 46, vkCode: KEYCODE_DICT.VK_A, keyText: "A" }, { idx: 47, vkCode: KEYCODE_DICT.VK_S, keyText: "S" }, { idx: 48, vkCode: KEYCODE_DICT.VK_D, keyText: "D" }, { idx: 49, vkCode: KEYCODE_DICT.VK_F, keyText: "F" }, { idx: 50, vkCode: KEYCODE_DICT.VK_G, keyText: "G" }, { idx: 51, vkCode: KEYCODE_DICT.VK_H, keyText: "H" }, { idx: 52, vkCode: KEYCODE_DICT.VK_J, keyText: "J" }, { idx: 53, vkCode: KEYCODE_DICT.VK_K, keyText: "K" }, { idx: 54, vkCode: KEYCODE_DICT.VK_L, keyText: "L" }, { idx: 55, vkCode: KEYCODE_DICT.VK_OEM_1, keyText: ";" }, { idx: 56, vkCode: KEYCODE_DICT.VK_OEM_7, keyText: "\'" }, { idx: 57, vkCode: KEYCODE_DICT.VK_RETURN, keyText: "Enter", cssStyle: { width: 95 } }, { idx: 58, vkCode: KEYCODE_DICT.VK_NEXT, keyText: "Page\nDown" }],
    [{ idx: 59, vkCode: KEYCODE_DICT.VK_LSHIFT, keyText: "Fn2", isDisableChange: true, cssStyle: { width: 100 } }, { idx: 60, vkCode: KEYCODE_DICT.VK_Z, keyText: "Z" }, { idx: 61, vkCode: KEYCODE_DICT.VK_X, keyText: "X" }, { idx: 62, vkCode: KEYCODE_DICT.VK_C, keyText: "C" }, { idx: 63, vkCode: KEYCODE_DICT.VK_V, keyText: "V" }, { idx: 64, vkCode: KEYCODE_DICT.VK_B, keyText: "B" }, { idx: 65, vkCode: KEYCODE_DICT.VK_N, keyText: "N" }, { idx: 66, vkCode: KEYCODE_DICT.VK_M, keyText: "M" }, { idx: 67, vkCode: KEYCODE_DICT.VK_OEM_COMMA, keyText: "," }, { idx: 68, vkCode: KEYCODE_DICT.VK_OEM_PERIOD, keyText: "." }, { idx: 69, vkCode: KEYCODE_DICT.VK_OEM_2, keyText: "/" }, { idx: 70, vkCode: KEYCODE_DICT.VK_RSHIFT, keyText: "Fn2", isDisableChange: true, cssStyle: { width: 70 } }, { idx: 71, vkCode: KEYCODE_DICT.VK_RGB_BRIGHT1, keyText: "RGB Bright+" }],
    [{ idx: 72, vkCode: KEYCODE_DICT.VK_LCONTROL, keyText: "Left\nCtrl", cssStyle: { width: 50 } }, { idx: 73, vkCode: KEYCODE_DICT.VK_DISABLE_LGUI, keyText: "Diable Lgui", cssStyle: { width: 50 } }, { idx: 74, vkCode: KEYCODE_DICT.VK_LMENU, keyText: "Left\nAlt", cssStyle: { width: 50 } }, { idx: 75, vkCode: KEYCODE_DICT.VK_SPACE, keyText: "Space", cssStyle: { width: 280 } }, { idx: 76, vkCode: KEYCODE_DICT.VK_RMENU, keyText: "Right\nAlt", cssStyle: { width: 50 } }, { idx: 77, vkCode: KEYCODE_DICT.VK_FN, keyText: "Fn", cssStyle: { width: 50, marginRight: 30 } }, { idx: 78, vkCode: KEYCODE_DICT.VK_RGB_SPEED1, keyText: "RGB Speed-" }, { idx: 79, vkCode: KEYCODE_DICT.VK_RGB_BRIGHT0, keyText: "RGB Bright-" }, { idx: 80, vkCode: KEYCODE_DICT.VK_RGB_SPEED0, keyText: "RGB Speed+" }]
  ])
  const [keyMap2, setKeyMap2]=useState<API.Keyboard.KeyObject[][]>([
    [{ idx: 0, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { marginRight: 16 } }, { idx: 1, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 2, vkCode: KEYCODE_DICT.VK_VOLUME_UP, keyText: "Vol+", isDisableChange: true }, { idx: 3, vkCode: KEYCODE_DICT.VK_VOLUME_DOWN, keyText: "Vol-", isDisableChange: true }, { idx: 4, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { marginRight: 16 } }, { idx: 5, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 6, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 7, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 8, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { marginRight: 16 } }, { idx: 9, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 10, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 11, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 12, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { marginRight: 16 } }, { idx: 13, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 14, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }],
    [{ idx: 15, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 16, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 17, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 18, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 19, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 20, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 21, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 22, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 23, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 24, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 25, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 26, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 27, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 28, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 85 } }, { idx: 29, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }],
    [{ idx: 30, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 62.5 } }, { idx: 31, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 32, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 33, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 34, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 35, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 36, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 37, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 38, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 39, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 40, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 41, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 42, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 43, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 62.5 } }, { idx: 44, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }],
    [{ idx: 45, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 75 } }, { idx: 46, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 47, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 48, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 49, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 50, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 51, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 52, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 53, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 54, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 55, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 56, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 57, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 95 } }, { idx: 58, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }],
    [{ idx: 59, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 100 } }, { idx: 60, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 61, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 62, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 63, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 64, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 65, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 66, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 67, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 68, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 69, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 70, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 70 } }, { idx: 71, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }],
    [{ idx: 72, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 50 } }, { idx: 73, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 50 } }, { idx: 74, vkCode: KEYCODE_DICT.VK_LMENU, keyText: "Fn3", isDisableChange: true, cssStyle: { width: 50 } }, { idx: 75, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 280 } }, { idx: 76, vkCode: KEYCODE_DICT.VK_RMENU, keyText: "Fn3", isDisableChange: true, cssStyle: { width: 50 } }, { idx: 77, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 50, marginRight: 30 } }, { idx: 78, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 79, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 80, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }]
  ])
  const [keyMap3, setKeyMap3]=useState<API.Keyboard.KeyObject[][]>([
    [{ idx: 0, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { marginRight: 16 } }, { idx: 1, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 2, vkCode: KEYCODE_DICT.VK_VOLUME_UP, keyText: "Vol+", isDisableChange: true }, { idx: 3, vkCode: KEYCODE_DICT.VK_VOLUME_DOWN, keyText: "Vol-", isDisableChange: true }, { idx: 4, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { marginRight: 16 } }, { idx: 5, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 6, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 7, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 8, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { marginRight: 16 } }, { idx: 9, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 10, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 11, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 12, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { marginRight: 16 } }, { idx: 13, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 14, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }],
    [{ idx: 15, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 16, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 17, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 18, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 19, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 20, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 21, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 22, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 23, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 24, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 25, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 26, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 27, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 28, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 85 } }, { idx: 29, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }],
    [{ idx: 30, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 62.5 } }, { idx: 31, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 32, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 33, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 34, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 35, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 36, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 37, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 38, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 39, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 40, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 41, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 42, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 43, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 62.5 } }, { idx: 44, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }],
    [{ idx: 45, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 75 } }, { idx: 46, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 47, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 48, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 49, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 50, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 51, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 52, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 53, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 54, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 55, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 56, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 57, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 95 } }, { idx: 58, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }],
    [{ idx: 59, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 100 } }, { idx: 60, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 61, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 62, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 63, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 64, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 65, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 66, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 67, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 68, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 69, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 70, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 70 } }, { idx: 71, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }],
    [{ idx: 72, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 50 } }, { idx: 73, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 50 } }, { idx: 74, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 50 } }, { idx: 75, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 280 } }, { idx: 76, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 50 } }, { idx: 77, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "", cssStyle: { width: 50, marginRight: 30 } }, { idx: 78, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 79, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }, { idx: 80, vkCode: KEYCODE_DICT.VK_EMPTY, keyText: "" }]
  ])
   
  const [showAlert, setShowAlert] = useState({ alert: false, alertTitle: "", alertText: "", severity: 'warning' })
  const [showAlert2, setShowAlert2] = useState({ alert: false, alertTitle: "", alertText: "", severity: 'warning' })
  const [showLoading, setShowLoading] = useState<boolean>(false)
  const [isConnected, setIsConnected] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState<any>(null)
  const [color, setColor] = useState<API.Keyboard.Color>({ hex: "#ffffff", rgb: { r: 255, g: 255, b: 255, a: 1 }, hsv: { h: 0, s: 0, v: 100, a: 1 } })
  const [color_0, setColor_0] = useState<API.Keyboard.Color>({ hex: "#ffffff", rgb: { r: 255, g: 255, b: 255, a: 1 }, hsv: { h: 0, s: 0, v: 100, a: 1 } })
  const [color_1, setColor_1] = useState<API.Keyboard.Color>({ hex: "#ff0000", rgb: { r: 255, g: 0, b: 0, a: 1 }, hsv: { h: 0, s: 100, v: 100, a: 1 } })
  const [color_2, setColor_2] = useState<API.Keyboard.Color>({ hex: "#00ff00", rgb: { r: 0, g: 255, b: 0, a: 1 }, hsv: { h: 120, s: 100, v: 100, a: 1 } })
  const [color_3, setColor_3] = useState<API.Keyboard.Color>({ hex: "#0000ff", rgb: { r: 0, g: 0, b: 255, a: 1 }, hsv: { h: 240, s: 100, v: 100, a: 1 } })
  const [color_4, setColor_4] = useState<API.Keyboard.Color>({ hex: "#ffff00", rgb: { r: 255, g: 255, b: 0, a: 1 }, hsv: { h: 60, s: 100, v: 100, a: 1 } })
  const [color_5, setColor_5] = useState<API.Keyboard.Color>({ hex: "#ff00ff", rgb: { r: 255, g: 0, b: 255, a: 1 }, hsv: { h: 300, s: 100, v: 100, a: 1 } })
  const [color_6, setColor_6] = useState<API.Keyboard.Color>({ hex: "#00ffff", rgb: { r: 0, g: 255, b: 255, a: 1 }, hsv: { h: 180, s: 100, v: 100, a: 1 } })
  const [bottomNavigation, setBottomNavigation] = useState<number>(0)
  const [lightOn, setLightOn] = useState<number>(Boog75Constant.LIGHT_ON)
  const [lightEffect, setLightEffet] = useState<number>(Boog75Constant.LIGHT_EFFECT_DEFAULT)
  const [lightBrightness, setLightBrightness] = useState<number>(Boog75Constant.LIGHT_BRIGHTNESS_DEFAULT)
  const [lightSpeed, setLightSpeed] = useState<number>(Boog75Constant.LIGHT_SPEED_DEFAULT)
  const [currentLedColorIndex, setCurrentLedColorIndex] = useState<number>(0)
  const [dataChangeFlag, setDataChangeFlag] = useState<number>(0)
  const [sensitivity, setSensitivity] = useState<number>(Boog75Constant.RAPID_TRIGGER_DEFAULT)
  const [localSensitivity, setLocalSensitivity] = useState<number>(Boog75Constant.RAPID_TRIGGER_DEFAULT)
  const [realSensitivity, setRealSensitivity] = useState<number>(Boog75Constant.RAPID_TRIGGER_DEFAULT)
  const [localRealSensitivity, setLocalRealSensitivity] = useState<number>(Boog75Constant.RAPID_TRIGGER_DEFAULT)
  const [rapidTrigger, setRapidTrigger] = useState<API.Keyboard.RapidTrigger>({ make: 1, break: 1 })
  const [localRapidTrigger, setLocalRapidTrigger] = useState<API.Keyboard.RapidTrigger>({ make: 1, break: 1 })
  const [ableSelectKey, setAbleSelectKey] = useState<boolean>(false)
  const [isAdvanceRT, setIsAdvanceRT] = useState<boolean>(false)
  const [digitalProfile, setDigitalProfile] = useState<API.Keyboard.Profile>({ id: 0, text: intl.formatMessage({ id: "index.digitalProfile" }), keyboardJson: DEFAULT_KEYBOARD_JSON })
  const [selectedProfile, setSelectedProfile] = useState<API.Keyboard.Profile>({ id: 0, text: intl.formatMessage({ id: "index.digitalProfile" }), keyboardJson: DEFAULT_KEYBOARD_JSON })
  const [profileList, setProfileList] = useState<Array<API.Keyboard.Profile>>([{ id: 1, text: "1", keyboardJson: DEFAULT_KEYBOARD_JSON }])
  const [selectedKeyIndexArr, setSelectedKeyIndexArr] = useState<Set<number>>(new Set([]))
  const [alertDialogOpen0, setAlertDialogOpen0] = useState(false)
  const [alertDialogOpen1, setAlertDialogOpen1] = useState(false)
  const [alertDialogOpen2, setAlertDialogOpen2] = useState(false)
  const [openRSTip, setOpenRSTip] = useState(false)
  const [locale, setLocale] = useState('en')
  const [profileOperateAnchorEl, setProfileOperateAnchorEl] = React.useState<null | HTMLElement>(null)
  const [macroList, setMacroList] = useState<Array<API.Keyboard.Macro>>([])
  const [zoom, setZoom] = useState(1)
  const [screenSize, setScreenSize] = useState(SCREEN_SIZE.MIDDLE)
  const [macroId, setMarcoId] = useState(0)
  const [advancedKeyList, setAdvancedKeyList] = useState<Array<API.Keyboard.AdvancedKey>>([])
  const [layer, setLayer] = useState(0)
  const [profileId, setProfileId] = useState(0)
  const [showVersion, setShowVersion] = useState(false)
  const [showRename, setShowRename] = useState(false)
  const [rename, setRename] = useState('')
  const [renameId, setRenameId] = useState(-1)
  const [renameerroFlag, setRenameerroFlag] = useState(false)
  const [renameerro, setRenameerro] = useState('')
  const [deviceVersion, setDeviceVersion] = useState('V1')
  const [protocolVersion, setProtocolVersion] = useState("V1")
  const [mcu2Version, setMcu2Version] = useState('V1')


  const isDarkMode = theme.palette.mode === 'dark';
  const openProfileOperate = Boolean(profileOperateAnchorEl)

  let rapidTriggerBuffer: Array<number> = [];
  let renderKeyMapBuffer: API.Keyboard.KeyObject[][] = DEFAULT_KEYBOARD_JSON.keyMap;
  let renderMarcoDataArr: Array<any> = []
  let localMacroId = 0


  useEffect(() => {
    const json = localStorage.getItem("keyboardJsonBoog752_2");
    if (json) {
      const keyboardJson = JSON.parse(json)
      keyboardJson && handleSetKeyboardJson(keyboardJson)

      setSensitivity(keyboardJson.sensitivity)//全部灵敏度设置
      setRealSensitivity(SENSITIVITY_ARR[keyboardJson.sensitivity - 1])
    }
    const json1 = localStorage.getItem("profileListBoo752_2");
    if (json1) {
      const profileList2 = JSON.parse(json1)
      profileList2 && setProfileList(profileList2)
    }

    handleAutoZoom()
    handleOnLoad()
  }, [])
  useEffect(() => {
    window.addEventListener("resize", handleAutoZoom)
    //window.addEventListener('beforeunload', handleSaveStorage);
    window.addEventListener("beforeunload", handleSaveStorage);
    return () => {
      window.removeEventListener("resize", handleAutoZoom)
      window.removeEventListener("beforeunload", handleSaveStorage)
    }
  })

  useEffect(() => {
    setIsConnected(selectedDevice != null)
    selectedDevice && handleConnectedInit()
  }, [selectedDevice])
  useEffect(() => {
    if (bottomNavigation === 1) {
      const rgbEffect = {
        lightOn: lightOn,
        lightEffect: lightEffect,
        lightBrightness: lightBrightness,
        lightSpeed: lightSpeed,
        currentLedColorIndex: currentLedColorIndex,
        lightColor0: color_0,
        lightColor1: color_1,
        lightColor2: color_2,
        lightColor3: color_3,
        lightColor4: color_4,
        lightColor5: color_5,
        lightColor6: color_6
      }
      handleSetRGBColorData(rgbEffect)
    }
  }, [lightOn, lightEffect, lightBrightness, lightSpeed])
  useEffect(() => {
    if (currentLocale === 'en') {
      setLocale('zh-CN')
    } else {
      setLocale('en')
    }
  }, [currentLocale])
  useEffect(() => {
    if (selectedDevice) {
      handleGetMacroData(macroId)
    }
  }, [macroId])
  useEffect(() => {
    // alert('dd='+keyMap[0][0].keyText)
 
    if(selectedProfile.id!==0){
      const keyboardJson = handleGetKeyboardJson()
     // alert(profileList.length)
    const newProfileList = profileList.map((item, index) => {
      if (item.id === selectedProfile.id) {
        return { ...item, keyboardJson: keyboardJson }
      } else {
        return item
      }
    })
    setProfileList(newProfileList)
    for(let i=0;i<newProfileList.length;i++){
      if(selectedProfile.id===newProfileList[i].id){
      setSensitivity(newProfileList[i].keyboardJson.sensitivity)//全部灵敏度设置
      setRealSensitivity(SENSITIVITY_ARR[newProfileList[i].keyboardJson.sensitivity - 1])
      break;
      }
    }
    
  }
  }, [keyMap])

  const listener = e => {
    e.preventDefault();
  //alert(keyMap[0][0].keyText)
    let t=keyMap[0][0].keyText
    handleSaveStorage()
    e.returnValue = '离开当前页后，所编辑的数据将不可恢复'+t // 浏览器有可能不会提示这个信息，会按照固定信息提示
   // handleSaveStorage()
}
 
// ....
  const handleAutoZoom = () => {
    console.log(777)
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
   // const zoomVal = parseFloat((document.body.style as any).zoom) || 1;
    const zoomVal =1
    setZoom(zoomVal);
    setScreenSize(SCREEN_SIZE.MIDDLE)
    //alert(screenWidth)
    //alert(screenHeight)
    // if (screenWidth === 2048) {
    //   setZoom(zoomVal+0.1);
    //   setScreenSize(SCREEN_SIZE.LARGE)
    // }
    if (screenWidth > 2560) {
        setZoom(zoomVal + 0.4);
        setScreenSize(SCREEN_SIZE.LARGE)
      } else if (screenWidth > 2048 && screenWidth <= 2560) {
        setZoom(zoomVal + 0.2);
        setScreenSize(SCREEN_SIZE.LARGE)
      }
      else if (screenWidth > 1920 && screenWidth <= 2048) {
        setZoom(zoomVal + 0.1);
        setScreenSize(SCREEN_SIZE.LARGE)
      }
      else if (screenWidth > 1512 && screenWidth <= 1920) {
        setZoom(zoomVal);
        setScreenSize(SCREEN_SIZE.MIDDLE)
      }
      else if (screenWidth > 1280 && screenWidth <= 1512) {
        setZoom(zoomVal - 0.1 );
        setScreenSize(SCREEN_SIZE.SMALL)
      }
     else if (screenWidth <= 1280 ) {
       setZoom(zoomVal - 0.25);
       setScreenSize(SCREEN_SIZE.SMALL)
      } 
    // if (screenWidth === 1920 || screenHeight === 1080) {
    //   setZoom(zoomVal);
    //   setScreenSize(SCREEN_SIZE.MIDDLE)
    // } else if (screenWidth <= 1440 || screenHeight <= 900) {
    //  // setZoom(zoomVal - 0.25);
    // //  setScreenSize(SCREEN_SIZE.SMALL)
    // } else if (screenWidth <= 1280 || screenHeight <= 800) {
    //  // setZoom(zoomVal - 0.2);
    //  // setScreenSize(SCREEN_SIZE.SMALL)
    // } else if (screenWidth >= 2560 || screenHeight >= 1440) {
    //  // setZoom(zoomVal + 0.4);
    //   //setScreenSize(SCREEN_SIZE.LARGE)
    // } else if (screenWidth >= 1920 || screenHeight >= 1080) {
    //  // setZoom(zoomVal + 0.2);
    //   //setScreenSize(SCREEN_SIZE.LARGE)
    // }
  }

  const handleSaveStorage = () => {  
    //console.log(6666)
    const keyboardJson = handleGetKeyboardJson()
    // console.log(keyMap[0][0].keyText)
    // console.log(selectedProfile.id)
    // const newProfileList = profileList.map((item, index) => {
    //   if (item.id === selectedProfile.id) {
    //     return { ...item, keyboardJson: keyboardJson }
    //   } else {
    //     return item
    //   }
    // })
    // setProfileList(newProfileList)
    localStorage.setItem("keyboardJsonBoog752_2", JSON.stringify(keyboardJson))
    localStorage.setItem("profileListBoo752_2", JSON.stringify(profileList))   
  }

  const handleShowVersion = () => {
    setShowVersion(true)
  }
  const handleCloseVersion = () => {
    setShowVersion(false)
  }

  const handleChangeBottomNavigation = (newValue: number) => {
    setBottomNavigation(newValue)
    layer > 0 && handleChangeLayer(0)
  }

  const handleChangeColor = (color: API.Keyboard.Color) => {
    setColor(color)
    switch (currentLedColorIndex) {
      case 0:
        setColor_0(color)
        break;
      case 1:
        setColor_1(color)
        break;
      case 2:
        setColor_2(color)
        break;
      case 3:
        setColor_3(color)
        break;
      case 4:
        setColor_4(color)
        break;
      case 5:
        setColor_5(color)
        break;
      case 6:
        setColor_6(color)
        break;
    }
  }

  const handleChangeShade = (v: number) => {
    const hsv = { ...color.hsv, v: v }
    const rgba = hsvaToRgba(hsv);
    const hex = rgbaToHexa({ r: rgba.r, g: rgba.g, b: rgba.b, a: rgba.a });
    const newColor = { hex: hex, rgb: rgba, hsv: hsv };
    setColor(newColor)
    switch (currentLedColorIndex) {
      case 0:
        setColor_0(newColor)
        break;
      case 1:
        setColor_1(newColor)
        break;
      case 2:
        setColor_2(newColor)
        break;
      case 3:
        setColor_3(newColor)
        break;
      case 4:
        setColor_4(newColor)
        break;
      case 5:
        setColor_5(newColor)
        break;
      case 6:
        setColor_6(newColor)
        break;
    }
  }

  const handleChangeHex = (val: string) => {
    const hsv = hexToHsva(val)
    const rgba = hexToRgba(val);
    const newColor = { hex: val, rgb: rgba, hsv: hsv };
    setColor(newColor)
    switch (currentLedColorIndex) {
      case 0:
        setColor_0(newColor)
        break;
      case 1:
        setColor_1(newColor)
        break;
      case 2:
        setColor_2(newColor)
        break;
      case 3:
        setColor_3(newColor)
        break;
      case 4:
        setColor_4(newColor)
        break;
      case 5:
        setColor_5(newColor)
        break;
      case 6:
        setColor_6(newColor)
        break;
    }
  }

  const handleRGBSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const lightOn = event.target.checked ? Boog75Constant.LIGHT_ON : Boog75Constant.LIGHT_OFF;
    setLightOn(lightOn);
  };

  const handleCancleSelectedColor = (val: number) => {
    setCurrentLedColorIndex(val)
    switch (val) {
      case 0:
        setColor(color_0)
        break;
      case 1:
        setColor(color_1)
        break;
      case 2:
        setColor(color_2)
        break;
      case 3:
        setColor(color_3)
        break;
      case 4:
        setColor(color_4)
        break;
      case 5:
        setColor(color_5)
        break;
      case 6:
        setColor(color_6)
        break;
    }
  }

  const handleLightEffetChange = (index: number) => {
    setLightEffet(index)
  }

  const handleLightSpeedChange = (speed: number) => {
    setLightSpeed(speed)
  }

  const handleLightBrightnessChange = (brightness: number) => {
    setLightBrightness(brightness)
  }

  const handleKeyChange = (layer: number, keyIndex: number, keyText: string, vkCode: number, macroId: number, rgb?: API.Keyboard.Rgb) => {
    const newKeyMap = keyMap.map(col => col.map(k => {
      if (k.idx === keyIndex) {
        let isMacro = false
        if (vkCode === KEYCODE_DICT.VK_MACRO) {
          isMacro = true
        }
        return { ...k, keyText: keyText, rgb: rgb, vkCode: vkCode, macroId: macroId, isMacro: isMacro }
      } else {
        return k
      }
    }))
    handleSetKeyMap(newKeyMap)
   
    //alert(keyMap[0][0].keyText)
    if (layer === 0) {
    //保存
      setKeyBottonDataHandler(newKeyMap)
      //保存缓存
      //alert(selectedProfile.keyboardJson)

      // const keyboardJson = handleGetKeyboardJson()
      // const newProfileList = profileList.map((item, index) => {
      //   if (item.id === selectedProfile.id) {
      //     return { ...item, keyboardJson: keyboardJson }
      //   } else {
      //     return item
      //   }
      // })
      // setProfileList(newProfileList)
    }
    if (layer > 0) {
      handleSetLayerKeyButton(layer, keyIndex, vkCode, macroId)
    }
  }
  //snap
  const handleKeyChangeHight = (layer: number, keyIndex: number|undefined, isHightSelected:boolean) => {
    //alert(layer)
    //BottomNavigation)
    setAbleSelectKey(true)
    //alert(ableSelectKey)
    const newKeyMap = keyMap.map(col => col.map(k => {
    
      if (k.idx === keyIndex) {
       
        // let isMacro = false
        // if (vkCode === KEYCODE_DICT.VK_MACRO) {
        //   isMacro = true
        // }
        return { ...k, isHightSelected:true }
      } else {
        return { ...k, isHightSelected:false }
        //return k
      }
    }))
    handleSetKeyMap(newKeyMap)
    if (layer === 0) {
      setKeyBottonDataHandler(newKeyMap)
    }
    // if (layer > 0) {
    //   handleSetLayerKeyButton(layer, keyIndex, vkCode, macroId)
    // }
  }
  //snap
  const handleKeyChangeHightMore = (layer: number, keyIndex: string|undefined, isHightSelected:boolean) => {
    //alert(layer)
    //BottomNavigation)
    setAbleSelectKey(true)
    if(keyIndex){
    const newKeyMap = keyMap.map(col => col.map(k => {
    
      if (keyIndex?.indexOf(','+k.idx+',')>-1) {
       
        // let isMacro = false
        // if (vkCode === KEYCODE_DICT.VK_MACRO) {
        //   isMacro = true
        // }
        return { ...k, isHightSelected:true }
      } else {
        return { ...k, isHightSelected:false }
        //return k
      }
    }))
    handleSetKeyMap(newKeyMap)
    if (layer === 0) {
      setKeyBottonDataHandler(newKeyMap)
    }
  }
    // if (layer > 0) {
    //   handleSetLayerKeyButton(layer, keyIndex, vkCode, macroId)
    // }
  }
  const handleSelectd = (keyIndex: number, isSelected: boolean) => {
    const newKeyMap = keyMap.map(col => col.map(k => {
      if (k.idx === keyIndex) {
        return { ...k, isSelected: isSelected }
      } else {
        return k
      }
    }))
    handleSetKeyMap(newKeyMap)
  }
  const handleCurrentAdvancedKey=()=>{
     
  }
  const handleAdvance=(id:number|undefined)=>{
    //alert('handleAdvance='+id)
    if(id)
    setCurrentAdvancedKeyIndex(id)
   }
  
//  let [AdvancedKeyId, SetAdvancedKeyId] = useState(-1)

  const handleSelectdRT = (keyIndex: number, isSelected: boolean,advancedKeyId1:number|undefined) => {
//把rs的值改变，只能是2个
const currentAdvancedKeyIndex=advancedKeyPanelRef.current.currentAdvancedKey.id;
//alert('currentAdvancedKeyIndex='+advancedKeyPanelRef.current.currentAdvancedKey.id)

// alert('keyIndex='+keyIndex)
// let keyindex=-1;
// let newAdvancedKey1: API.Keyboard.AdvancedKey
// advancedKeyList.forEach(element => {
//   if(element.id===currentAdvancedKeyIndex&&element.keyIndex!=-1){
//      newAdvancedKey1=element
//      //keyindex=element.keyIndex
//      return
//   }
// })
// const newAdvancedKey: API.Keyboard.AdvancedKey = { id: currentAdvancedKeyIndex, type: 'RS', keyIndex: 1, vkCode: 112, keyText: 'F1',rsAction:'r' }
//     newAdvancedKey.rsAction='r'
//     newAdvancedKey.rs = [      
//         // { vkCode: 112, keyText: 'F1', isRSaction:'r',keyIndex:1},
//         // { vkCode: 113, keyText: 'F2' ,isRSaction:'s',keyIndex:2}     
//     ]
//     //  const newData = [...advancedKeyList, newAdvancedKey]
//      advancedKeyPanelRef.current.setCurrentRS(newAdvancedKey)
//     // setAdvancedKeyList(newData)
//     const newData2 = advancedKeyList.map((k, idx) => {
        
//         if (k.id === currentAdvancedKeyIndex) {
//           alert('id='+k.id)
//           return { ...k, rs:newAdvancedKey.rs,keyIndex: 1, vkCode: 112, keyText: 'F1',rsAction:'r'}
//         } 
//         else {
//           return k
//         }
    
//     })
//     setAdvancedKeyList(newData2)
// // advancedKeyPanelRef.current.handleEditAdvancedKey(item)
// const type='RS'
// const isRS = true
// const isST = false
// const isDKS = false
// const isMT =false
// // if(type==='RS')
// //   isMT=true

// const newKeyMap = keyMap.map((col, idx) => {
//   return col.map((k, idx) => {
   
 
//     if (k.idx === keyIndex) {
//       return { ...k, isAdvancedKey: true, isDKS: isDKS, isMT: isMT,isRS:isRS,isST:isST,isRSaction:newAdvancedKey.rsAction, advancedKeyId: currentAdvancedKeyIndex,isHightSelected:true }
//     } 
//     else {
//       return k
//     }
  
//   })
// })
// handleSetKeyMap(newKeyMap)
  }
  
  const handleAddAdvancedKey = (type: string, key: API.Keyboard.KeyObject) => {
    if (advancedKeyList.length >= Boog75Constant.MAX_ADVANCED_KEY) {
      return
    }
    if (type==="ST"||type==="RS")
      {
        const filteredItems = advancedKeyList.filter(item => ['RS', 'ST'].includes(item.type));
        if(filteredItems.length>0)
        {
          //alert('Snappy Tappy (SOCD)和迅洁有且只能有一个')
          setShowAlert2({ alert: true, alertTitle:  '', alertText: intl.formatMessage({ id: "advance.socdMsg" }), severity: 'warning' })
          return
        }
      }
    let advancedKeyId = 0
    if (advancedKeyList.length > 0) {
      advancedKeyId = advancedKeyList[advancedKeyList.length - 1].id + 1
    }
       
    const newAdvancedKey: API.Keyboard.AdvancedKey = { id: advancedKeyId, type: type, keyIndex: key.idx, vkCode: key.vkCode, keyText: key.keyText }
    switch (type) {
      case "RS":
        //新增的时候为空
        
        newAdvancedKey.keyIndex=-1
        newAdvancedKey.vkCode=-1
        newAdvancedKey.keyText=''
        newAdvancedKey.rsAction='r'
         newAdvancedKey.rs = [      
            { vkCode: undefined, keyText:'', isRSaction:'r'},
            { vkCode: undefined, keyText: '' ,isRSaction:'s'}     
        ]
        newAdvancedKey.pressTime = 200
        break;
        case "ST":
          newAdvancedKey.keyIndex=-1
          newAdvancedKey.vkCode=-1
          newAdvancedKey.keyText=''
          newAdvancedKey.rsAction='r'
           newAdvancedKey.st = [      
              { vkCode: undefined, keyText:'', isRSaction:'r'},
              { vkCode: undefined, keyText: '' ,isRSaction:'s'}     
          ]
          newAdvancedKey.pressTime = 200
        break;
      case "DKS":
        newAdvancedKey.fitstTriggerPos = 1.6
        newAdvancedKey.lastTriggerPos = 1.6
        newAdvancedKey.dks = [
          {
            vkCode: undefined, keyText: '',
            data: [
              { visible: false, visibleType: 0, visibleMaxLimit: 0, dataType: 0 },
              { visible: false, visibleType: 1, visibleMaxLimit: 0, dataType: 0 },
              { visible: false, visibleType: 2, visibleMaxLimit: 0, dataType: 0 },
              { visible: false, visibleType: 3, visibleMaxLimit: 0, dataType: 0 }
            ]
          },
          {
            vkCode: undefined, keyText: '',
            data: [
              { visible: false, visibleType: 0, visibleMaxLimit: 0, dataType: 0 },
              { visible: false, visibleType: 1, visibleMaxLimit: 0, dataType: 0 },
              { visible: false, visibleType: 2, visibleMaxLimit: 0, dataType: 0 },
              { visible: false, visibleType: 3, visibleMaxLimit: 0, dataType: 0 }
            ]
          },
          {
            vkCode: undefined, keyText: '',
            data: [
              { visible: false, visibleType: 0, visibleMaxLimit: 0, dataType: 0 },
              { visible: false, visibleType: 1, visibleMaxLimit: 0, dataType: 0 },
              { visible: false, visibleType: 2, visibleMaxLimit: 0, dataType: 0 },
              { visible: false, visibleType: 3, visibleMaxLimit: 0, dataType: 0 }
            ]
          },
          {
            vkCode: undefined, keyText: '',
            data: [
              { visible: false, visibleType: 0, visibleMaxLimit: 0, dataType: 0 },
              { visible: false, visibleType: 1, visibleMaxLimit: 0, dataType: 0 },
              { visible: false, visibleType: 2, visibleMaxLimit: 0, dataType: 0 },
              { visible: false, visibleType: 3, visibleMaxLimit: 0, dataType: 0 }
            ]
          }
        ]
        break;
      case "MT":
        newAdvancedKey.mt = [
          { vkCode: undefined, keyText: '' },
          { vkCode: undefined, keyText: '' }
        ]
        newAdvancedKey.pressTime = 200
        break;
      case "TGL":
        newAdvancedKey.tgl = { vkCode: undefined, keyText: '' }
        break;
    }

    const newData = [...advancedKeyList, newAdvancedKey]//添加一个高级键，如果是rs，需要添加2个rs
    setAdvancedKeyList(newData)
    const isRS = type === 'RS'
    const isST = type === 'ST'
    const isDKS = type === 'DKS'
    const isMT = type === 'MT'
     let rslist=''
    if(type==='RS')
    {
      //var rslist=''
      newAdvancedKey.rs?.forEach(element => {
        
        rslist+=','+element.keyIndex
      });
      rslist+=','
     // alert(rslist)
    }
    if(type==='ST')
      {
       // var stlist=''
        newAdvancedKey.rs?.forEach(element => {
          
          rslist+=','+element.keyIndex
        });
        rslist+=','
       // alert(stlist)
      }
    const newKeyMap = keyMap.map((col, idx) => {
      return col.map((k, idx) => {
        if(isST||isRS)
        {
          if (rslist.indexOf(','+k.idx+',')>-1) {
            //alert(k.idx)
           return { ...k, vkCode: KEYCODE_DICT.VK_ADVANCED_KEY, isAdvancedKey: true, isDKS: isDKS, isMT: isMT,isRS:isRS,isST:isST,isRSaction:'r', advancedKeyId: advancedKeyId }
        
      }
        return k;
        }
        else{
        if (k.idx === key.idx) {
          return { ...k, vkCode: KEYCODE_DICT.VK_ADVANCED_KEY, isAdvancedKey: true, isDKS: isDKS, isMT: isMT,isRS:isRS,isST:isST,isRSaction:newAdvancedKey.rsAction, advancedKeyId: advancedKeyId }
        
        } else {
          return k
        }
      }
      })
    })
    handleSetKeyMap(newKeyMap)
  }

  const handleDeleteAdvancedKey = (advancedKey: API.Keyboard.AdvancedKey) => {
   // alert('delete')
    setAbleSelectKey(false)
    const keyIndex = advancedKey.keyIndex
    const vkCode = advancedKey.vkCode
    const keyText = advancedKey.keyText
    var rslist=''
       if(advancedKey.rs&&advancedKey.rs.length>0){
        advancedKey.rs?.forEach(element => {
      if(element.oldKeyId!=undefined)
        rslist+=','+element.oldKeyId
      else
        rslist+=','+element.keyIndex
      
    });
  }
    if(advancedKey.st&&advancedKey.st.length>0){
      advancedKey.st?.forEach(element => {
    if(element.oldKeyId!=undefined)
      rslist+=','+element.oldKeyId
    else
      rslist+=','+element.keyIndex
    
  });
    //alert(rslist)
     }
       rslist+=','
    const newKeyMap = keyMap.map((col, idx) => {
      return col.map((k, idx) => {
        if (rslist.indexOf(','+k.idx+',')>-1) {
          //alert(k.idx)
          return { ...k, advancedKeyId:undefined,   isAdvancedKey: false, isDKS: false, isMT: false,isRS:false,isST:false,isRSaction:undefined, isHightSelected:false }
        }
        else{
        if (k.idx === keyIndex) {
          return { ...k, advancedKeyId:undefined,  vkCode: vkCode, keyText: keyText, isAdvancedKey: false, isDKS: false, isMT: false,isRS:false,isST:false,isRSaction:undefined, isHightSelected:false }
        } else {
          return k
        }
      }
      })
    })
    if(advancedKey.type==="ST"||advancedKey.type==="RS"){
          const data: Array<number> = [
            0x00, 0x34, 0x00, 0x0a, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
          ]
          data[4] =0x00//0层 
          data[5] =0x00//
          data[6] =0x00//
          data[7] =advancedKey.type==="ST"?0x02:0x01//02
          data[8]=0x00//
          data[9]=0x00//0-7bit为模式，8bit为全压迫
          data[10] =0xff
          data[11] = 0xff
          const reportData = combineReportData(data)
         sendOutputReport(reportData)
      }
    const newData = advancedKeyList.filter((item) => {
      return item.id !== advancedKey.id
    })
    setAdvancedKeyList(newData)
    handleSetKeyMap(newKeyMap)
    setKeyBottonDataHandler(newKeyMap)
  }
//保存高级键设置
  const handleChangeAdvancedKey = (advancedKey: API.Keyboard.AdvancedKey, isConfirm: boolean) => {
   
     let rsOk=true
    const newData = advancedKeyList.map((item) => {
      if (item.id === advancedKey.id) {
        item = { ...advancedKey }
      }
      return item
    })
    setAdvancedKeyList(newData)

    const keyIndex = advancedKey.keyIndex
    if (isConfirm && keyIndex !== undefined) {
      const advancedKeyType = advancedKey.type
      if (advancedKeyType === "DKS") {
        handleSetDKSData(advancedKey)
        const newKeyMap = keyMap.map((col, idx) => {
          return col.map((k, idx) => {
            if (k.idx === keyIndex) {
              return { ...k, vkCode: KEYCODE_DICT.VK_ADVANCED_KEY, isAdvancedKey: true, isDKS: true, advancedKeyId: advancedKey.id,isHightSelected:false }
            } else {
              return k
            }
          })
        })
        handleSetKeyMap(newKeyMap)
        setKeyBottonDataHandler(newKeyMap)
      } else if (advancedKeyType === "MT") {
        handleSetMTData(advancedKey)
        const newKeyMap = keyMap.map((col, idx) => {
          return col.map((k, idx) => {
            if (k.idx === keyIndex) {
              return { ...k, vkCode: KEYCODE_DICT.VK_ADVANCED_KEY, isAdvancedKey: true, isMT: true, advancedKeyId: advancedKey.id,isHightSelected:false }
            } else {
              return k
            }
          })
        })
        handleSetKeyMap(newKeyMap)
        setKeyBottonDataHandler(newKeyMap)
      } 
      else if (advancedKeyType === "RS") {//显示到界面
       
        var rslist=''
       
        advancedKey.rs?.forEach(element => {
          rslist+=','+element.keyIndex
          if(element.keyIndex===undefined)
            rsOk=false
        });
        rslist+=','
        //alert(rslist)
        if(!rsOk)
{
  //提示不能提交
  //alert('不能提交')
  setShowAlert({ alert: true, alertTitle: intl.formatMessage({ id: "page.info" }), alertText: intl.formatMessage({ id: "index.rsMsg" }), severity: 'warning' })
 // setOpenRSTip(true)
return
}       
else{
 const newKeyMap = keyMap.map((col, idx) => {
          return col.map((k, idx) => {
            if (rslist.indexOf(','+k.idx+',')>-1) {
              //alert(k.idx)
              var rsa;
for(let i=0;i<2;i++)
{
  if(advancedKey.rs&&k.idx===advancedKey.rs[i].keyIndex)
  {
    rsa=advancedKey.rs[i].isRSaction;
   break;
  }
}
//alert(rsa)
 return { ...k, isAdvancedKey: true, isRS: true, advancedKeyId: advancedKey.id,isHightSelected:false,isRSaction:rsa }

              
            } else {
              if(advancedKey.id===k.advancedKeyId)
              {
                return  { ...k, isAdvancedKey: false, isRS: false, advancedKeyId: undefined,isHightSelected:false,isRSaction:undefined }
              }
              else
              return k
            }
          })
        })
        handleSetRSData(advancedKey)//写入rs
        handleSetKeyMap(newKeyMap)
       // setKeyBottonDataHandler(newKeyMap)
      }
      } 
      else if (advancedKeyType === "ST") {//显示到界面
        
        var stlist=''
       
        advancedKey.st?.forEach(element => {
          stlist+=','+element.keyIndex
          if(element.keyIndex===undefined)
            rsOk=false
        });
        stlist+=','
        //alert(stlist)
        if(!rsOk)
{
  //提示不能提交
  //alert('不能提交')
  setShowAlert({ alert: true, alertTitle: intl.formatMessage({ id: "page.info" }), alertText: intl.formatMessage({ id: "index.rsMsg" }), severity: 'warning' })
 // setOpenRSTip(true)
return
}       
else{
 const newKeyMap = keyMap.map((col, idx) => {
          return col.map((k, idx) => {
            if (stlist.indexOf(','+k.idx+',')>-1) {
              //alert(k.idx)
              var sta;
for(let i=0;i<2;i++)
{
  if(advancedKey.st&&k.idx===parseInt(advancedKey.st[i].keyIndex))
  {
    sta=advancedKey.st[i].isRSaction;
   break;
  }
}
//alert(rsa)
 return { ...k, isAdvancedKey: true, isST: true, advancedKeyId: advancedKey.id,isHightSelected:false,isRSaction:sta }

              
            } else {
              if(advancedKey.id===k.advancedKeyId)
              {
                return  { ...k, isAdvancedKey: false, isST: false, advancedKeyId: undefined,isHightSelected:false,isRSaction:undefined }
              }
              else
              return k
            }
          })
        })
      
        handleSetSTData(advancedKey)//写入st
        handleSetKeyMap(newKeyMap)
       // setKeyBottonDataHandler(newKeyMap)


}
      } 
      else if (advancedKeyType === "TGL") {
      }
    
    }
    if(rsOk&&isConfirm)
    {
      advancedKeyPanelRef.current.closePanel()
    }
    if(isConfirm===true)
    setAbleSelectKey(false)
  }

  //当前高级键是的id
  const [currentAdvancedKeyIndex, setCurrentAdvancedKeyIndex] = useState(-1)

  const handleOpenAdvancedKeyPanel = (dskType: string, advancedKeyId: number) => {
    advancedKeyList.forEach(item => {
      if (item.id === advancedKeyId) {
        advancedKeyPanelRef.current.handleEditAdvancedKey(item)
        //alert('a='+item.id)
        setCurrentAdvancedKeyIndex(item.id)
        return
      }
    })
  }

//  const handGetAdvance=():undefined=>{
//   alert('handGetAdvance='+ advancedKeyPanelRef.current.currentAdvancedKey.id)
//   console.log('handGetAdvance='+currentAdvancedKeyIndex)
//   setCurrentAdvancedKeyIndex(advancedKeyPanelRef.current.currentAdvancedKey.id)
//  }
  const handleTglSwitch = (keyIndex: number, s: boolean) => {
    const newKeyMap = keyMap.map((col, idx) => {
      return col.map((k, idx) => {
        if (k.idx === keyIndex) {
          return { ...k, triggerMode: s ? Boog75Constant.TRIGGER_MODE_TGL : Boog75Constant.TRIGGER_MODE_NORMAL_3 }
        } else {
          return k
        }
      })
    })
    handleSetKeyMap(newKeyMap)
    handleSetTriggerData(newKeyMap)
  }

  const handleSensitivityChange = (value: number) => {
    setSensitivity(value)//全部灵敏度设置
    setRealSensitivity(SENSITIVITY_ARR[value - 1])
  }

  const handleConfirmSensitivityChange = () => {
    // setSensitivity(sensitivity)
    // setRealSensitivity(SENSITIVITY_ARR[sensitivity- 1])

    const stroke = Number((realSensitivity * 0.2).toFixed(1))
    const newKeyMap = keyMap.map((col, idx) => {
      return col.map((k, idx) => {
        // if (!selectedKeyIndexArr.has(Number(k.idx))) {
          if(!k.isLocalChange){
          return { ...k, rapidTrigger: { make: stroke, break: stroke }, isLocalChange: false }
        } else {
          return { ...k, isLocalChange: true }
        }
      })
    })
    setSensitivity(sensitivity)
    handleSetKeyMap(newKeyMap)
    setShowAlert({ alert: true, alertTitle: intl.formatMessage({ id: "page.info" }), alertText: intl.formatMessage({ id: "page.successMsg" }), severity: 'success' })
  }

  const handleLocalSensitivityChange = (value: number) => {
    setLocalSensitivity(value)//单个灵敏度设置
    setLocalRealSensitivity(SENSITIVITY_ARR[value - 1])
  }

  const handleRapidTriggerChange = (_make: number, _break: number) => {
    setRapidTrigger({ make: _make, break: _break })
  }

  const handleConfirmRapidTriggerChange = () => {
    const newKeyMap = keyMap.map((col, idx) => {
      return col.map((k, idx) => {
        //if (!selectedKeyIndexArr.has(Number(k.idx))) {sensitivity
       if(k.sensitivity===null||k.sensitivity===undefined){
          return { ...k, rapidTrigger: { make: rapidTrigger.make, break: rapidTrigger.break }, isLocalChange: false }
        } else {
          return { ...k, isLocalChange: true }
        }
      })
    })
    handleSetKeyMap(newKeyMap)
    setRapidTrigger(rapidTrigger)
    setShowAlert({ alert: true, alertTitle: intl.formatMessage({ id: "page.info" }), alertText: intl.formatMessage({ id: "page.successMsg" }), severity: 'success' })
  }

  const handleLocalRapidTriggerChange = (_make: number, _break: number) => {
    setLocalRapidTrigger({ make: _make, break: _break })
  }

  const handleAbleSelectKey = () => {
    setAbleSelectKey(true)
  }

  const handleDisableSelectKey = () => {
    setAbleSelectKey(false)
    handleCancleSelectKey()
  }

  const handleCancleSelectKey = () => {
    keyMap.forEach((col, idx) => {
      col.forEach((k, idx) => {
        const el = document.getElementById('targetKey_' + k.vkCode)
        el?.classList.remove(targetKeyStyles.selelcted_keycode)
        if (!selectedKeyIndexArr.has(Number(el?.dataset.keyindex))) {
          el && (el.dataset.selected = 'false')
        }
      })
    })

    // const newKeyMap = keyMap.map(col => col.map(k => {
    //   if (k.isSelected) {
    //     return { ...k, isSelected: false }
    //   } else {
    //     return k
    //   }
    // }))
    // handleSetKeyMap(newKeyMap)


  }

  const handleResetSelectKey = (type: number) => {
    const newKeyMap = keyMap.map((col, idx) => {
      return col.map((k, idx) => {
        if (type === 0) {
          const stroke = Number((realSensitivity * 0.2).toFixed(1))
          return { ...k, rapidTrigger: { make: stroke, break: stroke }, isLocalChange: false }
        } else if (type === 1) {
          return { ...k, rapidTrigger: { make: rapidTrigger.make, break: rapidTrigger.break }, isLocalChange: false }
        } else {
          return { ...k, isLocalChange: false };
        }
      })
    })
    handleSetKeyMap(newKeyMap)
    setSelectedKeyIndexArr(new Set([]))
  }

  const handleConfirmSelectKey = (type: number) => {
    const keyIndexArr: Set<number> = new Set(selectedKeyIndexArr)
    const newKeyMap = keyMap.map((col, idx) => {
      return col.map((k, idx) => {
        if (k.isSelected) {
          keyIndexArr.add(Number(k.idx))
          if (type === 0) {
            const stroke = Number((localRealSensitivity * 0.2).toFixed(1))
            return { ...k, sensitivity: localSensitivity, rapidTrigger: { make: stroke, break: stroke }, isSelected: false, isLocalChange: true }
          } else if (type === 1) {
            
            return { ...k, sensitivity:0,rapidTrigger: { make: localRapidTrigger.make, break: localRapidTrigger.break }, isSelected: false, isLocalChange: true }
          } else {
            return k
          }
        } else {
          return { ...k };
        }
      })
    })
    handleSetKeyMap(newKeyMap)
    setSensitivity(localRealSensitivity)
    setRapidTrigger(localRapidTrigger)
    setAbleSelectKey(false)
    setSelectedKeyIndexArr(keyIndexArr)
    handleCancleSelectKey()
  }

  const handleOpenAdvanceRT = () => {
    setIsAdvanceRT(true)
  }

  const handleCloseAdvanceRT = () => {
    setIsAdvanceRT(false)
  }

  const handleProfileItemClick = (event: any, profile: API.Keyboard.Profile) => {
   // alert(selectedProfile.id)
    if (selectedProfile.id !== profile.id||(selectedProfile.id === profile.id&&profile.type==='ref')) {
      //alert(profile.id)
      const keyboardJson = handleGetKeyboardJson()
      if (selectedProfile.id === 0) {
        const newDigitalProfile = { ...digitalProfile, keyboardJson: keyboardJson };
        setDigitalProfile(newDigitalProfile)
        
      }
       else {
        const newProfileList = profileList.map((item, index) => {
          if (item.id === selectedProfile.id) {
            return { ...item, keyboardJson: keyboardJson }
          } else {
            return item
          }
        })
        setProfileList(newProfileList)
        // for(let i=0;i<newProfileList.length;i++){
        //   if(profile.id===newProfileList[i].id){
        //   setSensitivity(newProfileList[i].keyboardJson.sensitivity)//全部灵敏度设置
        //   setRealSensitivity(SENSITIVITY_ARR[newProfileList[i].keyboardJson.sensitivity - 1])
        //   break;
        //   }
        // }
       if(profile.id===0)
       {
        setSensitivity(profile.keyboardJson.sensitivity)//全部灵敏度设置
        setRealSensitivity(SENSITIVITY_ARR[profile.keyboardJson.sensitivity - 1])

       }

      }
  const data: Array<number> = [
    0x00, 0x34, 0x00, 0x0a, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
  ]
  data[4] =0x00//0层 
  data[5] =0x00//
  data[6] =0x00//
  data[7] =0x02//02
  data[8]=0x00//
  data[9]=0x00//0-7bit为模式，8bit为全压迫
  data[10] =0xff
  data[11] = 0xff
  const reportData = combineReportData(data)
 sendOutputReport(reportData)
 data[7] =0x01//02
 const reportData2 = combineReportData(data)
 sendOutputReport(reportData2)


      setKeyBottonDataHandler(profile.keyboardJson.keyMap)
      handleSetRGBColorData(profile.keyboardJson.rgbEffect)
      handleSetTriggerData(profile.keyboardJson.keyMap)
      if (profile.keyboardJson.advancedKeyList) {
        profile.keyboardJson.advancedKeyList.forEach(item => {
          if (item.type === "DKS") {
            handleSetDKSData(item)
          } else if (item.type === "MT") {
            handleSetMTData(item)
          }
          else if (item.type === "ST") {
            handleSetSTData(item)
          }
          else if (item.type === "RS") {
            handleSetRSData(item)
          }
        })
      }
      // if(!profile.keyboardJson.advancedKeyList||profile.keyboardJson.advancedKeyList.length==0){
      //   const data: Array<number> = [
      //     0x00, 0x34, 0x00, 0x0a, 0x00, 0x00, 0x00,
      //     0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //     0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //     0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //     0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //     0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //     0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //     0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
      //   ]
      //   data[4] =0x00//0层 
      //   data[5] =0x00//
      //   data[6] =0x00//
      //   data[7] =0x02//02
      //   data[8]=0x00//
      //   data[9]=0x00//0-7bit为模式，8bit为全压迫
      //   data[10] =0xff
      //   data[11] = 0xff
      //   const reportData = combineReportData(data)
      //  sendOutputReport(reportData)
      //  data[7] =0x01//02
      //  const reportData2 = combineReportData(data)
      //  sendOutputReport(reportData2)
      // }
      profile.keyboardJson.keyMap.forEach(col => col.forEach(k => {
        if (!k.rapidTrigger) {
          let rt;
          keyboardJson.keyMap.forEach(col1 => col1.forEach(k1 => {
            if (k1.idx === k.idx) {
              rt = k1.rapidTrigger;
              return;
            }
          }))
          k.rapidTrigger = rt;
        }
        return k
      }))
      profile.keyboardJson && handleSetKeyboardJson(profile.keyboardJson)

      setSelectedProfile(profile)
      handleCloseAdvanceRT()
      setBottomNavigation(0)
    }
  }

  const handleResetDefaultProfile = () => {
    handleSetKeyboardJson(DEFAULT_KEYBOARD_JSON) 
    localStorage.removeItem("keyboardJsonBoog752_2")
    setKeyBottonDataHandler2(DEFAULT_KEYBOARD_JSON.keyMap)
    const data: Array<number> = [
      0x00, 0x34, 0x00, 0x0a, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
    ]
    data[4] =0x00//0层 
    data[5] =0x00//
    data[6] =0x00//
    data[7] =0x02//02
    data[8]=0x00//
    data[9]=0x00//0-7bit为模式，8bit为全压迫
    data[10] =0xff
    data[11] = 0xff
    const reportData = combineReportData(data)
   sendOutputReport(reportData)
   data[7] =0x01//02
   const reportData2 = combineReportData(data)
   sendOutputReport(reportData2)
  }

  const handleAddProfile = () => {
    if (profileList.length == Boog75Constant.MAX_PROFILE) {
      setShowAlert({ alert: true, alertTitle: intl.formatMessage({ id: "page.info" }), alertText: intl.formatMessage({ id: "index.profileLimit" }), severity: 'warning' })
      return;
    }
    let id = 1;
    if (profileList.length > 0) {
      id = profileList[profileList.length - 1].id + 1
    }
    //alert(JSON.stringify(DEFAULT_KEYBOARD_JSON))
    const newProfile = { id: id, text: "Profile"+String(id), keyboardJson: DEFAULT_KEYBOARD_JSON }
    setProfileList([...profileList, newProfile])
    setRealSensitivity(SENSITIVITY_ARR[16 - 1])
  }

  const handleClickProfileOperate = (event: React.MouseEvent<HTMLElement>, profileId: number) => {
    setProfileOperateAnchorEl(event.currentTarget)
    setProfileId(profileId)
  };

  const handleCloseProfileOperate = () => {
    setProfileOperateAnchorEl(null)
  }
  const handleRenameProfile = (event: any, profileItem: API.Keyboard.Profile) => {
    event.stopPropagation()
    event.preventDefault()
    setShowRename(true)
    setRename(profileItem.text)
    setRenameId(profileItem.id)
    setRenameerroFlag(false)
    setRenameerro('')
    handleCloseProfileOperate()
  }
  // const handleRenameProfile = (profileItem: API.Keyboard.Profile) => {
   
  //   //setShowRename(true)
  //  //alert(profileItem.text)
  //  //setRename(profileItem.text)

  // //  event.stopPropagation()
  // //  event.preventDefault()
  //  const list = profileList.map((item) => {
  //    if (item.id===profileItem.id) {
  //      item.isRename = true;
  //    }
  //    return item;
  //  })
  //  setProfileList(list)
  // }
  const handleEditProfileChange = ( id: number, value: string) => {
  
        if (value.length > 15) {
          
          setRenameerro('Cannot exceed 15 characters');
          setRenameerroFlag(true)
        } else if (!value) {
          setRenameerro('Cannot be empty')
          setRenameerroFlag(true)
        } else {
          setRenameerro('')
          setRename(value)
          setRenameerroFlag(false)
        }
     
   
  }

  const handleEditRenameData = (id: number) => {
    const list = profileList.map((item) => {
      if (item.id === id) {
        item.text = rename;
        
      } else {
       
      }
      return item;
    })
    setProfileList(list)
    setShowRename(false)
  }


  const handRename = (event: any, id: number) => {
    event.stopPropagation()
    event.preventDefault()
    const list = profileList.map((item) => {
      if (item.id!=id) {
        item.isRename = false;
      }
     
      
      return item;
    })
    setProfileList(list)
  }

  const handleDeleteProfile = (event: any, id: number) => {
    event.stopPropagation()
    event.preventDefault()
    setProfileList(profileList.filter((item, index) => {
      return id !== item.id;
    }))

    setKeyBottonDataHandler(digitalProfile.keyboardJson.keyMap)
    handleSetRGBColorData(digitalProfile.keyboardJson.rgbEffect)
    handleSetTriggerData(digitalProfile.keyboardJson.keyMap)
    if (digitalProfile.keyboardJson.advancedKeyList) {
     
      digitalProfile.keyboardJson.advancedKeyList.forEach(item => {
        if (item.type === "DKS") {
          handleSetDKSData(item)
        } else if (item.type === "MT") {
          handleSetMTData(item)
        }
        else if (item.type === "ST") {
          handleSetSTData(item)
        }
        else if (item.type === "RS") {
          handleSetRSData(item)
        }
    })
  }
  digitalProfile.keyboardJson && handleSetKeyboardJson(digitalProfile.keyboardJson)
    setSelectedProfile(digitalProfile)
    handleCloseProfileOperate()
    handleCloseAdvanceRT()
    setBottomNavigation(0)
  }

  const handleResetProfile = (event: any, id: number) => {
    event.stopPropagation()
    event.preventDefault()
    const nweProfileList = profileList.map((item, index) => {
      if (item.id === id) {
        return { ...item, keyboardJson: DEFAULT_KEYBOARD_JSON }
      } else {
        return item
      }
    })

    setProfileList(nweProfileList)
    handleSetKeyboardJson(DEFAULT_KEYBOARD_JSON)
    handleCloseProfileOperate()
    setKeyBottonDataHandler2(DEFAULT_KEYBOARD_JSON.keyMap)
   // digitalProfile.keyboardJson && handleSetKeyboardJson(digitalProfile.keyboardJson)
    // setSelectedProfile(profileList[1])
    // handleCloseProfileOperate()
    // handleCloseAdvanceRT()
    // setBottomNavigation(0)
  
  }
  const handleExportProfile = (profileItem: API.Keyboard.Profile) => {
    const keyboardJson = handleGetKeyboardJson()
    let content = JSON.stringify(keyboardJson)
    if (profileItem.id !== selectedProfile.id) {
      content = JSON.stringify(profileItem.keyboardJson)
    }
    const element = document.createElement("a")
    const file = new Blob([content], { type: 'application/json' })
    element.href = URL.createObjectURL(file)
    element.download = intl.formatMessage({ id: "index.myDigitalProfile" }) + profileItem.text + ".json";
    document.body.appendChild(element)
    element.click()
    handleCloseProfileOperate()
  }

  const handleImportProfile = (event: any) => {
    const file = event.target.files[0]
    var reader = new FileReader()
    reader.readAsText(file, "UTF-8")
    reader.onload = function (evt: any) {
      var fileString = evt.target.result;

      try {
        if (profileList.length == Boog75Constant.MAX_PROFILE) {
          setShowAlert({ alert: true, alertTitle: intl.formatMessage({ id: "page.info" }), alertText: intl.formatMessage({ id: "index.importProfileLimit" }), severity: 'warning' })
          return;
        }

        handleSetKeyboardJson(JSON.parse(fileString))
        let id = 1;
        if (profileList.length > 0) {
          id = profileList[profileList.length - 1].id + 1
        }
        const importProfile = { id: id, text: String(id), keyboardJson: JSON.parse(fileString) };
        setProfileList([...profileList, importProfile])
      } finally {
        importProfileRef.current.value = "";
      }
    }
  }

  const handleUpdateMacroList = (list: Array<API.Keyboard.Macro>) => {
    setMacroList(list);
  }

  const handleUploadMacro = (list: Array<API.Keyboard.Macro>) => {
    handleSetMacroDataHandler(list, 999);
  }

  const handleGetKeyboardJson = () => {
    const keyboardJson: API.Keyboard.KeyboardJson = {
      keyMap: keyMap,
      keyMap0: keyMap0,
      keyMap1: keyMap1,
      keyMap2: keyMap2,
      keyMap3: keyMap3,
      rgbEffect: {
        lightOn: lightOn,
        lightEffect: lightEffect,
        lightBrightness: lightBrightness,
        lightSpeed: lightSpeed,
        currentLedColorIndex: currentLedColorIndex,
        lightColor0: color_0,
        lightColor1: color_1,
        lightColor2: color_2,
        lightColor3: color_3,
        lightColor4: color_4,
        lightColor5: color_5,
        lightColor6: color_6,
      },
      sensitivity: sensitivity,
      localSensitivity: localSensitivity,
      rapidTrigger: rapidTrigger,
      localRapidTrigger: localRapidTrigger,
      macroList: macroList,
      advancedKeyList: advancedKeyList,
    }
    return keyboardJson;
  }

  const handleSetKeyboardJson = (keyboardJson: API.Keyboard.KeyboardJson) => {
   // alert('11=')
    if (keyboardJson.keyMap0) {
      renderKeyMapBuffer = keyboardJson.keyMap
     // alert(1)
      setKeyMap(keyboardJson.keyMap0)
    }
    keyboardJson.keyMap0 && setKeyMap0(keyboardJson.keyMap0)
    keyboardJson.keyMap1 && setKeyMap1(keyboardJson.keyMap1)
    keyboardJson.keyMap2 && setKeyMap2(keyboardJson.keyMap2)
    keyboardJson.keyMap3 && setKeyMap3(keyboardJson.keyMap3)
    const rgbEffect = keyboardJson.rgbEffect
    if (rgbEffect) {
      rgbEffect.lightOn !== undefined && setLightOn(rgbEffect.lightOn)
      rgbEffect.lightEffect !== undefined && setLightEffet(rgbEffect.lightEffect)
      rgbEffect.lightBrightness !== undefined && setLightBrightness(rgbEffect.lightBrightness)
      rgbEffect.lightSpeed !== undefined && setLightSpeed(rgbEffect.lightSpeed)
      rgbEffect.currentLedColorIndex !== undefined && setCurrentLedColorIndex(rgbEffect.currentLedColorIndex)
      rgbEffect.lightColor0 && setColor_0(rgbEffect.lightColor0)
      rgbEffect.lightColor1 && setColor_1(rgbEffect.lightColor1)
      rgbEffect.lightColor2 && setColor_2(rgbEffect.lightColor2)
      rgbEffect.lightColor3 && setColor_3(rgbEffect.lightColor3)
      rgbEffect.lightColor4 && setColor_4(rgbEffect.lightColor4)
      rgbEffect.lightColor5 && setColor_5(rgbEffect.lightColor5)
      rgbEffect.lightColor6 && setColor_6(rgbEffect.lightColor6)
      switch (rgbEffect.currentLedColorIndex) {
        case 0:
          setColor(rgbEffect.lightColor0)
          break;
        case 1:
          setColor(rgbEffect.lightColor1)
          break;
        case 2:
          setColor(rgbEffect.lightColor2)
          break;
        case 3:
          setColor(rgbEffect.lightColor3)
          break;
        case 4:
          setColor(rgbEffect.lightColor4)
          break;
        case 5:
          setColor(rgbEffect.lightColor5)
          break;
        case 6:
          setColor(rgbEffect.lightColor6)
          break;
      }
    }
    keyboardJson.sensitivity !== undefined && setSensitivity(keyboardJson.sensitivity)
    keyboardJson.localSensitivity !== undefined && setLocalSensitivity(keyboardJson.localSensitivity)
    keyboardJson.rapidTrigger !== undefined && setRapidTrigger(keyboardJson.rapidTrigger)
    keyboardJson.localRapidTrigger !== undefined && setLocalRapidTrigger(keyboardJson.localRapidTrigger)
    setMacroList(keyboardJson.macroList || [])
    setAdvancedKeyList(keyboardJson.advancedKeyList || [])
   
  }

  const handleChangeLayer = (newlayer: number) => {
    switch (newlayer) {
      case 0:
       // alert(2)
        setKeyMap(keyMap0)
        break;
      case 1:
      //  alert(3)
        setKeyMap(keyMap1)
        break;
      case 2:
      //  alert(4)
        setKeyMap(keyMap2)
        break;
      case 3:
      //  alert(5)
        setKeyMap(keyMap3)
        break;
    }
    setLayer(newlayer)
    bottomNavigation > 0 && setBottomNavigation(0)
  }

  const handleSetKeyMap = (newKeyMap: API.Keyboard.KeyObject[][]) => {
    
    setKeyMap(newKeyMap)
    switch (layer) {
      case 0:
        setKeyMap0(newKeyMap)
        break;
      case 1:
        setKeyMap1(newKeyMap)
        break;
      case 2:
        setKeyMap2(newKeyMap)
        break;
      case 3:
        setKeyMap3(newKeyMap)
        break;
    }
    //alert(keyMap[0][0].keyText)
  }

  const handleConnectedInit = () => {
    handleGetDeviceVersion()
    handleGetRGBColorData()
    //获取行程
    // alert('cingcheng ')
    // handleGetMakeBreakData()
    if (macroList.length === 0) {
      handleGetMacroData(macroId)
    }
    setShowAlert({ alert: true, alertTitle: intl.formatMessage({ id: "page.info" }), alertText: intl.formatMessage({ id: "index.connectedMsg" }), severity: 'success' })
  }

  const handleSync = () => {
    if (bottomNavigation === 0) {
    
      handleSetKeyBottonData()

    } else if (bottomNavigation === 1) {
      const rgbEffect = {
        lightOn: lightOn,
        lightEffect: lightEffect,
        lightBrightness: lightBrightness,
        lightSpeed: lightSpeed,
        currentLedColorIndex: currentLedColorIndex,
        lightColor0: color_0,
        lightColor1: color_1,
        lightColor2: color_2,
        lightColor3: color_3,
        lightColor4: color_4,
        lightColor5: color_5,
        lightColor6: color_6
      }
      handleSetRGBColorData(rgbEffect)
    } else if (bottomNavigation === 2) {
      handleSetMakeBreakData()
    }
    
  }

  const handleGetDeviceVersion = () => {
    const data = [
      0x00, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
    ]
    const reportData = combineReportData(data)
    sendOutputReport(reportData)
  }

  const handleGetDataChangeFlag = () => {
    const data = [
      0x00, 0x05, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
    ]
    const reportData = combineReportData(data)
    sendOutputReport(reportData)
  }

  const handleSetDataChangeFlag = (flag1: number, flag2: number, flag3: number, flag4: number) => {
    const data = [
      0x00, 0x04, 0x00, 0x04, flag1, flag2, flag3,
      flag4, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
    ]
    const reportData = combineReportData(data)
    sendOutputReport(reportData)
  }

  const handleGetKeyBottonData = () => {
    for (let i = 0x00; i < 0x03; i++) {
      const data = [
        0x00, 0x5B, 0x00, 0x01, 0x30 | i, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
      ]
      const reportData = combineReportData(data)
      sendOutputReport(reportData)
    }
  }

  const handleSetKeyBottonData = () => {
    setKeyBottonDataHandler(keyMap)
  }
  const setKeyBottonDataHandler = (keyData: API.Keyboard.KeyObject[][]) => {
    //0x1A【*】： SET 当前 Profile 的所有 Key/Button 功能映射
    const buffer: Array<API.Keyboard.KeyObject> = []
    keyData.forEach((col: API.Keyboard.KeyObject[]) => {
      col.forEach((obj: API.Keyboard.KeyObject) => {
        buffer.push(obj)
      })
    })
    const packageSize = Math.ceil(buffer.length / 29)
   // alert(packageSize)
    for (let i = 0; i < packageSize; i++) {
      const packageData = buffer.slice(0 + 29 * i, 29 + 29 * i)
      const dataSize = packageData.length * 2;
      const data: Array<number> = [
        0x00, 0x5A, 0x00, dataSize + 1, 0x30 | i, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
      ]
      for (let i = 0; i < packageData.length; i++) {
        data[5 + i * 2] = Number(packageData[i].vkCode);
        if (packageData[i].isMacro && packageData[i].macroId) {
          data[5 + 1 + i * 2] = Number(packageData[i].macroId)
        } else if (packageData[i].isAdvancedKey && packageData[i].advancedKeyId) {
          data[5 + 1 + i * 2] = Number(packageData[i].advancedKeyId)
        } else {
          data[5 + 1 + i * 2] = 0x00;
        }
      }
      const reportData = combineReportData(data)
      sendOutputReport(reportData)
      const flag = dataChangeFlag + 1;
      setDataChangeFlag(flag)
    }
  }

  const setKeyBottonDataHandler2 = (keyData: API.Keyboard.KeyObject[][]) => {
    //0x1A【*】： SET 当前 Profile 的所有 Key/Button 功能映射
    const buffer: Array<API.Keyboard.KeyObject> = []
    keyData.forEach((col: API.Keyboard.KeyObject[]) => {
      col.forEach((obj: API.Keyboard.KeyObject) => {
        buffer.push(obj)
      })
    })
    const packageSize = Math.ceil(buffer.length / 29)
   // alert(packageSize)
    for (let i = 0; i < packageSize; i++) {
      const packageData = buffer.slice(0 + 29 * i, 29 + 29 * i)
      const dataSize = packageData.length * 2;
      const data: Array<number> = [
        0x00, 0x5A, 0x00, dataSize + 1, 0x30 | i, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
      ]
      for (let i = 0; i < packageData.length; i++) {
        data[5 + i * 2] = Number(packageData[i].vkCode);
        if (packageData[i].isMacro && packageData[i].macroId) {
          data[5 + 1 + i * 2] = Number(packageData[i].macroId)
        } else if (packageData[i].isAdvancedKey && packageData[i].advancedKeyId) {
          data[5 + 1 + i * 2] = Number(packageData[i].advancedKeyId)
        } else {
          data[5 + 1 + i * 2] = 0x00;
        }
      }
      const reportData = combineReportData(data)
      sendOutputReport(reportData)
      const flag = dataChangeFlag + 1;
      setDataChangeFlag(flag)
    }
  }
  const handleGetRGBColorData = () => {
    const data = [
      0x00, 0x19, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
    ]
    const reportData = combineReportData(data)
    sendOutputReport(reportData)
  }

  const handleSetRGBColorData = (rgbEffect: API.Keyboard.RGBEffect) => {
    let newLightSpeed: number = Boog75Constant.LIGHT_SPEED_DEFAULT;
    switch (rgbEffect.lightSpeed) {
      case 0:
        newLightSpeed = 3;
        break;
      case 1:
        newLightSpeed = 2;
        break;
      case 2:
        newLightSpeed = 1;
        break;
      case 3:
        newLightSpeed = 0;
        break;
    }

    const rgbColorData: Array<number> = [
      0x00, 0x18, 0x00, 0x1A, 0x00, 0x00, 0x00,0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
    ]
    rgbColorData[4] = rgbEffect.lightOn
    rgbColorData[5] = rgbEffect.lightEffect
    rgbColorData[6] = rgbEffect.lightBrightness
    rgbColorData[7] = newLightSpeed
    rgbColorData[8] = rgbEffect.currentLedColorIndex
    rgbColorData[9] = rgbEffect.lightColor0.rgb.r
    rgbColorData[10] = rgbEffect.lightColor0.rgb.g
    rgbColorData[11] = rgbEffect.lightColor0.rgb.b
    rgbColorData[12] = rgbEffect.lightColor1.rgb.r
    rgbColorData[13] = rgbEffect.lightColor1.rgb.g
    rgbColorData[14] = rgbEffect.lightColor1.rgb.b
    rgbColorData[15] = rgbEffect.lightColor2.rgb.r
    rgbColorData[16] = rgbEffect.lightColor2.rgb.g
    rgbColorData[17] = rgbEffect.lightColor2.rgb.b
    rgbColorData[18] = rgbEffect.lightColor3.rgb.r
    rgbColorData[19] = rgbEffect.lightColor3.rgb.g
    rgbColorData[20] = rgbEffect.lightColor3.rgb.b
    rgbColorData[21] = rgbEffect.lightColor4.rgb.r
    rgbColorData[22] = rgbEffect.lightColor4.rgb.g
    rgbColorData[23] = rgbEffect.lightColor4.rgb.b
    rgbColorData[24] = rgbEffect.lightColor5.rgb.r
    rgbColorData[25] = rgbEffect.lightColor5.rgb.g
    rgbColorData[26] = rgbEffect.lightColor5.rgb.b
    rgbColorData[27] = rgbEffect.lightColor6.rgb.r
    rgbColorData[28] = rgbEffect.lightColor6.rgb.g
    rgbColorData[29] = rgbEffect.lightColor6.rgb.b
    const reportData = combineReportData(rgbColorData)
    sendOutputReport(reportData)
  }

  const handleGetMakeBreakData = () => {
    const dataTotal = Boog75Constant.KEY_TOTAL * 4
    const buffer: Array<number> = new Array(dataTotal);
    for (let i = 0; i < Boog75Constant.KEY_TOTAL; i++) {
      buffer[i * 4] = i;
      buffer[i * 4 + 1] = 0;
      buffer[i * 4 + 2] = 0;
      buffer[i * 4 + 3] = 0;
    }

    for (let i = 0; i < 6; i++) {
      const data = [
        0x00, 0x71, 0x00, 0x00, 0x60 | i, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
      ]
      let dataSize = 1;
      for (let j = 5; j < 63; j++) {
        const bufferIdx = i * 58 + j - 5;
        if (bufferIdx < dataTotal) {
          data[j] = buffer[bufferIdx]
          dataSize++
        }
      }
      data[3] = dataSize
      const reportData = combineReportData(data)
      sendOutputReport(reportData)
    }
  }

  const handleSetMakeBreakData = () => {
    handleSetTriggerData(keyMap)
  }
  const handleSetTriggerData = (keyData: API.Keyboard.KeyObject[][]) => {
    const dataBuffer: Array<number> = [];
    keyData.forEach((col: API.Keyboard.KeyObject[]) => {
      col.forEach((obj: API.Keyboard.KeyObject) => {
        if (obj.idx !== undefined) {
          dataBuffer.push(obj.idx)
          dataBuffer.push(obj.triggerMode || Boog75Constant.TRIGGER_MODE_NORMAL_3)
          dataBuffer.push((obj.rapidTrigger?.make || 1) * 10)
          dataBuffer.push((obj.rapidTrigger?.break || 1) * 10)
        }
      })
    })
    const dataTotal = Boog75Constant.KEY_TOTAL * 4
    for (let i = 0; i < 6; i++) {
      const data: Array<number> = [
        0x00, 0x70, 0x00, 0x00, 0x60 | i, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
      ]
      let dataSize = 1;
      for (let j = 5; j < 63; j++) {
        const bufferIdx = i * 58 + j - 5;
        if (bufferIdx < dataTotal) {
          data[j] = dataBuffer[bufferIdx]
          dataSize++
        }
      }
      data[3] = dataSize

      const reportData = combineReportData(data)
      sendOutputReport(reportData)
    }
  }

  const handleSetTrigger4Data = (keyIndex: number) => {
    const rapidTrigger: API.Keyboard.RapidTrigger = { make: 1, break: 1 }
    keyMap.forEach(col => col.map(k => {
      if (k.idx === keyIndex && k.rapidTrigger) {
        rapidTrigger.make = k.rapidTrigger.make
        rapidTrigger.break = k.rapidTrigger.break
        return
      }
    }))
    const data: Array<number> = [
      0x00, 0x30, 0x00, 0x04, keyIndex, 0x04, rapidTrigger.make * 10,
      rapidTrigger.break * 10, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
    ]
    const reportData = combineReportData(data)
    // sendOutputReport(reportData)
  }

  const handleGetDKSData = () => {
    const dataTotal = Boog75Constant.MAX_ADVANCED_KEY * 3
    const buffer: Array<number> = new Array(dataTotal);
    for (let i = 0; i < Boog75Constant.MAX_ADVANCED_KEY; i++) {
      buffer[i * 3] = i;
      buffer[i * 3 + 1] = 0;
      buffer[i * 3 + 2] = 0;
    }

    const packageCount = Math.ceil(dataTotal / 58)
    for (let i = 0; i < packageCount; i++) {
      const data = [
        0x00, 0x75, 0x00, 0x00, packageCount << 4 | i, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
      ]
      let dataSize = 1;
      for (let j = 5; j < 63; j++) {
        const bufferIdx = i * 58 + j - 5;
        if (bufferIdx < dataTotal) {
          data[j] = buffer[bufferIdx]
          dataSize++
        }
      }
      data[3] = dataSize
      // const reportData = combineReportData(data)
      // sendOutputReport(reportData)
    }
  }

//rs   snap
  const handleSetMTData2 = (advancedKey: API.Keyboard.AdvancedKey) => {
    const id = advancedKey.id
    if (advancedKey.type === "RS" && advancedKey.rs) {
      const rapidTrigger: API.Keyboard.RapidTrigger = { make: 1, break: 1 }
      keyMap.forEach(col => col.map(k => {
        if (k.idx === advancedKey.keyIndex && k.rapidTrigger) {
          rapidTrigger.make = k.rapidTrigger.make
          rapidTrigger.break = k.rapidTrigger.break
          return
        }
      }))
      // const data: Array<number> = [
      //   0x00, 0x34, 0x00, 0x16, id, Boog75Constant.DKS_MODE_MT, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
      // ]
      // data[6] = rapidTrigger.make * 10
      // data[7] = rapidTrigger.break * 10
      // if (advancedKey.pressTime) {
      //   data[8] = advancedKey.pressTime & 0xFF
      //   data[9] = advancedKey.pressTime >> 8 & 0xFF
      // } else {
      //   data[8] = 0xC8
      //   data[9] = 0x00
      // }

      // if (advancedKey.mt[0].vkCode || advancedKey.mt[1].vkCode) {
      //   if (advancedKey.mt[0].vkCode) {
      //     data[10] = Number(advancedKey.mt[0].vkCode)
      //     data[11] = 0
      //   }
      //   if (advancedKey.mt[1].vkCode) {
      //     data[12] = Number(advancedKey.mt[1].vkCode)
      //     data[13] = 0
      //   }

      //   const reportData = combineReportData(data)
      //   sendOutputReport(reportData)
      //}
    }
  }

  const handleSetMTData = (advancedKey: API.Keyboard.AdvancedKey) => {
    //alert('新版MT')
    if(deviceVersion==='V28'||deviceVersion==='V29'||deviceVersion==='V30')
      {
    const id = advancedKey.id
    if (advancedKey.type === "MT" && advancedKey.mt) {
      const rapidTrigger: API.Keyboard.RapidTrigger = { make: 1, break: 1 }
      keyMap.forEach(col => col.map(k => {
        if (k.idx === advancedKey.keyIndex && k.rapidTrigger) {
          rapidTrigger.make = k.rapidTrigger.make
          rapidTrigger.break = k.rapidTrigger.break
          return
        }
      }))
      // const data: Array<number> = [
      //   0x00, 0x34, 0x00, 0x16, id, Boog75Constant.DKS_MODE_MT, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
      // ]
       const data: Array<number> = [
        0x00, 0x60, 0x00, 0x16, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
      ]
      data[4]=0x10//1g个包
      data[5]=0x04 //4 mt
      data[6]=id //高级键索引
      // data[7]=0x00 //存什么
      // data[8]=0x00 //存什么
      // // head
      data[7]=Boog75Constant.DKS_MODE_MT //mt

      data[8] = rapidTrigger.make * 10
      data[9] = rapidTrigger.break * 10
      if (advancedKey.pressTime) {
        data[10] = advancedKey.pressTime & 0xFF
        data[11] = advancedKey.pressTime >> 8 & 0xFF
      } else {
        data[10] = 0xC8
        data[11] = 0x00
      }

      if (advancedKey.mt[0].vkCode || advancedKey.mt[1].vkCode) {
        if (advancedKey.mt[0].vkCode) {
          data[12] = Number(advancedKey.mt[0].vkCode)
          data[13] = 0
        }
        if (advancedKey.mt[1].vkCode) {
          data[14] = Number(advancedKey.mt[1].vkCode)
          data[15] = 0
        }

        const reportData = combineReportData(data)
        sendOutputReport(reportData)
      }
    }
  }else{
    handleSetMTDataOld(advancedKey)
  }
  }
  const handleSetMTDataOld = (advancedKey: API.Keyboard.AdvancedKey) => {
    // alert('V26版及之前的版本')
    const id = advancedKey.id
    if (advancedKey.type === "MT" && advancedKey.mt) {
      const rapidTrigger: API.Keyboard.RapidTrigger = { make: 1, break: 1 }
      keyMap.forEach(col => col.map(k => {
        if (k.idx === advancedKey.keyIndex && k.rapidTrigger) {
          rapidTrigger.make = k.rapidTrigger.make
          rapidTrigger.break = k.rapidTrigger.break
          return
        }
      }))
      const data: Array<number> = [
        0x00, 0x34, 0x00, 0x16, id, Boog75Constant.DKS_MODE_MT, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
      ]
      data[6] = rapidTrigger.make * 10
      data[7] = rapidTrigger.break * 10
      if (advancedKey.pressTime) {
        data[8] = advancedKey.pressTime & 0xFF
        data[9] = advancedKey.pressTime >> 8 & 0xFF
      } else {
        data[8] = 0xC8
        data[9] = 0x00
      }

      if (advancedKey.mt[0].vkCode || advancedKey.mt[1].vkCode) {
        if (advancedKey.mt[0].vkCode) {
          data[10] = Number(advancedKey.mt[0].vkCode)
          data[11] = 0
        }
        if (advancedKey.mt[1].vkCode) {
          data[12] = Number(advancedKey.mt[1].vkCode)
          data[13] = 0
        }

        const reportData = combineReportData(data)
        sendOutputReport(reportData)
      }
    }
  }
  //迅洁
  const handleSetRSData = (advancedKey: API.Keyboard.AdvancedKey) => {
    const id = advancedKey.id
    if (advancedKey.type === "RS" && advancedKey.rs) {
      const rapidTrigger: API.Keyboard.RapidTrigger = { make: 1, break: 1 }
      keyMap.forEach(col => col.map(k => {
        if (k.idx === advancedKey.keyIndex && k.rapidTrigger) {
          rapidTrigger.make = k.rapidTrigger.make
          rapidTrigger.break = k.rapidTrigger.break
          return
        }
      }))
      // const data: Array<number> = [
      //   0x00, 0x34, 0x00, 0x16, id, Boog75Constant.DKS_MODE_MT, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
      // ]
      const data: Array<number> = [
        0x00, 0x34, 0x00, 0x0a, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
      ]
//       USER_MODE_DATA_HEADER Header;
// BYTE cbFlag: 7; // 子模式
// BYTE cbAlternative: 1; // Alternative fully pressed behaviour
// BYTE cbKeyIndex [4]; // 用户可以定制 SOCD 按键时的 KEY 索引，最大支持 4 个 KEY
      //head
      data[4] =0x00//0层
      data[5] =0x00//不懂意思 cbCheckFlag 是快速触发吗
      data[6] =0x00//不懂意思 cbKeyIndex [4] 
      data[7] =Boog75Constant.DKS_MODE_RS//01
      // head end
      data[8]=0x00//


      data[9]=0x00//子模式+全压
     
      // //2个键值信息，键值信息需要哪些值

      // data[6] = rapidTrigger.make * 10
      // data[7] = rapidTrigger.break * 10
      // if (advancedKey.pressTime) {
      //   data[8] = advancedKey.pressTime & 0xFF
      //   data[9] = advancedKey.pressTime >> 8 & 0xFF
      // } else {
      //   data[8] = 0xC8
      //   data[9] = 0x00
      // }

      if (advancedKey.rs[0].vkCode || advancedKey.rs[1].vkCode) {
        if (advancedKey.rs[0].vkCode) {
          data[10] = Number(advancedKey.rs[0].keyIndex)
          //data[11] = 0
        }
        if (advancedKey.rs[1].vkCode) {
          data[11] = Number(advancedKey.rs[1].keyIndex)
         // data[13] = 0
        }

        const reportData = combineReportData(data)
        sendOutputReport(reportData)
      }
    }
  }
  //socd
  const handleSetSTData = (advancedKey: API.Keyboard.AdvancedKey) => {
    const id = advancedKey.id
    if (advancedKey.type === "ST" && advancedKey.st) {
      const rapidTrigger: API.Keyboard.RapidTrigger = { make: 1, break: 1 }
      keyMap.forEach(col => col.map(k => {
        if (k.idx === advancedKey.keyIndex && k.rapidTrigger) {
          rapidTrigger.make = k.rapidTrigger.make
          rapidTrigger.break = k.rapidTrigger.break
          return
        }
      }))
      // const data: Array<number> = [
      //   0x00, 0x34, 0x00, 0x16, id, Boog75Constant.DKS_MODE_MT, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
      // ]
      const data: Array<number> = [
        0x00, 0x34, 0x00, 0x0a, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
      ]
//       USER_MODE_DATA_HEADER Header;
// BYTE cbFlag: 7; // 子模式
// BYTE cb   native: 1; // Alternative fully pressed behaviour
// BYTE cbKeyIndex [4]; // 用户可以定制 SOCD 按键时的 KEY 索引，最大支持 4 个 KEY
      //head
      data[4] =0x00//0层 
      data[5] =0x00//
      data[6] =0x00//
      data[7] =Boog75Constant.DKS_MODE_ST//02
      // head end
      data[8]=0x00//
    //  const a1=0x00
    //  const a2=1<<7
    //  alert(0X01<<7|3)
      data[9]=advancedKey.fullPress<<7|advancedKey.socdType//0-7bit为模式，8bit为全压迫
      //alert(data[9])
      //2个键值信息，键值信息需要哪些值

      // data[6] = rapidTrigger.make * 10
      // data[7] = rapidTrigger.break * 10
      // if (advancedKey.pressTime) {
      //   data[8] = advancedKey.pressTime & 0xFF
      //   data[9] = advancedKey.pressTime >> 8 & 0xFF
      // } else {
      //   data[8] = 0xC8
      //   data[9] = 0x00
      // }
      
      if (advancedKey.st[0].vkCode || advancedKey.st[1].vkCode) {
        if (advancedKey.st[0].vkCode) {
          //data[10] = Number(advancedKey.st[0].vkCode)
          //data[11] = 0
          data[10] = Number(advancedKey.st[0].keyIndex)
        }
        if (advancedKey.st[1].vkCode) {
         // data[11] = Number(advancedKey.st[1].vkCode)
        //  data[13] = 0
        data[11] = Number(advancedKey.st[1].keyIndex)
        }

        const reportData = combineReportData(data)
        sendOutputReport(reportData)
      }
    }
  }
  const handleSetDKSData= (advancedKey: API.Keyboard.AdvancedKey) => {
    //alert(deviceVersion)
       //alert("dks新,有问题")
       if(deviceVersion==='V28'||deviceVersion==='V29'||deviceVersion==='V30')
       {
    const id = advancedKey.id
    if (advancedKey.type === "DKS" && advancedKey.dks) {
      // const data: Array<number> = [
      //   0x00, 0x34, 0x00, 0x16, id, Boog75Constant.DKS_MODE_FULL, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
      // ]

      const data: Array<number> = [
        0x00, 0x60, 0x00, 0x16, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
      ]
      data[4]=0x00 //1个包
      data[5]=0x04 // dks 04
      data[6]=id //宏索引或者高级键索引
      data[7]=Boog75Constant.DKS_MODE_FULL //dks




    const num=2
      data[6+num] = (advancedKey.fitstTriggerPos || 1) * 10
      data[7+num] = 36
      data[8+num] = 36
      data[9+num] = (advancedKey.lastTriggerPos || 1) * 10

      if (advancedKey.dks[0].vkCode) {
        const dksStatus = handleGetDKSStatus(advancedKey.dks[0])
        data[10+num] = dksStatus[0]
        data[11+num] = dksStatus[1]
        data[12+num] = Number(advancedKey.dks[0].vkCode)
        data[13+num] = 0x00
       // data[3]=0x10 //1个包
      }
      if (advancedKey.dks[1].vkCode) {
        const dksStatus = handleGetDKSStatus(advancedKey.dks[1])
        data[14+num] = dksStatus[0]
        data[15+num] = dksStatus[1]
        data[16+num] = Number(advancedKey.dks[1].vkCode)
        data[17+num] = 0x00
        //data[3]=0x14 //1个包
      }
      if (advancedKey.dks[2].vkCode) {
        const dksStatus = handleGetDKSStatus(advancedKey.dks[2])
        data[18+num] = dksStatus[0]
        data[19+num] = dksStatus[1]
        data[20+num] = Number(advancedKey.dks[2].vkCode)
        data[21+num] = 0x00
         //data[3]=0x18 //1个包
      }
      if (advancedKey.dks[3].vkCode) {
        const dksStatus = handleGetDKSStatus(advancedKey.dks[3])
        data[22+num] = dksStatus[0]
        data[23+num] = dksStatus[1]
        data[24+num] = Number(advancedKey.dks[3].vkCode)
        data[25+num] = 0x00
       // data[3]=0x1c //1个包
      }

      const reportData = combineReportData(data)
      sendOutputReport(reportData)
    }
  }
  else{
    handleSetDKSDataOld(advancedKey)
  }
  }
  const handleSetDKSDataOld = (advancedKey: API.Keyboard.AdvancedKey) => {
   // alert("dks新,v26正常")
    const id = advancedKey.id
    if (advancedKey.type === "DKS" && advancedKey.dks) {
      const data: Array<number> = [
        0x00, 0x34, 0x00, 0x16, id, Boog75Constant.DKS_MODE_FULL, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
      ]
      data[6] = (advancedKey.fitstTriggerPos || 1) * 10
      data[7] = 36
      data[8] = 36
      data[9] = (advancedKey.lastTriggerPos || 1) * 10

      if (advancedKey.dks[0].vkCode) {
        const dksStatus = handleGetDKSStatus(advancedKey.dks[0])
        data[10] = dksStatus[0]
        data[11] = dksStatus[1]
        data[12] = Number(advancedKey.dks[0].vkCode)
        data[13] = 0x00
      }
      if (advancedKey.dks[1].vkCode) {
        const dksStatus = handleGetDKSStatus(advancedKey.dks[1])
        data[14] = dksStatus[0]
        data[15] = dksStatus[1]
        data[16] = Number(advancedKey.dks[1].vkCode)
        data[17] = 0x00
      }
      if (advancedKey.dks[2].vkCode) {
        const dksStatus = handleGetDKSStatus(advancedKey.dks[2])
        data[18] = dksStatus[0]
        data[19] = dksStatus[1]
        data[20] = Number(advancedKey.dks[2].vkCode)
        data[21] = 0x00
      }
      if (advancedKey.dks[3].vkCode) {
        const dksStatus = handleGetDKSStatus(advancedKey.dks[3])
        data[22] = dksStatus[0]
        data[23] = dksStatus[1]
        data[24] = Number(advancedKey.dks[3].vkCode)
        data[25] = 0x00
      }

      const reportData = combineReportData(data)
      sendOutputReport(reportData)
    }
  }
  const splitIntoHighLowBytes=(value: number): [number, number]=> {
    const highByte = (value >> 8) & 0xFF; // 右移8位，然后与0xFF进行与操作，获取高位字节
    const lowByte = value & 0xFF; // 与0xFF进行与操作，获取低位字节
    return [lowByte, highByte];
}
   //获取DKS状态
   const handleGetDKSStatus = (dksKey: API.Keyboard.DKSKey) => {
    let dksStatus = [0x00, 0x00]
    //
    let binaryVar: number = 0b0;
    if (dksKey.data[0].visible) {
      //0|1|0 111
    //  dksStatus[0] = dksStatus[0] | 0x01 | 0x01 << dksKey.data[0].dataType
      let v=0b00;
      if(dksKey.data[0].dataType==3)//
      {
        //binaryVar=0b111111111//前8位都是1
        v=parseInt('000'+'011'+'111'+'111',2);  
      }
      if(dksKey.data[0].dataType==2)//
      {
        v=parseInt('000'+'000'+'011'+'111',2);//前6位都是1
      }
      if(dksKey.data[0].dataType==1)//
      {
        v=parseInt('000'+'000'+'000'+'011',2);//前3位都是1
      }
      if(dksKey.data[0].dataType==0)//
      {
        v=parseInt('000'+'000'+'000'+'001',2)//前3位都是1
      }
      binaryVar=binaryVar|v;
      //dksKey.data[0].visibleMaxLimit
    }
    if (dksKey.data[1].visible) {
      let v=0b00;
      if(dksKey.data[1].dataType==2)//bit3-bit8
      {
        v=parseInt('000'+'011'+'111'+'000',2);//前6位都是1
      }
      if(dksKey.data[1].dataType==1)//
      {
        v=parseInt('000'+'000'+'011'+'000',2);//前3位都是1
      }
      if(dksKey.data[1].dataType==0)//
      {
        v=parseInt('000'+'000'+'001'+'000',2)//前3位都是1
      }
      binaryVar=binaryVar|v;
      // const v = 0x01 << 4
      // //1|1000|1000
      // dksStatus[0] = dksStatus[0] | v | v << dksKey.data[0].dataType
    }
    if (dksKey.data[2].visible) {
      let v=0b00; 
      if(dksKey.data[2].dataType==1)//
      {
        v=parseInt('000'+'011'+'000'+'000',2);//前3位都是1
      }
      if(dksKey.data[2].dataType==0)//
      {
        v=parseInt('000'+'001'+'000'+'000',2)//前3位都是1
      }
      binaryVar=binaryVar|v;
      // const v = 0x01 << 7
      // //dksStatus[0]|1000000|
      // dksStatus[0] = dksStatus[0] | v
      // if (dksKey.data[2].dataType === 1) {
      //   dksStatus[1] = 0x01
      // }
    }
    if (dksKey.data[3].visible) {
      
      //const v = 0x01 << 10
      let v=parseInt('001'+'000'+'000'+'000',2)
      binaryVar=binaryVar|v;
      //dksStatus[1] = 0x02
    }
    dksStatus=splitIntoHighLowBytes(binaryVar)
    return dksStatus
  }
  //获取DKS状态
  const handleGetDKSStatus2 = (dksKey: API.Keyboard.DKSKey) => {
    let dksStatus = [0x00, 0x00]
    if (dksKey.data[0].visible) {
      dksStatus[0] = dksStatus[0] | 0x01 | 0x01 << dksKey.data[0].dataType
    }
    if (dksKey.data[1].visible) {
      const v = 0x01 << 4
      dksStatus[0] = dksStatus[0] | v | v << dksKey.data[0].dataType
    }
    if (dksKey.data[2].visible) {
      const v = 0x01 << 7
      dksStatus[0] = dksStatus[0] | v
      if (dksKey.data[2].dataType === 1) {
        dksStatus[1] = 0x01
      }
    }
    if (dksKey.data[3].visible) {
      dksStatus[1] = 0x02
    }
    return dksStatus
  }

  const handleGetSNData = () => {
    const data = [
      0x00, 0x0D, 0x00, 0x01, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
    ]
    const reportData = combineReportData(data)
    sendOutputReport(reportData)
  }

  const handleSetSNData = () => {

  }

  const handleGetMacroData = (paramIndex: number) => {
    for (let i = 0x00; i < 0x04; i++) {
      const data = [
        0x00, 0x61, 0x00, 0x02, 0x40 | i, paramIndex, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
      ]
      const reportData = combineReportData(data)
      sendOutputReport(reportData)
    }

    if (macroId < Boog75Constant.MAX_MACRO) {
      setMarcoId(macroId + 1)
    }
  }

  const handleSetMacroData = (id: number) => {
    handleSetMacroDataHandler(macroList, id);
  }//
  const handleSetMacroDataHandler555 = (list: Array<API.Keyboard.Macro>, id: number) => {
    //0x60  0x20+type   宏设置
   // alert('宏设置新')  
    if(deviceVersion==='V28'||deviceVersion==='V29'||deviceVersion==='V30')
      {
    list.forEach((macro) => {
      if (macro.id === id || id === 999) {
        if (macro.del) {
          for (let i = 0; i < 4; i++) {
            const dataSize = i < 3 ? 58 : 42;
            const data: Array<number> = [
              0x00, 0x60, 0x00, dataSize + 1, 0x40 | i
            ]
            for (let j = 0; j < 58; j++) {
              if (j < dataSize) {
                if (i === 0 && j === 0) {
                  data.push(macro.id)
                } else {
                  data.push(0xff);
                }
              } else {
                data.push(0x00);
              }
            }
            const reportData = combineReportData(data)
            sendOutputReport(reportData)
          }
        } else {
          const totalSize = 215; //2+32+1+60*3;
          const macroDataList = macro.data;
          const buffer: Array<number> = new Array(totalSize + 1);
          const encoder = new TextEncoder();
          const chName = encoder.encode(macro.title);
          let cbFlag = 0xFE;
          if (macro.executeType === 0) {
            cbFlag = 0xFE;
          } else if (macro.executeType === 1) {
            cbFlag = 0xFF;
          } else if (macro.executeType === 2) {
            cbFlag = macro.executeCount;
          }

          buffer[0] = macro.id;
          for (let i = 0; i < 32; i++) {
            if (chName.length > i) {
              buffer[i + 3] = chName[i];
            } else {
              buffer[i + 3] = 0;
            }
          }
          buffer[35] = cbFlag;

          const macroDataSize = macroDataList.length;
          for (let i = 0; i < macroDataSize; i++) {
            const macroData = macroDataList[i];
            buffer[36 + i * 3] = macroData.vkCode;
            buffer[37 + i * 3] = Math.round(macroData.spanTime / 5);
            buffer[38 + i * 3] = macroData.keyState === 1 ? 0x80 : 0x00;

            if (macroData.vkCode === KEYCODE_DICT.VK_SHIFT) {
              buffer[36 + i * 3] = KEYCODE_DICT.VK_LSHIFT
            } else if (macroData.vkCode === KEYCODE_DICT.VK_CONTROL) {
              buffer[36 + i * 3] = KEYCODE_DICT.VK_LCONTROL
            } else if (macroData.vkCode === KEYCODE_DICT.VK_MENU) {
              buffer[36 + i * 3] = KEYCODE_DICT.VK_LMENU
            }
          }

          if (totalSize - 35 > macroDataSize * 3) {
            for (let i = 0; i < (totalSize - 35 - macroDataSize * 3); i++) {
              buffer[36 + macroDataSize * 3 + i] = 0;
            }
          }

          const wSize = 2 + 32 + 1 + macroDataSize * 3;
          buffer[1] = wSize & 0xff;
          buffer[2] = (wSize >> 8) & 0xff;

          const packageSize = Math.ceil(buffer.length / 58)
          for (let i = 0; i < packageSize; i++) {
            const packageData = buffer.slice(0 + 58 * i, 58 + 58 * i)
            const dataSize = packageData.length;
            const data: Array<number> = [
              0x00, 0x60, 0x00, dataSize + 1, 0x40 | i
            ]
             
            for (let i = 0; i < packageData.length; i++) {
              data.push(packageData[i]);
            }
            const reportData = combineReportData(data)
            sendOutputReport(reportData)
          }
        }
      }
    })

    const newMacroList = list.map((item) => {
      item.sync = true;
      return item;
    })
    setMacroList(newMacroList);
  }
  else{
    handleSetMacroDataHandlerOld(list,id)
  }
  }
  const handleSetMacroDataHandler = (list: Array<API.Keyboard.Macro>, id: number) => {
    //0x60  0x20+type   宏设置
    if(deviceVersion==='V28'||deviceVersion==='V29'||deviceVersion==='V30')
      {
    list.forEach((macro) => {
      if (macro.id === id || id === 999) {
        if (macro.del) {
          for (let i = 0; i < 4; i++) {
            const dataSize = i < 3 ? 58 : 42;
            const data: Array<number> = [
              0x00, 0x60, 0x00, dataSize + 1, 0x40 | i
            ]
            for (let j = 0; j < 58; j++) {
              if (j < dataSize) {
                if (i === 0 && j === 0) {
                  data.push(macro.id)
                } else {
                  data.push(0xff);
                }
              } else {
                data.push(0x00);
              }
            }
            const reportData = combineReportData(data)
            sendOutputReport(reportData)
          }
        } else {
          const totalSize = 215; //2+32+1+60*3;
          const macroDataList = macro.data;
          const buffer: Array<number> = new Array(totalSize + 1);
          const encoder = new TextEncoder();
          const chName = encoder.encode(macro.title);
          let cbFlag = 0xFE;
          if (macro.executeType === 0) {
            cbFlag = 0xFE;
          } else if (macro.executeType === 1) {
            cbFlag = 0xFF;
          } else if (macro.executeType === 2) {
            cbFlag = macro.executeCount;
          }
          //buffer[0] = 0x01;
          const num=0;
          buffer[0+num] = macro.id;
          for (let i = 0; i < 32; i++) {
            if (chName.length > i) {
              buffer[i + 3+num] = chName[i];
            } else {
              buffer[i + 3+num] = 0;
            }
          }
          buffer[35+num] = cbFlag;

          const macroDataSize = macroDataList.length;
          for (let i = 0; i < macroDataSize; i++) {
            const macroData = macroDataList[i];
            buffer[36 + i * 3+num] = macroData.vkCode;
            buffer[37 + i * 3+num] = Math.round(macroData.spanTime / 5);
            buffer[38 + i * 3+num] = macroData.keyState === 1 ? 0x80 : 0x00;

            if (macroData.vkCode === KEYCODE_DICT.VK_SHIFT) {
              buffer[36 + i * 3+num] = KEYCODE_DICT.VK_LSHIFT
            } else if (macroData.vkCode === KEYCODE_DICT.VK_CONTROL) {
              buffer[36 + i * 3+num] = KEYCODE_DICT.VK_LCONTROL
            } else if (macroData.vkCode === KEYCODE_DICT.VK_MENU) {
              buffer[36 + i * 3+num] = KEYCODE_DICT.VK_LMENU
            }
          }

          if (totalSize - 35 > macroDataSize * 3) {
            for (let i = 0; i < (totalSize - 35 - macroDataSize * 3); i++) {
              buffer[36 + macroDataSize * 3 + i+num] = 0;
            }
          }

          const wSize = 2 + 32 + 1 + macroDataSize * 3;
          buffer[1+num] = wSize & 0xff;
          buffer[2+num] = (wSize >> 8) & 0xff; 
          const sizetype=57
          const packageSize = Math.ceil(buffer.length / sizetype)
          for (let i = 0; i < packageSize; i++) {
            const packageData = buffer.slice(0 + sizetype * i, sizetype + sizetype * i)
            const dataSize = packageData.length;
            const data: Array<number> = [
              0x00, 0x60, 0x00, dataSize + 1, 0x40 | i,0x01
            ]
            for (let i = 0; i < packageData.length; i++) {
              data.push(packageData[i]);
            }
            
            const reportData = combineReportData(data)
            sendOutputReport(reportData)
          }
        }
      }1
    })

    const newMacroList = list.map((item) => {
      item.sync = true;
      return item;
    })
    setMacroList(newMacroList);
  }else{
    handleSetMacroDataHandlerOld(list,id)
  }
  }

  const handleSetMacroDataHandlerOld= (list: Array<API.Keyboard.Macro>, id: number) => {
    list.forEach((macro) => {
      if (macro.id === id || id === 999) {
        if (macro.del) {
          for (let i = 0; i < 4; i++) {
            const dataSize = i < 3 ? 58 : 42;
            const data: Array<number> = [
              0x00, 0x60, 0x00, dataSize + 1, 0x40 | i
            ]
            for (let j = 0; j < 58; j++) {
              if (j < dataSize) {
                if (i === 0 && j === 0) {
                  data.push(macro.id)
                } else {
                  data.push(0xff);
                }
              } else {
                data.push(0x00);
              }
            }
            const reportData = combineReportData(data)
            sendOutputReport(reportData)
          }
        } else {
          const totalSize = 215; //2+32+1+60*3;
          const macroDataList = macro.data;
          const buffer: Array<number> = new Array(totalSize + 1);
          const encoder = new TextEncoder();
          const chName = encoder.encode(macro.title);
          let cbFlag = 0xFE;
          if (macro.executeType === 0) {
            cbFlag = 0xFE;
          } else if (macro.executeType === 1) {
            cbFlag = 0xFF;
          } else if (macro.executeType === 2) {
            cbFlag = macro.executeCount;
          }

          buffer[0] = macro.id;
          for (let i = 0; i < 32; i++) {
            if (chName.length > i) {
              buffer[i + 3] = chName[i];
            } else {
              buffer[i + 3] = 0;
            }
          }
          buffer[35] = cbFlag;

          const macroDataSize = macroDataList.length;
          for (let i = 0; i < macroDataSize; i++) {
            const macroData = macroDataList[i];
            buffer[36 + i * 3] = macroData.vkCode;
            buffer[37 + i * 3] = Math.round(macroData.spanTime / 5);
            buffer[38 + i * 3] = macroData.keyState === 1 ? 0x80 : 0x00;

            if (macroData.vkCode === KEYCODE_DICT.VK_SHIFT) {
              buffer[36 + i * 3] = KEYCODE_DICT.VK_LSHIFT
            } else if (macroData.vkCode === KEYCODE_DICT.VK_CONTROL) {
              buffer[36 + i * 3] = KEYCODE_DICT.VK_LCONTROL
            } else if (macroData.vkCode === KEYCODE_DICT.VK_MENU) {
              buffer[36 + i * 3] = KEYCODE_DICT.VK_LMENU
            }
          }

          if (totalSize - 35 > macroDataSize * 3) {
            for (let i = 0; i < (totalSize - 35 - macroDataSize * 3); i++) {
              buffer[36 + macroDataSize * 3 + i] = 0;
            }
          }

          const wSize = 2 + 32 + 1 + macroDataSize * 3;
          buffer[1] = wSize & 0xff;
          buffer[2] = (wSize >> 8) & 0xff;

          const packageSize = Math.ceil(buffer.length / 58)
          for (let i = 0; i < packageSize; i++) {
            const packageData = buffer.slice(0 + 58 * i, 58 + 58 * i)
            const dataSize = packageData.length;
            const data: Array<number> = [
              0x00, 0x60, 0x00, dataSize + 1, 0x40 | i
            ]
            for (let i = 0; i < packageData.length; i++) {
              data.push(packageData[i]);
            }
            const reportData = combineReportData(data)
            sendOutputReport(reportData)
          }
        }
      }
    })

    const newMacroList = list.map((item) => {
      item.sync = true;
      return item;
    })
    setMacroList(newMacroList);
  }
  const handleSetMacroDataHandler2 = (list: Array<API.Keyboard.Macro>, id: number) => {
    //0x60  0x20+type   宏设置
    list.forEach((macro) => {
      if (macro.id === id || id === 999) {
        if (macro.del) {
          for (let i = 0; i < 4; i++) {
            const dataSize = i < 3 ? 58 : 42;
            const data: Array<number> = [
              0x00, 0x60, 0x00, dataSize + 1, 0x40 | i
            ]
            for (let j = 0; j < 58; j++) {
              if (j < dataSize) {
                if (i === 0 && j === 0) {
                  data.push(macro.id)
                } else {
                  data.push(0xff);
                }
              } else {
                data.push(0x00);
              }
            }
            const reportData = combineReportData(data)
            sendOutputReport(reportData)
          }
        } else {
          const totalSize = 215; //2+32+1+60*3;
          const macroDataList = macro.data;
          const buffer: Array<number> = new Array(totalSize + 1);
          const encoder = new TextEncoder();
          const chName = encoder.encode(macro.title);
          let cbFlag = 0xFE;
          if (macro.executeType === 0) {
            cbFlag = 0xFE;
          } else if (macro.executeType === 1) {
            cbFlag = 0xFF;
          } else if (macro.executeType === 2) {
            cbFlag = macro.executeCount;
          }

          buffer[0] = macro.id;
          for (let i = 0; i < 32; i++) {
            if (chName.length > i) {
              buffer[i + 3] = chName[i];
            } else {
              buffer[i + 3] = 0;
            }
          }
          buffer[35] = cbFlag;

          const macroDataSize = macroDataList.length;
          for (let i = 0; i < macroDataSize; i++) {
            const macroData = macroDataList[i];
            buffer[36 + i * 3] = macroData.vkCode;
            buffer[37 + i * 3] = Math.round(macroData.spanTime / 5);
            buffer[38 + i * 3] = macroData.keyState === 1 ? 0x80 : 0x00;

            if (macroData.vkCode === KEYCODE_DICT.VK_SHIFT) {
              buffer[36 + i * 3] = KEYCODE_DICT.VK_LSHIFT
            } else if (macroData.vkCode === KEYCODE_DICT.VK_CONTROL) {
              buffer[36 + i * 3] = KEYCODE_DICT.VK_LCONTROL
            } else if (macroData.vkCode === KEYCODE_DICT.VK_MENU) {
              buffer[36 + i * 3] = KEYCODE_DICT.VK_LMENU
            }
          }

          if (totalSize - 35 > macroDataSize * 3) {
            for (let i = 0; i < (totalSize - 35 - macroDataSize * 3); i++) {
              buffer[36 + macroDataSize * 3 + i] = 0;
            }
          }

          const wSize = 2 + 32 + 1 + macroDataSize * 3;
          buffer[1] = wSize & 0xff;
          buffer[2] = (wSize >> 8) & 0xff;

          const packageSize = Math.ceil(buffer.length / 58)
          for (let i = 0; i < packageSize; i++) {
            const packageData = buffer.slice(0 + 58 * i, 58 + 58 * i)
            const dataSize = packageData.length;
            const data: Array<number> = [
              0x00, 0x60, 0x00, dataSize + 1, 0x40 | i
            ]
            for (let i = 0; i < packageData.length; i++) {
              data.push(packageData[i]);
            }
            const reportData = combineReportData(data)
            sendOutputReport(reportData)
          }
        }
      }
    })

    const newMacroList = list.map((item) => {
      item.sync = true;
      return item;
    })
    setMacroList(newMacroList);
  }
  const handleSetLayerKeyButton = (layer: number, keyIndex: number, vkCode: number, macroId: number) => {
    const data: Array<number> = [
      0x00, 0x1C, 0x00, 0x04, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
    ]
    data[4] = layer
    data[5] = keyIndex
    data[6] = Number(vkCode)
    data[7] = Number(macroId)

    const reportData = combineReportData(data)
    sendOutputReport(reportData)
  }

  const handleSetLayerAllKeyButton = () => {
    const buffer: Array<API.Keyboard.KeyObject> = []
    keyMap.forEach(col => {
      col.forEach(keyObj => {
        if (!keyObj.isDisableChange && keyObj.vkCode > 0) {
          buffer.push(keyObj)
        }
      })
    })

    const packageCount = Math.ceil(buffer.length / 2)
    for (let i = 0; i < packageCount; i++) {
      const data: Array<number> = [
        0x00, 0x1C, 0x00, 0x04, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
      ]
      let dataSize = 0
      for (let j = 0; j < 2; j++) {
        const index = i * 2 + j
        if (index < buffer.length) {
          const keyObj = buffer[index]
          if (keyObj.idx) {
            dataSize += 4
            data[4 * j + 4] = layer
            data[4 * j + 5] = keyObj.idx
            data[4 * j + 6] = Number(keyObj.vkCode)
            data[4 * j + 7] = Number(keyObj.macroId)
          }
        }
      }
      data[3] = dataSize
      const reportData = combineReportData(data)
      sendOutputReport(reportData)
    }
  }

  const handleGetLayerKeyButton = (layer: number, keyIndex: number) => {
    const data: Array<number> = [
      0x00, 0x1D, 0x00, 0x04, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
    ]
    data[4] = layer
    data[5] = keyIndex

    const reportData = combineReportData(data)
    sendOutputReport(reportData)
  }


  const combineReportData = (reportData: Array<number>) => {
    let buffer = hex8(REPORT_ID)
    let checkSum: number = 0x00
    let i=0
    for (let byte of reportData) {
      if(byte===undefined){
        buffer += ' 00';
      }
      else{
        checkSum += byte;
        buffer += ' ' + hex8(byte)
      }
      i++
     // console.log('chensum'+i+'='+checkSum)
    }
    //console.log('chensum='+checkSum)
   // console.log('chensum22='+(checkSum & 0xff))
    return buffer += ' ' + hex8(0x55 - checkSum & 0xff)
    // let buffer = hex8(REPORT_ID)
    // let checkSum: number = 0x00;
    // for (let byte of reportData) {
    //   checkSum += byte;
    //   buffer += ' ' + hex8(byte)
    // }
    // return buffer += ' ' + hex8(0x55 - checkSum & 0xff)
  }

  const handleRenderDeviceVersion = async (inputReportData: any) => {
    const deviceVersion = inputReportData[4] | inputReportData[5] << 4
    const protocolVersion = inputReportData[9]
    const mcu2Version = inputReportData[10] | inputReportData[11] << 4

    setDeviceVersion("V" + hex8(deviceVersion))
    setProtocolVersion("V" + hex8(protocolVersion))
    setMcu2Version("V" + hex8(mcu2Version))
  }

  const handleRenderDataChangeFlag = async (inputReportData: any) => {
    const flag1 = inputReportData[4];
    if (flag1 != dataChangeFlag) {
      handleSetDataChangeFlag(dataChangeFlag, inputReportData[5], inputReportData[6], inputReportData[7])
    }
  }

  const handleRenderRGBColor = async (inputReportData: any) => {
    const lightOn = inputReportData[4]
    const lightEffet = inputReportData[5]
    const lightBrightness = inputReportData[6]
    const currentLedColorIndex = inputReportData[8]
    setLightOn(lightOn)
    setLightEffet(lightEffet)
    setLightBrightness(lightBrightness)
    setCurrentLedColorIndex(currentLedColorIndex)

    const rgb0 = { r: inputReportData[9], g: inputReportData[10], b: inputReportData[11], a: 1 }
    const hex0 = rgbaToHexa({ r: inputReportData[9], g: inputReportData[10], b: inputReportData[11], a: 1 })
    const hsv0 = rgbaToHsva(rgb0)
    const color0 = { hex: hex0, rgb: rgb0, hsv: hsv0 }
    setColor_0(color0)

    const rgb1 = { r: inputReportData[12], g: inputReportData[13], b: inputReportData[14], a: 1 }
    const hex1 = rgbaToHexa({ r: inputReportData[12], g: inputReportData[13], b: inputReportData[14], a: 1 })
    const hsv1 = rgbaToHsva(rgb1)
    const color1 = { hex: hex1, rgb: rgb1, hsv: hsv1 }
    setColor_1(color1)

    const rgb2 = { r: inputReportData[15], g: inputReportData[16], b: inputReportData[17], a: 1 }
    const hex2 = rgbaToHexa({ r: inputReportData[15], g: inputReportData[16], b: inputReportData[17], a: 1 })
    const hsv2 = rgbaToHsva(rgb2)
    const color2 = { hex: hex2, rgb: rgb2, hsv: hsv2 }
    setColor_2(color2)

    const rgb3 = { r: inputReportData[18], g: inputReportData[19], b: inputReportData[20], a: 1 }
    const hex3 = rgbaToHexa({ r: inputReportData[18], g: inputReportData[19], b: inputReportData[20], a: 1 })
    const hsv3 = rgbaToHsva(rgb3)
    const color3 = { hex: hex3, rgb: rgb3, hsv: hsv3 }
    setColor_3(color3)

    const rgb4 = { r: inputReportData[21], g: inputReportData[22], b: inputReportData[23], a: 1 }
    const hex4 = rgbaToHexa({ r: inputReportData[21], g: inputReportData[22], b: inputReportData[23], a: 1 })
    const hsv4 = rgbaToHsva(rgb4)
    const color4 = { hex: hex4, rgb: rgb4, hsv: hsv4 }
    setColor_4(color4)

    const rgb5 = { r: inputReportData[24], g: inputReportData[25], b: inputReportData[26], a: 1 }
    const hex5 = rgbaToHexa({ r: inputReportData[24], g: inputReportData[25], b: inputReportData[26], a: 1 })
    const hsv5 = rgbaToHsva(rgb5)
    const color5 = { hex: hex5, rgb: rgb5, hsv: hsv5 }
    setColor_5(color5)

    const rgb6 = { r: inputReportData[27], g: inputReportData[28], b: inputReportData[29], a: 1 }
    const hex6 = rgbaToHexa({ r: inputReportData[27], g: inputReportData[28], b: inputReportData[29], a: 1 })
    const hsv6 = rgbaToHsva(rgb6)
    const color6 = { hex: hex6, rgb: rgb6, hsv: hsv6 }
    setColor_6(color6)

    let lightSpeed = Boog75Constant.LIGHT_SPEED_DEFAULT
    switch (inputReportData[7]) {
      case 0:
        lightSpeed = 3
        break;
      case 1:
        lightSpeed = 2
        break;
      case 2:
        lightSpeed = 1
        break;
      case 3:
        lightSpeed = 0
        break;
    }
    setLightSpeed(lightSpeed)

    switch (inputReportData[8]) {
      case 0:
        setColor(color0)
        break;
      case 1:
        setColor(color1)
        break;
      case 2:
        setColor(color2)
        break;
      case 3:
        setColor(color3)
        break;
      case 4:
        setColor(color4)
        break;
      case 5:
        setColor(color5)
        break;
      case 6:
        setColor(color6)
        break;
    }
  }

  const handleRenderKeyButton = async (inputReportData: any) => {
    const dataSize = inputReportData[3];
    const packageType = inputReportData[4];
    let keyIndex = 0;
    let isComplete = false;
    if (packageType === 0x30) {
      keyIndex = 0;
    } else if (packageType === 0x31) {
      keyIndex = 29;
    } else if (packageType === 0x32) {
      keyIndex = 58;
      isComplete = true;
    }

    const buffer: Array<API.Keyboard.KeyObject> = []
    for (let i = 0; i < (dataSize - 1) / 2; i++) {
      const index = 5 + i * 2;
      const vkCode = inputReportData[index];
      const keyText = KEY_TEXT_DICT[vkCode];
      const isMacro = vkCode === KEYCODE_DICT.VK_MACRO
      const macroId = isMacro ? inputReportData[index + 1] : 0x00
      const isAdvancedKey = vkCode === KEYCODE_DICT.VK_ADVANCED_KEY
      const advancedKeyId = isAdvancedKey ? inputReportData[index + 1] : 0x00
      buffer.push({ idx: keyIndex, vkCode: vkCode, keyText: keyText, isMacro: isMacro, macroId: macroId, isAdvancedKey: isAdvancedKey, advancedKeyId: advancedKeyId })
      keyIndex++;
    }

    const newKeyMap = renderKeyMapBuffer.map((col, idx) => {
      return col.map((k, idx) => {
        let keyObj;
        buffer.forEach((item: any) => {
          if (k.idx === item.idx) {
            keyObj = item
            return;
          }
        })
        if (keyObj) {
          return { ...k, ...keyObj as API.Keyboard.KeyObject }
        } else {
          return k
        }
      })
    })
    renderKeyMapBuffer = newKeyMap;

    isComplete && handleSetKeyMap(newKeyMap)
  }

  const handleRenderMakeBreak = async (inputReportData: any) => {
    const packageType = inputReportData[4];
    let isComplete = false;
    if (packageType === 0x60) {
      rapidTriggerBuffer = []
    } else if (packageType === 0x65) {
      isComplete = true;
    }
    for (let i = 5; i < inputReportData.length - 1; i++) {
      rapidTriggerBuffer.push(inputReportData[i])
    }

    if (isComplete) {
      const rapidTriggerMap = new Map();
      for (let i = 0; i < rapidTriggerBuffer.length / 4; i++) {
        if (!rapidTriggerMap.get(rapidTriggerBuffer[i * 4])) {
          rapidTriggerMap.set(rapidTriggerBuffer[i * 4], { 'triggerMode': rapidTriggerBuffer[i * 4 + 1], 'makePos': rapidTriggerBuffer[i * 4 + 2], 'breakPos': rapidTriggerBuffer[i * 4 + 3] })
        }
      }

      const newKeyMap = renderKeyMapBuffer.map((col, idx) => {
        return col.map((k, idx) => {
          const triggerMode = rapidTriggerMap.get(k.idx).triggerMode
          let rapidTrigger = { make: rapidTriggerMap.get(k.idx).makePos / 10, break: rapidTriggerMap.get(k.idx).breakPos / 10 }
          if (rapidTrigger) {
            return { ...k, triggerMode: triggerMode, rapidTrigger: rapidTrigger }
          } else {
            return k
          }
        })
      })
      renderKeyMapBuffer = newKeyMap;
      isComplete && handleSetKeyMap(newKeyMap)
    }
  }

  const handleRenderSN = async (inputReportData: any) => {
  }

  const handleRenderMacro = async (inputReportData: any) => {
    const id = localMacroId;
    const dataSize = inputReportData[3];
    const packageType = inputReportData[4];
    if (inputReportData[5] === 0xff) {
      if (packageType === 0x43) {
        localMacroId++;
      }
      return;
    }

    if (packageType === 0x40) {
      let title = '';
      let cbFlag = 0xFE;
      let executeType = 0;
      let executeCount = 1;

      for (let i = 5 + 2; i < 32; i++) {
        if (inputReportData[i] === 0) {
          continue
        }
        title += String.fromCharCode(inputReportData[i]);
      }
      cbFlag = inputReportData[5 + 2 + 32]
      if (cbFlag === 0xFE) {
        executeType = 0;
      } else if (cbFlag === 0xFF) {
        executeType = 1;
      } else {
        executeType = 2;
        executeCount = cbFlag;
      }
      const macro: API.Keyboard.Macro = { id: id, title: title, data: [], executeType: executeType, executeCount: executeCount, sync: false }
      macroList.push(macro)
      setMacroList(macroList)


      let offset = 2 + 32 + 1;
      renderMarcoDataArr = [];
      for (let i = 0; i < dataSize - offset - 1; i++) {
        const index = 5 + offset + i;
        renderMarcoDataArr.push(inputReportData[index])
      }

    } else {
      for (let i = 0; i < dataSize - 1; i++) {
        const index = 5 + i;
        renderMarcoDataArr.push(inputReportData[index])
      }
    }

    if (packageType === 0x43) {
      const marcoDataList: Array<API.Keyboard.MacroData> = []
      let sort = 0;
      for (let i = 0; i < renderMarcoDataArr.length / 3; i++) {

        const vkCode = renderMarcoDataArr[i * 3];
        const spanTime = renderMarcoDataArr[i * 3 + 1] * 5;
        const keyState = renderMarcoDataArr[i * 3 + 2] === 0x80 ? 1 : 0;
        if ((vkCode === 0 && spanTime === 0 && keyState === 0) || i === 59) {
          continue;
        }

        marcoDataList.push({ vkCode: vkCode, spanTime: spanTime, keyState: keyState, sort: sort })
        sort++;
      }

      const newMacroList = macroList.map((item) => {
        if (item.id === id) {
          item.data = marcoDataList
          if (marcoDataList.length > 0) {
            item.sync = true
          } else {
            item.sync = false
          }
        }
        return item
      })
      setMacroList(newMacroList)
      localMacroId++
    }
  }

  const handleOnLoad = async () => {
    // Register for connection and disconnection events.
    (navigator as any).hid.onconnect = (e: any) => { addDevice(e.device) };
    (navigator as any).hid.ondisconnect = (e: any) => { removeDevice(e.device) };
    setLayer(0)
    // Fetch the list of connected devices.
    const devices = await (navigator as any).hid.getDevices()
    for (let device of devices)
      await addDevice(device)
  }

  const handleConnectDevice = () => {
    connectDevice()
  }

  const handleDisConnectDevice = () => {
    setLayer(0)
    removeDevice(selectedDevice)
  }

  // Displays the device chooser to allow the user to connect to a new device.
  // The selection is updated to the newly connected device.
  const connectDevice = async () => {
    const deviceFilter = [
      { vendorId: 14005, productId: 12175 },//boog75
      // { vendorId: 14005, productId: 13165 }//zoom65he
      // { vendorId: 14005, }
    ];
    const devices = await (navigator as any).hid.requestDevice({ filters: deviceFilter })
    // const devices = await navigator.hid.requestDevice({filters:[]})
    if (devices.length == 0)
      return;

    for (let device of devices)
      await addDevice(device)
  };

  // Adds |device| to |connectedDevices|. Selects the device if there was no prior
  // selection.
  const addDevice = async (device: any) => {
    if (selectedDevice === device) {
      return;
    }
    if (selectedDevice === null)
      await selectDevice(device)
  };

  // Removes |device| from |connectedDevices|.
  const removeDevice = (device: any) => {
    // if (device === selectedDevice && device !== null) {
    //   setSelectedDevice(null)
    // }
   
    setSelectedDevice(null)
    
   // setDeviceVersion('')
  };

  // Selects |device| and updates the device info display.
  const selectDevice = async (device: any) => {
    if (selectedDevice)
      selectedDevice.oninputreport = null;
    //alert(device.productId)
    if (device && device.collections[0].usagePage == 0xff01) {
      device.oninputreport = handleInputReport;
      if (!device.opened) {
        try {
          await device.open()
        } catch (e) {
          if (e instanceof DOMException) {
          } else {
            throw e;
          }
        }
      }
      setSelectedDevice(device)
    }
  };

  const handleInputReport = async (event: any) => {
    // let reportId = hex8(event.reportId)  
    const reportData: any = new Uint8Array(event.data.buffer)
    const cmd = reportData[1];
    const status = reportData[2];

    if (status === 0x00 && cmd === 0x05) {
      // handleRenderDataChangeFlag(reportData)
    } else if (status === 0x00 && cmd === 0x02) {
      await handleRenderDeviceVersion(reportData)
    } else if (status === 0x00 && cmd === 0x19) {
      await handleRenderRGBColor(reportData)
    } else if (status === 0x00 && cmd === 0x5B) {
      await handleRenderKeyButton(reportData)
    } else if (status === 0x00 && cmd === 0x71) {
      await handleRenderMakeBreak(reportData)
    } else if (status === 0x00 && cmd === 0x0D) {
      await handleRenderSN(reportData)
    } else if (status === 0x00 && cmd === 0x61) {
      await handleRenderMacro(reportData)
    }
  }

  const sendOutputReport = (outputReport: string) => {
    setShowLoading(true)
    try {
      if (!selectedDevice) {
        setShowAlert({ alert: true, alertTitle: intl.formatMessage({ id: "page.info" }), alertText: intl.formatMessage({ id: "index.notConnectedMsg" }), severity: 'warning' })
        return;
      }

      if (!outputReport)
        return;

      let data: any = parseHexArray(outputReport)

      let reportId = data.getUint8(0)
      let reportData = new Uint8Array(data.buffer).slice(1)

      selectedDevice.sendReport(reportId, reportData)
    } finally {
      setShowLoading(false)
    }
    setShowAlert({ alert: true, alertTitle: intl.formatMessage({ id: "page.info" }), alertText: intl.formatMessage({ id: "index.asyncMsg" }), severity: 'success' })
  };


  return (
    <Box sx={{ ml: 10, mr: 10 }}>
      <Box sx={{ height: "50px", zoom: zoom, minWidth:'1244px' }}>
      <Toolbar className={styles.toolbarDiv}>
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={handleShowVersion}>
            BOOG75qqq
          </Typography> */}
              
              <Image 
                      priority
                      src={isDarkMode ? "/images/logo_meletrix_white.png" : "/images/logo_meletrix_black.png"}
                      height={32}
                      width={155}
                      alt="meletrix"
                    />
                 <Typography  component="h2" sx={{ flexGrow: 1 }}>
                 {/* <span>&nbsp;&nbsp; Meletrix</span>*/}
                  </Typography> 
          <IconButton onClick={colorMode.toggleColorMode}>
            {isDarkMode ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
          <Link key={locale} href="/" locale={locale}>
            <TranslateIcon sx={{ color: isDarkMode ? 'white' : '#1a1a1a', pt: '8px', pl: '10px' }} />
          </Link>
        </Toolbar>
      </Box>

      <Box sx={{ margin: '10px' }}>
        <Grid container>
          <Grid xs={2} md={2} lg={2}
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              backgroundColor: isDarkMode ? '#15191c' : '#f2f6fc',
              borderRadius: '10px',
              padding: '5px',
              zoom: zoom,
            }}
          >
            <Stack spacing={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }} >
              {selectedDevice ? <Typography onClick={handleShowVersion} sx={{paddingLeft:'20px',marginTop:'15px',fontSize:'16px'}} width={'100%'} >
              
               {/* {selectedDevice.productId===12175?'BOOG75':selectedDevice.productName}  */}
              BOOG75&nbsp;
             
                {intl.formatMessage({ id: "index.connected" })}</Typography> : 
                <Typography sx={{paddingLeft:'20px',fontSize:'16px'}}  width={'100%'} color={'#96a0af'}>   BOOG75&nbsp;{intl.formatMessage({ id: "index.Noconnected" })}</Typography>
                }
              {!selectedDevice &&
                <Button fullWidth size="small" variant="contained" startIcon={<KeyboardIcon />} onClick={handleConnectDevice} sx={{ height: '44px', borderRadius: '10px', width: '90%' }}>
                  {intl.formatMessage({ id: "index.clickConnect" })}
                </Button>
              }
       
              {selectedDevice &&

                <Button fullWidth size="small" variant="contained" startIcon={<KeyboardIcon />} onClick={handleDisConnectDevice} sx={{ height: '44px', borderRadius: '10px', width: '90%' }} color='warning'>
                  {intl.formatMessage({ id: "index.disconnect" })}
                </Button>
              }
              <Typography variant="caption" gutterBottom align='left' sx={{ fontSize: '16px', width: '100%', paddingLeft: '20px', color: '#96a0af' }}>
                {intl.formatMessage({ id: "index.profile" })}
              </Typography>
              <List component="nav" aria-label="secondary mailbox folder" sx={{ width: '90%', textAlign: 'center' }} >
                <ListItem disablePadding
                  secondaryAction={
                    (selectedProfile.id === 0 &&
                      <IconButton
                        edge="end"
                        size='small'
                        onClick={() => setAlertDialogOpen2(true)}
                      >
                        <RestartAltIcon fontSize='inherit' />
                      </IconButton>
                    )
                  }>
                  <ListItemButton
                    key='DigitalProfileButton1'
                    sx={{ borderRadius: '10px' }}
                    selected={selectedProfile.id === 0}
                    onClick={(event) => handleProfileItemClick(event, digitalProfile)}
                  >
                    <ListItemText key='DigitalProfileText1' primary={intl.formatMessage({ id: "index.digitalProfile" })} primaryTypographyProps={{ variant: "body2" }} sx={{ textAlign: 'left', fontSize: '16px' }} />
                  </ListItemButton>
                </ListItem>
              </List>

              <Stack direction="row" spacing={1} sx={{ width: '90%' }}>
                <Button fullWidth size="small" variant="contained" startIcon={<AddIcon />} onClick={handleAddProfile} sx={{ borderRadius: '8px', height: '36px', fontSize: '14px' }}>
                  {intl.formatMessage({ id: "index.addProfile" })}
                </Button>
                <HelpPopover content={intl.formatMessage({ id: "index.importProfile" })} >
                  <Button component="label" size="small" variant="contained" sx={{ minWidth: '0px', height: '36px', width: '36px', padding: '0px', borderRadius: '8px' }}>
                    <UploadInput ref={importProfileRef} type="file" onChange={handleImportProfile} />
                    <Image
                      priority
                      src={isDarkMode ? "/images/import_black.png" : "/images/import_white.png"}
                      height={21}
                      width={21}
                      alt=""
                    />
                  </Button>
                </HelpPopover>
              </Stack>

              <List component="nav" aria-label="secondary mailbox folder" sx={{ width: '100%', textAlign: 'center' }}>
                {profileList.map((item, index) => {
                  return (
                    <ListItem key={item.id} disablePadding
                      secondaryAction={
                        <>
                          <IconButton
                            edge="end"
                            aria-label="profileOperate"
                            id={"profile-operate-button_" + item.id}
                            aria-controls={openProfileOperate ? 'long-menu' : undefined}
                            aria-expanded={openProfileOperate ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={(e) => handleClickProfileOperate(e, item.id)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <StyledMenu
                            id={"profile-operate-menu_" + item.id}
                            MenuListProps={{
                              'aria-labelledby': "profile-operate-button_" + item.id,
                            }}
                            anchorEl={profileOperateAnchorEl}
                            open={openProfileOperate && profileId === item.id}
                            onClose={handleCloseProfileOperate}
                          >
                            <Box sx={{ backgroundColor: isDarkMode ? '#20232a' : '#fff' }}>
                              <MenuItem onClick={() => handleExportProfile(item)} disableRipple>
                                <IosShareIcon />
                                {intl.formatMessage({ id: "page.export" })}
                              </MenuItem>
                              <MenuItem onClick={(event) => handleResetProfile(event, item.id)} disableRipple>
                                <RestartAltIcon />
                                {intl.formatMessage({ id: "page.reset" })}
                              </MenuItem>   
                              <MenuItem onClick={(event) => handleRenameProfile(event,item)} disableRipple>
                                <EditOutlineIcon />
                                {intl.formatMessage({ id: "index.rename" })}
                              </MenuItem>
                              <Divider sx={{ my: 0.5 }} />
                              <MenuItem onClick={(event) => handleDeleteProfile(event, item.id)} disableRipple>
                                <DeleteOutlineIcon />
                                {intl.formatMessage({ id: "page.delete" })}
                              </MenuItem>
                           
                            </Box>
                          </StyledMenu>
                        </>
                      }
                    >
                      <ListItemButton
                        key={item.id}
                        sx={{ borderRadius: '10px' }}
                        selected={selectedProfile.id === item.id}
                        onClick={(event) => handleProfileItemClick(event, item)}
                      >
                        {/* <ListItemText key={item.id} primary={intl.formatMessage({ id: "index.myDigitalProfile" }) + item.text} primaryTypographyProps={{ variant: "body2" }} sx={{ textAlign: 'left', fontSize: '26px' }} />
                     */}
                       {!item.isRename&& <ListItemText key={item.id} primary={item.text} primaryTypographyProps={{ variant: "body2" }} sx={{ textAlign: 'left', fontSize: '26px' }} />
                }
                     {/* {item.isRename&&<TextField
                                                  value={item.text}
                                                  autoFocus
                                                  id={'profile_input_' + item.id}
                                                  // label="Name"
                                                  variant="standard"
                                                  size="small"
                                                  onChange={(event: any) => { handleEditProfileChange(item, event.target.value) }}
                                                  onBlur={(event) => handRename(event, item.id)}
                                                  // onKeyDown={(event: any) => { event.keyCode === 13 && handleEditMacroComplete() }}
                                                  error={item.error}
                                                  // helperText={item.errorText}
                                                />
                     } */}
                      </ListItemButton>
                    </ListItem>
                  )
                })}
              </List>

              
            </Stack>
            {selectedDevice &&
                <Stack sx={{ display: 'flex', justifyContent: 'left', alignItems: 'left', width: '100%' }}>
<Typography variant="body2" gutterBottom  sx={{paddingLeft:'20px'}} >
{intl.formatMessage({ "id": "index.deviceVersion" }) + deviceVersion}
</Typography>
<Typography variant="body2" gutterBottom  sx={{paddingLeft:'20px'}} >
{intl.formatMessage({ "id": "index.mcu2Version" }) + mcu2Version}
</Typography>
<Typography variant="body2" gutterBottom  sx={{paddingLeft:'20px'}} >
{intl.formatMessage({ "id": "index.protocolVersion" }) + protocolVersion}
</Typography>
</Stack>
}
            {/* <Paper sx={{ m: '5px', backgroundColor: isDarkMode ? '#20232a' : '#fff' }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {intl.formatMessage({ id: "page.features.title" })}
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', mt: '10px' }}>
                  {intl.formatMessage({ id: "page.features.content" })}
                </Typography>
              </CardContent>
            </Paper> */}
          </Grid>

          <Grid xs={10} md={10} lg={10} sx={{ padding: '0px 0px 0px 10px' }}>
            <Typography  gutterBottom align='left' sx={{ zoom: zoom,fontSize:'16px' }}>
              {(selectedProfile.id > 0 ? intl.formatMessage({ id: "index.myDigitalProfile" }) : '') + selectedProfile.text}
            </Typography>
            <CustomKeyboard
              deviceID={productId}
              keyMap={keyMap}
              macroList={macroList}
              ableSelectKey={ableSelectKey}
              bottomNavigation={bottomNavigation}
              zoom={zoom}
              isAdvanceRT={isAdvanceRT}
              layer={layer}
              isConnected={isConnected}
              // onGetAdvance={handGetAdvance}
              onKeyChange={handleKeyChange}
              onKeyChangeHight={handleKeyChangeHight}
              onKeyChangeHightMore={handleKeyChangeHightMore}
              isAbleSelectKey={ableSelectKey}
              onSelected={handleSelectd}//是否可选
              onSelectedRT={handleSelectdRT}//是否可选
              getCurrentAdvancedKey={handleCurrentAdvancedKey}
              onAdvance={handleAdvance}
              onAddAdvancedKey={handleAddAdvancedKey}
              onOpenAdvancedKeyPanel={handleOpenAdvancedKeyPanel}
              onTglSwitch={handleTglSwitch}
              onChangeLayer={handleChangeLayer}
              deviceVersion={deviceVersion}
            />
            <Box sx={{ position: 'relative' }}>
              {isConnected && bottomNavigation < 3 && layer === 0 &&
                <Button size="small" variant="contained" color='warning' startIcon={<SyncIcon />} onClick={handleSync}
                  sx={{ width: '150px', height: '40px', fontSize: '14px', borderRadius: '20px', position: 'absolute', right: '10px', top: '10px', zIndex: 9, zoom: zoom }}
                >
                  {intl.formatMessage({ id: "index.apply" })}
                </Button>
              }
              {bottomNavigation === 0 && <BaseKeyboard macroList={macroList} zoom={zoom}></BaseKeyboard>}
              {bottomNavigation === 1 &&
                <Paper elevation={0} variant="outlined"
                  sx={{
                    p: 2,
                    margin: 'auto',
                    minWidth: '968px',
                    height: `${370 * zoom}px`,
                    flexGrow: 1,
                    borderRadius: '10px 10px 0px 0px',
                    backgroundColor: isDarkMode ? '#20232a' : '#fff'
                  }}
                >
                  <Grid container spacing={1} sx={{ background: isDarkMode ? '#20232a' : '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid xs={1} md={1} lg={1} sx={{ zoom: zoom }}>
                      <Stack direction="column">
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <Typography variant="caption" gutterBottom align='center' >{intl.formatMessage({ id: "rgb.defaultColor" })}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <List component='nav' disablePadding>
                            <ListItem>
                              <ColorCircle onRef={colorBlockRef_0} color={color_0} onChange={() => handleCancleSelectedColor(0)} selected={currentLedColorIndex === 0} />
                            </ListItem>
                            <ListItem>
                              <ColorCircle onRef={colorBlockRef_1} color={color_1} onChange={() => handleCancleSelectedColor(1)} selected={currentLedColorIndex === 1} />
                            </ListItem>
                            <ListItem>
                              <ColorCircle onRef={colorBlockRef_2} color={color_2} onChange={() => handleCancleSelectedColor(2)} selected={currentLedColorIndex === 2} />
                            </ListItem>
                            <ListItem>
                              <ColorCircle onRef={colorBlockRef_3} color={color_3} onChange={() => handleCancleSelectedColor(3)} selected={currentLedColorIndex === 3} />
                            </ListItem>
                            <ListItem>
                              <ColorCircle onRef={colorBlockRef_4} color={color_4} onChange={() => handleCancleSelectedColor(4)} selected={currentLedColorIndex === 4} />
                            </ListItem>
                            <ListItem>
                              <ColorCircle onRef={colorBlockRef_5} color={color_5} onChange={() => handleCancleSelectedColor(5)} selected={currentLedColorIndex === 5} />
                            </ListItem>
                            <ListItem>
                              <ColorCircle onRef={colorBlockRef_6} color={color_6} onChange={() => handleCancleSelectedColor(6)} selected={currentLedColorIndex === 6} />
                            </ListItem>
                          </List>
                        </Box>
                      </Stack>
                    </Grid>
                    <Grid xs={11} md={11} lg={11} container >
                      <Grid xs={12} md={12} lg={12}>
                        <Box sx={{ background: isDarkMode ? '#20232a' : '#fff' }}>
                          <Grid container sx={{ height: '100%' }}>
                            <Grid xs={3} md={3} lg={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 1 }}>
                              <Box>
                                <Stack>
                                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Wheel
                                      width={210 * zoom}
                                      height={210 * zoom}
                                      color={color.hsv}
                                      onChange={(color) => handleChangeColor({ hex: color.hex, rgb: color.rgba, hsv: color.hsva, hsl: color.hsla })}
                                    />
                                  </Box>
                                  <ShadeSlider
                                    hsva={color.hsv || { h: 0, s: 0, v: 100, a: 1 }}
                                    style={{ width: 210 * zoom, marginTop: 20 }}
                                    onChange={(newShade) => {
                                      handleChangeShade(newShade.v)
                                    }}
                                  />
                                  <Stack direction={'row'} spacing={1}>
                                    <EditableInput
                                      placement="top"
                                      label="Hex"
                                      value={color.hex}
                                      style={{ width: 68 * zoom, alignItems: 'flex-start' }}
                                      onChange={(evn: React.ChangeEvent<HTMLInputElement>, value: string | number) => {
                                        handleChangeHex(value as string)
                                      }}
                                    />
                                    <EditableInputRGBA
                                      placement="top"
                                      hsva={color.hsv}
                                      style={{ width: 150 * zoom, alignItems: 'flex-start' }}
                                      onChange={(color) => {
                                        handleChangeColor({ hex: color.hex, rgb: color.rgba, hsv: color.hsva, hsl: color.hsla })
                                      }}
                                    />
                                  </Stack>
                                </Stack>
                              </Box>
                            </Grid>
                            <Grid xs={9} md={9} lg={9}>
                              <Grid container spacing={1} alignItems="center" sx={{ padding: '0px 20px', zoom: zoom }}>
                                <Box>
                                  <Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
                                    <Typography variant='button'>OFF</Typography>
                                    <MaterialUISwitch color="warning"
                                      checked={lightOn === Boog75Constant.LIGHT_ON}
                                      onChange={handleRGBSwitchChange}
                                    />
                                    <Typography variant='button'>ON</Typography>
                                  </Stack>
                                </Box>
                              </Grid>
                              <Grid container spacing={1} alignItems="center" sx={{ padding: '10px 20px', zoom: zoom }}>
                                <Stack>
                                  <Typography variant="overline" display="block" gutterBottom>
                                    {intl.formatMessage({ id: "rgb.effect" }) }{deviceVersion}
                                  </Typography>
                                  <Grid container spacing={1}>
                                    <Grid><Button variant={lightEffect === 0 ? "contained" : "outlined"} size='small' onClick={() => handleLightEffetChange(0)}>{intl.formatMessage({ id: "rgb.lightEffect0" })}</Button></Grid>
                                    <Grid><Button variant={lightEffect === 1 ? "contained" : "outlined"} size='small' onClick={() => handleLightEffetChange(1)}>{intl.formatMessage({ id: "rgb.lightEffect1" })}</Button></Grid>
                                    <Grid><Button variant={lightEffect === 2 ? "contained" : "outlined"} size='small' onClick={() => handleLightEffetChange(2)}>{intl.formatMessage({ id: "rgb.lightEffect2" })}</Button></Grid>
                                    <Grid><Button variant={lightEffect === 3 ? "contained" : "outlined"} size='small' onClick={() => handleLightEffetChange(3)}>{intl.formatMessage({ id: "rgb.lightEffect3" })}</Button></Grid>
                                    <Grid><Button variant={lightEffect === 4 ? "contained" : "outlined"} size='small' onClick={() => handleLightEffetChange(4)}>{intl.formatMessage({ id: "rgb.lightEffect4" })}</Button></Grid>
                                    <Grid><Button variant={lightEffect === 5 ? "contained" : "outlined"} size='small' onClick={() => handleLightEffetChange(5)}>{intl.formatMessage({ id: "rgb.lightEffect5" })}</Button></Grid>
                                    <Grid><Button variant={lightEffect === 6 ? "contained" : "outlined"} size='small' onClick={() => handleLightEffetChange(6)}>{intl.formatMessage({ id: "rgb.lightEffect6" })}</Button></Grid>
                                    <Grid sx={{display:(['V28','V29','V30'].includes(deviceVersion))?'none':'black'}} ><Button variant={lightEffect === 7 ? "contained" : "outlined"} size='small' onClick={() => handleLightEffetChange(7)}>{intl.formatMessage({ id: "rgb.lightEffect7" })}</Button></Grid>
                                    <Grid sx={{display:(['V28','V29','V30'].includes(deviceVersion))?'none':'black'}} ><Button variant={lightEffect === 8 ? "contained" : "outlined"} size='small' onClick={() => handleLightEffetChange(8)}>{intl.formatMessage({ id: "rgb.lightEffect8" })}</Button></Grid>
                                  
                                  </Grid>
                                </Stack>

                              </Grid>
                              <Grid container spacing={1} alignItems="center" sx={{ padding: '0px 20px' }} >
                                <Typography variant="overline" sx={{ zoom: zoom }} >
                                  {intl.formatMessage({ id: "rgb.speed" })}
                                </Typography>
                                <OrangeSlider
                                  aria-label="Speed"
                                  defaultValue={Boog75Constant.LIGHT_SPEED_DEFAULT}
                                  value={lightSpeed}
                                  onChange={(event: Event, newValue: number | number[]) => { handleLightSpeedChange(newValue as number) }}
                                  valueLabelDisplay="auto"
                                  step={1}
                                  min={0}
                                  max={3}
                                  marks
                                  sx={{ padding: '8px' }}
                                />
                              </Grid>
                              <Grid container spacing={1} alignItems="center" sx={{ padding: '0px 20px', pb: '10px' }} >
                                <Typography variant="overline" sx={{ zoom: zoom }}>
                                  {intl.formatMessage({ id: "rgb.brightness" })}
                                </Typography>
                                <BlueSlider
                                  aria-label="Brightness"
                                  value={lightBrightness}
                                  onChange={(event: Event, newValue: number | number[]) => { handleLightBrightnessChange(newValue as number) }}
                                  valueLabelDisplay="auto"
                                  step={1}
                                  min={0}
                                  max={9}
                                  marks
                                  sx={{ padding: '8px' }}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              }
              {bottomNavigation === 2 && !ableSelectKey &&
                <Paper elevation={0} variant="outlined"
                  sx={{
                    p: 2,
                    margin: 'auto',
                    minWidth: '968px',
                    height: `${370 * zoom}px`,
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: isDarkMode ? '#20232a' : '#fff',
                    borderRadius: '10px 10px 0px 0px',
                  }}
                >
                  <Box sx={{ display: 'flex', width: '100%', height: '100%', p: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 200, height: 200, zoom: zoom }}
                      image="/images/ks.png"
                    />
                    <Stack
                      direction="row"
                      spacing={2}
                    >
                      {!isAdvanceRT &&
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '400px' }}>
                          <Box sx={{ zoom: zoom }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                              <Typography component="div" variant="h5">
                                {intl.formatMessage({ id: "rapidTrigger.sensitivitySettings" })}
                                <HelpPopover content={intl.formatMessage({ id: "rapidTrigger.sensitivityExplain" })}>
                                  <IconButton
                                    size="small"
                                  >
                                    <HelpOutlineIcon fontSize="inherit" />
                                  </IconButton>
                                </HelpPopover>
                              </Typography>
                            </CardContent>
                            <Typography id="input-slider" gutterBottom variant='subtitle2'>
                              {intl.formatMessage({ id: "rapidTrigger.sensitivity" })}: {sensitivity}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, minWidth: '300px' }}>
                            <Stack spacing={2} direction="row" sx={{ minWidth: '300px' }} alignItems="center">
                              <FitbitIcon />
                              <BlueSlider
                                aria-label="Sensitivity"
                                value={sensitivity}
                                onChange={(event: Event, newValue: number | number[]) => { handleSensitivityChange(newValue as number) }}
                                valueLabelDisplay="auto"
                                step={1}
                                min={1}
                                max={20}
                                color="warning"
                                sx={{ width: '340px' }}
                              />
                            </Stack>
                          </Box>
                          <br></br>
                          <Box sx={{ zoom: zoom }}>
                            <Button fullWidth variant="contained" size='small' sx={{ borderRadius: '20px', mb: '5px' }} onClick={handleConfirmSensitivityChange}>{intl.formatMessage({ id: "rapidTrigger.confirm" })}</Button>
                            <Button fullWidth variant="contained" size='small' sx={{ borderRadius: '20px' }} color='_gray' onClick={handleAbleSelectKey}>{intl.formatMessage({ id: "rapidTrigger.oneKeySettings" })}</Button>
                          </Box>
                        </Box>
                      }
                      {isAdvanceRT &&
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '400px' }}>
                          <Box sx={{ zoom: zoom }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                              <Typography component="div" variant="h5">
                                {intl.formatMessage({ id: "rapidTrigger.advanceSettings" })}
                                <HelpPopover content={intl.formatMessage({ id: "rapidTrigger.advanceSensitivityExplain" })} >
                                  <IconButton
                                    size="small"
                                  >
                                    <HelpOutlineIcon fontSize="inherit" />
                                  </IconButton>
                                </HelpPopover>
                              </Typography>
                            </CardContent>
                            <Typography id="input-slider" gutterBottom variant='subtitle2'>
                              {intl.formatMessage({ id: "rapidTrigger.advanceSettingsPress" })} {"(" + rapidTrigger.make + "mm)"}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, minWidth: '300px' }}>
                            <Stack spacing={2} direction="row" sx={{ minWidth: '300px' }} alignItems="center">
                              <Filter1Icon />
                              <OrangeSlider
                                aria-label="RapidTriggerMake"
                                value={rapidTrigger.make}
                                onChange={(event: Event, newValue: number | number[]) => { handleRapidTriggerChange(newValue as number, rapidTrigger.break) }}
                                valueLabelDisplay="auto"
                                step={0.1}
                                min={0.1}
                                max={4.0}
                                color="warning"
                                sx={{ width: '340px' }}
                              />
                            </Stack>
                          </Box>
                          <Typography id="input-slider" gutterBottom variant='subtitle2' sx={{ zoom: zoom }}>
                            {intl.formatMessage({ id: "rapidTrigger.advanceSettingsUplift" })} {"(" + rapidTrigger.break + "mm)"}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, minWidth: '300px' }}>
                            <Stack spacing={2} direction="row" sx={{ minWidth: '300px' }} alignItems="center">
                              <Filter2Icon />
                              <BlueSlider
                                aria-label="RapidTriggerBreak"
                                value={rapidTrigger.break}
                                onChange={(event: Event, newValue: number | number[]) => { handleRapidTriggerChange(rapidTrigger.make, newValue as number) }}
                                valueLabelDisplay="auto"
                                step={0.1}
                                min={0.1}
                                max={4.0}
                                sx={{ width: '340px' }}
                              />
                            </Stack>
                          </Box>
                          <Box sx={{ zoom: zoom }}>
                            <Button fullWidth variant="contained" size='small' onClick={handleConfirmRapidTriggerChange} sx={{ borderRadius: '20px', mb: '5px' }}>{intl.formatMessage({ id: "rapidTrigger.confirm" })}</Button>
                            <Button fullWidth variant="contained" size='small' onClick={handleAbleSelectKey} sx={{ borderRadius: '20px' }} color='_gray'>{intl.formatMessage({ id: "rapidTrigger.oneKeySettings" })}</Button>
                          </Box>
                        </Box>
                      }

                      {!isAdvanceRT &&
                        <HelpPopover content={intl.formatMessage({ id: "rapidTrigger.advanceExplain" })}>
                          <Box>
                            <Button size='small' onClick={handleOpenAdvanceRT} sx={{ fontSize: '12px' }} >
                              {intl.formatMessage({ id: 'rapidTrigger.advance' })}
                            </Button>
                          </Box>
                        </HelpPopover>
                      }
                      {isAdvanceRT &&
                        <Box>
                          <Button size='small' onClick={handleCloseAdvanceRT} startIcon={<UndoIcon />} sx={{ fontSize: '12px' }}>
                            {intl.formatMessage({ id: 'rapidTrigger.advanceBack' })}
                          </Button>
                        </Box>
                      }
                    </Stack>
                  </Box>
                </Paper>
              }

              {/** 单键设置 */}
              {bottomNavigation === 2 && ableSelectKey && !isAdvanceRT &&
                <Paper elevation={0} variant="outlined"
                  sx={{
                    p: 2,
                    margin: 'auto',
                    minWidth: '968px',
                    height: `${370 * zoom}px`,
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: isDarkMode ? '#101115' : '#666666',
                    borderRadius: '10px 10px 0px 0px',
                    color: '#fff',
                    position: 'relative',
                    zIndex: `${ableSelectKey ? 999 : 0}`
                  }}
                >
                  <Box sx={{ display: 'flex', width: '100%', height: '100%', p: 2, mr: 7, justifyContent: 'center', alignItems: 'center' }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 200, height: 200, zoom: zoom }}
                      image="/images/ks.png"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '400px' }}>
                      <Box sx={{ zoom: zoom }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                          <Typography component="div" variant="h5">
                            {intl.formatMessage({ id: "rapidTrigger.oneKeySensitivitySettingsTitle" })}
                          </Typography>
                          <Typography component="div" variant="caption">
                            {intl.formatMessage({ id: "rapidTrigger.oneKeySensitivitySettingsSubTitle" })}
                          </Typography>
                        </CardContent>
                        <Typography id="input-slider" gutterBottom variant='subtitle2'>
                          {intl.formatMessage({ id: "rapidTrigger.sensitivity" })}: {localSensitivity}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, minWidth: '300px' }}>
                        <Stack spacing={2} direction="row" sx={{ minWidth: '300px' }} alignItems="center">
                          <FitbitIcon />
                          <BlueSlider
                            aria-label="LocalSensitivity"
                            value={localSensitivity}
                            onChange={(event: Event, newValue: number | number[]) => { handleLocalSensitivityChange(newValue as number) }}
                            valueLabelDisplay="auto"
                            step={1}
                            min={1}
                            max={20}
                            sx={{ width: '340px' }}
                          />
                        </Stack>
                      </Box>
                      <br></br>
                      <Box sx={{ zoom: zoom }}>
                        <Stack spacing={1} direction="row" alignItems="center">
                          <Button variant="contained" size='small' fullWidth sx={{ borderRadius: '20px' }} color='error' onClick={() => setAlertDialogOpen0(true)}>{intl.formatMessage({ id: "rapidTrigger.oneKeyReset" })}</Button>
                          <Button variant="contained" size='small' fullWidth sx={{ borderRadius: '20px' }} color='warning' onClick={handleCancleSelectKey}>{intl.formatMessage({ id: "rapidTrigger.oneKeyCancelSelected" })}</Button>
                        </Stack>
                        <Button variant="contained" size='small' fullWidth sx={{ borderRadius: '20px', mt: '5px', mb: '5px' }} onClick={() => handleConfirmSelectKey(0)}>{intl.formatMessage({ id: "rapidTrigger.oneKeyConfirm" })}</Button>
                        <Button variant="contained" size='small' fullWidth sx={{ borderRadius: '20px' }} color='_gray' onClick={handleDisableSelectKey}>{intl.formatMessage({ id: "rapidTrigger.oneKeyBack" })}</Button>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              }

              {/** 单键高阶设置 */}
              {bottomNavigation === 2 && ableSelectKey && isAdvanceRT &&
                <Paper elevation={0} variant="outlined"
                  sx={{
                    p: 2,
                    margin: 'auto',
                    minWidth: '968px',
                    height: `${370 * zoom}px`,
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: isDarkMode ? '#101115' : '#666666',
                    borderRadius: '10px 10px 0px 0px',
                    color: '#fff',
                    position: 'relative',
                    zIndex: `${ableSelectKey ? 999 : 0}`
                  }}
                >
                  <Box sx={{ display: 'flex', width: '100%', height: '100%', p: 2, mr: 7, justifyContent: 'center', alignItems: 'center' }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 200, height: 200, zoom: zoom }}
                      image="/images/ks.png"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '400px' }}>
                      <Box sx={{ zoom: zoom }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                          <Typography component="div" variant="h5">
                            {intl.formatMessage({ id: "rapidTrigger.advanceSettingsTitle" })}
                          </Typography>
                          <Typography component="div" variant="caption">
                            {intl.formatMessage({ id: "rapidTrigger.advanceSettingsSubTitle" })}
                          </Typography>
                        </CardContent>
                      </Box>

                      <Typography id="input-slider" gutterBottom variant='subtitle2' sx={{ zoom: zoom }}>
                        {intl.formatMessage({ id: "rapidTrigger.advanceSettingsPress" })} {"(" + localRapidTrigger.make + "mm)"}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, minWidth: '300px' }}>
                        <Stack spacing={2} direction="row" sx={{ minWidth: '300px' }} alignItems="center">
                          <Filter1Icon />
                          <OrangeSlider
                            aria-label="LocalRapidTriggerMake"
                            value={localRapidTrigger.make}
                            onChange={(event: Event, newValue: number | number[]) => { handleLocalRapidTriggerChange(newValue as number, localRapidTrigger.break) }}
                            valueLabelDisplay="auto"
                            step={0.1}
                            min={0.1}
                            max={4.0}
                            color='warning'
                            sx={{ width: '340px' }}
                          />
                        </Stack>
                      </Box>
                      <Typography id="input-slider" gutterBottom variant='subtitle2' sx={{ zoom: zoom }}>
                        {intl.formatMessage({ id: "rapidTrigger.advanceSettingsUplift" })} {"(" + localRapidTrigger.break + "mm)"}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, minWidth: '300px' }}>
                        <Stack spacing={2} direction="row" sx={{ minWidth: '300px' }} alignItems="center">
                          <Filter2Icon />
                          <BlueSlider
                            aria-label="LocalRapidTriggerBreak"
                            value={localRapidTrigger.break}
                            onChange={(event: Event, newValue: number | number[]) => { handleLocalRapidTriggerChange(localRapidTrigger.make, newValue as number) }}
                            valueLabelDisplay="auto"
                            step={0.1}
                            min={0.1}
                            max={4.0}
                            sx={{ width: '340px' }}
                          />
                        </Stack>
                      </Box>
                      <Box sx={{ zoom: zoom }}>
                        <Stack spacing={1} direction="row" alignItems="center">
                          <Button variant="contained" size='small' fullWidth sx={{ borderRadius: '20px' }} color='error' onClick={() => setAlertDialogOpen1(true)}>{intl.formatMessage({ id: "rapidTrigger.oneKeyReset" })}</Button>
                          <Button variant="contained" size='small' fullWidth sx={{ borderRadius: '20px' }} color='warning' onClick={handleCancleSelectKey}>{intl.formatMessage({ id: "rapidTrigger.oneKeyCancelSelected" })}</Button>
                        </Stack>
                        <Button variant="contained" size='small' fullWidth sx={{ borderRadius: '20px', mt: '5px', mb: '5px' }} onClick={() => handleConfirmSelectKey(1)}>{intl.formatMessage({ id: "rapidTrigger.oneKeyConfirm" })}</Button>
                        <Button variant="contained" size='small' fullWidth sx={{ borderRadius: '20px' }} color='_gray' onClick={handleDisableSelectKey}>{intl.formatMessage({ id: "rapidTrigger.oneKeyBack" })}</Button>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              }
              {bottomNavigation === 3 &&
                <Box sx={{ zoom: zoom }}>
                  {/* 设置的高级键列表 */}
                  <AdvancedKeyPanel 
                  onAdvance={handleAdvance} 
                  onRef={advancedKeyPanelRef} 
                  advancedKeyData={advancedKeyList} 
                  onDeleteAdvancedKey={handleDeleteAdvancedKey} 
                  onChangeAdvancedKey={handleChangeAdvancedKey} 
                
                  onKeyChangeHight={handleKeyChangeHight}  
                  onKeyChangeHightMore={handleKeyChangeHightMore} />
                </Box>
              }

              {bottomNavigation === 4 &&
                <Box sx={{ zoom: zoom }}>
                  <MacroPanel macroList={macroList} onUpdateMacroList={handleUpdateMacroList} onApply={handleSetMacroData} onUpload={handleUploadMacro}></MacroPanel>
                </Box>
              }
              <BottomNavigation
                showLabels
                value={bottomNavigation}
                onChange={(event, newValue) => handleChangeBottomNavigation(newValue)}
                sx={{ minWidth: '968px', backgroundColor: isDarkMode ? '#262931' : '#eaecef', borderRadius: '0px 0px 10px 10px' }}
              >
                <BottomNavigationAction label={intl.formatMessage({ "id": "index.keyPanel" })} icon={<KeyboardAltIcon />} />
                <BottomNavigationAction label={intl.formatMessage({ "id": "index.rgbPanel" })} icon={<ColorLensIcon />} />
                <BottomNavigationAction label={intl.formatMessage({ "id": "index.rtPanel" })} icon={<AutoFixHighIcon />} />
                <BottomNavigationAction label={intl.formatMessage({ "id": "index.advancedKeyPanel" })} icon={<ApiIcon />} />
                <BottomNavigationAction label={intl.formatMessage({ "id": "index.macroPanel" })} icon={<AutoAwesomeMotionIcon />} />
              </BottomNavigation>
            </Box>
          </Grid>
        </Grid>

        <Dialog
          open={showVersion}
          onClose={handleCloseVersion}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {intl.formatMessage({ "id": "index.versionInfo" })}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography variant="body2" gutterBottom>
                {intl.formatMessage({ "id": "index.deviceVersion" }) + deviceVersion}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {intl.formatMessage({ "id": "index.mcu2Version" }) + mcu2Version}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {intl.formatMessage({ "id": "index.protocolVersion" }) + protocolVersion}
              </Typography>
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <Dialog
          open={showRename}
          onClose={handleCloseVersion}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {intl.formatMessage({ "id": "index.rename" })}
          </DialogTitle>
          <DialogContent>
          
             <TextField
                                        value={rename}
                                      
                                     
                                        // label="Name"
                                        variant="standard"
                                        size="small"
                                        // onChange={(event: any) => { handleEditMacroChange(item, event.target.value) }}
                                        // onBlur={handleRenameOk}
                                       
                                        autoFocus
                                     
                                      
                                        onChange={(event: any) => { handleEditProfileChange(renameId, event.target.value) }}
                                        onBlur={(event) => handRename(event, renameId)}
                                        // onKeyDown={(event: any) => { event.keyCode === 13 && handleEditMacroComplete() }}
                                        error={renameerroFlag}
                                        helperText={renameerro}
                                      /><IconButton edge="end" aria-label="save" size='small' onClick={() => handleEditRenameData(renameId)} >
                                      <SaveIcon fontSize="inherit" />
                                    </IconButton>
                                 <Box>
                              
                            </Box>        
           
          </DialogContent>
        </Dialog>
        <Snackbar open={showAlert.alert} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} autoHideDuration={1000} onClose={() => setShowAlert({ ...showAlert, alert: false })}>
          <Alert severity={showAlert.severity as any} sx={{ width: '100%' }}>
            <AlertTitle>{showAlert.alertTitle}</AlertTitle>
            {showAlert.alertText}
          </Alert>
        </Snackbar>

        <Snackbar  sx={{marginLeft:'48%',marginTop:'100px'}} open={showAlert2.alert} autoHideDuration={1000}   anchorOrigin={{ vertical: 'top', horizontal: 'left' }} onClose={() => setShowAlert2({ ...showAlert2, alert: false })}>
          <Alert severity={showAlert2.severity as any} sx={{ width: '100%' }}>
            <AlertTitle>{showAlert2.alertTitle}</AlertTitle>
            {showAlert2.alertText}
          </Alert>
        </Snackbar>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <AlertDialog title={intl.formatMessage({ id: "rapidTrigger.oneKeyResetAlertTitle" })} contentText={intl.formatMessage({ id: "rapidTrigger.oneKeyResetAlertContentText0" })} open={alertDialogOpen0} onClose={() => setAlertDialogOpen0(false)} onCallBack={() => handleResetSelectKey(0)} />
        <AlertDialog title={intl.formatMessage({ id: "rapidTrigger.oneKeyResetAlertTitle" })} contentText={intl.formatMessage({ id: "rapidTrigger.oneKeyResetAlertContentText1" })} open={alertDialogOpen1} onClose={() => setAlertDialogOpen1(false)} onCallBack={() => handleResetSelectKey(1)} />
        <AlertDialog title={intl.formatMessage({ id: "index.resetDefaultProfileAlertTitle" })} contentText={intl.formatMessage({ id: "index.resetDefaultProfileAlertContent" })} open={alertDialogOpen2} onClose={() => setAlertDialogOpen2(false)} onCallBack={handleResetDefaultProfile} />
        <AlertDialog title={intl.formatMessage({ id: "index.resetDefaultProfileAlertTitle" })} contentText={intl.formatMessage({ id: "index.resetDefaultProfileAlertContent" })} open={openRSTip} onClose={() => setAlertDialogOpen2(false)} onCallBack={handleResetDefaultProfile} />
      
      </Box>

{/* 单键设置时，背景页 */}
      {ableSelectKey &&
        <Box className={styles.shade}></Box>
      }
       
    </Box>
  )
}



