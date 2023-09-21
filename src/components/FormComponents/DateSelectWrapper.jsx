import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";
import { FormControl, TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

const DateSelectWrapper = ({ name, ...otherProps }) => {
  const [field, mata] = useField(name);
  const { setFieldValue } = useFormikContext();

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined"
  };

  if (mata && mata.touched && mata.error) {
    configTextfield.error = true;
    configTextfield.helperText = mata.error;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <FormControl fullWidth>
        <DatePicker
          name={name}
          variant="inline"
          inputFormat="DD/MM/YYYY"
          {...configTextfield}
          onChange={(date) => {
            // console.log(date)
            setFieldValue(name, date)
          }}
          inputVariant="outlined"
          fullWidth
          renderInput={(params) => <TextField {...params} />}
        />
      </FormControl>
    </LocalizationProvider>
  );
};

export default DateSelectWrapper;
