import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  CircularProgress,
  Grid,
  InputLabel,
  Slide,
  Stack,
  TextField,
  useMediaQuery
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import TextFieldWrapper from "../FormComponents/TextFieldWrapper";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AlertPopup from "../AlertPopup";
import UserQuery from "../../stateQueries/User";

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, fontWeight: "bolder" }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const AddTitleDocumemnts = ({ downloadsTitle }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const queryClient = useQueryClient();
  const addDocumentQuery = useMutation({
    mutationFn: async (formData) => {
      return await UserQuery.CSEQuery.addDocument(formData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("documents");
      setOpen(false);
    },
    onError: (err) => {
      console.log(err);
    }
  });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {addDocumentQuery?.isSuccess && (
        <AlertPopup open={true} message={addDocumentQuery?.data?.message} />
      )}
      {addDocumentQuery.isError && (
        <AlertPopup
          open={true}
          severity="error"
          message={
            addDocumentQuery.error?.response?.data?.message || "Server Error"
          }
        />
      )}

      <Button
        variant="contained"
        sx={{ fontSize: 10 }}
        onClick={() => setOpen(true)}
      >
        Add Document
      </Button>

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullScreen={fullScreen}
        TransitionComponent={Transition}
        fullWidth
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Add Document
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Formik
            initialValues={{
              titleId: downloadsTitle?.id || "",
              title: downloadsTitle?.title || "",
              documentName: "",
              documentFile: ""
            }}
            validationSchema={Yup.object().shape({
              title: Yup.string().required("Downloads title required"),
              documentName: Yup.string().required("Document name required"),
              documentFile: Yup.string().required("Please attach a file")
            })}
            onSubmit={(values) => {
              const formData = new FormData();
              for (const [key, value] of Object.entries(values)) {
                formData.append(key, value);
              }

              addDocumentQuery.mutate(formData);
            }}
            enableReinitialize
          >
            {({ values }) => {
              console.log(values);
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <InputLabel sx={{ mb: 1 }}>Downloads Title</InputLabel>
                      <TextFieldWrapper
                        name="title"
                        label="Downloads Title"
                        disabled
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <TextFieldWrapper
                        name="documentName"
                        label="Document Name"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Field name="documentFile">
                        {({ field, form, meta }) => (
                          <TextField
                            type="file"
                            label="File"
                            InputLabelProps={{
                              shrink: true
                            }}
                            InputProps={{
                              inputProps: {
                                // accept: ".doc, .docx, .pdf"
                              }
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
                      <Stack direction="row" justifyContent="end">
                        <Button
                          variant="contained"
                          type="submit"
                          sx={{ width: 180 }}
                        >
                          {addDocumentQuery.isLoading ? (
                            <CircularProgress color="secondary" />
                          ) : (
                            "Save"
                          )}
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </DialogContent>
        {/* <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
};

export default AddTitleDocumemnts;
