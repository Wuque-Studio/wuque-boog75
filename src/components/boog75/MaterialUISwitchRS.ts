import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 52,
  height: 28,
  padding: 5,
  paddingTop: 2 ,
 
  '& .MuiSwitch-switchBase': {
    marginTop: 4,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: 'red',
      
      transform: 'translateX(28px)',
      '& .MuiSwitch-thumb:before': {
        
        //backgroundImage: `url('/svg/light_on.png')`
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#bdc3c7',//8796A5
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? 'black' : '#ed6c02',
    width: 18,
    height: 18,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      
     // backgroundImage: `url('/svg/lightbulb.png')`,  
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#ffa726' : '#bdc3c7',
    borderRadius: 20 / 2,
  },
}));


export default MaterialUISwitch;