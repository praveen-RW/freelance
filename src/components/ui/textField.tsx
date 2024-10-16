// src/TextFieldComponent.jsx
import React from 'react';
import { TextField } from '@mui/material';

const TextFieldComponent = ({ label, value, onChange, error, helperText, type = 'text' }) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      type={type}
      fullWidth
      margin="normal"
    />
  );
};

export default TextFieldComponent;
