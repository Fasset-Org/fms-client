import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Slide,
  Stack,
  useMediaQuery
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextFieldWrapper from "../FormComponents/TextFieldWrapper";
import DateTimePickerWrapper from "../FormComponents/DateTimePickerWrapper";
import SelectFieldWrapper from "../FormComponents/SelectFieldWrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserQuery from "../../stateQueries/User";
import AlertPopup from "../AlertPopup";
import EditIcon from "@mui/icons-material/Edit";
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

const GrantsWindowModal = ({ grant }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const queryClient = useQueryClient();

  const handleClose = () => {
    setOpen(false);
  };

  const addGrantWindoQuery = useMutation({
    mutationFn: async (formData) => {
      return await UserQuery.CSEQuery.addGrantWindow(formData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("grants");
    },
    onError: (err) => {
      console.log(err);
    }
  });

  const editGrantWindowQuery = useMutation({
    mutationFn: async (formData) => {
      return await UserQuery.CSEQuery.editGrantWindow(formData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("grants");
    },
    onError: (err) => {
      console.log(err);
    }
  });

  const windowTypes = [
    {
      value: "mandatory",
      label: "Mandatory Grants"
    },
    {
      value: "discretionary",
      label: "Discretionary Grants"
    }
  ];

  return (
    <div>
      {grant ? (
        <IconButton color="secondary" onClick={() => setOpen(true)}>
          <EditIcon />
        </IconButton>
      ) : (
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Add Grant
        </Button>
      )}

      {/* Add */}

      {addGrantWindoQuery?.isSuccess && (
        <AlertPopup open={true} message={addGrantWindoQuery?.data?.message} />
      )}
      {addGrantWindoQuery?.isError && (
        <AlertPopup
          open={true}
          severity="error"
          message={
            addGrantWindoQuery.error?.response?.data?.message || "Server Error"
          }
        />
      )}

      {/* Edit */}

      {editGrantWindowQuery?.isSuccess && (
        <AlertPopup open={true} message={editGrantWindowQuery?.data?.message} />
      )}
      {editGrantWindowQuery?.isError && (
        <AlertPopup
          open={true}
          severity="error"
          message={
            editGrantWindowQuery.error?.response?.data?.message ||
            "Server Error"
          }
        />
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
          Grants Window
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Formik
            initialValues={{
              grantId: grant?.id || "",
              title: grant?.title || "",
              grantType: grant?.grantType || "",
              closingDate: dayjs(grant?.closingDate) || ""
            }}
            validationSchema={Yup.object().shape({
              title: Yup.string().required("Title required"),
              grantType: Yup.string().required("Grant type required"),
              closingDate: Yup.date().required("Closing date required")
            })}
            onSubmit={(values) => {
              if (grant) {
                editGrantWindowQuery.mutate(values);
              } else {
                addGrantWindoQuery.mutate(values);
              }
            }}
            enableReinitialize={true}
          >
            {({ values, errors, setFieldValue }) => {
              console.log(errors);
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <TextFieldWrapper name="title" label="Title" />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <SelectFieldWrapper
                        name="grantType"
                        label="Grant Type"
                        options={windowTypes}
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <DateTimePickerWrapper
                        name="closingDate"
                        label="Closing Date"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Box textAlign="end">
                        <Stack
                          spacing={2}
                          direction="row"
                          width="100%"
                          justifyContent="end"
                        >
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => setOpen(false)}
                          >
                            Close
                          </Button>
                          {grant ? (
                            <Button variant="contained" type="submit">
                              {addGrantWindoQuery.isLoading ? (
                                <LinearProgress color="secondary" />
                              ) : (
                                "Update"
                              )}
                            </Button>
                          ) : (
                            <Button variant="contained" type="submit">
                              {addGrantWindoQuery.isLoading ? (
                                <LinearProgress color="secondary" />
                              ) : (
                                "Submit"
                              )}
                            </Button>
                          )}
                        </Stack>
                      </Box>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GrantsWindowModal;
