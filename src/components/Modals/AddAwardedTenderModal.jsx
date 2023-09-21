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
import * as Yup from "yup";
import SelectFieldWrapper from "../FormComponents/SelectFieldWrapper";
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

const AddAwardedTender = ({ setFieldValue, bidders }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  let tenderBidders = [];

  if (bidders?.length > 0) {
    tenderBidders = bidders?.map((bidder) => {
      return {
        value: bidder?.bidderName,
        label: bidder?.bidderName
      };
    });
  }

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => setOpen(true)}
      >
        Add Awarded Tender
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
          Add Awarded Tender
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Formik
            initialValues={{
              bidderName: ""
            }}
            validationSchema={Yup.object().shape({
              bidderName: Yup.string().required("Awarded bidder required")
            })}
            onSubmit={(values) => {
              setFieldValue(
                "bidders",
                bidders.map((bidder) => {
                  if (bidder.bidderName === values.bidderName) {
                    return {
                      ...bidder,
                      winner: true,
                      datePosted: dayjs()
                    };
                  }
                  return bidder;
                })
              );
              setOpen(false);
            }}
            enableReinitialize={true}
          >
            {({values}) => {
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <SelectFieldWrapper
                        name="bidderName"
                        label="Awarded To"
                        options={tenderBidders}
                      />
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
    </>
  );
};

export default AddAwardedTender;
