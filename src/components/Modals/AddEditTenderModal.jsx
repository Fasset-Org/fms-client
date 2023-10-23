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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Box,
  CircularProgress,
  Grid,
  InputLabel,
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserQuery from "../../stateQueries/User";
import AlertPopup from "../AlertPopup";
import EditIcon from "@mui/icons-material/Edit";
import DateSelectWrapper from "../FormComponents/DateSelectWrapper";
import AddAwardedTender from "./AddAwardedTenderModal";

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

const AddEditTenderModal = ({ tender }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const tenderDefaultMessage =
    "Fasset is a statutory body established through the Skills Development Act No 97 of 1998, as amended. The goal of the Act in respect of the Fasset Seta is ‘To facilitate the achievement of world-class finance and accounting skills’ in the sub-sectors that fall with the sector scope of Fasset i.e., Finance and Accounting Services.";

  const queryClient = useQueryClient();

  const addTenderMutation = useMutation({
    mutationFn: async (formData) => {
      return UserQuery.SCMQuery.addTender(formData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("currentTenders");
      setOpen(false);
    },
    onError: (err) => {
      console.log(err);
    }
  });

  const editTenderMutation = useMutation({
    mutationFn: async (formData) => {
      return await UserQuery.SCMQuery.editTender(formData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("currentTenders");
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
      {!tender ? (
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Tender
        </Button>
      ) : (
        <IconButton color="secondary" onClick={() => setOpen(true)}>
          <EditIcon />
        </IconButton>
      )}

      {addTenderMutation.isError && (
        <AlertPopup
          open={true}
          severity="error"
          message={
            addTenderMutation.error?.response?.data?.message || "Server Error"
          }
        />
      )}
      {/* Edit Tender Popups */}
      {addTenderMutation.isSuccess && (
        <AlertPopup open={true} message={addTenderMutation.data?.message} />
      )}
      {editTenderMutation.isError && (
        <AlertPopup
          open={true}
          severity="error"
          message={
            editTenderMutation.error?.response?.data?.message || "Server Error"
          }
        />
      )}
      {editTenderMutation.isSuccess && (
        <AlertPopup open={true} message={editTenderMutation.data?.message} />
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
          {tender ? `Edit ${tender.tenderName} Tender` : "Add Tender"}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Formik
            initialValues={{
              tenderId: tender?.id,
              tenderName: tender?.tenderName || "",
              tenderReference: tender?.tenderReference || "",
              bidMessage: tender?.bidMessage || tenderDefaultMessage,
              invitationMessage: tender?.invitationMessage || "",
              queryEmail: tender?.queryEmail || "",
              closingDate:
                (tender?.closingDate && dayjs(tender?.closingDate)) || "",
              meetinngId: tender?.meetinngId || "",
              meetingLink: tender?.meetingLink || "",

              meetingPasscode: tender?.meetingPasscode || "",
              meetingDate:
                (tender?.meetingDate && dayjs(tender?.meetingDate)) || dayjs(),
              tenderEndDate:
                (tender?.tenderEndDate && dayjs(tender?.tenderEndDate)) ||
                dayjs(),
              tenderDocument: tender?.tenderDocument || null,
              bidders: tender?.bidders || []
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
              const formData = new FormData();
              for (const [key, value] of Object.entries(values)) {
                if (key === "bidders")
                  formData.append(key, JSON.stringify(value));
                else formData.append(key, value);
              }

              if (tender) {
                editTenderMutation.mutate(formData);
              } else {
                addTenderMutation.mutate(formData);
              }
            }}
            enableReinitialize={true}
          >
            {({ values, errors, setFieldValue }) => {
              const winner = values.bidders.find(
                (bidder) =>
                  bidder.hasOwnProperty("winner") && bidder.winner === true
              );

              return (
                <Form encType="multipart/form-data">
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
                      <InputLabel
                        sx={{ color: "warning.main", fontSize: 12, mb: 1 }}
                      >
                        Please edit tender date once you have it, as it will be
                        used to automatically move tender to previous tenders
                        after the tender has ended
                      </InputLabel>
                      <DateSelectWrapper
                        name="tenderEndDate"
                        label="Tender End Date"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextFieldWrapper
                        name="meetingLink"
                        label="Meeting Link"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextFieldWrapper name="meetinngId" label="Meeting ID" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextFieldWrapper
                        name="meetingPasscode"
                        label="Meeting Passcode"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <InputLabel sx={{ color: "warning.main", fontSize: 12 }}>
                        Please edit meeting date once you edit meeting link
                      </InputLabel>
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
                      <Stack direction="row" justifyContent="end" spacing={2}>
                        <AddBidModal
                          setFieldValue={setFieldValue}
                          bidders={values.bidders}
                        />
                        {!winner && (
                          <AddAwardedTender
                            setFieldValue={setFieldValue}
                            bidders={values.bidders}
                          />
                        )}
                      </Stack>
                    </Grid>
                    {values.bidders.length > 0 && (
                      <Grid item sx={12} md={12}>
                        <Stack spacing={2}>
                          <Typography
                            textAlign="center"
                            sx={{
                              color: "primary.main",
                              fontSize: 20
                            }}
                          >
                            Bidders
                          </Typography>
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
                                    let newBidders = [];
                                    values.bidders.forEach((option, idx) => {
                                      if (
                                        bidder.bidderName !== option.bidderName
                                      ) {
                                        newBidders.push(option);
                                      }
                                    });

                                    console.log(newBidders);
                                    setFieldValue("bidders", newBidders);
                                  }}
                                >
                                  <DeleteForeverIcon color="error" />
                                </IconButton>
                              </Stack>
                            );
                          })}
                        </Stack>
                      </Grid>
                    )}

                    {winner && (
                      <Grid item sx={12} md={12}>
                        <Stack spacing={2}>
                          <Typography
                            textAlign="center"
                            sx={{
                              color: "primary.main",
                              fontSize: 20
                            }}
                          >
                            Awarded Bidder
                          </Typography>
                          <Stack direction="row" justifyContent="space-between">
                            <Typography fontSize={15} fontWeight="bolder">
                              Bidder Name
                            </Typography>
                            <Typography fontSize={15} fontWeight="bolder">
                              B-BBEE Level
                            </Typography>
                            <Box></Box>
                          </Stack>

                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <TextField
                              hiddenLabel
                              id="filled-hidden-label-small"
                              defaultValue={winner.bidderName}
                              variant="filled"
                              inputProps={{ readOnly: true }}
                              color="secondary"
                            />
                            <TextField
                              hiddenLabel
                              id="filled-hidden-label-small"
                              defaultValue={winner.bbeeLevel}
                              variant="filled"
                              inputProps={{ readOnly: true }}
                              color="secondary"
                            />

                            <IconButton onClick={() => {}}>
                              <DeleteForeverIcon
                                color="error"
                                onClick={() => {
                                  setFieldValue(
                                    "bidders",
                                    values.bidders.map((bidder) => {
                                      if (
                                        bidder.bidderName === winner.bidderName
                                      ) {
                                        return {
                                          ...bidder,
                                          winner: false
                                        };
                                      }
                                      return bidder;
                                    })
                                  );
                                }}
                              />
                            </IconButton>
                          </Stack>
                        </Stack>
                      </Grid>
                    )}

                    <Grid item xs={12} md={12}>
                      <Box textAlign="end">
                        {!tender ? (
                          <Button
                            variant="contained"
                            type="submit"
                            sx={{ width: 180 }}
                          >
                            {addTenderMutation.isLoading ? (
                              <CircularProgress color="secondary" />
                            ) : (
                              "Submit"
                            )}
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            type="submit"
                            sx={{ width: 180 }}
                          >
                            {editTenderMutation.isLoading ? (
                              <CircularProgress color="secondary" />
                            ) : (
                              "Save"
                            )}
                          </Button>
                        )}
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

export default AddEditTenderModal;
