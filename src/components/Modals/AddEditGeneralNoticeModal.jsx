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
  InputLabel,
  LinearProgress,
  Paper,
  Slide,
  Stack,
  TextField,
  Typography,
  useMediaQuery
} from "@mui/material";
import { Form, Formik } from "formik";
import TextFieldWrapper from "../FormComponents/TextFieldWrapper";
import * as Yup from "yup";
import TextAreaFieldWrapper from "../FormComponents/TextAreaFieldWrapper";
import { DeleteQuestionModal } from "./DeleteQuestionModal";
import { useMutation } from "@tanstack/react-query";
import UserQuery from "../../stateQueries/User";
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

const AddEditGeneralNoticeModal = ({ tender }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [linksNedded, setLinksNeeded] = React.useState(true);
  const [link, setLink] = React.useState("");

  const addGeneralNoticeQuery = useMutation({
    mutationFn: async (formData) => {
      return await UserQuery.CSEQuery.addGeneralNotice(formData);
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
    <div>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Add Notice
      </Button>

      {addGeneralNoticeQuery?.isSuccess && (
        <AlertPopup
          open={true}
          message={addGeneralNoticeQuery?.data?.message}
        />
      )}
      {addGeneralNoticeQuery?.isError && (
        <AlertPopup
          open={true}
          severity='error'
          message={
            addGeneralNoticeQuery.error?.response?.data?.message ||
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
          Add Notice
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Formik
            initialValues={{
              title: "",
              content: "",
              links: []
            }}
            validationSchema={Yup.object().shape({
              title: Yup.string().required("Title required"),
              content: Yup.string().required("Content required")
            })}
            onSubmit={(values) => {
              addGeneralNoticeQuery.mutate(values);
            }}
            enableReinitialize={true}
          >
            {({ values, errors, setFieldValue }) => {
              return (
                <Form encType="multipart/form-data">
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <TextFieldWrapper name="title" label="Title" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextAreaFieldWrapper name="content" label="Content" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <InputLabel sx={{ mb: 2 }}>
                        Do you have any links to attach?
                      </InputLabel>
                      <Stack spacing={2} direction="row">
                        <Button
                          variant={linksNedded && "contained"}
                          onClick={() => setLinksNeeded(true)}
                        >
                          Yes
                        </Button>
                        <Button
                          variant={!linksNedded && "contained"}
                          onClick={() => setLinksNeeded(false)}
                        >
                          No
                        </Button>
                      </Stack>
                    </Grid>
                    {linksNedded && (
                      <Grid item xs={12} md={12}>
                        <Stack direction="row" spacing={2}>
                          <TextField
                            fullWidth
                            label="Link"
                            sx={{ width: "80%" }}
                            onClick={(e) => setLink(e.target.value)}
                          />
                          <Button
                            variant="contained"
                            sx={{ width: "20%" }}
                            onClick={() => {
                              if (link !== "") {
                                setFieldValue("links", [...values.links, link]);
                              }
                            }}
                          >
                            Add
                          </Button>
                        </Stack>
                      </Grid>
                    )}

                    {values.links.length > 0 && (
                      <Grid item xs={12} md={12}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          width="100%"
                          alignItems="center"
                          component={Paper}
                          paddingX={2}
                          minHeight={60}
                        >
                          <Typography>Text</Typography>
                          <DeleteQuestionModal />
                        </Stack>
                      </Grid>
                    )}

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
                            Cancel
                          </Button>
                          <Button variant="contained" type="submit">
                            {addGeneralNoticeQuery.isLoading ? (
                              <LinearProgress color="secondary" />
                            ) : (
                              "Submit"
                            )}
                          </Button>
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
