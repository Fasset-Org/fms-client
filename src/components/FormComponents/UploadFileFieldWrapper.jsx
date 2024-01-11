import { TextField } from "@mui/material";
import { Field, useField, useFormikContext } from "formik";
import React from "react";

const UploadFileFieldWrapper = ({ name, label, ...otherProps }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (e) => {
    setFieldValue(name, e.currentTarget.files[0]);
  };

  const configUploadField = {
    ...field,
    ...otherProps,
    variant: "outlined",
    fullWidth: true,
    onChange: handleChange
  };

  if (meta?.touched && meta?.error) {
    configUploadField.error = true;
    configUploadField.helperText = meta.error;
  }

  return (
    <Field name="jobSpecDocumentName">
      {({ field, form, meta }) => (
        <TextField
          type="file"
          label="Position Job Description"
          InputLabelProps={{
            shrink: true
          }}
          error={meta.touched && meta.error}
          helperText={meta.touched && meta.error && meta.error}
          fullWidth
          onChange={(event) => {
            form.setFieldValue(field.name, event.currentTarget.files[0]);
          }}
        />
      )}
    </Field>
  );
};

export default UploadFileFieldWrapper;
