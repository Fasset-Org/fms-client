import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Grid, InputLabel, Stack, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { Cancel, Forward } from "@mui/icons-material";
import * as Yup from "yup";
import DateSelectWrapper from "../FormComponents/DateSelectWrapper";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  }
}));

export default function AddEditAnnualReportsModal() {
  const [open, setOpen] = React.useState(false);

  const handleToggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleToggleOpen}>
        Add Annual Report
      </Button>

      <BootstrapDialog
        onClose={handleToggleOpen}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Annual Report
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleToggleOpen}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Formik
            initialValues={{
              startDate: "",
              endDate: "",
              file: null
            }}
            validationSchema={Yup.object().shape({
              title: Yup.string().required("Title required"),
              fullname: Yup.string().required("Fullname required"),
              file: Yup.string().required("Please select image")
            })}
            onSubmit={(values) => {}}
            enableReinitialize
          >
            {({ values }) => {
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12} sx={{ height: 0 }}>
                      <InputLabel> Select Calender Year</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <DateSelectWrapper name="startDate" label="Start Date" />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <DateSelectWrapper name="endDate" label="End Date" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Field name="file">
                        {({ field, form, meta }) => (
                          <TextField
                            type="file"
                            label="Annual Report FIle"
                            InputLabelProps={{
                              shrink: true
                            }}
                            inputProps={{
                              accept:
                                ".doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            }}
                            error={meta.touched && meta.error}
                            helperText={
                              meta.touched && meta.error && meta.error
                            }
                            fullWidth
                            onChange={(event) => {
                              form.setFieldValue(
                                field.name,
                                event.currentTarget.files[0]
                              );
                            }}
                          />
                        )}
                      </Field>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Stack direction="row" justifyContent="end" spacing={2}>
                        <Button
                          variant="outlined"
                          startIcon={<Cancel />}
                          onClick={handleToggleOpen}
                          color="error"
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          startIcon={<Forward />}
                          type="submit"
                        >
                          Submit
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
