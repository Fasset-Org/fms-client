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

export default function AddEditBoardMemberModal({ boardMember }) {
  const [open, setOpen] = React.useState(false);
  const [photoURL, setPhotoURL] = React.useState(null);
  const [originalFile, setOriginalFile] = React.useState(null);
  const [cropOpen, setCropOpen] = React.useState(false);

  const queryClient = useQueryClient();

  const addBoardMemberMutation = useMutation({
    mutationFn: async (formData) => {
      return UserQuery.CSEQuery.addBoardMember(formData);
    },
    onSuccess: (data) => {
      setTimeout(() => {
        queryClient.invalidateQueries("boardMembers");
        setOpen(false);
      }, 2000);
    }
  });

  const editBoardMemberMutation = useMutation({
    mutationFn: async (formData) => {
      return UserQuery.CSEQuery.editBoardMember(formData);
    },
    onSuccess: (data) => {
      setTimeout(() => {
        queryClient.invalidateQueries("boardMembers");
        setOpen(false);
      }, 2000);
    }
  });

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
      {boardMember ? (
        <IconButton onClick={handleToggleOpen} color="primary">
          <EditIcon />
        </IconButton>
      ) : (
        <Button variant="contained" onClick={handleToggleOpen}>
          Add Board Member
        </Button>
      )}

      {addBoardMemberMutation.isError && (
        <AlertPopup
          open={true}
          severity="error"
          message={
            addBoardMemberMutation.error?.response?.data?.message ||
            "Server Error"
          }
        />
      )}
      {addBoardMemberMutation.isSuccess && (
        <AlertPopup
          open={true}
          message={addBoardMemberMutation.data?.message}
        />
      )}

      {editBoardMemberMutation.isError && (
        <AlertPopup
          open={true}
          severity="error"
          message={
            editBoardMemberMutation.error?.response?.data?.message ||
            "Server Error"
          }
        />
      )}
      {editBoardMemberMutation.isSuccess && (
        <AlertPopup
          open={true}
          message={editBoardMemberMutation.data?.message}
        />
      )}

      <BootstrapDialog
        onClose={handleToggleOpen}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {boardMember ? "Edit Board Member" : "Add Board Member"}
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
              boardMemberId: boardMember?.id || "",
              title: boardMember?.title || "",
              fullname: boardMember?.fullname || "",
              file: "dummy" || null
            }}
            validationSchema={Yup.object().shape({
              title: Yup.string().required("Title required"),
              fullname: Yup.string().required("Fullname required"),
              file: Yup.string().required("Please select image")
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
              if (boardMember) {
                editBoardMemberMutation.mutate(formData);
              } else {
                addBoardMemberMutation.mutate(formData);
              }
            }}
            enableReinitialize
          >
            {({ values, errors }) => {
              console.log(values);
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
                      <Field name="file">
                        {({ field, form, meta }) => (
                          <TextField
                            type="file"
                            label="Board Member Image"
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
                        {boardMember ? (
                          <Button
                            variant="contained"
                            startIcon={<Forward />}
                            type="submit"
                          >
                            {editBoardMemberMutation.isLoading ? (
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
                            {addBoardMemberMutation.isLoading ? (
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
