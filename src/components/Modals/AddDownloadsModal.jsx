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
  useMediaQuery
} from "@mui/material";
import { Form, Formik } from "formik";
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

const AddactionDownloadsModal = ({ downloadsTitle }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const queryClient = useQueryClient();
  const addDocumentTitleQuery = useMutation({
    mutationFn: async (formData) => {
      return await UserQuery.CSEQuery.addDocumentTitle(formData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("downloads");
      setOpen(false);
    },
    onError: (err) => {
      console.log(err);
    }
  });

  const editDocumentTitleQuery = useMutation({
    mutationFn: async (formData) => {
      return await UserQuery.CSEQuery.editDocumentTitle(formData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("downloads");
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
      {addDocumentTitleQuery?.isSuccess && (
        <AlertPopup
          open={true}
          message={addDocumentTitleQuery?.data?.message}
        />
      )}
      {addDocumentTitleQuery.isError && (
        <AlertPopup
          open={true}
          severity="error"
          message={
            addDocumentTitleQuery.error?.response?.data?.message ||
            "Server Error"
          }
        />
      )}
      {editDocumentTitleQuery?.isSuccess && (
        <AlertPopup
          open={true}
          message={editDocumentTitleQuery?.data?.message}
        />
      )}
      {editDocumentTitleQuery.isError && (
        <AlertPopup
          open={true}
          severity="error"
          message={
            editDocumentTitleQuery.error?.response?.data?.message ||
            "Server Error"
          }
        />
      )}
      {downloadsTitle ? (
        <Button
          variant="outlined"
          sx={{ fontSize: 10 }}
          color="success"
          onClick={() => setOpen(true)}
        >
          Edit
        </Button>
      ) : (
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Downloads Title
        </Button>
      )}
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
          {downloadsTitle ? "Edit Downloads Title" : "Add Downloads Title"}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Formik
            initialValues={{
              downloadsTitleId: downloadsTitle?.id || "",
              title: downloadsTitle?.title || ""
            }}
            validationSchema={Yup.object().shape({
              title: Yup.string().required("Downloads title required")
            })}
            onSubmit={(values) => {
              if (downloadsTitle) {
                editDocumentTitleQuery.mutate(values);
              } else {
                addDocumentTitleQuery.mutate(values);
              }
            }}
            enableReinitialize
          >
            {() => {
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <InputLabel sx={{ mb: 1 }}>Downloads Title</InputLabel>
                      <TextFieldWrapper name="title" label="Downloads Title" />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Stack direction="row" justifyContent="end">
                        <Button
                          variant="contained"
                          type="submit"
                          sx={{ width: 180 }}
                        >
                          {addDocumentTitleQuery.isLoading ? (
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

export default AddactionDownloadsModal;
