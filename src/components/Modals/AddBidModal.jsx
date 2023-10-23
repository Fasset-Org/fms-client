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
import { Box, Grid, Slide, useMediaQuery } from "@mui/material";
import { Form, Formik } from "formik";
import TextFieldWrapper from "../FormComponents/TextFieldWrapper";
import * as Yup from "yup";
import dayjs from "dayjs";

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

const AddBidModal = ({ setFieldValue, bidders }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => setOpen(true)}
      >
        Add Bidder
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
          Add Bidder
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Formik
            initialValues={{
              bidderName: "",
              bbeeLevel: ""
            }}
            validationSchema={Yup.object().shape({
              bidderName: Yup.string().required("Bidder name required"),
              bbeeLevel: Yup.string().required("B-BBEE Level required")
            })}
            onSubmit={(values) => {
              setFieldValue("bidders", [
                ...bidders,
                { ...values, datePosted: dayjs() }
              ]);
              setOpen(false);
            }}
            enableReinitialize={true}
          >
            {(formik) => {
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <TextFieldWrapper name="bidderName" label="Bidder Name" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextFieldWrapper name="bbeeLevel" label="B-BBEE Level" />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Box textAlign="end">
                        <Button
                          variant="contained"
                          type="submit"
                          color="secondary"
                        >
                          Save
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
    </div>
  );
};

export default AddBidModal;
