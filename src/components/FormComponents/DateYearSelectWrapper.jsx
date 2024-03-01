import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useField, useFormikContext } from "formik";
import { FormHelperText } from "@mui/material";

const DateYearSelectWrapper = ({ name, ...otherProps }) => {
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
      <DemoContainer components={["DatePicker", "DatePicker", "DatePicker"]}>
        <DatePicker
          views={["year"]}
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

export default DateYearSelectWrapper;
