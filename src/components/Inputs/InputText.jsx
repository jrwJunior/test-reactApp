import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const TextInput = React.forwardRef(
  ({ secure, name, errors, ...restProps }, ref) => {
  const [showIconPass, setShowIconPass] = React.useState(secure);

  const handleClickShowPassword = () => setShowIconPass((state) => !state);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const isInvalid = errors[name]?.message;
  const isSecure = (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
      >
        {!showIconPass ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <FormControl className="form-control">
      <TextField
        error={!!isInvalid}
        ref={ref}
        {...restProps}
        type={!showIconPass ? 'text' : 'password'}
        helperText={isInvalid}
        InputProps={{
          endAdornment: !!secure && isSecure
        }}
      />
    </FormControl>
  )
});

TextInput.defaultProps = {
  secure: false,
};

export default TextInput