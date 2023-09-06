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
import * as Yup from "yup";
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

const AddPositionQuestion = ({ setFieldValue, bidders }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const addPositionQuestionMutation = useMutation({
    mutationFn: async (formData) => {
      return await UserQuery.HumanResourceQuery.addPositionQuestion(formData);
    },
    onSuccess: (data) => {}
  });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => setOpen(true)}
      >
        Add Position Question
      </Button>

      {addPositionQuestionMutation.isError && (
        <AlertPopup
          open={true}
          message={
            addPositionQuestionMutation.error?.response?.data?.message ||
            "Server Error"
          }
          severity="error"
        />
      )}
      {addPositionQuestionMutation.isSuccess && (
        <AlertPopup
          open={true}
          message={addPositionQuestionMutation.data?.message}
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
          Add Position Question
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Formik
            initialValues={{
              question: "",
              expectedAnswer: ""
            }}
            validationSchema={Yup.object().shape({
              question: Yup.string().required("Question required"),
              expectedAnswer: Yup.string().required("Expected answer required")
            })}
            onSubmit={(values) => {
              addPositionQuestionMutation.mutate(values);
            }}
            enableReinitialize={true}
          >
            {(formik) => {
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <TextFieldWrapper name="question" label="Question?" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <InputLabel
                        sx={{
                          fontSize: 12,
                          color: "warning.main",
                          fontWeight: "bolder"
                        }}
                      >
                        NB: Providing an answer will automatically check that
                        with what candidate entered
                      </InputLabel>
                      <TextFieldWrapper
                        name="expectedAnswer"
                        label="Expected Answer?"
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Box textAlign="end">
                        <Button
                          variant="contained"
                          type="submit"
                          color="secondary"
                        >
                          {addPositionQuestionMutation.isLoading ? (
                            <CircularProgress />
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

export default AddPositionQuestion;