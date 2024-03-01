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
  Stack,
  TextField
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import TextFieldWrapper from "../FormComponents/TextFieldWrapper";
import SelectFieldWrapper from "../FormComponents/SelectFieldWrapper";
import { Cancel, Forward } from "@mui/icons-material";
import GlobalImageCropModal from "../crop/GlobalImageCropModal";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserQuery from "../../stateQueries/User";
import AlertPopup from "../AlertPopup";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  }
}));

export default function AddEditCommitteeMemberModal({
  committeeMember,
  committeeId
}) {
  const [open, setOpen] = React.useState(false);
  const [photoURL, setPhotoURL] = React.useState(null);
  const [originalFile, setOriginalFile] = React.useState(null);
  const [cropOpen, setCropOpen] = React.useState(false);

  const queryClient = useQueryClient();

  const addComMemberMutation = useMutation({
    mutationFn: async (formData) => {
      return UserQuery.CSEQuery.addCommitteeMember(formData);
    },

    onSuccess: (data) => {
      setTimeout(() => {
        queryClient.invalidateQueries("committeeMembers");
        setOpen(false);
      }, 2000);
    }
  });

  const editComMemberMutation = useMutation({
    mutationFn: async (formData) => {
      return UserQuery.CSEQuery.editCommitteeMember(formData);
    },

    onSuccess: (data) => {
      setTimeout(() => {
        queryClient.invalidateQueries("committeeMembers");
        setOpen(false);
      }, 2000);
    }
  });

  console.log(committeeMember)

  const handleToggleOpen = () => {
    setOpen(!open);
  };

  const titleOptions = [
    {
      value: "Mr",
      label: "Mr"
    },
    {
      value: "Ms",
      label: "Ms"
    },
    {
      value: "Miss",
      label: "Miss"
    },
    {
      value: "Mrs",
      label: "Mrs"
    }
  ];

  return (
    <div>
      {committeeMember ? (
        <IconButton onClick={handleToggleOpen} color="primary">
          <EditIcon />
        </IconButton>
      ) : (
        <Button variant="contained" onClick={handleToggleOpen}>
          Add Committee Member
        </Button>
      )}

      {addComMemberMutation.isError && (
        <AlertPopup
          open={true}
          severity="error"
          message={
            addComMemberMutation.error?.response?.data?.message ||
            "Server Error"
          }
        />
      )}
      {addComMemberMutation.isSuccess && (
        <AlertPopup open={true} message={addComMemberMutation.data?.message} />
      )}

      {editComMemberMutation.isError && (
        <AlertPopup
          open={true}
          severity="error"
          message={
            editComMemberMutation.error?.response?.data?.message ||
            "Server Error"
          }
        />
      )}
      {editComMemberMutation.isSuccess && (
        <AlertPopup open={true} message={editComMemberMutation.data?.message} />
      )}

      <BootstrapDialog
        onClose={handleToggleOpen}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Committee Member
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
              committeeNameId:
                committeeMember?.committeeNameId || committeeId || "",
              committeeMemberId: committeeMember?.id || "",
              title: committeeMember?.title || "",
              fullname: committeeMember?.fullname || "",
              position: committeeMember?.position || "",
              file: committeeMember?.imageFileURL || null
            }}
            validationSchema={Yup.object().shape({
              title: Yup.string().required("Title required"),
              fullname: Yup.string().required("Fullname required"),
              position: Yup.string().required("Position required")
              // file: Yup.string().required("Please select image")
            })}
            onSubmit={(values) => {
              const formData = new FormData();

              for (const [key, value] of Object.entries(values)) {
                if (key === "file" && values.file?.name) {
                  formData.append(key, value, value.name);
                } else {
                  formData.append(key, value);
                }
              }

              if (committeeMember) {
                editComMemberMutation.mutate(formData);
              } else {
                addComMemberMutation.mutate(formData);
              }
            }}
            enableReinitialize
          >
            {({ values }) => {
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <SelectFieldWrapper
                        name="title"
                        label="Title"
                        options={titleOptions}
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <TextFieldWrapper name="fullname" label="Fullname" />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <TextFieldWrapper name="position" label="Position" />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Field name="file">
                        {({ field, form, meta }) => (
                          <TextField
                            type="file"
                            label="Committee Member Image"
                            InputLabelProps={{
                              shrink: true
                            }}
                            error={meta.touched && meta.error}
                            helperText={
                              meta.touched && meta.error && meta.error
                            }
                            inputProps={{
                              accept: "image/*"
                            }}
                            fullWidth
                            onChange={(event) => {
                              const file = event.target.files[0];
                              setPhotoURL(URL.createObjectURL(file));
                              setOriginalFile(file);
                              setCropOpen(true);
                            }}
                          />
                        )}
                      </Field>

                      {photoURL && (
                        <GlobalImageCropModal
                          {...{
                            photoURL,
                            cropOpen,
                            setCropOpen,
                            originalFile,
                            title: "Crop Image"
                          }}
                        />
                      )}
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
                        {committeeMember ? (
                          <Button
                            variant="contained"
                            startIcon={<Forward />}
                            type="submit"
                          >
                            {editComMemberMutation.isLoading ? (
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
                            {addComMemberMutation.isLoading ? (
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
