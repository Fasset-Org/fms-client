import { TextField } from "@mui/material";
import { Field } from "formik";
import React from "react";

const FileFieldWrapper = ({ name, ...otherProps }) => {
  return (
    <Field name={name}>
      {({ field, form, meta }) => {
        console.log(form)
        return (
          <TextField
            type="file"
            label="Upload File"
            InputLabelProps={{
              shrink: true
            }}
            {...field}
            onChange={(event) => {
              form.setFieldValue(name, event.currentTarget.files[0]);
            }}
          />
        );
      }}
    </Field>
  );
};

export default FileFieldWrapper;
