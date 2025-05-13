import { isAbsolute } from 'path';
import styles from './BaseKey.module.css'

interface Props {
  keyObj: API.Keyboard.KeyObject,
  isok?:boolean,
  onClick?: (keyObj: API.Keyboard.KeyObject) => void
  onDragStart?: () => void
}

export default function BaseKey(props: Props) {

  const handleClick = (e: any) => {
    const vkCode = e.target.dataset.vkcode;
    const keyText = e.target.innerText;
    props.onClick && props.onClick({vkCode: vkCode, keyText: keyText,idx:props.keyObj.idx})
  }

  const handleStart = (e: any) => {
    props.onDragStart && props.onDragStart()
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text', e.target.innerText)
    e.dataTransfer.setData('vkCode', e.target.dataset.vkcode)
    e.dataTransfer.setData('vkkeyIndex', e.target.dataset.keyindex)
    e.dataTransfer.setData('macroId', e.target.dataset.macroid)
  }

  const handleDrag = (e: any) => {
    e.target.classList.add(styles.rotate)
  }

  const handleEnd = (e: any) => {
    e.target.classList.remove(styles.rotate)
  }

  const handleBreakText = (text: string, num: number) => {
    let str = "";
    if(text) {
      for (let i = 0; i < text.length; i += num) {
        str = str + text.slice(i, i+num) + '\n';
      }
    }
    return str;
  }


  if (props.isok===true) {
    return (
      <div className={styles.keycode2} style={props.keyObj.cssStyle}>
       
        {props.keyObj.keyTextBreak ? handleBreakText(props.keyObj.keyText, 5) : props.keyObj.keyText}
         {/* <div className={styles.keycode2div}> <img src="/images/import_black.png">
       
         </img>  </div> */}
         </div>

          // <Button component="label" size="small" variant="contained" sx={{ minWidth: '0px', height: '36px', width: '36px', padding: '0px', borderRadius: '8px' }}>
          //    <Image
                     
          //    src="/images/import_black.png"
          //    height={21}
          //    width={21}
          //    alt=""
          //  />
          // </Button>
    )
  } else {
    return (
      <div className={styles.keycode}   style={props.keyObj.cssStyle}
        draggable
        data-vkcode={props.keyObj.vkCode}
        data-macroid={props.keyObj.macroId}
        data-keyIndex={props.keyObj.idx}
        onClick={handleClick}
        onDragStart={handleStart}
        onDrag={handleDrag}
        onDragEnd={handleEnd}>
        {props.keyObj.keyTextBreak ? handleBreakText(props.keyObj.keyText, 5) : props.keyObj.keyText}
      
      </div>
    )
  }
}
