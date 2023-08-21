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
import TextAreaFieldWrapper from "../FormComponents/TextAreaFieldWrapper";

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

const AddEditTenderModal = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Tender
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
          Add Tender
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Formik
            initialValues={{
              invitationMessage:
                "Fasset is a statutory body established through the Skills Development Act No 97 of 1998, as amended. The goal of the Act in respect of the Fasset Seta is ‘To facilitate the achievement of world-class finance and accounting skills’ in the sub-sectors that fall with the sector scope of Fasset i.e., Finance and Accounting Services.",
              bidMessage: "",
              departmentId: "",
              moduleId: ""
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .required("Email required")
                .test(
                  "email",
                  "Please provide valid fasset email",
                  function (email) {
                    if (email.split("@")[1] !== "fasset.org.za") {
                      return false;
                    }

                    return true;
                  }
                ),
              userType: Yup.string().required("User type required"),
              departmentId: Yup.string().required("Department required"),
              moduleId: Yup.string().required("Module required")
            })}
            onSubmit={(values) => {}}
            enableReinitialize={true}
          >
            {() => {
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <TextFieldWrapper
                        name="tenderReference"
                        label="Tender Reference"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextAreaFieldWrapper
                        name="invitationMessage"
                        label="Invitation Message"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextAreaFieldWrapper
                        name="bidMessage"
                        label="Bid Message"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextFieldWrapper
                        name="contactEmail"
                        label="Contact Email For Quiries"
                        defaultValue="mathapelo.makomene@fasset.org.za"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}></Grid>
                    <Grid item xs={12} md={12}>
                      <Box textAlign="end">
                        <Button
                          variant="contained"
                          type="submit"
                          sx={{ width: 180 }}
                        >
                          Submit
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

export default AddEditTenderModal;
