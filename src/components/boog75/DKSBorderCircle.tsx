import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image';
import Box from '@mui/material/Box';


import cssStyles from './DKSBorderCircle.module.css';

interface DKSBorderCircleProps {
  type: number,//visibleType  第几个触发点 0 1 2 3 
  limitType: number,//visiblemaxlimittype
  dataType: number|0,//y已经滑到的触发点
  onClick: () => void,
  onMouseLeave: (circleDataType: number) => void
  onMouseUp: (circleDataType: number) => void
}
const sleep = async (time: number) => {
  await new Promise((resolve) => setTimeout(resolve, time))
}
const DKSBorderCircle: React.FC<DKSBorderCircleProps> = (props) => {
  const resizeRef = useRef<any>(null)
     const resizeRef2 = useRef<any>(null)
  useEffect(() => {
    console.log('dataType='+props.dataType)
    switch (props.dataType) {
      case 0:
        resizeRef.current.style.width = maxWidthType[0]
        break;
      case 1:
        resizeRef.current.style.width = maxWidthType[1]
        break;
      case 2:
        resizeRef.current.style.width = maxWidthType[2]
        break;
      case 3:
        resizeRef.current.style.width = maxWidthType[3]
        break;
      default:
        resizeRef.current.style.width = maxWidthType[0]
    }
  }, [props.dataType])

  useEffect(() => { 
   //输出width
   //console.log('sss='+resizeRef2.current.offsetWidth)
   
   
   setInterval(() => {
    // 要持续运行的代码
    if(resizeRef2!=null&&resizeRef2.current!=null&&resizeRef2.current.offsetWidth!=null){
  
    console.log('sss='+resizeRef2.current.offsetWidth)
    let circleDataType = 0;
    var newWidth=Number(resizeRef2.current.offsetWidth);
    if (newWidth <= 46) {
     // e.target.style.width = '26px'
      circleDataType = 0
    } else if (newWidth > 46 && newWidth <= 67) {
     // e.target.style.width = leftType[1]
      circleDataType = 1
    } else if (newWidth > 67 && newWidth <= 134) {
     // e.target.style.width = leftType[2]
      circleDataType = 2
    } else if (newWidth > 134) {
     // e.target.style.width = leftType[3]
      circleDataType = 3
    }
    //
    console.log('sss='+circleDataType)

    switch (circleDataType) {
      case 0:
        resizeRef.current.style.width = maxWidthType[0]
        break;
      case 1:
        resizeRef.current.style.width = maxWidthType[1]
        break;
      case 2:
        resizeRef.current.style.width = maxWidthType[2]
        break;
      case 3:
        resizeRef.current.style.width = maxWidthType[3]
        break;
      default:
        resizeRef.current.style.width = maxWidthType[0]
    }

    props.onMouseUp(circleDataType)
    }
    //console.log('这段代码会一直运行');
  }, 1000); // 每秒运行一次
}
  , [])

  const leftType = {
    0: '0px',
    1: '67px',
    2: '134px',
    3: '201px',
  }
  const maxWidthType = {
    0: '21px',
    1: '64px',
    2: '132px',
    3: '198px',
  }

  let left = '0px', maxWidth = '205px'
  console.log(props.type+'--'+props.limitType+'--'+props.dataType)
  switch (props.type) {
    case 0:
      left = leftType[0]
      maxWidth = maxWidthType[3]
      break;
    case 1:
      left = leftType[1]
      maxWidth = maxWidthType[2]
      break;
    case 2:
      left = leftType[2]
      maxWidth = maxWidthType[1]
      break;
    case 3:
      left = leftType[3]
      maxWidth = maxWidthType[0]
      break;
    default:
      left = leftType[0]
      maxWidth = maxWidthType[3]
  }
  //如果下一个触发点已选中，那么就只有一个距离limitType
  switch (props.limitType) {
    case 0:
      maxWidth = maxWidthType[0]
      break;
    case 1:
      maxWidth = maxWidthType[1]
      break;
    case 2:
      maxWidth = maxWidthType[2]
      break;
    case 3:
      maxWidth = maxWidthType[3]
      break;
    default:
      maxWidth = maxWidthType[0]
  }
  const handleClick = () => {
    props.onClick()
  }
  //let circleDataType=0;
  let [circleDataType, setcircleDataType] = useState(0);
  const handleMouseUp = (e: any) => {
    // console.log(isHoveringScrollbar)
    // if(isHoveringScrollbar===false)
    //   return;
    setcircleDataType(0);
    const newWidth = Number(String(e.target.style.width).replace('px', ''))
    console.log('newWidth='+newWidth)
    if (newWidth <= 46) {
      e.target.style.width = '26px'
      circleDataType = 0
    } else if (newWidth > 46 && newWidth <= 67) {
      e.target.style.width = leftType[1]
      circleDataType = 1
    } else if (newWidth > 67 && newWidth <= 134) {
      e.target.style.width = leftType[2]
      circleDataType = 2
    } else if (newWidth > 134) {
      e.target.style.width = leftType[3]
      circleDataType = 3
    }
    //alert(circleDataType)
    //await sleep(2);
    //停止2ms
    console.log('moveto='+circleDataType)
    props.onMouseUp(circleDataType)
  }
  return (
    <>
      <Box className={cssStyles.circle_dks_container} sx={{ left: left }}>
        {/* resizable 用于拖拽的工具  */}
       {/* <div className={cssStyles.divclass}>11</div> */}
        <Box ref={resizeRef} className={cssStyles.circle_dks_resizable} sx={{ maxWidth: maxWidth}}  onMouseUp={handleMouseUp} ></Box>
        {/* content 要展示的内容区域  */}
        <Box ref={resizeRef2} className={cssStyles.circle_dks_content} sx={{ border: '1px solid ', borderRadius: '13px' }} onClick={handleClick} >
          <Image
            priority
            src={"/svgs/Inner_Border_Circle_DKS.svg"}
            height={16}
            width={16}
            alt=""
            style={{ float: 'right', marginTop: '5px' }}
          />
        </Box>
      </Box>
    </>
  )
}

export default DKSBorderCircle;