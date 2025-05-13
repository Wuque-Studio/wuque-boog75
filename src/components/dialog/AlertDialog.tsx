import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useIntl } from 'react-intl';

interface AlertDialogProps {
  open: boolean,
  title?: string,
  contentText?: string,
  onClose: () => void,
  onCallBack: () => void
}

export default function AlertDialog(props: AlertDialogProps) {
  const intl = useIntl();
  const handleYes = () => {
    props.onCallBack();
    props.onClose();
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"

    >
      <DialogTitle id="alert-dialog-title">
        {props.title || intl.formatMessage({ id: "page.alertTitle" })}
      </DialogTitle>
      {props.contentText &&
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.contentText}
          </DialogContentText>
        </DialogContent>
      }
      <DialogActions>
        <Button onClick={props.onClose}>
          {intl.formatMessage({ id: "page.no" })}
        </Button>
        <Button onClick={handleYes} autoFocus>
          {intl.formatMessage({ id: "page.yes" })}
        </Button>
      </DialogActions>
    </Dialog>
  )
}