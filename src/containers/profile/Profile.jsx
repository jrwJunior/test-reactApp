import React from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import { useAppState, useAppDispatch } from '../../context';
import AuthSession from '../../utils/helpers/authSession';
import './style.scss';

const Profile = () => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  
  const [avatar, setAvatar] = React.useState(state.get("user").avatar || '');
  const [values, setValues] = React.useState(state.get("user"));
  const inputRef = React.useRef(null);
  const { goBack } = useHistory();

  const handleChangeUser = () => {
    dispatch({type: 'CHANGE_USER', payload: values });
    AuthSession.setUser({...state.get("user"), ...values});
    alert('User changed successfully');
  }

  const handleChange = (evt) => {
    const { target: { value, name } } = evt;
    setValues((oldState) => ({...oldState, [name]: value}));
  }

  const handleChangeFile = (evt) => {
    const { target: { files } } = evt;

    if (files?.length) {
      const fileToDataURL = (file) => {
        const reader = new FileReader();
        reader.onload = (evt) => {
          const { target: { result } } = evt;
          setAvatar(result);
          setValues((oldState) => ({...oldState, avatar: result}))
        };
        reader.readAsDataURL(file);
      };
      fileToDataURL(files[0]);
    }
  }

  return (
    <>
      <div className="profile-header">
      <IconButton aria-label="close" onClick={goBack}>
        <svg viewBox="0 0 11 11" width={15}>
          <path d="M6.11 5.594l3.94-3.94a.5.5 0 0 0-.707-.707l-3.94 3.94-3.95-3.95a.5.5 0 1 0-.707.707l3.95 3.95-3.84 3.838a.5.5 0 1 0 .708.707l3.838-3.838 3.829 3.828a.5.5 0 0 0 .707-.707L6.109 5.594z" fillRule="evenodd" data-fill="true"/>
        </svg>
      </IconButton>
      </div>
      <div className="container">
        <h2 className="title">Account settings</h2>
        <div className="wrapper">
          <div className="sidebar">
            <div className="item">
              <p>Profile</p>
              <span className="icon" />
            </div>
          </div>
          <div className="content">
            <div className="avatar-block">
              <Avatar src={avatar} alt="your avatar">
                {`${values.fName.charAt(0).toUpperCase()}${values.lName.charAt(0).toUpperCase()}`}
              </Avatar>
              <div className="upload-text">
                <input
                  id="file_upload"
                  type='file'
                  hidden
                  accept='image/*'
                  ref={inputRef}
                  onChange={handleChangeFile}
                />
                <label htmlFor="file_upload">Upload new picture</label>
              </div>
            </div>
            <div className='form'>
              <FormControl className="form-control">
                <TextField
                  name="fName"
                  value={values.fName}
                  variant="outlined"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl className="form-control">
                <TextField
                  name="lName"
                  value={values.lName}
                  variant="outlined"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl className="form-control">
                <TextField
                  name="email"
                  value={values.email}
                  variant="outlined"
                  onChange={handleChange}
                />
              </FormControl>
              <Button 
                variant="contained" 
                color="primary"
                onClick={handleChangeUser}
              >
                Save changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile