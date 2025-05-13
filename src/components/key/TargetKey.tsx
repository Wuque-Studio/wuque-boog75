import { CSSProperties, useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import classNames from 'classnames';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Badge from '@mui/material/Badge';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import Switch from '@mui/material/Switch';
import Image from 'next/image';

import BlockIcon from '@mui/icons-material/Block';

import styles from './TargetKey.module.css'
import { Stack } from '@mui/material';
import { useIntl } from 'react-intl';


interface targetKeyProp {
  keyIndex: number,
  vkCode: number,
  macroId?: number,
  keyText: string,
  keyColor?: API.Keyboard.Color,
  sensitivity?: number,
  rapidTrigger?: API.Keyboard.RapidTrigger,
  cssStyle?: CSSProperties,
  ableSelect?: boolean,
  isSelected?: boolean,
  isAdvanceRT: boolean,
  isLocalChange?: boolean,
  bottomNavigation?: number,
  keyTextBreak?: boolean,
  tglSwitch?: boolean,
  isAdvancedKey?: boolean,
  advancedKeyId?: number,
  isDKS?: boolean,
  isMT?: boolean,
  isRS?:boolean,//new
  isRSAction?:string|undefined,
  isSTAction?:string|undefined,//snap
  isAbleSelectKey?:boolean,
  isST?:boolean,//new
  isHightSelected?:boolean,//new
  zoom?: number,
  layer: number,
  isDisableChange?: boolean,
  deviceVersion?:string,
  onKeyChange: (layer: number, keyIndex: number, keyText: string, vkCode: number, macroId: number, rgb?: API.Keyboard.Rgb,sHightSelected?:boolean) => void,
  onKeyChangeHight: (layer: number, keyIndex: number,sHightSelected:boolean) => void,//snap
  onKeyChangeHightMore: (layer: number, keyIndex: string,sHightSelected:boolean) => void,//snap
  onSelected: (keyIndex: number, isSelected: boolean) => void,
  onSelectedRT: (keyIndex: number, isSelected: boolean,advancedKeyId:number|undefined) => void,
  onAddAdvancedKey: (type: string, key: API.Keyboard.KeyObject) => void,
  onTglSwitch: (eyIndex: number, s: boolean) => void,
  onOpenAdvancedKeyPanel: (dskType: string, advancedKeyId: number) => void,
  // onGetAdvance:()=>number|undefined
}

export default function TargetKey(p: targetKeyProp) {
  const intl = useIntl();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const isInvalid = p.bottomNavigation === 0;
  const isRTPanel = p.bottomNavigation === 2;
  const isAdvancedKeyPanel = p.bottomNavigation === 3;

  const [showExplain, setShowExplain] = useState(false)
  const [showRT, setShowRT] = useState(false)
  const [openSelectAdvancedKey, setOpenSelectAdvancedKey] = useState(false)
  const [showSR, setShowSR] = useState(false)
  const handleClick = (e: any, keyIndex: number) => {
   //alert('点击key-'+isAdvancedKeyPanel+'--is-'+p.isHightSelected+'-'+keyIndex)
    //当前key 高亮
    const keyText1 = e.currentTarget.innerText;
    const keyIndex1 = e.currentTarget.dataset.keyindex;
    const vkCode1 = e.currentTarget.dataset.vkcode;
    if (p.keyColor) {
      //alert('color')
      const keyText = e.target.innerText;
      const keyIndex = e.target.dataset.keyindex;
      const vkCode = e.target.dataset.vkcode;
      const macroId = e.target.dataset.macroid;
      p.onKeyChange(p.layer, keyIndex, keyText, vkCode, macroId === 'undefined' ? 0x00 : macroId, p.keyColor?.rgb)
    }
    
     if (isAdvancedKeyPanel) {
      //alert(p.ableSelect)
      //alert(p.advancedKeyId)
      if(p.ableSelect===true)
      {

      //   alert(p.advancedKeyId)

      //  // p.onGetAdvance();

      //   p.onSelectedRT(keyIndex, !p.isHightSelected,p.advancedKeyId)
      }
      
     else
     {
        if (p.isDKS) {
        // const keyText = e.target.innerText;
        // const keyIndex = e.target.dataset.keyindex;
        // const vkCode = e.target.dataset.vkcode;
       // const macroId = e.target.dataset.macroid;
       //alert(keyIndex)
        p.onKeyChangeHight(p.layer, keyIndex,true);
        p.onOpenAdvancedKeyPanel("DKS", p.advancedKeyId || 0)
      } else if (p.isMT) {
        p.onKeyChangeHight(p.layer, keyIndex,true);
        p.onOpenAdvancedKeyPanel("MT", p.advancedKeyId || 0)
      }
      else if (p.isRS) {
        setShowSR(true)
       
        p.onKeyChangeHight(p.layer, keyIndex,true);
        p.onOpenAdvancedKeyPanel("RS", p.advancedKeyId || 0)
      } 
      else if (p.isST) {
        p.onKeyChangeHight(p.layer, keyIndex,true);
        p.onOpenAdvancedKeyPanel("ST", p.advancedKeyId || 0)
      } else {
        handleOpenSelectAdvancedKey()//snap 显示高级键选择面板
      }
   }
    
    }
    if (isRTPanel && p.ableSelect && e.buttons === 0) {
      p.onSelected(keyIndex, !p.isSelected)
    }
  }

  const handleEnter = (e: any) => {
    e.preventDefault()
  }

  const handleOver = (e: any) => {
    e.preventDefault()
    if (isInvalid && !p.isAdvancedKey && !p.isDisableChange) {
      e.target.classList.add(styles.drapover_keycode)
    }
  }

  const handleLeave = (e: any) => {
    e.preventDefault()
    if (isInvalid && !p.isAdvancedKey && !p.isDisableChange) {
      e.target.classList.remove(styles.drapover_keycode)
    }
  }

  const handleDrop = (e: any) => {
    e.stopPropagation();
    e.preventDefault()
    if (isInvalid && !p.isAdvancedKey && !p.isDisableChange) {
      e.target.classList.remove(styles.drapover_keycode)

      const keyIndex = Number(e.target.dataset.keyindex)
      const keycolor: API.Keyboard.Color = e.target.dataset.keycolor && JSON.parse(e.target.dataset.keycolor)

      const targetKeyText = e.dataTransfer.getData('text')
      let vkCode = e.dataTransfer.getData('vkCode')
      let macroId = e.dataTransfer.getData('macroId')
      vkCode = vkCode === 'undefined' ? 0x00 : Number(vkCode)
      macroId = macroId === 'undefined' ? 0x00 : Number(macroId)

      if (vkCode) {
        p.onKeyChange(p.layer, keyIndex, targetKeyText, vkCode, macroId, keycolor?.rgb)
      }
    }
  }

  const handleMouseOver = (e: any, keyIndex: number) => {
    if (isRTPanel && p.ableSelect && e.buttons === 1) {
      p.onSelected(keyIndex, true)
    }
  }

  const handleMouseEnter = (e: any) => {
    //alert(p.bottomNavigation)
    if (e.buttons !== 1) {
     if(p.bottomNavigation===2)
      setShowRT(true);
    else
    setShowRT(false);
     // alert(3)
      // setShowRT(p.bottomNavi
      // gation === 2 && p.isAdvanceRT);
      // setShowExplain(p.bottomNavigation === 0);
     // setShowRT(p.bottomNavigation ===2);
    }
  };

  const handleMouseLeave = (e: any) => {
    setShowRT(false);
    setShowExplain(false);
  };

  const handleBreakText = (text: string, num: number) => {
    let str = "";
    if (text) {
      for (let i = 0; i < text.length; i += num) {
        str = str + text.slice(i, i + num) + '\n';
      }
    }
    return str;
  }

  const handleAddAdvancedKey = (type: string) => {
    if (type === "RS") {
      //打开主页的弹层
    }
    if (type === "TGL") {
      p.onTglSwitch(p.keyIndex, !p.tglSwitch)
    } 
    else {

      p.onAddAdvancedKey(type, { idx: p.keyIndex, vkCode: p.vkCode, keyText: p.keyText, isRSaction:'r' })
    }
    setOpenSelectAdvancedKey(false)
  }

  const handleOpenSelectAdvancedKey = () => {
    setOpenSelectAdvancedKey(true)
  }

  const handleCloseSelectAdvancedKey = () => {
    setOpenSelectAdvancedKey(false)
  }


  if (p.keyText === "Empty") {
    return (
      <div className={styles.emptyKey} style={p.cssStyle}></div>
    )
  } else {
    return (
      <>
        <Badge
          aria-describedby={'targetKeyPopover_' + p.vkCode}
          // invisible={!p.isLocalChange}
          badgeContent={!p.isAdvanceRT ? p.sensitivity : null}
          color="warning"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {/*  p.vkCode 是什么  snap*/}
          <Box id={'targetKey_' + p.vkCode}
            className={classNames(styles.keycode, styles.targetKey)}
            style={p.keyColor ? { ...p.cssStyle, background: `rgba(${p.keyColor.rgb.r}, ${p.keyColor.rgb.g}, ${p.keyColor.rgb.b}, ${p.keyColor.rgb.a})` } : { ...p.cssStyle }}
           
            data-keyindex={p.keyIndex}
            data-default_keycode={p.keyText}
            data-keycolor={p.keyColor && JSON.stringify(p.keyColor)}
            data-vkcode={p.vkCode}
            data-macroid={p.macroId || 0x00}
            data-rt={p.rapidTrigger}
            onClick={(event) => handleClick(event, p.keyIndex)}
            onDragEnter={handleEnter}
            onDragOver={handleOver}
            onDragLeave={handleLeave}
            onDrop={handleDrop}
            onMouseOver={(event) => handleMouseOver(event, p.keyIndex)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* rt选中key样式 */}
            {p.ableSelect && p.isSelected &&
              <Box className={styles.selelcted_keycode} sx={{ width: '100%', height: '100%', position: 'absolute', borderRadius: '6px' }}></Box>
            }
            {p.isDisableChange &&
              <Box sx={{ width: '100%', height: '100%', position: 'absolute', borderRadius: '6px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               
                <BlockIcon fontSize='large' color='error' sx={{opacity: 0.5}}/>

              </Box>
            }
    
            {p.isHightSelected===true &&
              <Box className={styles.selelcted_keycode_hight} sx={{ width: '100%', height: '100%', position: 'absolute', borderRadius: '6px' }}>
              </Box>
            }
            {isAdvancedKeyPanel 
            && p.tglSwitch &&
              <Image priority src="/images/TGL.png" height={20} width={20} alt="TGL" />
            }
            {/* snap */}
           
            {p.isDKS &&
              <Image priority src="/images/DKS.png" height={20} width={20} alt="DKS" />
            }
            {p.isMT &&
              <Image priority src="/images/MT.png" height={20} width={20} alt="MT" />
            }
             {/* {p.isRS &&
              <Image priority src="/images/R-rs.png" height={20} width={20} alt="RS" />//rs  r的图标 snap,还需要一个rs s 的图标  snap
            } */}
            {/* 键盘矩阵 */}
            {/* {p.isRS && 'rs='+p.isRSAction} */}
            {p.isRS && p.isRSAction==='r'&&
              <Image priority src="/images/R-rs.png" height={20} width={20} alt="RS" />//rs  r的图标 snap,还需要一个rs s 的图标  snap
            }
            {p.isRS && p.isRSAction==='s'&&
              <Image priority src="/images/S-rs.png" height={20} width={20} alt="RS" />//rs  r的图标 snap,还需要一个rs s 的图标  snap
            }
             {p.isST && p.isRSAction==='r'&&
              <Image priority src="/images/R-st.png" height={20} width={20} alt="ST" />//rs  r的图标 snap,还需要一个rs s 的图标  snap
            }
            {p.isST && p.isRSAction==='s'&&
              <Image priority src="/images/S-st.png" height={20} width={20} alt="ST" />//rs  r的图标 snap,还需要一个rs s 的图标  snap
            }

            {!(isAdvancedKeyPanel && p.tglSwitch) && !p.isDKS && !p.isMT && !p.isRS && !p.isST &&
              (p.keyTextBreak ? handleBreakText(p.keyText, 5) : p.keyText)
            }
           {/* rt 行程值 */}
            {/* {isRTPanel&&p.isAdvanceRT && p.isLocalChange && */}
            {isRTPanel &&
              <Box sx={{ position: 'absolute', left: 0, height: '100%' }}>
                <Stack direction="column" justifyContent={'space-between'} alignItems={'center'} sx={{ height: '100%' }}>
                  <Typography noWrap variant='caption' sx={{ fontSize: 10, lineHeight: '10px' }} color={'orange'}>{p.rapidTrigger?.make}</Typography>
                  <Typography noWrap variant='caption' sx={{ fontSize: 10, lineHeight: '10px' }} color={'orange'}>{p.rapidTrigger?.break}</Typography>
                </Stack>
              </Box>
            }
 {/* 只有改键时 显示可以拖动的提示 */}
            {showExplain && !p.isDKS && !p.isMT && !p.isDisableChange &&
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: '110%',
                width: '130px',
                height: '42px',
                backgroundImage: `url('/images/explain_popover.png')`,
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'rgba(255,255,255,0)'
              }}>
                <Typography variant="caption" gutterBottom align='center' sx={{ fontSize: '12px', color: isDarkMode ? 'rgba(0,0,0,0.87)' : '#fff' }}>{intl.formatMessage({ id: "keyboard.explainPopover" })}</Typography>
              </Box>
            }

            {isRTPanel&&showRT && p.rapidTrigger &&
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  bottom: '120%',
                  borderRadius: '5px',
                  flexWrap: 'wrap',
                  '& > :not(style)': {
                    m: 1,
                    p: 1,
                    height: 60,
                  },
                  backgroundColor: isDarkMode ? '#15191c' : '#edf2f6',
                }}
              >
                <Paper sx={{
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  backgroundColor: isDarkMode ? '#20232a' : '#fff',
                }}>
                  <Stack>
                   {p.isLocalChange && <Typography noWrap variant='subtitle2' sx={{textAlign:'left'}}>{intl.formatMessage({ id: "rapidTrigger.setSingle" })}</Typography>
  }
   {!p.isLocalChange && <Typography noWrap variant='subtitle2' sx={{textAlign:'left'}} >{intl.formatMessage({ id: "rapidTrigger.setAll" })}</Typography>
  }
                    <Typography noWrap variant='subtitle2' sx={{textAlign:'left'}}>{intl.formatMessage({ id: "keyboard.pressStroke" })}: {p.rapidTrigger?.make}</Typography>
                    <Typography noWrap variant='subtitle2' sx={{textAlign:'left'}}>{intl.formatMessage({ id: "keyboard.releaseStroke" })}: {p.rapidTrigger?.break}</Typography>
                  </Stack>
                </Paper >
              </Box>
            }
          </Box>
        </Badge>
        {/* 高级键选择面板 */}
        <Dialog onClose={handleCloseSelectAdvancedKey} open={openSelectAdvancedKey}>
          <Box sx={{ backgroundColor: isDarkMode ? '#20232a' : '#fff', zoom: p.zoom }}>
            <List sx={{ pt: 0 }}>
              
           <ListItem disableGutters sx={{display:(['V28','V29','V30'].includes(p.deviceVersion))?'block':'none'}} >
                <ListItemButton
                  disabled={p.tglSwitch}
                  autoFocus
                  onClick={() => handleAddAdvancedKey("RS")}
                >
                  <ListItemText primary={intl.formatMessage({ id: "advance.RSTitle" })} secondary={intl.formatMessage({ id: "advance.RSExplain" })} />
                </ListItemButton>
              </ListItem>
              <ListItem disableGutters sx={{display:(['V28','V29','V30'].includes(p.deviceVersion))?'block':'none'}}>
                <ListItemButton
                  disabled={p.tglSwitch}
                  autoFocus
                  onClick={() => handleAddAdvancedKey("ST")}
                >
                  <ListItemText primary={intl.formatMessage({ id: "advance.STTitle" })} secondary={intl.formatMessage({ id: "advance.STExplain" })} />
                </ListItemButton>
              </ListItem>
  
              <ListItem disableGutters>
                <ListItemButton
                  disabled={p.tglSwitch}
                  autoFocus
                  onClick={() => handleAddAdvancedKey("DKS")}
                >
                  <ListItemText primary={intl.formatMessage({ id: "advance.DKSTitle" })} secondary={intl.formatMessage({ id: "advance.DKSExplain" })} />
                </ListItemButton>
              </ListItem>
              <ListItem disableGutters>
                <ListItemButton
                  disabled={p.tglSwitch}
                  autoFocus
                  onClick={() => handleAddAdvancedKey("MT")}
                >
                  <ListItemText primary={intl.formatMessage({ id: "advance.MTTitle" })} secondary={intl.formatMessage({ id: "advance.MTExplain" })} />
                </ListItemButton>
              </ListItem>
              <ListItem disableGutters>
                <ListItemButton
                  autoFocus
                  onClick={() => handleAddAdvancedKey("TGL")}
                >
                  <ListItemText
                    primary={
                      <>
                        <Stack direction={'row'} alignItems={'center'}>
                          <Typography>{intl.formatMessage({ id: "advance.LGTTitle" })}</Typography>
                          <Switch checked={p.tglSwitch} />
                        </Stack>
                      </>
                    }
                    secondary={intl.formatMessage({ id: "advance.LGTExplain" })} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Dialog>
      </>
    );
  }

}
