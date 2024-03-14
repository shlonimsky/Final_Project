// import * as React from 'react';
import { Fragment, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

const AlertDialog = ({open,stateChanger, title, taskID, helperID, getHelper}) => {
    // console.log("HELPER IN ALERT: ", helperID);
    const navigate = useNavigate();
//   const [open, setOpen] = useState(true);
let header = '';
let context ='';

switch (title) {
    case 'hire':
        header='Hirring for a job'
        context = 'Are you sure you want to hire this person for a job?'
        break;
    case 'delete':
        header='Deleting this task'
        context = 'Are you sure you want to delete this task? You will not be able to restore it againe'
        break;
    case 'close':
        header='Closing this task'
        context = 'Are you sure you ready to close this task?'
        break;
    default:
        break;
};

const addHelperToTask = async () => {
    // !!!!NOT FONOSHED
    try {
        const response = await fetch(`/task/${taskID}`, {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({helper_id: helperID }),
        })
        const result = await response.json();
        console.log(result);
        getHelper(helperID)
    } catch (err) {
        console.log(err);
    }
    console.log("at addHelperToTask ", helperID);
}

const deleteTask =  () => {
    try {
        fetch(`/task/${taskID}`, {method: "DELETE"})
        .then(res => res.json())
        .then(res => {
            console.log(res);
        }) 
    } catch (error) {
        console.log(error);
    }
  navigate('/')
}

  const handleClose = () => {
    if (title==='hire') addHelperToTask()
    else if (title==='delete') deleteTask()
    else if (title==='close') navigate(`/close_task/${taskID}`)
    stateChanger(false)
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {header}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
        {context}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => stateChanger(false)}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default AlertDialog