import React, { useState, Ref, useImperativeHandle, useEffect, } from 'react'
import { useIntl } from "react-intl";
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

import DeleteIcon from '@mui/icons-material/Delete';

import styles from './AdvancedKeyPanel.module.css';
import { Boog75Constant } from '@/types/Boog75';
import AdvancedKey from './AdvancedKey';


interface AdvancedKeyPanelProps {
    advancedKeyData: Array<API.Keyboard.AdvancedKey>
    onDeleteAdvancedKey: (advancedKey: API.Keyboard.AdvancedKey) => void
    onKeyChangeHight: (layer: number, keyIndex: number|undefined,sHightSelected:boolean) => void,//snap
    onKeyChangeHightMore: (layer: number, keyIndex: string|undefined,sHightSelected:boolean) => void,//snap
    onChangeAdvancedKey: (advancedKey: API.Keyboard.AdvancedKey, isConfirm: boolean) => void
    onAdvance:(id:number|undefined)=>void,
   
    onRef: Ref<any>
}

const AdvancedKeyPanel: React.FC<AdvancedKeyPanelProps> = (props) => {
    const intl = useIntl()
    const theme = useTheme()
    const isDarkMode = theme.palette.mode === 'dark';
    const [advanceList, setMadvanceList]= useState('');
   
    useEffect(() => {
       
    let advanceList1=''
  props.advancedKeyData.forEach(element => {
    //alert(element.id)
   // alert(element.keyIndex)
   advanceList1+=','+element.keyIndex
   if(element.keyIndex===-1)
   {
    if(element.rs){
        element.rs.forEach(element1 => {
            advanceList1+=','+element1.keyIndex
        });
    }
    if(element.st){
        element.st.forEach(element1 => {
            advanceList1+=','+element1.keyIndex
        });
    }
   }
    //advanceList.push(element.keyIndex)
  });
  advanceList1+=','
  setMadvanceList(advanceList1)
  //alert(advanceList1)
  //alert(advanceList)

      }, props.advancedKeyData);

    const [open, setOpen] = useState(false)
    const [currentAdvancedKey, setCurrentAdvancedKey] = useState<API.Keyboard.AdvancedKey>()
//暴漏给父组件的方法
    useImperativeHandle(props.onRef, () => ({
        handleEditAdvancedKey,
        currentAdvancedKey,
        // setCurrentRS,
        closePanel,
       
    }))
//     const setCurrentRS=(advancedKey: API.Keyboard.AdvancedKey)=>{
// //
// //const NewcurrentAdvancedKey=advancedKey
// setCurrentAdvancedKey(advancedKey)
//     }
    
    const handleEditAdvancedKey = (advancedKey: API.Keyboard.AdvancedKey) => {
        setOpen(true)
        //alert(advancedKey.type)
        //
        if(advancedKey.rs||advancedKey.st)
        {
            //alert(advancedKey.id)
             //props.onAdvance(advancedKey.id)
            var rslist=''
            advancedKey.rs?.forEach(element => {
              
              rslist+=','+element.keyIndex
            });
            advancedKey.st?.forEach(element => {
              
                rslist+=','+element.keyIndex
              });
            rslist+=','
           // alert(rslist)


           
           let advanceList1=''
           props.advancedKeyData.forEach(element => {
             //alert(element.id)
            // alert(element.keyIndex)
            advanceList1+=','+element.keyIndex
            if(element.keyIndex===-1)
            {
             if(element.rs){
                 element.rs.forEach(element1 => {
                     advanceList1+=','+element1.keyIndex
                 });
             }
             if(element.st){
                 element.st.forEach(element1 => {
                     advanceList1+=','+element1.keyIndex
                 });
             }
            }
             //advanceList.push(element.keyIndex)
           });
           advanceList1+=','
           setMadvanceList(advanceList1)
            //需要2个键高亮
            if(rslist!=',')
            props.onKeyChangeHightMore(0, rslist,true);
            // props.onKeyChangeHight(0, 2,true);
        }
        else
        props.onKeyChangeHight(0, advancedKey.keyIndex,true);

        setCurrentAdvancedKey(advancedKey)
    }

    const handleDeleteAdvancedKey = (advancedKey: API.Keyboard.AdvancedKey) => {
        props.onDeleteAdvancedKey(advancedKey)
        setOpen(false)
    }

    const handleConfirmAdvancedKey = (advancedKey: API.Keyboard.AdvancedKey, isConfirm: boolean) => {
        props.onChangeAdvancedKey(advancedKey, isConfirm)
        isConfirm
    }

const closePanel=()=>{
    setOpen(false)
}

    return (
        <Box>
            <Paper elevation={0} variant="outlined"
                sx={{
                    minWidth: '958px',
                    p: 1,
                    borderRadius: '10px 10px 0px 0px',
                    height: '370px',
                    flexGrow: 1,
                    backgroundColor: isDarkMode ? '#20232a' : '#fff'
                }}
            >
                <Divider textAlign="left">
                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                        <Typography variant='body1'>{intl.formatMessage({ id: "advance.advancedKeyCountTitle" })}：{props.advancedKeyData.length}/{Boog75Constant.MAX_ADVANCED_KEY}</Typography>
                    </Stack>
                </Divider>
                <Grid container spacing={3} sx={{ maxHeight: '345px', overflow: 'auto' }}>
                    {props.advancedKeyData.length === 0 &&
                        <Box sx={{ width:'100%',height: '345px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant='h5' color={'#727a8a'}>{intl.formatMessage({id: 'advance.tips'})}</Typography>
                        </Box>
                    }
                    {props.advancedKeyData.map((item, idx) => {
                        return (
                            <Grid key={"advancedKey_" + idx}>
                                <PaperItem elevation={2}>
                                    <Stack direction={'row'} spacing={2} justifyContent={'center'} alignItems={'center'}>
                                        <Box width={'53px'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <BindKeyItem>
                                                {item.keyText}
                                            </BindKeyItem>
                                        </Box>
                                        <Divider orientation="vertical" variant="middle" flexItem />
                                        <Stack width={'30px'} justifyContent={'center'} alignItems={'center'}>
                                          
                                            {item.type === "RS" && <Image priority src={isDarkMode ? "/images/R-rs.png" : "/images/MT_black.png"} height={20} width={20} alt="RS" />}
                                           
                                           
                                            {item.type === "ST" && <Image priority src={isDarkMode ? "/images/R-st.png" : "/images/MT_black.png"} height={20} width={20} alt="ST" />}

                                            {item.type === "DKS" && <Image priority src={isDarkMode ? "/images/DKS.png" : "/images/DKS_black.png"} height={20} width={20} alt="DKS" />}
                                            {item.type === "MT" && <Image priority src={isDarkMode ? "/images/MT.png" : "/images/MT_black.png"} height={20} width={20} alt="MT" />}
                                            {item.type === "TGL" && <Image priority src={isDarkMode ? "/images/TGL.png" : "/images/TGL_black.png"} height={20} width={20} alt="TGL" />}
                                            <Box sx={{ fontSize: '12px', mt: '2px' }}>{item.type}</Box>
                                        </Stack>
                                        <Stack direction={'row'} spacing={1} width={'165px'} onClick={() => handleEditAdvancedKey(item)} sx={{ cursor: 'pointer' }}>
                                           
                                            {item.rs && item.rs.map((rsItem, idx) => {
                                                return <KeyItem key={"rs_" + idx}>{rsItem.keyText}</KeyItem>
                                            })}
                                            {item.st && item.st.map((rsItem, idx) => {
                                                return <KeyItem key={"st_" + idx}>{rsItem.keyText}</KeyItem>
                                            })}
                                            {item.dks && item.dks.map((dksItem, idx) => {
                                                return <KeyItem key={"dks_" + idx}>{dksItem.keyText}</KeyItem>
                                            })}
                                            {item.mt && item.mt.map((mtItem, idx) => {
                                                return <KeyItem key={"mt_" + idx}>{mtItem.keyText}</KeyItem>
                                            })}
                                            {item.tgl &&
                                                <KeyItem >{item.tgl.keyText}</KeyItem>
                                            }
                                        </Stack>
                                        <Divider orientation="vertical" variant="middle" flexItem />
                                        <IconButton aria-label="delete" size='small' onClick={() => handleDeleteAdvancedKey(item)}>
                                            <DeleteIcon fontSize="inherit" />
                                        </IconButton>
                                    </Stack>
                                </PaperItem>
                            </Grid>
                        )
                    })}
                </Grid>
            </Paper>

            <Box sx={{ position: 'absolute', top: 0, left: 0, zIndex: 999 }}>
                {/* 弹出的高级页选择 */}
                {open && currentAdvancedKey &&
                    <AdvancedKey advancedKey={currentAdvancedKey}  socdtype={currentAdvancedKey.socdType} fullPress={currentAdvancedKey.fullPress} advanceList={advanceList} advancedKeyData={props.advancedKeyData} onDelete={handleDeleteAdvancedKey} onConfirm={handleConfirmAdvancedKey} isRS={currentAdvancedKey.rsAction==='r'}>

                    </AdvancedKey>
                }
            </Box>
            {/* {open &&
                <Box className={styles.shade}></Box>//高级键弹层
            } */}

        </Box>
    )
}

const PaperItem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#262931' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const BindKeyItem = styled(Box)(({ theme }) => ({
    minWidth: '25px',
    height: '25px',
    marginLeft: '5px',
    border: '1px solid',
    borderRadius: '4px',
    borderColor: theme.palette.mode === 'dark' ? 'white' : '#1a1a1a',
    boxShadow: theme.palette.mode === 'dark' ? '0 -1px 0 3px inset rgba(255, 255, 255, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.3)' : '0 -1px 0 3px inset rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.3)',
    boxSizing: 'border-box',
    color: theme.palette.mode === 'dark' ? 'white' : '#1a1a1a',
    ...theme.typography.body2,
    padding: '5px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontSize: '0.61rem',
    lineHeight: '11px',
    whiteSpace: 'pre-line',
    float: 'left'
}));
const KeyItem = styled(Box)(({ theme }) => ({
    width: '35px',
    height: '35px',
    border: '1px solid',
    borderRadius: '4px',
    boxSizing: 'border-box',
    color: theme.palette.mode === 'dark' ? 'white' : '#1a1a1a',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontSize: '12px',
    lineHeight: '14px',
    whiteSpace: 'pre-line',
    float: 'left'
}));

export default AdvancedKeyPanel