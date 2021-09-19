import React from 'react'
import { Link } from 'react-router-dom'
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import { useAppDispatch } from '../../context';
import './style.scss';

const ProfilePopover = ({user}) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = (evt) => {
    setAnchorEl(evt.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    dispatch({type: 'LOGOUT' })
    sessionStorage.removeItem('user');
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <div className="actions">
        <IconButton 
          aria-describedby={id}
          color="default" 
          aria-label="avatar" 
          component="span"
          onClick={handleOpen}
        >
          <Avatar src={user?.avatar} alt="your avatar">
          {`${user.fName.charAt(0).toUpperCase()}${user.lName.charAt(0).toUpperCase()}`}
          </Avatar>
        </IconButton>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className="popover-top">
          <div className="fullName">{`${user.fName} ${user.lName}`}</div>
          <div className="email">{user.email}</div>
        </div>
        <div className="popover-bottom">
          <div className="popover-content">
            <Link to="/profile" className="item-link">Settings</Link>
            <a role="button" className="item-link" onClick={handleLogout}>Logout</a>
          </div>
        </div>
      </Popover>
    </>
  )
}

export default ProfilePopover