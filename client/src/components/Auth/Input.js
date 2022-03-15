import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const Input = ({
  name,
  value,
  type,
  half,
  handleChange,
  label,
  autoFocus,
  handleShowPassword,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        size="small"
        variant="outlined"
        onChange={handleChange}
        required
        name={name}
        value={value}
        label={label}
        autoFocus={autoFocus}
        type={type}
        fullWidth
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default Input;
