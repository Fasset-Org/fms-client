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
  Grid,
  Slide,
  Stack,
  TextField,
  Typography,
  useMediaQuery
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import TextFieldWrapper from "../FormComponents/TextFieldWrapper";

import * as Yup from "yup";
import TextAreaFieldWrapper from "../FormComponents/TextAreaFieldWrapper";
import DateTimePickerWrapper from "../FormComponents/DateTimePickerWrapper";
import dayjs from "dayjs";
import AddBidModal from "./AddBidModal";
import { useMutation } from "@tanstack/react-query";
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

const AddEditTenderModal = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const addTenderQuery = useMutation({
    mutationFn: async (formData) => {
      return UserQuery.SCMQuery.addTender(formData);
    },
    onSuccess: (data) => {
      console.log(data);
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
              tenderName: "",
              tenderReference: "",
              invitationMessage:
                "Fasset is a statutory body established through the Skills Development Act No 97 of 1998, as amended. The goal of the Act in respect of the Fasset Seta is ‘To facilitate the achievement of world-class finance and accounting skills’ in the sub-sectors that fall with the sector scope of Fasset i.e., Finance and Accounting Services.",
              bidMessage: "",
              queryEmail: "mathapelo.makomene@fasset.org.za",
              closingDate: dayjs(new Date()),
              meetinngId: "",
              meetingLink: "",
              meetigPasscode: "",
              meetingDate: dayjs(new Date()),
              tenderDocument: null,
              bidders: []
            }}
            validationSchema={Yup.object().shape({
              tenderName: Yup.string().required("Tender name required"),
              tenderReference: Yup.string().required(
                "Tender reference required"
              ),
              invitationMessage: Yup.string().required(
                "Invitation message required"
              ),
              bidMessage: Yup.string().required("Bid message required"),
              queryEmail: Yup.string().required("Email for queries required"),
              closingDate: Yup.string().required("Closing date required"),
              tenderDocument: Yup.string().required("Tender document required")
            })}
            onSubmit={(values) => {
              addTenderQuery.mutate(values);
            }}
            enableReinitialize={true}
          >
            {({ values, errors, setFieldValue }) => {
              console.log(errors);
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <TextFieldWrapper name="tenderName" label="Tender Name" />
                    </Grid>
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
                        name="queryEmail"
                        label="Contact Email For Queries"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <DateTimePickerWrapper
                        name="closingDate"
                        label="Closing Date"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextFieldWrapper
                        name="meeitngLink"
                        label="Meeting Link"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextFieldWrapper name="meeitngId" label="Meeting ID" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextFieldWrapper
                        name="meetingPasscode"
                        label="Meeting Passcode"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <DateTimePickerWrapper
                        name="meetingDate"
                        label="Meeting Date"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Field name="tenderDocument">
                        {({ field, form, meta }) => (
                          <TextField
                            type="file"
                            label="Tender Document"
                            InputLabelProps={{
                              shrink: true
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
                        <AddBidModal
                          setFieldValue={setFieldValue}
                          bidders={values.bidders}
                        />
                      </Stack>
                    </Grid>
                    {values.bidders.length > 0 && (
                      <Grid item sx={12} md={12}>
                        <Stack spacing={2}>
                          <Stack direction="row" justifyContent="space-between">
                            <Typography fontSize={15} fontWeight="bolder">
                              Bidder Name
                            </Typography>
                            <Typography fontSize={15} fontWeight="bolder">
                              B-BBEE Level
                            </Typography>
                            <Box></Box>
                          </Stack>

                          {values.bidders.map((bidder, i) => {
                            return (
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                key={i}
                              >
                                <TextField
                                  hiddenLabel
                                  id="filled-hidden-label-small"
                                  defaultValue={bidder.bidderName}
                                  variant="filled"
                                  inputProps={{ readOnly: true }}
                                  color="secondary"
                                />
                                <TextField
                                  hiddenLabel
                                  id="filled-hidden-label-small"
                                  defaultValue={bidder.bbeeLevel}
                                  variant="filled"
                                  inputProps={{ readOnly: true }}
                                  color="secondary"
                                />

                                <IconButton
                                  onClick={() => {
                                    setFieldValue(
                                      "bidders",
                                      values.bidders.filter((option, idx) => {
                                        return (
                                          bidder.bidderName !==
                                          option.bidderName
                                        );
                                      })
                                    );
                                  }}
                                >
                                  <CloseIcon />
                                </IconButton>
                              </Stack>
                            );
                          })}
                        </Stack>
                      </Grid>
                    )}
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
