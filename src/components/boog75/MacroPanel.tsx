import React, { useState, useRef, useEffect } from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useIntl } from "react-intl";
import Alert from '@mui/material/Alert';
import HelpPopover from './HelpPopover';

import { Boog75Constant } from '@/types/Boog75';
import { KEY_TEXT_DICT } from '@/types/VkCodeDict';
import UploadInput from './UploadInput';
import AlertDialog from '@/components/dialog/AlertDialog';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import DoneIcon from '@mui/icons-material/Done';

interface MacroPanelProps {
  macroList: Array<API.Keyboard.Macro>
  onUpdateMacroList: (macroList: Array<API.Keyboard.Macro>) => void
  onApply: (id: number) => void
  onUpload: (macroList: Array<API.Keyboard.Macro>) => void
}

const MacroPanel: React.FC<MacroPanelProps> = (props) => {
  const intl = useIntl()
  const theme = useTheme()
  const [executeType, setExecuteType] = useState(0)
  const [executeCount, setExecuteCount] = useState(1)
  const [selectedMacro, setSelectedMacro] = useState<API.Keyboard.Macro>()
  const [deletedMacro, setDeletedMacro] = useState<API.Keyboard.Macro>()
  const [macroDataList, setMacroDataList] = useState<Array<API.Keyboard.MacroData>>([])
  const [selectedMacroData, setSelectedMacroData] = useState<API.Keyboard.MacroData>()
  const [isPlay, setIsPlay] = useState(false)
  const [startTime, setStartTime] = useState(false)
  const [macroMaxLimit, setMacroMaxLimit] = useState(false)
  const [alertDialogOpen0, setAlertDialogOpen0] = useState(false)
  const [alertDialogOpen1, setAlertDialogOpen1] = useState(false)
  const [alertDialogOpen2, setAlertDialogOpen2] = useState(false)
  
  const [keyDownArr, setKeyDownArr] = useState<Array<Number>>([])
  const [macroDataSort, setMacroDataSort] = useState(0)

  const macroListRef = useRef<any>(null)
  const macroDataListRef = useRef<any>(null)
  const uploadMacroRef = useRef<any>(null)

  let time = 0;
  const isDarkMode = theme.palette.mode === 'dark';
  const macroList = props.macroList || [];
  const setMacroList = props.onUpdateMacroList;
  const executeCountArr = Array.from(Array(100), (v, k) => k);

  useEffect(() => {
    if (macroListRef.current) {
      macroListRef.current.scrollTop = macroListRef.current.scrollHeight;
    }
  }, [macroList.length])
  useEffect(() => {
    if (isPlay) {
      if (macroDataListRef.current) {
        macroDataListRef.current.scrollTop = macroDataListRef.current.scrollHeight;
      }
    }
  }, [macroDataList.length])
  useEffect(() => {
    if (startTime) {
      time = 0;
      setInterval(() => {
        time += 1;
      }, 1)
    }
  }, [startTime])

  const handleChangeExecuteType = (type: number) => {
    setExecuteType(type);
    if (selectedMacro) {
      setSelectedMacro({ ...selectedMacro, executeType: type });
      const list = macroList.map((item) => {
        if (item.id === selectedMacro.id) {
          item.executeType = type;
        }
        return item;
      })
      setMacroList(list);
    }
  }
  const handleChangeExecuteCount = (event: SelectChangeEvent) => {
    const count = Number(event.target.value);
    setExecuteCount(count);
    if (selectedMacro) {
      setSelectedMacro({ ...selectedMacro, executeCount: count });
      const list = macroList.map((item) => {
        if (item.id === selectedMacro.id) {
          item.executeCount = count;
        }
        return item;
      })
      setMacroList(list);
    }
  };
  const handleUploadMacro = (event: any) => {
    const file = event.target.files[0]
    var reader = new FileReader()
    reader.readAsText(file, "UTF-8")
    reader.onload = function (evt: any) {
      var fileString = evt.target.result;

      try {
        props.onUpload(JSON.parse(fileString))
      } finally {
        uploadMacroRef.current.value = "";
      }
    }
  }
  const handleDownloadMacro = () => {
    const content = JSON.stringify(macroList)
    const element = document.createElement("a")
    const file = new Blob([content], { type: 'application/json' })
    element.href = URL.createObjectURL(file)
    element.download = "Macro.json";
    document.body.appendChild(element)
    element.click()
  }
  const handleAddMacro = () => {
    if (macroList.length >= Boog75Constant.MAX_MACRO) {
      return;
    }
    if (macroList.length === 0) {
      const macro = { id: 0, title: 'macro0', data: [], executeType: 0, executeCount: 1 };
      setMacroList([macro]);
      handleSelectedMacro(macro);
    } else {
      const lastMacro = macroList[macroList.length - 1];
      const id = (lastMacro?.id || 0) + 1;
      const title = 'macro' + id;
      const macro = { id: id, title: title, data: [], executeType: 0, executeCount: 1 };
      setMacroList([...macroList, macro]);
      handleSelectedMacro(macro);
    }
  }
  const handleSelectedMacro = (macro: API.Keyboard.Macro) => {
    setSelectedMacro({ ...macro });
    setExecuteType(macro.executeType);
    setExecuteCount(macro.executeCount);

    const data: Array<API.Keyboard.MacroData> = [];
    macro.data.forEach((item) => data.push(item));
    setMacroDataList(data);
  }
  const handleEditMacro = (macro: API.Keyboard.Macro) => {
    const list = macroList.map((item) => {
      if (item.id === macro.id) {
        item.editAble = true;
      } else {
        item.editAble = false;
      }
      return item;
    })
    setMacroList(list)
  }
  const handleEditMacroChange = (macro: API.Keyboard.Macro, value: string) => {
    const list = macroList.map((item) => {
      if (item.id === macro.id) {
        if (value.length > 10) {
          item.error = true;
          item.errorText = intl.formatMessage({ id: "macro.macroNameLimit" });
        } else if (!value) {
          item.error = true;
          item.errorText = intl.formatMessage({ id: "macro.macroNameEmpty" });
        } else {
          item.error = false;
          item.errorText = "";
          item.editAble = true;
          item.title = value;
        }
      } else {
        item.editAble = false;
      }
      return item;
    })
    setMacroList(list)
  }
  const handleEditMacroComplete = () => {
    const list = macroList.map((item) => {
      if (item.editAble) {
        props.onApply(item.id)
      }
      item.editAble = false;
      item.error = false;
      item.errorText = "";
      return item;
    })
    setMacroList(list)
  }

  const handleDeleteMacro = (macro: API.Keyboard.Macro | undefined) => {
    if (macro) {
      const list = macroList.map((item) => {
        if (item.id === macro.id) {
          item.del = true;
        }
        return item;
      })
      setMacroList(list)
      handleSelectedMacro(list[0])
      props.onApply(macro.id)
    }
  }
  const handleSelectedMacroData = (macroData: API.Keyboard.MacroData) => {
    setSelectedMacroData({ ...macroData });
  }
  const handleSetMacroDataList = (list: Array<API.Keyboard.MacroData>) => {
    setMacroDataList(list)
    const newMacroList = macroList.map((item) => {
      if (item.id === selectedMacro?.id) {
        item.data = list
        setSelectedMacro({ ...selectedMacro, data: list })
      }
      return item
    })
    setMacroList(newMacroList)
  }
  const handleDeleteAllMacroData = () => {
    handleSetMacroDataList([]);
    setMacroMaxLimit(false)
  }
  const handleDeleteMacroData = (macroData: API.Keyboard.MacroData) => {
    const list = macroDataList.filter((item) => {
      if (item.sort !== macroData.sort && item.sort !== macroData.sort + 1) {
        return item;
      }
    })
    if (list.length < 60) {
      setMacroMaxLimit(false)
    }
    handleSetMacroDataList(list);
  }
  const handleEditMacroData = (macroData: API.Keyboard.MacroData) => {
    const list = macroDataList.map((item) => {
      if (item.sort === macroData.sort) {
        item.editAble = true;
      } else {
        item.editAble = false;
      }
      return item;
    })
    handleSetMacroDataList(list)
  }
  const handleEditMacroDataChange = (macroData: API.Keyboard.MacroData, spanTime: number) => {
    const list = macroDataList.map((item) => {
      if (item.sort === macroData.sort) {
        if (!spanTime) {
          item.error = true;
          item.errorText = intl.formatMessage({ id: "macro.numberEmpty" });
        } else if (isNaN(spanTime)) {
          item.error = true;
          item.errorText = intl.formatMessage({ id: "macro.numberLimit" });
        } else if (spanTime <= 0) {
          item.error = true;
          item.errorText = intl.formatMessage({ id: "macro.numberZero" });
        } else if (spanTime > 1000) {
          item.error = true;
          item.errorText = intl.formatMessage({ id: "macro.numberMax" });
        } else {
          item.spanTime = Number(spanTime)
          item.error = false;
          item.errorText = "";
        }
      }
      return item;
    })
    handleSetMacroDataList(list)
  }
  const handleEditMacroDataComplete = () => {
    const list = macroDataList.map((item) => {
      item.editAble = false;
      item.error = false;
      item.errorText = "";
      return item;
    })
    handleSetMacroDataList(list)
  }
  const handleUpMacroData = () => {
    if (selectedMacroData) {
      let idx = 0;
      macroDataList.forEach((item, index) => {
        if (selectedMacroData?.sort === item.sort) {
          idx = index;
          return;
        }
      })
      if (idx > 0) {
        const sort = macroDataList[idx - 1].sort;
        const list = macroDataList.map((item, index) => {
          if (item.sort === sort) {
            item.sort = selectedMacroData?.sort;
          } else if (item.sort === selectedMacroData?.sort) {
            item.sort = sort;
          }
          return item;
        })
        list.sort((a, b) => {
          return a.sort - b.sort;
        });
        handleSetMacroDataList(list);
        setSelectedMacroData({ ...selectedMacroData, sort: sort });
      }
    }
  }
  const handleDownMacroData = () => {
    if (selectedMacroData) {
      let idx = 0;
      macroDataList.forEach((item, index) => {
        if (selectedMacroData?.sort === item.sort) {
          idx = index;
          return;
        }
      })
      if (idx < macroDataList.length - 1) {
        const sort = macroDataList[idx + 1].sort;
        const list = macroDataList.map((item, index) => {
          if (item.sort === sort) {
            item.sort = selectedMacroData?.sort;
          } else if (item.sort === selectedMacroData?.sort) {
            item.sort = sort;
          }
          return item;
        })
        list.sort((a, b) => {
          return a.sort - b.sort;
        });
        handleSetMacroDataList(list);
        setSelectedMacroData({ ...selectedMacroData, sort: sort });
      }
    }
  }
  const handleUpTopMacroData = () => {
    if (selectedMacroData) {
      let idx = 0;
      macroDataList.forEach((item, index) => {
        if (selectedMacroData?.sort === item.sort) {
          idx = index;
          return;
        }
      })
      if (idx > 0) {
        const list = macroDataList.map((item, index) => {
          if (idx === index) {
            item.sort = 0
          } else {
            item.sort += 1
          }
          return item;
        })
        list.sort((a, b) => {
          return a.sort - b.sort;
        });
        handleSetMacroDataList(list);
        setSelectedMacroData({ ...selectedMacroData, sort: 0 });
      }
    }
  }
  const handleDownBottomMacroData = () => {
    if (selectedMacroData) {
      let idx = 0;
      macroDataList.forEach((item, index) => {
        if (selectedMacroData?.sort === item.sort) {
          idx = index;
          return;
        }
      })
      if (idx < macroDataList.length - 1) {
        let sort = macroDataList[idx].sort + (macroDataList.length - 1 - idx)
        const list = macroDataList.map((item, index) => {
          if (idx === index) {
            item.sort = sort
          } else {
            item.sort -= 1
          }
          return item;
        })
        list.sort((a, b) => {
          return a.sort - b.sort;
        });
        handleSetMacroDataList(list);
        setSelectedMacroData({ ...selectedMacroData, sort: sort });
      }
    }
  }
  const handleAddMacroData = () => {

  }
  const handleStartPlay = () => {
    setIsPlay(true)
  }
  const handleStopPlay = () => {
    setIsPlay(false)
    setStartTime(false)
    const list = macroList.map((item) => {
      if (item.id === selectedMacro?.id) {
        const data: Array<API.Keyboard.MacroData> = [];
        macroDataList.forEach((item) => data.push(item));
        item.data = data;
      }
      return item;
    })
    setMacroList(list);
  }
  const handlePlayKeyDown = (event: any) => {
    if (isPlay) {
      setStartTime(false);
      const vkCode = Number(event.keyCode);

      let isKeyDown = false;
      keyDownArr.forEach(e => {
        if (e === vkCode) {
          isKeyDown = true;
        }
      })

      if (!isKeyDown) {
        keyDownArr.push(vkCode);
        const length = macroDataList.length;
        if (length >= 60) {
          setMacroMaxLimit(true)
        } else {
          setMacroMaxLimit(false)
          setMacroDataSort(macroDataSort + 1)
          if (time > 0) {
            macroDataList[length - 1].spanTime = time > 1000 ? 1000 : time;
            handleSetMacroDataList([...macroDataList,
            { vkCode: vkCode, spanTime: 100, keyState: 1, sort: macroDataSort + 1 }
            ])
          } else {
            if (length > 0) {
              macroDataList[length - 1].spanTime = 100;
            }
            handleSetMacroDataList([...macroDataList,
            { vkCode: vkCode, spanTime: 100, keyState: 1, sort: macroDataSort + 1 }
            ])
          }
        }
      }
    }
  }
  const handlePlayKeyUp = (event: any) => {
    if (isPlay) {
      setStartTime(true)
      const vkCode = Number(event.keyCode);
      setMacroDataSort(macroDataSort + 1)
      handleSetMacroDataList([...macroDataList,
      { vkCode: vkCode, spanTime: 0, keyState: 0, sort: macroDataSort + 1 }
      ])

      const newArr = keyDownArr.filter(e => {
        return e !== vkCode
      })
      setKeyDownArr(newArr)
    }
  }
  const handleApplyMacro = () => {
    selectedMacro && props.onApply(selectedMacro.id);
  }

  return (
    <>
      <Paper elevation={0} variant="outlined"
        sx={{
          minWidth: '968px',
          p: 2,
          borderRadius: '10px 10px 0px 0px',
          height: '370px',
          flexGrow: 1,
          backgroundColor: isDarkMode ? '#20232a' : '#fff'
        }}
        onKeyDown={handlePlayKeyDown}
        onKeyUp={handlePlayKeyUp}
        onBlur={handleStopPlay}
      >
        <Typography>{intl.formatMessage({ id: "macro.macroManager" })}</Typography>
        <Divider />
        <Grid container spacing={4} sx={{ mt: '1px' }}>
          <Grid xs={3}>
            <Box
              sx={{
                p: 1,
                border: '1px solid',
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
                borderRadius: '10px',
                backgroundColor: isDarkMode ? '#20232a' : '#fff'
              }}
            >
              <Box>
                <Grid container spacing={2} sx={{ p: 0 }}>
                  <Grid xs={6} sx={{ pl: 1, display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                    <Typography variant='body2'>{intl.formatMessage({ id: "macro.macroList" })}</Typography>
                  </Grid>
                  <Grid xs={6} sx={{ pr: 1, display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                    <HelpPopover content={intl.formatMessage({ id: "macro.import" })} >
                      <IconButton edge="end" aria-label="upload" onClick={() => { uploadMacroRef.current.click() }}>
                        <UploadInput ref={uploadMacroRef} type="file" onChange={handleUploadMacro} />
                        <UploadIcon />
                      </IconButton>
                    </HelpPopover>
                    <HelpPopover content={intl.formatMessage({ id: "macro.export" })} >
                      <IconButton edge="end" aria-label="down" onClick={handleDownloadMacro}>
                        <DownloadIcon />
                      </IconButton>
                    </HelpPopover>
                    <HelpPopover content={intl.formatMessage({ id: "macro.add" })} >
                      <IconButton edge="end" aria-label="add" onClick={handleAddMacro}>
                        <AddIcon />
                      </IconButton>
                    </HelpPopover>
                  </Grid>
                </Grid>
              </Box>
              <Divider />
              <List ref={macroListRef} sx={{ height: '240px', overflow: 'auto' }}>
                {macroList.map((item, index) => {
                  if (!item.del) {
                    return (
                      <ListItem key={item.id} disablePadding
                        secondaryAction={
                          <>
                            <IconButton edge="end" aria-label="edit" onClick={() => handleEditMacro(item)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delte" onClick={() => { setAlertDialogOpen0(true); setDeletedMacro(item) }}>
                              <DeleteIcon />
                            </IconButton>
                          </>
                        }>
                        <ListItemButton
                          selected={item.id === selectedMacro?.id}
                          onClick={() => handleSelectedMacro(item)}
                        >
                          {!item.editAble &&
                            <ListItemText primary={item.title} primaryTypographyProps={{ variant: "caption" }} />
                          }
                          {item.editAble &&
                            <TextField
                              value={item.title}
                              autoFocus
                              id={'macro_input_' + item.id}
                              label="Name"
                              variant="standard"
                              size="small"
                              onChange={(event: any) => { handleEditMacroChange(item, event.target.value) }}
                              onBlur={handleEditMacroComplete}
                              onKeyDown={(event: any) => { event.keyCode === 13 && handleEditMacroComplete() }}
                              error={item.error}
                              helperText={item.errorText}
                            />
                          }
                        </ListItemButton>
                      </ListItem>
                    )
                  }
                })}
              </List>
            </Box>
          </Grid>

          <Grid xs={5.5}>
            <Box
              sx={{
                p: 1,
                border: '1px solid',
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
                borderRadius: '10px',
                backgroundColor: isDarkMode ? '#20232a' : '#fff'
              }}
            >
              <Grid container spacing={2} sx={{ p: 0 }}>
                <Grid xs={6} sx={{ pl: 1, display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                  <Typography variant='body2'>{intl.formatMessage({ id: "macro.macroData" })}</Typography>
                </Grid>
                <Grid xs={6} sx={{ pr: 1, display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                  <HelpPopover content={intl.formatMessage({ id: "macro.dataUpTop" })} >
                    <IconButton edge="end" aria-label="upTop" onClick={handleUpTopMacroData}>
                      <VerticalAlignTopIcon />
                    </IconButton>
                  </HelpPopover>
                  <HelpPopover content={intl.formatMessage({ id: "macro.dataDownBottom" })} >
                    <IconButton edge="end" aria-label="downBottom" onClick={handleDownBottomMacroData}>
                      <VerticalAlignBottomIcon />
                    </IconButton>
                  </HelpPopover>
                  <HelpPopover content={intl.formatMessage({ id: "macro.dataUp" })} >
                    <IconButton edge="end" aria-label="up" onClick={handleUpMacroData}>
                      <ArrowUpwardIcon />
                    </IconButton>
                  </HelpPopover>
                  <HelpPopover content={intl.formatMessage({ id: "macro.dataDown" })} >
                    <IconButton edge="end" aria-label="down" onClick={handleDownMacroData}>
                      <ArrowDownwardIcon />
                    </IconButton>
                  </HelpPopover>
                  <HelpPopover content={intl.formatMessage({ id: "macro.dataDeleteAll" })} >
                    <IconButton edge="end" aria-label="deleteAll" onClick={() => setAlertDialogOpen1(true)}>
                      <DeleteIcon />
                    </IconButton>
                  </HelpPopover>
                </Grid>
              </Grid>
              <Divider />
              <List ref={macroDataListRef} sx={{ height: '240px', overflow: 'auto' }}>
                {macroDataList.map((item) => {
                  return (
                    <Box key={item.sort}>
                      <ListItem key={"vkCode_" + item.sort} disablePadding>
                        <ListItemButton
                          selected={item.sort === selectedMacroData?.sort}
                          sx={{ display: 'flex', justifyContent: 'space-between' }}
                          onClick={() => handleSelectedMacroData(item)}
                        >
                          <Stack direction="row" spacing={1} alignItems={'center'} justifyContent={'left'} width={'80px'}>
                            {item.keyState === 1 ? <ArrowCircleDownIcon fontSize="inherit" /> : <ArrowCircleUpIcon fontSize="inherit" />}
                            {item.vkCode && <Typography variant='caption' sx={{ display: 'flex', alignItems: 'flex-end' }}>{KEY_TEXT_DICT[item.vkCode]}</Typography>}
                          </Stack>
                          {item.keyState === 1 &&
                            <Typography variant='caption' sx={{ display: 'flex', alignItems: 'center' }}>{intl.formatMessage({ id: "macro.press" })}</Typography>
                          }
                          {item.keyState === 0 &&
                            <Typography variant='caption' sx={{ display: 'flex', alignItems: 'center' }}>{intl.formatMessage({ id: "macro.release" })}</Typography>
                          }
                          <IconButton edge="end" aria-label="delete" size='small' onClick={() => handleDeleteMacroData(item)}>
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </ListItemButton>
                      </ListItem>
                      {item.spanTime > 0 &&
                        <ListItem key={"spanTime_" + item.sort} disablePadding>
                          <ListItemButton
                            sx={{ display: 'flex', justifyContent: 'space-between' }}
                          >
                            <Stack direction="row" spacing={1} alignItems={'center'} justifyContent={'left'} width={'80px'}>
                              <AccessAlarmIcon fontSize="inherit" />
                              {!item.editAble &&
                                <Typography variant='caption' sx={{ display: 'flex', alignItems: 'center' }}>{item.spanTime}{intl.formatMessage({ id: "macro.spanTimeUnit" })}</Typography>
                              }
                              {item.editAble &&
                                <TextField
                                  value={item.spanTime}
                                  autoFocus
                                  id={'macrodata_input_' + item.sort}
                                  label="Duration"
                                  variant="standard"
                                  size="small"
                                  onChange={(event: any) => { handleEditMacroDataChange(item, event.target.value) }}
                                  onBlur={handleEditMacroDataComplete}
                                  onKeyDown={(event: any) => { event.keyCode === 13 && handleEditMacroDataComplete() }}
                                  error={item.error}
                                  helperText={item.errorText}
                                />
                              }
                            </Stack>
                            <Box>
                              <IconButton edge="end" aria-label="edit" size='small' onClick={() => handleEditMacroData(item)} >
                                <EditIcon fontSize="inherit" />
                              </IconButton>
                            </Box>
                          </ListItemButton>
                        </ListItem>
                      }
                    </Box>
                  )
                })}
                {macroMaxLimit && <Alert variant="outlined" severity="warning">{intl.formatMessage({ id: "macro.maxLimit" })}</Alert>}
              </List>
            </Box>
          </Grid>
          <Grid xs={3.5}>
            <Stack>
              <Typography variant='subtitle2'>{intl.formatMessage({ id: "macro.executeType" })}</Typography>
              <FormControlLabel
                label={<Typography variant='caption'>{intl.formatMessage({ id: "macro.executeType0" })}</Typography>}
                control={<Checkbox size="small" checked={executeType === 0} onChange={() => handleChangeExecuteType(0)} />}
              />
              <FormControlLabel
                label={<Typography variant='caption'>{intl.formatMessage({ id: "macro.executeType1" })}</Typography>}
                control={<Checkbox size="small" checked={executeType === 1} onChange={() => handleChangeExecuteType(1)} />}
              />
              <FormControlLabel
                label={<Typography variant='caption'>{intl.formatMessage({ id: "macro.executeType2" })}</Typography>}
                control={<Checkbox size="small" checked={executeType === 2} onChange={() => handleChangeExecuteType(2)} />}
              />
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">{intl.formatMessage({ id: "macro.executeCount" })}</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={String(executeCount)}
                  label={intl.formatMessage({ id: "macro.executeCount" })}
                  onChange={handleChangeExecuteCount}
                >
                  {
                    executeCountArr.map((item) => {
                      return <MenuItem key={item} value={item + 1}>{item + 1}</MenuItem>
                    })
                  }
                </Select>
              </FormControl>
            </Stack>
            <br></br>
            <Stack direction="row" spacing={2}>
              {isPlay ?
                <>
                  <Button color="error" variant="contained" startIcon={<StopCircleOutlinedIcon />} onClick={handleStopPlay} fullWidth>
                    {intl.formatMessage({ id: "macro.stopPlay" })}
                  </Button>
                </>
                :
                selectedMacro &&
                <>
                  <Button variant="contained" startIcon={<PlayCircleOutlineIcon />} onClick={handleStartPlay} fullWidth>
                    {intl.formatMessage({ id: "macro.play" })}
                  </Button>
                  <Button variant="contained" startIcon={<DoneIcon />} onClick={handleApplyMacro} color='warning' fullWidth>
                    {intl.formatMessage({ id: "macro.apply" })}
                  </Button>
                </>
              }
            </Stack>
          </Grid>
        </Grid>
      </Paper>
      <AlertDialog title={intl.formatMessage({ id: "macro.deleteMacroAlertTitle" })} contentText={intl.formatMessage({ id: "macro.deleteMacroAlertContent" })} open={alertDialogOpen0} onClose={() => setAlertDialogOpen0(false)} onCallBack={() => handleDeleteMacro(deletedMacro)} />
      <AlertDialog title={intl.formatMessage({ id: "macro.deleteAllAlertTitle" })} contentText={intl.formatMessage({ id: "macro.deleteAllAlertContent" })} open={alertDialogOpen1} onClose={() => setAlertDialogOpen1(false)} onCallBack={() => handleDeleteAllMacroData()} />

    </>
  )
}

export default MacroPanel;