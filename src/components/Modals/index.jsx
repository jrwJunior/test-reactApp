import React from 'react';
import { useHistory } from 'react-router-dom'; 
import { Dialog, DialogContent, DialogActions } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { useAppDispatch } from '../../context';
import { newId } from '../../utils/helpers/newId';
import './style.scss';

const ChannelDialog = () => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({title: '', description: ''});
  const [isError, setIsError] = React.useState(false);
  const { push } = useHistory();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // eslint-disable-next-line consistent-return
  const handleCreateChannel = () => {
    const v = Object.values(values);
    if (!v.some((el) => el)) {
      setIsError(true);
      return false;
    }

    dispatch({ type: 'SET_CHENNEL', payload: values});
    push(`/channel/${newId()}`);
    setIsError(false);
  }
  const handleChange = (evt) => {
    const { target: { value, name } } = evt;
    setValues((oldState) => ({...oldState, [name]: value}))
  }

  return (
    <>
      <Button 
        variant="contained" 
        color="primary"
        onClick={handleClickOpen}
      >
        Create a channel
      </Button>
      <Dialog 
        open={open} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
      >
        <DialogContent>
          <h2>New channel</h2>
          <div className="dialog-inner">
            <FormControl className="form-control">
              <TextField
                name="title"
                value={values.title}
                label="Channel title*" 
                variant="outlined"
                error={isError}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl className="form-control">
              <TextField
                name="description"
                value={values.description}
                label="Channel description" 
                variant="outlined"
                onChange={handleChange}
              />
            </FormControl>
          </div>
          <DialogActions>
            <Button 
              onClick={handleCreateChannel} 
              variant="contained" 
              color="secondary" 
              size="large"
            >
              Create new channel
            </Button>
        </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )
};

export default ChannelDialog;