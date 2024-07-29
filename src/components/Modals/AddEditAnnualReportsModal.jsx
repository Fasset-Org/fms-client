import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  CircularProgress,
  Grid,
  InputLabel,
  Stack,
  TextField
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { Cancel, Forward } from "@mui/icons-material";
import * as Yup from "yup";
import DateSelectWrapper from "../FormComponents/DateSelectWrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserQuery from "../../stateQueries/User";
import AlertPopup from "../AlertPopup";
import dayjs from "dayjs";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  }
}));

export default function AddEditAnnualReportsModal({ annualReport }) {
  const [open, setOpen] = React.useState(false);

  const queryClient = useQueryClient();

  const handleToggleOpen = () => {
    setOpen(!open);
  };

  const addAnnualReportMutation = useMutation({
    mutationFn: async (formData) => {
      return await UserQuery.CSEQuery.addAnnualReport(formData);
    },

    onSuccess: (data) => {
      setTimeout(() => {
        queryClient.invalidateQueries("annualReports");
        setOpen(false);
      }, 2000);
    }
  });

  const editAnnualReportMutation = useMutation({
    mutationFn: async (formData) => {
      return await UserQuery.CSEQuery.editAnnualReport(formData);
    },

    onSuccess: (data) => {
      setTimeout(() => {
        queryClient.invalidateQueries("annualReports");
        setOpen(false);
      }, 2000);
    }
  });

  return (
    <div>
      {annualReport ? (
        <IconButton color="primary" onClick={handleToggleOpen}>
          <EditIcon />
        </IconButton>
      ) : (
        <Button variant="contained" onClick={handleToggleOpen}>
          Add Annual Report
        </Button>
      )}

      {addAnnualReportMutation.isError && (
        <AlertPopup
          open={true}
          severity="error"
          message={
            addAnnualReportMutation.error?.response?.data?.message ||
            "Server Error"
          }
        />
      )}
      {addAnnualReportMutation.isSuccess && (
        <AlertPopup
          open={true}
          message={addAnnualReportMutation.data?.message}
        />
      )}

      {editAnnualReportMutation.isError && (
        <AlertPopup
          open={true}
          severity="error"
          message={
            editAnnualReportMutation.error?.response?.data?.message ||
            "Server Error"
          }
        />
      )}
      {editAnnualReportMutation.isSuccess && (
        <AlertPopup
          open={true}
          message={editAnnualReportMutation.data?.message}
        />
      )}

      <BootstrapDialog
        onClose={handleToggleOpen}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {annualReport ? "Edit Annual Report" : "Add Annual Report"}
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
              annualReportId: annualReport?.id || "",
              startDate: dayjs(annualReport?.startDate) || "",
              endDate: dayjs(annualReport?.endDate) || "",
              file: annualReport?.annualReportFileURL || null
            }}
            validationSchema={Yup.object().shape({
              startDate: Yup.string().required("Title required"),
              endDate: Yup.string().required("Fullname required"),
              file: Yup.string().required("Please select image")
            })}
            onSubmit={(values) => {
              const formData = new FormData();

              for (const [key, value] of Object.entries(values)) {
                formData.append(key, value);
              }

              if (annualReport) {
                editAnnualReportMutation.mutate(formData);
              } else {
                addAnnualReportMutation.mutate(formData);
              }
            }}
            enableReinitialize
          >
            {({ values, errors }) => {
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
                            // inputProps={{
                            //   accept:
                            //     ".doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf,application/vnd.ms-excel"
                            // }}
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
                        {annualReport ? (
                          <Button
                            variant="contained"
                            startIcon={<Forward />}
                            type="submit"
                          >
                            {editAnnualReportMutation.isLoading ? (
                              <CircularProgress color="secondary" />
                            ) : (
                              "Update"
                            )}
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            startIcon={<Forward />}
                            type="submit"
                          >
                            {addAnnualReportMutation.isLoading ? (
                              <CircularProgress color="secondary" />
                            ) : (
                              "Submit"
                            )}
                          </Button>
                        )}
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
