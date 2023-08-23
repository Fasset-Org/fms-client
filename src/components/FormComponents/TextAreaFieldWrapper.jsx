import { TextField } from "@mui/material";
import { useField } from "formik";
import React from "react";

const TextAreaFieldWrapper = ({ name, label, ...otherProps }) => {
  const [field, meta] = useField(name);

  const configTextField = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined"
  };

  if (meta?.touched && meta?.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return <TextField {...configTextField} label={label} multiline rows={4} />;
};

export default TextAreaFieldWrapper;
