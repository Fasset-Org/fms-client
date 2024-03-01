import React from "react";
import "dayjs/locale/en-gb";
import { FormControl } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            name={name}
            variant="inline"
            inputFormat="DD/MM/YYYY"
            {...configTextfield}
            onChange={(date) => {
              // console.log(date)
              setFieldValue(name, date);
            }}
            inputVariant="outlined"
            sx={{width: '100%'}}
          />
        </DemoContainer>
      </FormControl>
    </LocalizationProvider>
  );
};

export default DateSelectWrapper;
