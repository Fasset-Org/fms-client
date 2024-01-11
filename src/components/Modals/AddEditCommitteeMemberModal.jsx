import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Grid, Stack, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import TextFieldWrapper from "../FormComponents/TextFieldWrapper";
import SelectFieldWrapper from "../FormComponents/SelectFieldWrapper";
import { Cancel, Forward } from "@mui/icons-material";
import GlobalImageCropModal from "../crop/GlobalImageCropModal";
import * as Yup from "yup";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  }
}));

export default function AddEditCommitteeMemberModal() {
  const [open, setOpen] = React.useState(false);
  const [photoURL, setPhotoURL] = React.useState(null);
  const [cropOpen, setCropOpen] = React.useState(false);

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
      <Button variant="contained" onClick={handleToggleOpen}>
        Add Committee Member
      </Button>

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
              title: "",
              fullname: "",
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
                              setPhotoURL(
                                URL.createObjectURL(event.target.files[0])
                              );
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
