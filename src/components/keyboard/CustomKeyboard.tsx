import { useTheme } from '@mui/material/styles';
import { useIntl } from "react-intl";
import TargetKey from "../key/TargetKey"
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Typography } from '@mui/material';

import { Boog75Constant } from '@/types/Boog75';
import { KEYCODE_DICT } from '@/types/VkCodeDict';


interface keyBoardProp {
  keyMap: API.Keyboard.KeyObject[][]
  macroList?: Array<API.Keyboard.Macro>
  keyRgb?: API.Keyboard.Color
  ableSelectKey?: boolean
  bottomNavigation?: number
  zoom?: number
  isAdvanceRT: boolean
  layer: number
  isConnected: boolean,
  isAbleSelectKey?:boolean,
  deviceID?:number,
  deviceVersion?:string,
  onKeyChange: (layer: number, keyIndex: number, keyText: string, vkCode: number, macroId: number, rgb?: API.Keyboard.Rgb) => void,
  onKeyChangeHight: (layer: number, keyIndex: number,sHightSelected:boolean) => void,//snap
  onKeyChangeHightMore: (layer: number, keyIndex: string,sHightSelected:boolean) => void,//snap
  onSelected: (keyIndex: number, isSelected: boolean) => void,
  onSelectedRT: (keyIndex: number, isSelected: boolean,advancedKeyId:number|undefined) => void,
  onAddAdvancedKey: (type: string, key: API.Keyboard.KeyObject) => void,
  getCurrentAdvancedKey:()=>void,
  onTglSwitch: (keyIndex: number, s: boolean) => void,
  onOpenAdvancedKeyPanel: (dskType: string, advancedKeyId: number) => void,
  onChangeLayer: (layer: number) => void,
  onAdvance:(id:number|undefined)=>void,
  // onGetAdvance:()=>number|undefined
}

