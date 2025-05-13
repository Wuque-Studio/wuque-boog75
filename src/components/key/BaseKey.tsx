import styles from './BaseKey.module.css'

interface Props {
  keyObj: API.Keyboard.KeyObject,
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
   // alert(3)
    props.onDragStart && props.onDragStart()
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text', e.target.innerText)
    e.dataTransfer.setData('vkCode', e.target.dataset.vkcode)
    e.dataTransfer.setData('macroId', e.target.dataset.macroid)
    e.dataTransfer.setData('keyindex', e.target.dataset.keyindex)
   // alert('data-old='+ e.target.dataset.oldkeyindex)
    e.dataTransfer.setData('oldkeyindex', e.target.dataset.oldkeyindex)

   // e.dataTransfer.setData('isRSaction', e.target.dataset.isRSaction)
  }

  const handleDrag = (e: any) => {
   // alert(1)
    e.target.classList.add(styles.rotate)
  }

  const handleEnd = (e: any) => {
   // alert(2)
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


  if (props.keyObj.keyText == "Empty") {
    return (
      <div className={styles.emptyKey} style={props.keyObj.cssStyle}></div>
    )
  } else {
    return (
      <div className={styles.keycode} style={props.keyObj.cssStyle}
        draggable
        data-vkcode={props.keyObj.vkCode}
        data-macroid={props.keyObj.macroId}
        data-keyindex={props.keyObj.idx}
        // data-oldkeyindex={props.keyObj.oldkeyindex}
        // data-isRSaction={props.keyObj.isRSaction}
        onClick={handleClick}
        onDragStart={handleStart}
        onDrag={handleDrag}
        onDragEnd={handleEnd}>
        {props.keyObj.keyTextBreak ? handleBreakText(props.keyObj.keyText, 5) : props.keyObj.keyText}
      
      </div>
    )
  }
}
