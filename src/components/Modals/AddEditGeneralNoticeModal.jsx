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
  CircularProgress,
  Grid,
  Slide,
  Stack,
  useMediaQuery
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserQuery from "../../stateQueries/User";
import AlertPopup from "../AlertPopup";
import EditIcon from "@mui/icons-material/Edit";
import RichTextEditor from "../Editor";
import { Form, Formik } from "formik";
import * as Yup from "yup";

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

const AddEditGeneralNoticeModal = ({ notice }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const queryClient = useQueryClient();

  const addGeneralNoticeQuery = useMutation({
    mutationFn: async (formData) => {
      return await UserQuery.CSEQuery.addGeneralNotice(formData);
    },
    onSuccess: (data) => {
      setTimeout(() => {
        queryClient.invalidateQueries("notices");
        setOpen(false);
      }, 2000);
    },
    onError: (err) => {
      console.log(err);
    }
  });

  const editGeneralNoticeQuery = useMutation({
    mutationFn: async (formData) => {
      return await UserQuery.CSEQuery.editGeneralNotice(formData);
    },
    onSuccess: (data) => {
      setTimeout(() => {
        queryClient.invalidateQueries("notices");
        setOpen(false);
      }, 2000);
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
      {notice ? (
        <IconButton color="secondary" onClick={() => setOpen(true)}>
          <EditIcon />
        </IconButton>
      ) : (
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Add Notice
        </Button>
      )}

      {addGeneralNoticeQuery?.isSuccess && (
        <AlertPopup
          open={true}
          message={addGeneralNoticeQuery?.data?.message}
        />
      )}
      {addGeneralNoticeQuery?.isError && (
        <AlertPopup
          open={true}
          severity="error"
          message={
            addGeneralNoticeQuery.error?.response?.data?.message ||
            "Server Error"
          }
        />
      )}

      {editGeneralNoticeQuery?.isSuccess && (
        <AlertPopup
          open={true}
          message={editGeneralNoticeQuery?.data?.message}
        />
      )}
      {editGeneralNoticeQuery?.isError && (
        <AlertPopup
          open={true}
          severity="error"
          message={
            editGeneralNoticeQuery.error?.response?.data?.message ||
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
          {notice ? "Edit Notice" : "Add Notice"}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Formik
            initialValues={{
              generalNoticeId: notice?.id || "",
              content: notice?.content || ""
            }}
            validationSchema={Yup.object().shape({
              content: Yup.string().required("Please type your content")
            })}
            onSubmit={(values) => {
              if (notice) {
                editGeneralNoticeQuery.mutate(values);
              } else {
                addGeneralNoticeQuery.mutate(values);
              }
            }}
            enableReinitialize
          >
            {({ values }) => {
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <RichTextEditor />
                    </Grid>

                    <Grid item xs={12} md={12} mt={0}>
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
                          {notice ? (
                            <Button variant="contained" type="submit">
                              {editGeneralNoticeQuery.isLoading ? (
                                <CircularProgress color="secondary" />
                              ) : (
                                "Update"
                              )}
                            </Button>
                          ) : (
                            <Button variant="contained" type="submit">
                              {addGeneralNoticeQuery.isLoading ? (
                                <CircularProgress color="secondary" />
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

export default AddEditGeneralNoticeModal;
