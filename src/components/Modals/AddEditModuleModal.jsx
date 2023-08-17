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
  Box,
  CircularProgress,
  Grid,
  InputLabel,
  Slide,
  useMediaQuery
} from "@mui/material";
import { Form, Formik } from "formik";
import TextFieldWrapper from "../FormComponents/TextFieldWrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AdminQuery from "../../stateQueries/Admin";
import * as Yup from "yup";
import AlertPopup from "../AlertPopup";

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

const AddEditModuleModal = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const queryClient = useQueryClient();
  const adminQuery = useMutation({
    mutationFn: async (formData) => {
      return await AdminQuery.addModule(formData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("departments");
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
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Module
      </Button>
      {adminQuery?.isSuccess && (
        <AlertPopup open={true} message={adminQuery?.data?.message} />
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
          Add Module
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Formik
            initialValues={{
              moduleName: "",
              moduleDesc: ""
            }}
            validationSchema={Yup.object().shape({
              moduleName: Yup.string().required("Module name required"),
              moduleDesc: Yup.string().required("Module description required")
            })}
            onSubmit={(values) => {
              adminQuery.mutate(values);
            }}
          >
            {() => {
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <InputLabel sx={{ mb: 1 }}>Module Name</InputLabel>
                      <TextFieldWrapper name="moduleName" label="Module Name" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <InputLabel sx={{ mb: 1 }}>Module Description</InputLabel>
                      <TextFieldWrapper
                        name="moduleDesc"
                        label="Module Description"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Box textAlign="end">
                        <Button
                          variant="contained"
                          type="submit"
                          sx={{ width: 180 }}
                        >
                          {adminQuery.isLoading ? (
                            <CircularProgress color="secondary" />
                          ) : (
                            "Submit"
                          )}
                        </Button>
                      </Box>
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
    </>
  );
};

export default AddEditModuleModal;
