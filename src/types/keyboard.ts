declare namespace API.Keyboard {

  interface KeyboardJson {
    keyMap: KeyObject[][],
    keyMap0: KeyObject[][],
    keyMap1: KeyObject[][],
    keyMap2: KeyObject[][],
    keyMap3: KeyObject[][],
    rgbEffect: RGBEffect,
    sensitivity: number,
    localSensitivity: number,
    rapidTrigger: RapidTrigger,
    localRapidTrigger: RapidTrigger,
    macroList?: Array<Macro>,
    advancedKeyList?: Array<API.Keyboard.AdvancedKey>,
    profileList?: Array<API.Keyboard.Profile>,
  }

  interface Color {
    hex?: string,
    rgb: Rgb,
    hsl?: HSL,
    hsv: HSV,
    oldHue?: number,
    source?: string,
  }

  interface KeyObject {
    idx?: number,
    vkCode: number,
    keyText: string,
    keyTextBreak?: boolean,
    triggerMode?: number,
    rgb?: Rgb,
    sensitivity?: number,
    rapidTrigger?: RapidTrigger,
    isLocalChange?: boolean,
    cssStyle?: any,
    isMacro?: boolean,
    macroId?: number,
    isAdvancedKey?: boolean,
    advancedKeyId?: number,
    isDKS?: boolean,
    isMT?: boolean,
    isRS?: boolean,//snap
    isST?: boolean,//snap
    isRSaction?:string|undefined,//snap
    isHightSelected?: boolean,//snap
    isDisableChange?: boolean,
    isSelected?: boolean,
    
  }

  interface RGBEffect {
    lightOn: number,
    lightEffect: number,
    lightBrightness: number,
    lightSpeed: number,
    currentLedColorIndex: number,
    lightColor0: Color,
    lightColor1: Color,
    lightColor2: Color,
    lightColor3: Color,
    lightColor4: Color,
    lightColor5: Color,
    lightColor6: Color,
  }

  interface Rgb {
    r: number,
    g: number,
    b: number,
    a: number
  }

  interface HSL {
    a: number,
    h: number,
    l: number,
    s: number
  }

  interface HSV {
    a: number,
    h: number,
    s: number,
    v: number
  }

  interface RapidTrigger {
    make: number,
    break: number,
    sensitivity:number
  }

  interface Profile {
    id: number,
    text: string,
    keyboardJson: KeyboardJson,
    type?:string,
    isRename?:boolean,
    error?: boolean,
    errorText?: string,
  }

  interface Macro {
    id: number,
    title: string,
    data: Array<MacroData>,
    executeType: number,
    executeCount: number,
    editAble?: boolean,
    error?: boolean,
    errorText?: string,
    sync?: boolean,
    del?: boolean,
  }

  interface MacroData {
    vkCode: number,
    spanTime: number,
    keyState: number, 
    sort: number,
    editAble?: boolean
    error?: boolean,
    errorText?: string,
  }

  interface AdvancedKey {
    id: number,
    type: string,
    keyIndex: number | undefined,
    vkCode: number,
    keyText: string,
    fitstTriggerPos?: number,
    lastTriggerPos?: number,
    fitstTriggerPos2?: number,
    lastTriggerPos12: number,
    pressTime?: number,
    rs?: Array<RSKey>,//pei snap
    rsAction?:string | undefined,
    st?: Array<STKey>,//pei snap
    stAction?:string | undefined,
    dks?: Array<DKSKey>,
    mt?: Array<MTKey>,
    tgl?: TGLKey
    socdType?:number,
    fullPress?:number
  }

  interface DKSKey {
    vkCode: number | undefined,
    keyText: string,
    data: Array<DKSData>
  }

  interface DKSData {
    visible: boolean,
    visibleType: number,
    visibleMaxLimit: number,
    dataType: number
  }
  interface MTKey {
    keyIndex?: number | undefined,
    vkCode: number | undefined,
    keyText: string,
    type?: number
  }
  interface RSKey {
    keyIndex?: number | undefined,
    vkCode: number | undefined,
    isRSaction:string|undefined,
    keyText: string,
    oldKeyId?: number | undefined,
    type?: number
  }
  interface STKey {
    keyIndex?: number | undefined,
    vkCode: number | undefined,
    isRSaction:string|undefined,
    keyText: string,
    oldKeyId?: number | undefined,
    type?: number
  }
  
  interface TGLKey {
    vkCode: number | undefined,
    keyText: string,
  }
}
