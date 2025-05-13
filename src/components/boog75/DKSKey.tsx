import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import styles from './DKSKey.module.css';
import DKSBorderCircle from './DKSBorderCircle';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


interface DKSKeyProps {
  dksKey: API.Keyboard.DKSKey
  onClick: () => void
  onChangeData: (changeData: Array<API.Keyboard.DKSData>) => void
  onChangeKey: (vkCode: number | undefined, keyText: string) => void
}

const DKSKey: React.FC<DKSKeyProps> = (props) => {

  const handleClickKey = (e: any) => {
    props.onClick()
    props.onChangeKey(undefined, '')
    const keyItems = document.getElementsByClassName("DKS_KEY_ITEM");
    for (let i = 0; i < keyItems.length; i++) {
      keyItems[i].classList.remove(styles.selected_key)
    }

    e.target.classList.add(styles.selected_key)
  }
  const handleClickBorderCircle = (type: number) => {
    if (props.dksKey.data[type].visible) {
      props.dksKey.data[type].visible = false
    } else {
      props.dksKey.data[type].visible = true
    }
    const changeDKSData: Array<API.Keyboard.DKSData> = []
    for (let i = 0; i < 4; i++) {
      let maxLimit = 0;
      for (let j = i + 1; j <= 3; j++) {
        maxLimit += 1
        if (props.dksKey.data[j].visible) {
          break
        }
      }
      changeDKSData.push({ ...props.dksKey.data[i], visibleMaxLimit: maxLimit, dataType: 0 })
    }

    props.onChangeData(changeDKSData)
  }
  const handleStretch = (idx: number, circleDataType: number) => {
    const newDksData = props.dksKey.data.map((item, index) => {
      if (index === idx) {
        item.dataType = circleDataType
      }
      return item
    })
    props.onChangeData(newDksData)
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
    e.preventDefault()
    const keyText = e.dataTransfer.getData('text')
    const vkCode = e.dataTransfer.getData('vkCode')
    props.onChangeKey(vkCode, keyText)
    e.target.classList.remove(styles.selected_key)
  }

  return (
    <>
      <Box>
        <Stack direction="row" spacing={4} alignItems={'center'}>
          <KeyItem
            className='DKS_KEY_ITEM'
            onClick={handleClickKey}
            onDragEnter={handleEnter}
            onDragOver={handleOver}
            onDragLeave={handleLeave}
            onDrop={handleDrop}
          >
            {props.dksKey?.keyText}
          </KeyItem>
          <Stack direction="row" sx={{ position: 'relative' }}>
            <AddCircleOutlineIcon sx={{ mr: '40px', cursor: 'pointer' }} onClick={() => handleClickBorderCircle(0)} />
            <AddCircleOutlineIcon sx={{ mr: '40px', cursor: 'pointer' }} onClick={() => handleClickBorderCircle(1)} />
            <AddCircleOutlineIcon sx={{ mr: '40px', cursor: 'pointer' }} onClick={() => handleClickBorderCircle(2)} />
            <AddCircleOutlineIcon onClick={() => handleClickBorderCircle(3)} />
            {props.dksKey.data[0]?.visible &&
              <DKSBorderCircle
                type={props.dksKey.data[0].visibleType}
                limitType={props.dksKey.data[0].visibleMaxLimit}
                dataType={props.dksKey.data[0].dataType}
                onClick={() => handleClickBorderCircle(0)}
                onMouseUp={(circleDataType: number) => handleStretch(0, circleDataType)}
              />
            }
            {props.dksKey.data[1]?.visible &&
              <DKSBorderCircle
                type={props.dksKey.data[1].visibleType}
                limitType={props.dksKey.data[1].visibleMaxLimit}
                dataType={props.dksKey.data[1].dataType}
                onClick={() => handleClickBorderCircle(1)}
                onMouseUp={(circleDataType: number) => handleStretch(1, circleDataType)}
              />
            }
            {props.dksKey.data[2]?.visible &&
              <DKSBorderCircle
                type={props.dksKey.data[2].visibleType}
                limitType={props.dksKey.data[2].visibleMaxLimit}
                dataType={props.dksKey.data[2].dataType}
                onClick={() => handleClickBorderCircle(2)}
                onMouseUp={(circleDataType: number) => handleStretch(2, circleDataType)}
              />
            }
            {props.dksKey.data[3]?.visible &&
              <DKSBorderCircle
                type={props.dksKey.data[3].visibleType}
                limitType={props.dksKey.data[3].visibleMaxLimit}
                dataType={props.dksKey.data[3].dataType}
                onClick={() => handleClickBorderCircle(3)}
                onMouseUp={(circleDataType: number) => handleStretch(3, circleDataType)}
              />
            }
          </Stack>
        </Stack>
      </Box>
    </>
  )
}


const KeyItem = styled(Box)(({ theme }) => ({
  width: '45px',
  height: '45px',
  border: '1px solid',
  borderRadius: '4px',
  boxSizing: 'border-box',
  color: theme.palette.mode === 'dark' ? 'white' : '#1a1a1a',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  fontSize: '14px',
  lineHeight: '18px',
  whiteSpace: 'pre-line',
  cursor: 'grab',
  float: 'left'
}));

export default DKSKey;                                                         