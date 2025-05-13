import TargetKey from "../key/TargetKey"
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

interface keyBoardProp {
  keyRgb?: API.Keyboard.Color
  keyMap: API.Keyboard.KeyObject[][]
  onKeyChange: (keyIndex: number, keyText: string, vkCode: number, macroId: number,rgb?: API.Keyboard.Rgb) => void
}

export default function Keyboard(p: keyBoardProp) {
  const keyboard = p.keyMap.map((col, index) => {
    return <Grid key={index} xs={12}>{col.map((keyObj, index) =>
      <TargetKey
        key={index+"_"+keyObj.vkCode}
        keyIndex={keyObj.idx || -1}
        keyText={keyObj.keyText}
        vkCode={keyObj.vkCode}
        rapidTrigger={keyObj.rapidTrigger}
        cssStyle={keyObj.cssStyle}
        isAdvanceRT={false}
        onKeyChange={p.onKeyChange}
      ></TargetKey>
      )}
    </Grid>
  })

  return (
    <Paper variant="outlined"
      sx={{
        paddingLeft: 5.5,
        paddingTop: 5,
        paddingBottom: 5,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container>
        {keyboard}
      </Grid>
    </Paper>
  );
}
