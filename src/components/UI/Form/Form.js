import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SettingsIcon from '@material-ui/icons/Settings';
import './Form.css';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [properties, setProperties] = React.useState(props.properties);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setProperties(props.properties);
    setOpen(false);
  };

  const handleSubmit = () => {
    props.onSubmit(properties);
    setOpen(false);
  }

  let row=properties ? Object.keys(properties).map(function(id){
    return(
        <TextField
            autoFocus
            margin="dense"
            key={id}
            id={id}
            label={id}
            type="text"
            fullWidth
            value={properties[id]}
            onChange={(event) => {
              let newProp = Object.assign({}, properties);
              newProp[id] = event.target.value;
              setProperties(newProp)
            }}

          />
    );
}) : null 


  return (
    <div>
      <div >
      <Button variant="outlined" color="primary" onClick={handleClickOpen} className={"settingsButton"} >    
      <SettingsIcon style={{fill: "green"}}></SettingsIcon>
      </Button>
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Properties</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please insert the properties of the node.
          </DialogContentText>
          <div>
              {row}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}