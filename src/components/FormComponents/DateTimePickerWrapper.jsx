import React from "react";
import { useField, useFormikContext } from "formik";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const DateTimePickerWrapper = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (date) => {
    setFieldValue(name, date);
  };

  const configDateTimePicker = {
    ...field,
    ...otherProps,
    variant: "outlined",
    fullWidth: true,
    InputLabelProps: {
      shrink: true
    },
    onChange: handleChange
  };

  if (meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker"]}>
        <DateTimePicker {...configDateTimePicker} />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DateTimePickerWrapper;
