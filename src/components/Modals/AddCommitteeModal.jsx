import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { Button, CircularProgress, Grid, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import { Cancel, Forward } from "@mui/icons-material";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserQuery from "../../stateQueries/User";
import AlertPopup from "../AlertPopup";
import TextFieldWrapper from "../FormComponents/TextFieldWrapper";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  }
}));

export default function AddCommitteeModal({ committeeMember }) {
  const [open, setOpen] = React.useState(false);

  const queryClient = useQueryClient();

  const addComMemberMutation = useMutation({
    mutationFn: async (formData) => {
      return UserQuery.CSEQuery.addCommitteName(formData);
    },

    onSuccess: (data) => {
      setTimeout(() => {
        queryClient.invalidateQueries("committeeNames");
        setOpen(false);
      }, 2000);
    }
  });

  const editComMemberMutation = useMutation({
    mutationFn: async (formData) => {
      return UserQuery.CSEQuery.editCommiteeName(formData);
    },

    onSuccess: (data) => {
      setTimeout(() => {
        queryClient.invalidateQueries("committeeNames");
        setOpen(false);
      }, 2000);
    }
  });

  const handleToggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      {committeeMember ? (
        <IconButton onClick={handleToggleOpen} color="primary">
          <EditIcon />
        </IconButton>
      ) : (
        <Button variant="contained" onClick={handleToggleOpen}>
          Add Committee
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
          Add Committee
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
              committeeName: ""
            }}
            validationSchema={Yup.object().shape({
              committeeName: Yup.string().required("Committee name required")
            })}
            onSubmit={(values) => {
              const formData = new FormData();

              for (const [key, value] of Object.entries(values)) {
                formData.append(key, value);
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
                      <TextFieldWrapper
                        name="committeeName"
                        label="Committee Name"
                      />
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