export default function Keyboard(p: keyBoardProp) {
  const intl = useIntl();
  const theme = useTheme();

  const isDarkMode = theme.palette.mode === 'dark';

  const handleChangeLayer = (layer: number) => {
    p.onChangeLayer(layer)
  }
//alert('customer='+p?.deviceID)
  return (
    <Paper variant="outlined"
      sx={{
        minWidth: '968px',
        minHeight: '360px',
        p: 1,
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 1,
        flexGrow: 1,
        backgroundColor: isDarkMode ? '#20232a' : '#fff',
        position: 'relative',
        zoom: p.zoom
      }}
    >
      <Box sx={{
          width: '754px',
          height: p.deviceID===12175?'321px':'271px', 
          backgroundImage:p.deviceID===12175?(isDarkMode ? `url('/images/boog75_border_white.png')` : `url('/images/boog75_border_black.png')`):(isDarkMode ? `url('/images/zoom65_border_white.png')` : `url('/images/boog75_border_black.png')`), 
          backgroundRepeat: 'no-repeat', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          zIndex: `${p.ableSelectKey ? 999 : 0}` }}>
        {p.isConnected && p.bottomNavigation === 0 &&
          <Box sx={{ position: 'absolute', top: 5, left: 25 }}>

            <List sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ListItem disablePadding>

                <Typography variant='button' fontSize={'14px'}>LAYER</Typography>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={p.layer === 0} sx={{ borderRadius: '2px', width: '35px', height: '35px', display: 'flex', justifyContent: 'center' }} onClick={() => handleChangeLayer(0)}>
                  <Typography variant='button' fontSize={'14px'}>0</Typography>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding >
                <ListItemButton selected={p.layer === 1} sx={{ borderRadius: '2px', width: '35px', height: '35px', display: 'flex', justifyContent: 'center' }} onClick={() => handleChangeLayer(1)}>
                  <Typography variant='button' fontSize={'14px'}>1</Typography>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding >
                <ListItemButton selected={p.layer === 2} sx={{ borderRadius: '2px', width: '35px', height: '35px', display: 'flex', justifyContent: 'center' }} onClick={() => handleChangeLayer(2)}>
                  <Typography variant='button' fontSize={'14px'}>2</Typography>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding >
                <ListItemButton selected={p.layer === 3} sx={{ borderRadius: '2px', width: '35px', height: '35px', display: 'flex', justifyContent: 'center' }} onClick={() => handleChangeLayer(3)}>
                  <Typography variant='button' fontSize={'14px'}>3</Typography>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        }

        <Grid container sx={{ width: '725px', paddingLeft: '5px', paddingTop: '13px' }}>
          {
          p.keyMap.map((col, index) => {
            return <Grid key={index} xs={12}>{col.map((keyObj, index) => {
              if (p.macroList && keyObj.vkCode === KEYCODE_DICT.VK_MACRO) {//宏
                let macro: API.Keyboard.Macro | undefined;
                p.macroList.forEach((item) => {
                  if (item.id === keyObj.macroId) {
                    macro = item
                    return;
                  }
                })
                if (macro) {
                  return (
                    <TargetKey
                      key={p.layer + "_" + p.layer + "_" + index + "_" + keyObj.vkCode}
                      keyIndex={keyObj.idx === undefined ? -1 : keyObj.idx}
                      keyText={macro.title}
                      vkCode={keyObj.vkCode}
                      macroId={keyObj.macroId}
                      sensitivity={keyObj.sensitivity}
                      rapidTrigger={keyObj.rapidTrigger}
                      cssStyle={keyObj.cssStyle}
                      ableSelect={p.ableSelectKey}
                      isSelected={keyObj.isSelected}
                      isAdvanceRT={p.isAdvanceRT}
                      isLocalChange={keyObj.isLocalChange}
                      bottomNavigation={p.bottomNavigation}
                      keyTextBreak={true}
                      tglSwitch={keyObj.triggerMode === Boog75Constant.TRIGGER_MODE_TGL}
                      isAdvancedKey={keyObj.vkCode === KEYCODE_DICT.VK_ADVANCED_KEY}
                      advancedKeyId={keyObj.advancedKeyId}
                      isDKS={keyObj.isDKS}
                      isMT={keyObj.isMT}
                        isST={keyObj.isST}//snap
                      zoom={p.zoom}
                      layer={p.layer}
                      isDisableChange={keyObj.isDisableChange}
                      onKeyChange={p.onKeyChange}
                      onKeyChangeHight={p.onKeyChangeHight}
                      onKeyChangeHightMore={p.onKeyChangeHightMore}
                      onSelected={p.onSelected}
                      onSelectedRT={p.onSelectedRT}
                      onAddAdvancedKey={p.onAddAdvancedKey}
                      onTglSwitch={p.onTglSwitch}
                      onOpenAdvancedKeyPanel={p.onOpenAdvancedKeyPanel}
                      deviceVersion={p.deviceVersion}
                      // onGetAdvance={p.onGetAdvance}
                    ></TargetKey>
                  )
                } else {
                  return (
                    <TargetKey
                      key={p.layer + "_" + index + "_" + keyObj.vkCode}
                      keyIndex={keyObj.idx === undefined ? -1 : keyObj.idx}
                      keyText={keyObj.keyText}
                      vkCode={keyObj.vkCode}
                      macroId={keyObj.macroId}
                      sensitivity={keyObj.sensitivity}
                      rapidTrigger={keyObj.rapidTrigger}
                      cssStyle={keyObj.cssStyle}
                      ableSelect={p.ableSelectKey}
                      isSelected={keyObj.isSelected}
                      isAdvanceRT={p.isAdvanceRT}
                      isLocalChange={keyObj.isLocalChange}
                      bottomNavigation={p.bottomNavigation}
                      keyTextBreak={true}
                      tglSwitch={keyObj.triggerMode === Boog75Constant.TRIGGER_MODE_TGL}
                      isAdvancedKey={keyObj.vkCode === KEYCODE_DICT.VK_ADVANCED_KEY}
                      advancedKeyId={keyObj.advancedKeyId}
                      isDKS={keyObj.isDKS}
                      isMT={keyObj.isMT}
                      isST={keyObj.isST}//snap
                      zoom={p.zoom}
                      layer={p.layer}
                      isDisableChange={keyObj.isDisableChange}
                      onKeyChange={p.onKeyChange}
                      onKeyChangeHight={p.onKeyChangeHight}
                      onKeyChangeHightMore={p.onKeyChangeHightMore}
                      onSelected={p.onSelected}
                      onSelectedRT={p.onSelectedRT}
                      onAddAdvancedKey={p.onAddAdvancedKey}
                      onTglSwitch={p.onTglSwitch}
                      onOpenAdvancedKeyPanel={p.onOpenAdvancedKeyPanel}
                      // onGetAdvance={p.onGetAdvance}
                      deviceVersion={p.deviceVersion}
                    ></TargetKey>
                  )
                }
              } else {
                return (
                  <TargetKey
                    key={p.layer + "_" + index + "_" + keyObj.vkCode}
                    keyIndex={keyObj.idx === undefined ? -1 : keyObj.idx}
                    keyText={keyObj.keyText}
                    vkCode={keyObj.vkCode}
                    macroId={keyObj.macroId}
                    sensitivity={keyObj.sensitivity}
                    rapidTrigger={keyObj.rapidTrigger}//rt
                    cssStyle={keyObj.cssStyle}//样式
                    ableSelect={p.ableSelectKey}//是否可以选中共,rt单个键设置
                    isSelected={keyObj.isSelected}//单键是否选中
                    isAdvanceRT={p.isAdvanceRT}
                    isLocalChange={keyObj.isLocalChange}
                    bottomNavigation={p.bottomNavigation}
                    tglSwitch={keyObj.triggerMode === Boog75Constant.TRIGGER_MODE_TGL}
                    isAdvancedKey={keyObj.vkCode === KEYCODE_DICT.VK_ADVANCED_KEY}
                    advancedKeyId={keyObj.advancedKeyId}
                    isDKS={keyObj.isDKS}
                    isMT={keyObj.isMT}
                    isRS={keyObj.isRS}//snap
                    isRSAction={keyObj.isRSaction}//snap
                    isST={keyObj.isST}//snap
                    isHightSelected={keyObj.isHightSelected}//snap
                    isAbleSelectKey={p.isAbleSelectKey}//snap
                    zoom={p.zoom}
                    layer={p.layer}//层级
                    isDisableChange={keyObj.isDisableChange}
                    onKeyChange={p.onKeyChange}//key值改变
                    onKeyChangeHight={p.onKeyChangeHight}
                    onKeyChangeHightMore={p.onKeyChangeHightMore}
                    onSelected={p.onSelected}//key选中
                    onSelectedRT={p.onSelectedRT}
                  
                    onAddAdvancedKey={p.onAddAdvancedKey}
                    onTglSwitch={p.onTglSwitch}//tgl
                    onOpenAdvancedKeyPanel={p.onOpenAdvancedKeyPanel}
                    // onGetAdvance={p.onGetAdvance}
                    deviceVersion={p.deviceVersion}
                  ></TargetKey>
                )
              }
            }
            )}
            </Grid>
          })}
        </Grid>
      </Box>
    </Paper>
  );
}
