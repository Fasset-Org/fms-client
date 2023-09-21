import React from "react";
import { useField, useFormikContext } from "formik";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { FormHelperText } from "@mui/material";

const DateTimePickerWrapper = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const configDateTimePicker = {
    ...field,
    ...otherProps,
    variant: "outlined",
    fullWidth: true,
    InputLabelProps: {
      shrink: true
    }
  };



  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker"]}>
        <DateTimePicker
          {...configDateTimePicker}
          
          onChange={(date) => setFieldValue(name, date)}
        />
      </DemoContainer>
      {meta?.touched && meta?.error && (
        <FormHelperText error>{meta?.error}</FormHelperText>
      )}
    </LocalizationProvider>
  );
};

export default DateTimePickerWrapper;
