import React, { useEffect, useRef, useState } from 'react'
import { useIntl } from "react-intl";
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Stack from '@mui/material/Stack';
import { Dialog, DialogTitle, DialogContent, Divider, Typography, Tabs, Tab, FormControlLabel, Checkbox, FormControl, Select, MenuItem, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Slider from '@mui/material/Slider';
import Image from 'next/image';
import Button from '@mui/material/Button';


import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import VerticalAlignBottom from '@mui/icons-material/VerticalAlignBottom';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';

import DKSKeyStyles from './DKSKey.module.css'
import DKSKey from './DKSKey';
import MTKeyStyles from './MTKey.module.css'
import MTKey from './MTKey';
import RSKey from './RSKey';

import TGLKeyStyles from './TGLKey.module.css'
import TGLKey from './TGLKey';
import { KEYCODE_DICT } from '@/types/VkCodeDict';
import BaseKey from '@/components/key/BaseKey';
import BaseKeyDisabled from '@/components/key/BaseKeyDisabled';
import MaterialUISwitchRS from '@/components/boog75/MaterialUISwitchRS';


const baseKeyboardData: Array<API.Keyboard.KeyObject> = [
  { vkCode: KEYCODE_DICT.VK_A, keyText: "A", idx:46},
  { vkCode: KEYCODE_DICT.VK_B, keyText: "B" ,idx:64},
  { vkCode: KEYCODE_DICT.VK_C, keyText: "C"  ,idx:62},
  { vkCode: KEYCODE_DICT.VK_D, keyText: "D" ,idx:48},
  { vkCode: KEYCODE_DICT.VK_E, keyText: "E"  ,idx:33},
  { vkCode: KEYCODE_DICT.VK_F, keyText: "F" ,idx:49},
  { vkCode: KEYCODE_DICT.VK_G, keyText: "G" ,idx:50},
  { vkCode: KEYCODE_DICT.VK_H, keyText: "H" ,idx:51},
  { vkCode: KEYCODE_DICT.VK_I, keyText: "I"  ,idx:38},
  { vkCode: KEYCODE_DICT.VK_J, keyText: "J" ,idx:52},
  { vkCode: KEYCODE_DICT.VK_K, keyText: "K" ,idx:53},
  { vkCode: KEYCODE_DICT.VK_L, keyText: "L" ,idx:54},
  { vkCode: KEYCODE_DICT.VK_M, keyText: "M" ,idx:66 },
  { vkCode: KEYCODE_DICT.VK_N, keyText: "N"  ,idx:65},
  { vkCode: KEYCODE_DICT.VK_O, keyText: "O"  ,idx:39},
  { vkCode: KEYCODE_DICT.VK_P, keyText: "P"  ,idx:40},
  { vkCode: KEYCODE_DICT.VK_Q, keyText: "Q"  ,idx:31},
  { vkCode: KEYCODE_DICT.VK_R, keyText: "R"  ,idx:34},
  { vkCode: KEYCODE_DICT.VK_S, keyText: "S" ,idx:47},
  { vkCode: KEYCODE_DICT.VK_T, keyText: "T"  ,idx:35},
  { vkCode: KEYCODE_DICT.VK_U, keyText: "U"  ,idx:37},
  { vkCode: KEYCODE_DICT.VK_V, keyText: "V"  ,idx:63},
  { vkCode: KEYCODE_DICT.VK_W, keyText: "W"  ,idx:32},
  { vkCode: KEYCODE_DICT.VK_X, keyText: "X"  ,idx:61},
  { vkCode: KEYCODE_DICT.VK_Y, keyText: "Y"  ,idx:36},
  { vkCode: KEYCODE_DICT.VK_Z, keyText: "Z" ,idx:60},
  { vkCode: KEYCODE_DICT.VK_1, keyText: "1" ,idx:16},
  { vkCode: KEYCODE_DICT.VK_2, keyText: "2",idx:17 },
  { vkCode: KEYCODE_DICT.VK_3, keyText: "3" ,idx:18},
  { vkCode: KEYCODE_DICT.VK_4, keyText: "4" ,idx:19},
  { vkCode: KEYCODE_DICT.VK_5, keyText: "5" ,idx:20},
  { vkCode: KEYCODE_DICT.VK_6, keyText: "6" ,idx:21},
  { vkCode: KEYCODE_DICT.VK_7, keyText: "7" ,idx:22},
  { vkCode: KEYCODE_DICT.VK_8, keyText: "8" ,idx:23},
  { vkCode: KEYCODE_DICT.VK_9, keyText: "9" ,idx:24},
  { vkCode: KEYCODE_DICT.VK_0, keyText: "0" ,idx:25},
  { vkCode: KEYCODE_DICT.VK_OEM_MINUS, keyText: "-" ,idx:26},
  { vkCode: KEYCODE_DICT.VK_OEM_PLUS, keyText: "=" ,idx:27},
  { vkCode: KEYCODE_DICT.VK_OEM_4, keyText: "["  ,idx:41},
  { vkCode: KEYCODE_DICT.VK_OEM_6, keyText: "]"  ,idx:42},
  { vkCode: KEYCODE_DICT.VK_OEM_5, keyText: "\\"  ,idx:43},
  { vkCode: KEYCODE_DICT.VK_OEM_1, keyText: ";" ,idx:55},
  { vkCode: KEYCODE_DICT.VK_OEM_7, keyText: "\'",idx:56 },
  { vkCode: KEYCODE_DICT.VK_OEM_COMMA, keyText: "," ,idx:67 },
  { vkCode: KEYCODE_DICT.VK_OEM_PERIOD, keyText: "."  ,idx:68},
  { vkCode: KEYCODE_DICT.VK_OEM_2, keyText: "/"  ,idx:69}
]
const extendKeyboardData: Array<API.Keyboard.KeyObject> = [
  { vkCode: KEYCODE_DICT.VK_ESCAPE, keyText: "Esc" ,idx:0},
  { vkCode: KEYCODE_DICT.VK_TAB, keyText: "Tab" ,idx:30},
  { vkCode: KEYCODE_DICT.VK_CAPITAL, keyText: "Caps"  ,idx:45},
  { vkCode: KEYCODE_DICT.VK_BACK, keyText: "Backspace" ,idx:28},
  { vkCode: KEYCODE_DICT.VK_RETURN, keyText: "Enter" },
  { vkCode: KEYCODE_DICT.VK_SPACE, keyText: "Space",idx:75 },
  { vkCode: KEYCODE_DICT.VK_LCONTROL, keyText: "Left\nCtrl" ,idx:71 },
  { vkCode: KEYCODE_DICT.VK_RCONTROL, keyText: "Right\nCtrl" ,idx:76},
  { vkCode: KEYCODE_DICT.VK_LSHIFT, keyText: "Left\nShift" ,idx:59},
  { vkCode: KEYCODE_DICT.VK_RSHIFT, keyText: "Rightj\nShift"  ,idx:70},
  { vkCode: KEYCODE_DICT.VK_LMENU, keyText: "Left\nAlt",idx:74 },
  { vkCode: KEYCODE_DICT.VK_RMENU, keyText: "Right\nALt" },
  { vkCode: KEYCODE_DICT.VK_LWIN, keyText: "Left\nOS" ,idx:73},
  { vkCode: KEYCODE_DICT.VK_RWIN, keyText: "Right\nOS" ,idx:77},
  { vkCode: KEYCODE_DICT.VK_UP, keyText: "Up"  ,idx:71},
  { vkCode: KEYCODE_DICT.VK_DOWN, keyText: "Down" ,idx:79},
  { vkCode: KEYCODE_DICT.VK_LEFT, keyText: "Left" ,idx:78},
  { vkCode: KEYCODE_DICT.VK_RIGHT, keyText: "Right" ,idx:80},
  { vkCode: KEYCODE_DICT.VK_PRINT, keyText: "Print\nScreen" },
  { vkCode: KEYCODE_DICT.VK_SCROLL, keyText: "Scroll\nLock" },
  { vkCode: KEYCODE_DICT.VK_PAUSE, keyText: "Pause" },
  { vkCode: KEYCODE_DICT.VK_HOME, keyText: "Home"  ,idx:14},
  { vkCode: KEYCODE_DICT.VK_END, keyText: "End" },
  { vkCode: KEYCODE_DICT.VK_INSERT, keyText: "Insert" },
  { vkCode: KEYCODE_DICT.VK_DELETE, keyText: "Delete" ,idx:29},
  { vkCode: KEYCODE_DICT.VK_PRIOR, keyText: "Page\nUp"  ,idx:44},
  { vkCode: KEYCODE_DICT.VK_NEXT, keyText: "Page\nDown" ,idx:58},
  { vkCode: KEYCODE_DICT.VK_F1, keyText: "F1"  ,idx:1},
  { vkCode: KEYCODE_DICT.VK_F2, keyText: "F2" ,idx:2 },
  { vkCode: KEYCODE_DICT.VK_F3, keyText: "F3"  ,idx:3},
  { vkCode: KEYCODE_DICT.VK_F4, keyText: "F4" ,idx:4 },
  { vkCode: KEYCODE_DICT.VK_F5, keyText: "F5"  ,idx:5},
  { vkCode: KEYCODE_DICT.VK_F6, keyText: "F6"  ,idx:6},
  { vkCode: KEYCODE_DICT.VK_F7, keyText: "F7"  ,idx:7},
  { vkCode: KEYCODE_DICT.VK_F8, keyText: "F8"  ,idx:8},
  { vkCode: KEYCODE_DICT.VK_F9, keyText: "F9"  ,idx:9},
  { vkCode: KEYCODE_DICT.VK_F10, keyText: "F10"  ,idx:10},
  { vkCode: KEYCODE_DICT.VK_F11, keyText: "F11"  ,idx:11},
  { vkCode: KEYCODE_DICT.VK_F12, keyText: "F12"  ,idx:12},
  { vkCode: KEYCODE_DICT.VK_F13, keyText: "F13"  ,idx:13},
  { vkCode: KEYCODE_DICT.VK_F14, keyText: "F14" },
  { vkCode: KEYCODE_DICT.VK_F15, keyText: "F15" },
  { vkCode: KEYCODE_DICT.VK_F16, keyText: "F16" },
  { vkCode: KEYCODE_DICT.VK_F17, keyText: "F17" },
  { vkCode: KEYCODE_DICT.VK_F18, keyText: "F18" },
  { vkCode: KEYCODE_DICT.VK_F19, keyText: "F19" },
  { vkCode: KEYCODE_DICT.VK_F20, keyText: "F20" },
  { vkCode: KEYCODE_DICT.VK_F21, keyText: "F21" },
  { vkCode: KEYCODE_DICT.VK_F22, keyText: "F22" },
  { vkCode: KEYCODE_DICT.VK_F23, keyText: "F23" },
  { vkCode: KEYCODE_DICT.VK_F24, keyText: "F24" },
  { vkCode: KEYCODE_DICT.VK_NUMLOCK, keyText: "Num\nLock" },
  { vkCode: KEYCODE_DICT.VK_NUMPAD1, keyText: "Num1" },
  { vkCode: KEYCODE_DICT.VK_NUMPAD2, keyText: "Num2" },
  { vkCode: KEYCODE_DICT.VK_NUMPAD3, keyText: "Num3" },
  { vkCode: KEYCODE_DICT.VK_NUMPAD4, keyText: "Num4" },
  { vkCode: KEYCODE_DICT.VK_NUMPAD5, keyText: "Num5" },
  { vkCode: KEYCODE_DICT.VK_NUMPAD6, keyText: "Num6" },
  { vkCode: KEYCODE_DICT.VK_NUMPAD7, keyText: "Num7" },
  { vkCode: KEYCODE_DICT.VK_NUMPAD8, keyText: "Num8" },
  { vkCode: KEYCODE_DICT.VK_NUMPAD9, keyText: "Num9" },
  { vkCode: KEYCODE_DICT.VK_NUMPAD0, keyText: "Num0" },
  { vkCode: KEYCODE_DICT.VK_DIVIDE, keyText: "Num/" },
  { vkCode: KEYCODE_DICT.VK_DECIMAL, keyText: "Num." },
  { vkCode: KEYCODE_DICT.VK_MULTIPLY, keyText: "Num*" },
  { vkCode: KEYCODE_DICT.VK_SUBTRACT, keyText: "Num-" },
  { vkCode: KEYCODE_DICT.VK_ADD, keyText: "Num+" },
  { vkCode: KEYCODE_DICT.VK_SEPARATOR, keyText: "Enter" ,idx:57}
]
const specialKeyboardData: Array<API.Keyboard.KeyObject> = [
  { vkCode: KEYCODE_DICT.VK_RGB_SWITH, keyText: "RGB\nSwitch" },
  { vkCode: KEYCODE_DICT.VK_RGB_Effect, keyText: "RGB\nEffet" },
  { vkCode: KEYCODE_DICT.VK_RGB_Color, keyText: "RGB\nColor" },
  { vkCode: KEYCODE_DICT.VK_RGB_BRIGHT1, keyText: "RGB\nBright+" },
  { vkCode: KEYCODE_DICT.VK_RGB_BRIGHT0, keyText: "RGB\nBright-" },
  { vkCode: KEYCODE_DICT.VK_RGB_SPEED1, keyText: "RGB\nSpeed+" },
  { vkCode: KEYCODE_DICT.VK_RGB_SPEED0, keyText: "RGB\nSpeed-" },
]

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(1),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

interface AdvancedKeyProps {
  advancedKey: API.Keyboard.AdvancedKey,
  advancedKeyData:Array<API.Keyboard.AdvancedKey>,
  socdtype?:number,
  fullPress?:number,
  fullp?:boolean,
  isRS?:boolean,
  advanceList:string,
  onDelete: (advancedKey: API.Keyboard.AdvancedKey) => void,
  onConfirm: (advancedKey: API.Keyboard.AdvancedKey, isClose: boolean) => void,
}




const AdvancedKey: React.FC<AdvancedKeyProps> = (props) => {
  //let advanceList1='';
  // const [advanceList,setadvanceList]=useState('')
  // useEffect(() => {
  //   // 这里的代码仅在组件挂载时执行一次
   
 
  useEffect(() => {
   if(props.advancedKey.socdType)
    setExecuteType(props.advancedKey.socdType)
if(props.advancedKey.fullPress)
    setOpenQuik2(props.advancedKey.fullPress===1?false:true)
  
  }, []); // 传
  //alert(props.advanceList)
  const intl = useIntl()
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark';
  const panel = props.advancedKey.type

  const [openQuik2, setOpenQuik2] = useState(true)
  const [executeType, setExecuteType] =  useState<number>(0)
  // let [advanceList,setadvanceList]=useState('')
  // let advanceList1='';
  // props.advancedKeyData.forEach(element => {
  //   //alert(element.id)
  //  // alert(element.keyIndex)
  //  advanceList1+=','+element.keyIndex
  //   //advanceList.push(element.keyIndex)
  // });
  // advanceList1+=','
  // setadvanceList(advanceList1)
  // alert(advanceList)
  //const [isRS,setIsRs]=useState(props.isRS)
   
// alert('11'+props.advancedKey.st)
//   if(props.advancedKey.st)
//   {
//     alert(props.advancedKey.st[0].isRSaction)
//     alert(props.advancedKey.st[0].keyText)
//   }
  // alert(panel)
  // props.advancedKey.rs?.forEach(element => {
  //   console.log('rs='+element.keyText)
  // });
  let title = intl.formatMessage({ id: "advance.DKSTitle" })
  if (props.advancedKey.type === 'MT') {
    title = intl.formatMessage({ id: "advance.MTTitle" })
  } else if (props.advancedKey.type === 'TGL') {
    title = intl.formatMessage({ id: "advance.LGTTitle" })
  }
  else if (props.advancedKey.type === 'RS') {//snap
    title = intl.formatMessage({ id: "advance.RSTitle" })
   //选中左边的键
  } 
  else if (props.advancedKey.type === 'ST') {//snap
    title = intl.formatMessage({ id: "advance.STTitle" })
   

  }


  const [selected, setSelected] = useState(-1)
  const [openDksTriggerPos, setOpenTriggerPos] = useState(false)
  const [triggerPos, setTriggerPos] = useState<number>()
  const [openPressTime, setOpenPressTime] = useState(false)
  const [pressTime, setPressTime] = useState(props.advancedKey.pressTime)

  

  const handleChangeDksKey = (num: number, vkCode: number | undefined, keyText: string) => {
    const newAdvancedKey = props.advancedKey
    if (newAdvancedKey.dks) {
      newAdvancedKey.dks[num].vkCode = vkCode
      newAdvancedKey.dks[num].keyText = keyText
      props.onConfirm(newAdvancedKey, false)
    }
  }
  const handleChangeDksData = (num: number, dksData: Array<API.Keyboard.DKSData>) => {
    const newAdvancedKey = props.advancedKey
    if (newAdvancedKey.dks) {
      newAdvancedKey.dks[num].data = dksData
      props.onConfirm(newAdvancedKey, false)
    }

  }
  const handleChangeMtKey = (num: number, mtKey: API.Keyboard.MTKey) => {
    const newAdvancedKey = props.advancedKey
    if (newAdvancedKey.mt) {
      newAdvancedKey.mt[num] = mtKey
      props.onConfirm(newAdvancedKey, false)
    }
  }
  //点击高级键列表
  const handleChangeRSKey = (num: number, mtKey: API.Keyboard.RSKey) => {
    
    const newAdvancedKey = props.advancedKey
   // alert('handleChangeRSKey==='+mtKey.oldKeyId)
    if(value===1)
      return
    if (newAdvancedKey.rs) {
      const STKey1: API.Keyboard.RSKey={
        keyIndex:mtKey.keyIndex,
        keyText:mtKey.keyText,
        vkCode: mtKey.vkCode,
        isRSaction:num===0?'r':'s'

      }
     // alert(!newAdvancedKey.rs[num].oldKeyId)
     // alert(newAdvancedKey.rs[num].keyIndex)
      if(newAdvancedKey.rs[num].oldKeyId===undefined)
        {
          //alert('old')
          STKey1.oldKeyId= newAdvancedKey.rs[num].keyIndex
        }
      //alert(STKey1.isRSaction)
      newAdvancedKey.rs[num] =  STKey1
      // const rtkey:API.Keyboard.RSKey={oldKeyId:newAdvancedKey.rs[num].keyIndex,vkCode:mtKey.vkCode,keyText:mtKey.keyText}
      // newAdvancedKey.rs[num] = rtkey
      props.onConfirm(newAdvancedKey, false)
     
    }
    // newAdvancedKey.rs?.forEach(element => {
    //   console.log(element.keyText)
    // });
  }
   //点击高级键列表
   const handleChangeSTKey = (num: number, mtKey: API.Keyboard.STKey) => {
    const newAdvancedKey = props.advancedKey
    //alert('handleChangeSTKey==='+newAdvancedKey?.type)
   // alert('handleChangeRSKey==='+value)

    if(value===1)
      return
    if (newAdvancedKey.st) {
      const STKey1: API.Keyboard.STKey={
        keyIndex:mtKey.keyIndex,
        keyText:mtKey.keyText,
        vkCode: mtKey.vkCode,
        isRSaction:num===0?'r':'s'

      }
      if(!newAdvancedKey.st[num].oldKeyId&&newAdvancedKey.st[num].keyIndex)
      {
        STKey1.oldKeyId= newAdvancedKey.st[num].keyIndex
      }
      //alert(STKey1.isRSaction)
      newAdvancedKey.st[num] =  STKey1
      // const stkey:API.Keyboard.STKey={oldKeyId:newAdvancedKey.st[num].keyIndex,vkCode:mtKey.vkCode,keyText:mtKey.keyText}
      // newAdvancedKey.st[num] = stkey
      props.onConfirm(newAdvancedKey, false)
     
    }
    // newAdvancedKey.rs?.forEach(element => {
    //   console.log(element.keyText)
    // });
  }
  const handleChangePressTime = (event: Event, newValue: number | number[]) => {
    setPressTime(newValue as number)
  }
  const handleChangeTglKey = (tglKey: API.Keyboard.TGLKey) => {
    const newAdvancedKey = props.advancedKey
    newAdvancedKey.tgl = tglKey
    props.onConfirm(newAdvancedKey, false)
  }
  const handleClickBaseKey = (keyObj: API.Keyboard.KeyObject) => {
    //alert('handleClickBaseKey')
    const newAdvancedKey = props.advancedKey
   // alert(selected)
    switch (selected) {
      case 0:
        if (newAdvancedKey.dks) {
          newAdvancedKey.dks[0].vkCode = keyObj.vkCode
          newAdvancedKey.dks[0].keyText = keyObj.keyText
        }
        break;
      case 1:
        if (newAdvancedKey.dks) {
          newAdvancedKey.dks[1].vkCode = keyObj.vkCode
          newAdvancedKey.dks[1].keyText = keyObj.keyText
        }
        break;
      case 2:
        if (newAdvancedKey.dks) {
          newAdvancedKey.dks[2].vkCode = keyObj.vkCode
          newAdvancedKey.dks[2].keyText = keyObj.keyText
        }
        break;
      case 3:
        if (newAdvancedKey.dks) {
          newAdvancedKey.dks[3].vkCode = keyObj.vkCode
          newAdvancedKey.dks[3].keyText = keyObj.keyText
        }
        break;
      case 4:
        if (newAdvancedKey.mt) {
          newAdvancedKey.mt[0] = keyObj
        }
        break;
      case 5:
        if (newAdvancedKey.mt) {
          newAdvancedKey.mt[1] = keyObj
        }
        break;
      case 6:
        newAdvancedKey.tgl = keyObj
        break;
        case 7:
        
          if (newAdvancedKey.rs) {
          //  alert('basekey'+newAdvancedKey.rs[0].oldKeyId)
            
            const RSKey1: API.Keyboard.RSKey={
              keyIndex:keyObj.idx,
              keyText:keyObj.keyText,
              vkCode: keyObj.vkCode,
             oldKeyId:newAdvancedKey.rs[0].oldKeyId,
              isRSaction:'r'

            }
            // if(!newAdvancedKey.rs[0].oldKeyId)
            // {
            //   RSKey1.oldKeyId=newAdvancedKey.rs[0].keyIndex
            //   alert(RSKey1.oldKeyId)
            // }
            newAdvancedKey.rs[0] =  RSKey1
          }
          break;
        case 8:
          if (newAdvancedKey.rs) {
            
            const RSKey2: API.Keyboard.RSKey={
              keyIndex:keyObj.idx,
              keyText:keyObj.keyText,
              oldKeyId:newAdvancedKey.rs[1].oldKeyId,
              vkCode: keyObj.vkCode,
              isRSaction:'s'

            }
            newAdvancedKey.rs[1] =  RSKey2
          }
          break;
          case 9:
            if (newAdvancedKey.st) {
           
              const STKey1: API.Keyboard.STKey={
                keyIndex:keyObj.idx,
                keyText:keyObj.keyText,
                vkCode: keyObj.vkCode,
                isRSaction:'r'
  
              }
              newAdvancedKey.st[0] =  STKey1
            }
            break;
          case 10:
            if (newAdvancedKey.st) {
           
              const STKey2: API.Keyboard.STKey={
                keyIndex:keyObj.idx,
                keyText:keyObj.keyText,
                vkCode: keyObj.vkCode,
                isRSaction:'s'
  
              }
              newAdvancedKey.st[1] =  STKey2
            }
            break;
      default:
    }
  //   if (newAdvancedKey.rs) {
  //   for(let i=0;i<newAdvancedKey.rs?.length;i++){
  //   console.log('rs1====='+newAdvancedKey.rs[i].keyText)
  //   }
  // }
    props.onConfirm(newAdvancedKey, false)
    handleDragStart()
  }
  const handleDragStart = () => {
    //setSelected(-1)
    const dksKeyItems = document.getElementsByClassName("DKS_KEY_ITEM");
    for (let i = 0; i < dksKeyItems.length; i++) {
      dksKeyItems[i].classList.remove(DKSKeyStyles.selected_key)
    }
    const mtKeyItems = document.getElementsByClassName("MT_KEY_ITEM");
    for (let i = 0; i < mtKeyItems.length; i++) {
      //mtKeyItems[i].classList.remove(MTKeyStyles.selected_key)
    }
    const tglKeyItems = document.getElementsByClassName("TGL_KEY_ITEM");
    for (let i = 0; i < tglKeyItems.length; i++) {
      tglKeyItems[i].classList.remove(TGLKeyStyles.selected_key)
    }
 // alert(selected)
  }
  const onSelect = (selected: number) => {
    setSelected(selected)
  }
  const handleDelete = () => {
    props.onDelete(props.advancedKey)
  }
  const handleConfirm = () => {
    props.advancedKey.socdType=executeType
    props.advancedKey.fullPress=openQuik2===false?1:0
    //alert(props.advancedKey.socdType)
    props.onConfirm(props.advancedKey, true)
  }
  const handleCloseDksTriggerPos = () => {
    setOpenTriggerPos(false)
  }
  const handleChangeTriggerPos = (_: Event, newValue: number | number[]) => {
    setTriggerPos(newValue as number)
    const newAdvancedKey = props.advancedKey
    if (newAdvancedKey.dks) {
      newAdvancedKey.fitstTriggerPos = newValue as number
      newAdvancedKey.lastTriggerPos = newValue as number
      props.onConfirm(newAdvancedKey, false)
    }
  };
  const handleOpenPressTime = () => {
    setPressTime(props.advancedKey.pressTime || 200)
    setOpenPressTime(true)
  }
  const handleClosePressTime = () => {
    setOpenPressTime(false)
  }
  const handleConfirmPressTime = () => {
    const newAdvancedKey = props.advancedKey
    newAdvancedKey.pressTime = pressTime
    props.onConfirm(newAdvancedKey, false)
    handleClosePressTime()
  }

  const handShowDksTriggerPos=()=>{
    setOpenTriggerPos(true)
  }

  const [openQuik, setOpenQuik] = useState(false)

  const handleRSwitchChange=()=>{
    setOpenQuik(!openQuik)
  }
  const handleRSwitchChange2=()=>{
    setOpenQuik2(!openQuik2)
  }


  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }
  const marks = [
    {
      value: 0.1,
      label: '0.1mm',
    },
    {
      value: 1.5,
      label: '1.5mm',
    },
    
    {
      value: 4,
      label: '4mm',
    },
  ];
  function valuetext(value: number) {
    return `${value}°C`;
  }
  
  const handleChangeExecuteType = (type: number) => {
    setExecuteType(type);
    
  }
  return (
    <>
      <Paper elevation={0} variant="outlined"
        sx={{
          minWidth: '958px',
          p: 1,
          borderRadius: '10px',
          height: '420px',
          flexGrow: 1,
          backgroundColor: isDarkMode ? '#20232a' : '#fff'
        }}
      >
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Stack direction='row' alignItems={'center'} spacing={0}>
            <Typography variant='body1'>{title}</Typography>
            {panel === 'MT' &&
              <IconButton size='small' onClick={handleOpenPressTime}>
                <SettingsIcon fontSize="small" />
              </IconButton>
            }
          </Stack>
          <Stack direction='row'>
            <IconButton aria-label="delete" size='small' onClick={handleDelete}>
              <DeleteIcon fontSize="small" />
            </IconButton>
            <Divider orientation="vertical" variant="middle" flexItem />
            <IconButton aria-label="done" size='small' color='success' onClick={handleConfirm}>
              <CheckCircleIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
        <Divider></Divider>
        <Grid container spacing={2} sx={{ mt: '5px' }}>
          <Grid xs={4}>
            <Box
              sx={{
                p: 1,
                height: '350px',
                border: '1px solid',
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
                borderRadius: '10px',
                backgroundColor: isDarkMode ? '#20232a' : '#fff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'cente'
              }}
            >
              {panel === 'DKS' &&
                <Stack spacing={2.5}>
                 <Box sx={{ pl: '69px' }}>
                    {/* 4个mm数 */}
                    <Stack direction="row" >
                      <Stack spacing={1} alignItems={'center'} sx={{ mr: '28px' }} >
                        <Link color="inherit" sx={{ fontSize: '12px' }} onClick={handShowDksTriggerPos}>
                          {props.advancedKey.fitstTriggerPos || 1.6}mm
                        </Link>
                        <Box sx={{ width: '32px', height: '32px', border: '1px solid ', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <VerticalAlignBottom fontSize="small" />
                        </Box>
                      </Stack>
                      <Stack spacing={1} alignItems={'center'} sx={{ mr: '28px' }}>
                        <Typography variant="caption" fontSize={12}>3.6mm</Typography>
                        <Box sx={{ width: '32px', height: '32px', border: '1px solid ', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <VerticalAlignBottom fontSize="small" />
                        </Box>
                      </Stack>
                      <Stack spacing={1} alignItems={'center'} sx={{ mr: '28px' }}>
                        <Typography variant="caption" fontSize={12}>3.6mm</Typography>
                        <Box sx={{ width: '32px', height: '32px', border: '1px solid ', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <VerticalAlignTopIcon fontSize="small" />
                        </Box>
                      </Stack>
                      <Stack spacing={1} alignItems={'center'}>
                        <Link color="inherit" sx={{ fontSize: '12px' }} onClick={handShowDksTriggerPos}>
                          {props.advancedKey.lastTriggerPos || 1.6}mm
                        </Link>
                        <Box sx={{ width: '32px', height: '32px', border: '1px solid ', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <VerticalAlignTopIcon fontSize="small" />
                        </Box>
                      </Stack>
                    </Stack>
                  </Box>
                  {props.advancedKey.dks &&
                    <>
                      <DKSKey
                        dksKey={props.advancedKey.dks[0]}
                        onClick={() => onSelect(0)}
                        onChangeKey={(vkCode, keyText) => handleChangeDksKey(0, vkCode, keyText)}
                        onChangeData={(dksData) => handleChangeDksData(0, dksData)}
                      />
                      <DKSKey
                        onClick={() => onSelect(1)}
                        dksKey={props.advancedKey.dks[1]}
                        onChangeKey={(vkCode, keyText) => handleChangeDksKey(1, vkCode, keyText)}
                        onChangeData={(dksData) => handleChangeDksData(1, dksData)}
                      />
                      <DKSKey
                        onClick={() => onSelect(2)}
                        dksKey={props.advancedKey.dks[2]}
                        onChangeKey={(vkCode, keyText) => handleChangeDksKey(2, vkCode, keyText)}
                        onChangeData={(dksData) => handleChangeDksData(2, dksData)}
                      />
                      <DKSKey
                        onClick={() => onSelect(3)}
                        dksKey={props.advancedKey.dks[3]}
                        onChangeKey={(vkCode, keyText) => handleChangeDksKey(3, vkCode, keyText)}
                        onChangeData={(dksData) => handleChangeDksData(3, dksData)}
                      />
                    </>
                  }
                </Stack>
              }

              {panel === 'MT' &&
                <Stack spacing={2} alignItems={'center'}  >
                  <Typography variant="body2" display="block" gutterBottom sx={{ p: 1 }}>
                    {intl.formatMessage({ id: "advance.MTExplain" })}
                  </Typography>
                  <Stack direction="row" spacing={5} >
                    <Stack alignItems={'center'}>
                      <Typography variant='caption'>{intl.formatMessage({ id: "advance.press" })}</Typography>
                      {props.advancedKey.mt &&
                        <MTKey mtKey={props.advancedKey.mt[0]} onChangeKey={(mtData) => handleChangeMtKey(0, mtData)} onClick={() => onSelect(4)} />
                      }
                    </Stack>
                    <Stack alignItems={'center'}>
                      <Typography variant='caption'>{intl.formatMessage({ id: "advance.click" })}</Typography>
                      {props.advancedKey.mt &&
                        <MTKey mtKey={props.advancedKey.mt[1]} onChangeKey={(mtData) => handleChangeMtKey(1, mtData)} onClick={() => onSelect(5)} />
                      }
                    </Stack>
                  </Stack>
                  <Typography variant='caption'>{intl.formatMessage({ id: 'advance.pressTimeTips' })}：{props.advancedKey.pressTime}ms</Typography>
                </Stack>
              }
 {panel === 'RS' &&
                <Stack spacing={2} alignItems={'center'}  >
                  <Typography variant="body2" display="block" gutterBottom sx={{ p: 1 }}>
                    {intl.formatMessage({ id: "advance.RSExplain" })}
                  </Typography>
                  <Stack direction="row" spacing={5} >
                  <Stack alignItems={'center'}>
                  
                    </Stack>
                    <Stack alignItems={'center'}>
                      <Typography variant='caption'>{intl.formatMessage({ id: "advance.pressKey1" })}</Typography>
                      {props.advancedKey.rs &&
                        <RSKey  mtKey={props.advancedKey.rs[0]} keyindex={props.advancedKey.rs[0].keyIndex} onChangeKey={(mtData) => handleChangeRSKey(0, mtData)} onClick={() => onSelect(7)} />
                      }
                    </Stack>
                    <Stack alignItems={'center'}>
                      <Typography variant='caption'>{intl.formatMessage({ id: "advance.pressKey2" })}</Typography>
                      {props.advancedKey.rs &&
                        <RSKey mtKey={props.advancedKey.rs[1]} keyindex={props.advancedKey.rs[1].keyIndex} onChangeKey={(mtData) => handleChangeRSKey(1, mtData)} onClick={() => onSelect(8)} />
                      }
                    </Stack>
                  </Stack>
                  {/* <Typography variant='caption'>{intl.formatMessage({ id: 'advance.pressTimeTips' })}：{props.advancedKey.pressTime}ms</Typography> */}
                </Stack>
              }
               {panel === 'ST' &&
               <Box>
                <Stack spacing={1} alignItems={'center'} >
                  <Typography variant="caption" display="block" gutterBottom sx={{ p: 0}}>
                    {intl.formatMessage({ id: "advance.STExplain" })}
                  </Typography>
                  <Stack direction="row" spacing={2} sx={{}} >
                    <Stack alignItems={'center'}>
                      <Typography variant='caption'>{intl.formatMessage({ id: "advance.pressKey1" })}</Typography>
                      {props.advancedKey.st &&
                        <RSKey mtKey={props.advancedKey.st[0]} onChangeKey={(mtKey) => handleChangeSTKey(0, mtKey)} onClick={() => onSelect(9)} />
                      }
                    </Stack>
                    <Stack alignItems={'center'}>
                      <Typography variant='caption'>{intl.formatMessage({ id: "advance.pressKey2" })}</Typography>
                      {props.advancedKey.st &&
                        <RSKey mtKey={props.advancedKey.st[1]} onChangeKey={(mtKey) => handleChangeSTKey(1, mtKey)} onClick={() => onSelect(10)} />
                      }
                    </Stack>
                  </Stack>
            <Stack spacing={0} alignItems={'left'}   sx={{width:'100%',height:100,margin:0,padding:0}}>
            <Typography variant='caption'sx={{margin:0,padding:0,float:'left'}}>
              {intl.formatMessage({ id: "advance.socdList" })}
             
              </Typography>
              <Typography variant='caption'  sx={{color:'gray'}}>
                 {intl.formatMessage({ id: "advance.socdList0" })}
              </Typography>
            {/* <Typography variant='subtitle2'sx={{margin:0,height:'25px',padding:0}}>{intl.formatMessage({ id: "advance.socdList0" })}</Typography> */}
              <FormControlLabel sx={{margin:0,height:'20px',marginLeft:'20px'}}
                label={<Typography variant='caption'>{intl.formatMessage({ id: "advance.socdList1" })}</Typography>}
                control={<Checkbox size="2" checked={executeType === 0} onChange={() => handleChangeExecuteType(0)}/>}
              />
              <FormControlLabel sx={{margin:0,height:'20px',marginLeft:'20px'}}
                label={<Typography variant='caption'>{intl.formatMessage({ id: "advance.socdList2" })}</Typography>}
                control={<Checkbox size="2" checked={executeType === 1} onChange={() => handleChangeExecuteType(1)}/>}
              />
              <FormControlLabel  sx={{margin:0,height:'20px',marginLeft:'20px'}}
                label={<Typography variant='caption'>{intl.formatMessage({ id: "advance.socdList3" })}</Typography>}
                control={<Checkbox size="2" checked={executeType === 2} onChange={() => handleChangeExecuteType(2)}/>}
              />           
             <FormControlLabel  sx={{margin:0,height:'20px',marginLeft:'20px'}}
                label={<Typography variant='caption'>{intl.formatMessage({ id: "advance.socdList4" })}</Typography>}
                control={<Checkbox size="2" checked={executeType === 3} onChange={() => handleChangeExecuteType(3)}/>}
              />   
              </Stack>
              <br></br>
                </Stack>
                <Stack direction="row">
              <Typography variant='caption' >{intl.formatMessage({ id: "advance.socdType" })}:</Typography>
              <MaterialUISwitchRS  color="warning"
                                      checked={openQuik2}
                                      onChange={handleRSwitchChange2}
                                    /> 
              </Stack>
              <Stack>
              <Typography variant='caption' sx={{color:'gray'}}>{intl.formatMessage({ id: "advance.socdTypeExplain" })}</Typography> 
              </Stack>
                </Box>
              }
              {panel === 'TGL' &&
                <Stack spacing={2} alignItems={'center'}  >
                  <Typography variant="caption" display="block" gutterBottom sx={{ p: 1 }}>
                    {intl.formatMessage({ id: "advance.LGTExplain" })}
                  </Typography>
                  <TGLKey tglKey={props.advancedKey.tgl} onChangeKey={(tglKey) => handleChangeTglKey(tglKey)} onClick={() => onSelect(6)} />
                </Stack>
              }

            </Box>
          </Grid>

          <Grid xs={8}>
          <Box
              sx={{
                p: 1,
                height: '350px',
                border: '1px solid',
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
                borderRadius: '10px',
                backgroundColor: isDarkMode ? '#20232a' : '#fff',
                overflow: 'auto',
                display:props.isRS?'block':'none'
              }}
            >
<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={intl.formatMessage({ id: "advance.bind" })} {...a11yProps(0)} />
          {/* <Tab label={intl.formatMessage({ id: "advance.behavior" })} {...a11yProps(1)} /> */}
        
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <Accordion defaultExpanded sx={{ backgroundColor: isDarkMode ? '#20232a' : '#fff' }}>
               
                <AccordionDetails>
                  <Box>
                    {baseKeyboardData.map((item) => {
                      if(item.idx&&item.idx!=undefined)
                      {
                       
                       if(props.advanceList.indexOf(','+item.idx.toString()+',')>-1){
                        return <BaseKeyDisabled  isok={true} key={'baseKey_' + item.vkCode} keyObj={item} onClick={handleClickBaseKey} onDragStart={handleDragStart} />
                       }
  else
return <BaseKey key={'baseKey_' + item.vkCode} keyObj={item} onClick={handleClickBaseKey} onDragStart={handleDragStart} />
                       


                       // return <BaseKey key={'baseKey_' + item.vkCode} keyObj={item} onClick={handleClickBaseKey} onDragStart={handleDragStart} />


                       
                      }

                    })}
                  </Box>
                  <Box>
                 
                    {extendKeyboardData.map((item) => {
                       if(item.idx&&item.idx!=undefined)
                       {
                        if(props.advanceList.indexOf(','+item.idx.toString()+',')>-1){
                          return <BaseKeyDisabled isok={true} key={'baseKey_' + item.vkCode} keyObj={item} onClick={handleClickBaseKey} onDragStart={handleDragStart} />
                         }
    else
                      return <BaseKey key={'extendKey_' + item.vkCode} keyObj={item} onClick={handleClickBaseKey} onDragStart={handleDragStart} />
                       }
                    })}
                  </Box>
                 
                </AccordionDetails>
              </Accordion>
              {/* <Accordion sx={{ backgroundColor: isDarkMode ? '#20232a' : '#fff' }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="extendKey-content"
                  id="extendKey-header"
                  sx={{ backgroundColor: isDarkMode ? '#262931' : '#eaecef' }}
                >
                  <Typography variant='caption'>{intl.formatMessage({ id: "advance.extendKeyPanel" })}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    {extendKeyboardData.map((item) => {
                       if(item.idx&&item.idx!=undefined)
                      return <BaseKey key={'extendKey_' + item.vkCode} keyObj={item} onClick={handleClickBaseKey} onDragStart={handleDragStart} />
                      
                    })}
                  </Box>
                </AccordionDetails>
              </Accordion> */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
     
     <Box sx={{border:'0px solid red',padding:'0px',mt:'-15px'}}>
                                  <Stack direction={'row'} justifyContent={'left'} alignItems={'left'}>
                                    <Typography variant='button'>{intl.formatMessage({ id: "advance.fast" })}</Typography>
                                 
                                  <MaterialUISwitchRS  color="warning"
                                      checked={openQuik}
                                      onChange={handleRSwitchChange}
                                    />
                                  
                                    
                                  </Stack>
                                  <Typography variant="caption" > {intl.formatMessage({ id: "advance.sensitivity" })}
                                   
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                 </Typography>
                                

               {/* <Typography variant="body2">制动点</Typography> */}
               {/* <Box sx={{ backgroundColor: '#20232a' }} > */}
            {/* <Box >
              <Typography variant='caption' >设置行程{triggerPos}</Typography>
            
            </Box> */}
            <Box  sx={{marginLeft:'30px',width: 250}}>
              <Stack justifyContent={'left'} alignItems={'left'}>
             
                <Image
                  priority
                  src="/images/ks.png"
                  height={100}
                  width={100}
                  style={{marginLeft:'30%'}}
                  alt=""
                />
               
                <Box sx={{ width: 250 }}>
                  <Slider
                    step={0.1}
                    value={triggerPos}
                    defaultValue={1.5}
                    valueLabelDisplay="auto"
                    color='warning'
                    min={0.1}
                    max={4}
                    marks={marks}
                   sx={{heght:'px'}}
                    onChange={handleChangeTriggerPos}
                  />
                  {/* <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography
                      variant="caption"
                      onClick={() => setTriggerPos(1)}
                      sx={{ cursor: 'pointer' }}
                    >
                      0.1mm
                    </Typography>
                    <Typography
                      variant="caption"
                      onClick={() => setTriggerPos(40)}
                      sx={{ cursor: 'pointer' }}
                    >
                      4mm
                    </Typography>
                  </Box> */}
                </Box>
              </Stack>
            </Box>
           
            {/* </Box> */}
            </Box>
      </CustomTabPanel>
      
     
           
          
            </Box>



            <Box
              sx={{
                p: 1,
                height: '350px',
                border: '1px solid',
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
                borderRadius: '10px',
                backgroundColor: isDarkMode ? '#20232a' : '#fff',
                overflow: 'auto',
                display:props.isRS?'none':'block'
              }}
            >
              <Accordion defaultExpanded sx={{ backgroundColor: isDarkMode ? '#20232a' : '#fff' }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="baseKey-content"
                  id="baseKey-header"
                  sx={{ backgroundColor: isDarkMode ? '#262931' : '#eaecef' }}
                >
                  <Typography variant='caption'>{intl.formatMessage({ id: "advance.baseKeyPanel" })}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    {baseKeyboardData.map((item) => {
                      if(item.idx&&item.idx!=undefined)
                      return <BaseKey key={'baseKey_' + item.vkCode} keyObj={item} onClick={handleClickBaseKey} onDragStart={handleDragStart} />
                      else
                      return <button>1</button>

                    })}
                  </Box>
                </AccordionDetails>
              </Accordion>
              <Accordion sx={{ backgroundColor: isDarkMode ? '#20232a' : '#fff' }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="extendKey-content"
                  id="extendKey-header"
                  sx={{ backgroundColor: isDarkMode ? '#262931' : '#eaecef' }}
                >
                  <Typography variant='caption'>{intl.formatMessage({ id: "advance.extendKeyPanel" })}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    {extendKeyboardData.map((item) => {
                       if(item.idx&&item.idx!=undefined)
                      return <BaseKey key={'extendKey_' + item.vkCode} keyObj={item} onClick={handleClickBaseKey} onDragStart={handleDragStart} />
                      
                    })}
                  </Box>
                </AccordionDetails>
              </Accordion>
              <Accordion sx={{ backgroundColor: isDarkMode ? '#20232a' : '#fff' }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="specialKey-content"
                  id="specialKey-header"
                  sx={{ backgroundColor: isDarkMode ? '#262931' : '#eaecef' }}
                >
                  <Typography variant='caption'>{intl.formatMessage({ id: "advance.specialKeyPanel" })}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    {specialKeyboardData.map((item) => {
                       if(item.idx&&item.idx!=undefined)
                      return <BaseKey key={'specialKey_' + item.vkCode} keyObj={item} onClick={handleClickBaseKey} onDragStart={handleDragStart} />
                    })}
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Grid>
        </Grid>

        <Dialog open={openDksTriggerPos} >
          <Box sx={{ backgroundColor: '#20232a' }} >
            <Box sx={{ width: '350px', textAlign: 'center' }}>
              <Typography variant='caption' >{intl.formatMessage({ id: "advance.triggerPosExplain" })}</Typography>
              <IconButton aria-label="delete" size="small" onClick={handleCloseDksTriggerPos} sx={{ position: 'absolute', right: '0px' }}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            </Box>
            <Box sx={{ width: '350px', height: '200px' }} >
              <Stack justifyContent={'center'} alignItems={'center'}>
                <Image
                  priority
                  src="/images/ks.png"
                  height={120}
                  width={120}
                  alt=""
                />
                <Box sx={{ width: 250 }}>
                  <Slider
                    step={0.1}
                    value={triggerPos}
                    valueLabelDisplay="auto"
                    color='warning'
                    min={0.1}
                    max={3.5}
                    onChange={handleChangeTriggerPos}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography
                      variant="caption"
                      onClick={() => setTriggerPos(1)}
                      sx={{ cursor: 'pointer' }}
                    >
                      0.1mm
                    </Typography>
                    <Typography
                      variant="caption"
                      onClick={() => setTriggerPos(3.5)}
                      sx={{ cursor: 'pointer' }}
                    >
                      3.5mm
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Dialog>
      </Paper>

      <Dialog open={openPressTime}>
        <Box sx={{ width: '350px', textAlign: 'center' }}>
          <Typography variant='caption' ></Typography>
          <IconButton aria-label="delete" size="small" onClick={handleClosePressTime} sx={{ position: 'absolute', right: '0px' }}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Box>
        <DialogTitle sx={{ backgroundColor: isDarkMode ? '#20232a' : '#fff' }}>{intl.formatMessage({ id: 'advance.pressTimeTitle' })}</DialogTitle>
        <DialogContent sx={{ backgroundColor: isDarkMode ? '#20232a' : '#fff' }}>
          <Box width={'100%'}>
            <Typography variant="body2">{intl.formatMessage({ id: 'advance.pressTimeTips' })}</Typography>
            <Stack pl={'10px'} pr={'10px'} direction={'row'} spacing={2} alignItems={'center'}>
              <Slider
                aria-label="pressTime"
                max={1000}
                min={10}
                step={1}
                value={pressTime}
                onChange={handleChangePressTime}
              />
              <Typography variant="body2" width={'60px'}>{pressTime}ms</Typography>
            </Stack>
            <Typography variant='caption'>{intl.formatMessage({ id: 'advance.pressTimeExplain' })}</Typography>
          </Box>
          <br></br>
          <Box>
            <Button fullWidth variant="contained" onClick={handleConfirmPressTime}>{intl.formatMessage({ id: 'page.confirm' })}</Button>
          </Box>

        </DialogContent>
      </Dialog>
      {/* <Dialog open={openRSTip}>
      <Box sx={{ width: '350px', textAlign: 'center' }}>
      <Typography variant='caption' >22222</Typography>
      </Box>
      </Dialog> */}
    </>
  )
}

export default AdvancedKey;