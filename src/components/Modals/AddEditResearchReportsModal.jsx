import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  CircularProgress,
  Grid,
  Stack,
  TextField
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import TextFieldWrapper from "../FormComponents/TextFieldWrapper";
import { Cancel, Forward } from "@mui/icons-material";
import * as Yup from "yup";
import DateYearSelectWrapper from "../FormComponents/DateYearSelectWrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserQuery from "../../stateQueries/User";
import AlertPopup from "../AlertPopup";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  }
}));

export default function AddEditResearchReportsModal({ researchReport }) {
  const [open, setOpen] = React.useState(false);

  const queryClient = useQueryClient();

  const addResearchReportMutation = useMutation({
    mutationFn: async (formData) => {
      return await UserQuery.CSEQuery.addResearchReport(formData);
    },

    onSuccess: (data) => {
      setTimeout(() => {
        queryClient.invalidateQueries("researchReports");
        setOpen(false);
      }, 2000);
    }
  });

  const editResearchReportMutation = useMutation({
    mutationFn: async (formData) => {
      return await UserQuery.CSEQuery.editResearchReport(formData);
    },

    onSuccess: (data) => {
      setTimeout(() => {
        queryClient.invalidateQueries("researchReports");
        setOpen(false);
      }, 2000);
    }
  });

  const handleToggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      {researchReport ? (
        <IconButton color="primary" onClick={handleToggleOpen}>
          <EditIcon />
        </IconButton>
      ) : (
        <Button variant="contained" onClick={handleToggleOpen}>
          Add Research Report
        </Button>
      )}

      {addResearchReportMutation.isError && (
        <AlertPopup
          open={true}
          severity="error"
          message={
            addResearchReportMutation.error?.response?.data?.message ||
            "Server Error"
          }
        />
      )}
      {addResearchReportMutation.isSuccess && (
        <AlertPopup
          open={true}
          message={addResearchReportMutation.data?.message}
        />
      )}

      {editResearchReportMutation.isError && (
        <AlertPopup
          open={true}
          severity="error"
          message={
            editResearchReportMutation.error?.response?.data?.message ||
            "Server Error"
          }
        />
      )}
      {editResearchReportMutation.isSuccess && (
        <AlertPopup
          open={true}
          message={editResearchReportMutation.data?.message}
        />
      )}

      <BootstrapDialog
        onClose={handleToggleOpen}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {researchReport ? "Edit Research Report" : "Add Research Report"}
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
              researchReportId: researchReport?.id || "",
              documentTitle: researchReport?.documentTitle || "",
              documentDesc: researchReport?.documentDesc || "",
              year: dayjs(researchReport?.year) || "",
              file: researchReport?.researchReportFileURL || null
            }}
            validationSchema={Yup.object().shape({
              documentTitle: Yup.string().required("Title required"),
              documentDesc: Yup.string().required("Description required"),
              year: Yup.string().required("Year required"),
              file: Yup.string().required("Please select research report file")
            })}
            onSubmit={(values) => {
              const formData = new FormData();

              for (const [key, value] of Object.entries(values)) {
                formData.append(key, value);
              }

              if (researchReport) {
                editResearchReportMutation.mutate(formData);
              } else {
                addResearchReportMutation.mutate(formData);
              }
            }}
            enableReinitialize
          >
            {({ values, errors }) => {
              console.log(errors);
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <TextFieldWrapper
                        name="documentTitle"
                        label="Document Title"
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <TextFieldWrapper
                        name="documentDesc"
                        label="Document Description"
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <DateYearSelectWrapper name="year" label="Year" />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Field name="file">
                        {({ field, form, meta }) => (
                          <TextField
                            type="file"
                            label="Research Report FIle"
                            InputLabelProps={{
                              shrink: true
                            }}
                            // inputProps={{
                            //   accept:
                            //     ".doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
                        {researchReport ? (
                          <Button
                            variant="contained"
                            startIcon={<Forward />}
                            type="submit"
                          >
                            {editResearchReportMutation.isLoading ? (
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
                            {addResearchReportMutation.isLoading ? (
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
