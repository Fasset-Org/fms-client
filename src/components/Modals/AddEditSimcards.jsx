import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AssetQuery from "../../stateQueries/Asset";
import AdminQuery from "../../stateQueries/Admin";
import {
  Box,
  CircularProgress,
  Grid,
  InputLabel,
  Slide,
  useMediaQuery,
} from "@mui/material";
import { Form, Formik } from "formik";
import TextFieldWrapper from "../FormComponents/TextFieldWrapper";
import AlertPopup from "../AlertPopup";
import SelectFieldWrapper from "../FormComponents/SelectFieldWrapper";
import DateSelectWrapper from "../FormComponents/DateSelectWrapper";

import * as Yup from 'yup';


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
            color: (theme) => theme.palette.grey[500],
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
  onClose: PropTypes.func.isRequired,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const AddEditSimcardsModal = ({simcards}) => {
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  
  const queryClient = useQueryClient();

  const AddAssetQuery = useMutation({
    mutationFn: async (formData) => {
      return await AssetQuery.AssetManagement.addSimcards(formData)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("assets");
      setOpen(false);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const editAssetQuery = useMutation({
    mutationFn: async (payload) => {
      return AssetQuery.AssetManagement.editSimcards(payload);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("assets");
      setOpen(false);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const userQuery = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return await AdminQuery.getAllUsers();
    },
  });

  // create array variable to hold users
  let userOptions = [];

  // check if the is any users
  if (userQuery?.data?.users?.length > 0) {
    // loop through all users to create select options

    for (const user of userQuery?.data?.users) {
      userOptions.push({ value: user.id, label: user.fullName });
    }
  }

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      {!simcards ? (
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Simcards
        </Button>
      ) : (
        <IconButton color="secondary" onClick={() => setOpen(true)}>
          <EditIcon />
        </IconButton>
      )}
      {AddAssetQuery?.isSuccess && (
        <AlertPopup open={true} message={AddAssetQuery?.data?.message} />
      )}
      {AddAssetQuery?.isError && (
        <AlertPopup
          open={true}
          message={AddAssetQuery.error?.response?.data?.message}
          severity= 'error'
        />
      )}

      {editAssetQuery?.isSuccess && (
        <AlertPopup open={true} message={editAssetQuery?.data?.message} />
      )}
      {editAssetQuery?.isError && (
        <AlertPopup
          open={true}
          message={editAssetQuery.error?.response?.data?.message}
          severity= 'error'
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
          Add Simcards
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Formik
            initialValues={{
              simcardsId: simcards?.id,
              simcardName: simcards?.simcardName || '',
              number: simcards?.number || '',
              simcardType: simcards?.simcardType || '',
              solutionID: simcards?.solutionID || '',
              userId: simcards?.User?.id || "",
              status: simcards?.status || '', 
              startDate:'',
              endDate:'',
              
              
            }}
           validationSchema={
              Yup.object().shape({
                simcardName: Yup.string().required('Simcards Name'),
                number: Yup.string().required('Number required'),
                simcardType: Yup.string().required('Simcard type required'),
                solutionID: Yup.string().required('solutionID required')
              })
             }
            onSubmit={(values) => {
              if (simcards) {
                editAssetQuery.mutate(values);
              } else {
                AddAssetQuery.mutate(values);
              }
            }}
            enableReinitialize={true}
          >
            {() => {
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <InputLabel sx={{ mb: 1 }}>Simcard Name</InputLabel>
                      <TextFieldWrapper name="simcardName" label="Simcard Name" />
                    </Grid>

                    

                    <Grid item xs={12} md={12}>
                      <InputLabel sx={{ mb: 1 }}>Number</InputLabel>
                      <TextFieldWrapper name="number" label="number" />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <InputLabel sx={{ mb: 1 }}>Simcard Type</InputLabel>
                      <TextFieldWrapper name="simcardType" label="simcard Type" />
                    </Grid>

                   

                    <Grid item xs={12} md={12}>
                      <InputLabel sx={{ mb: 1 }}>Solution ID</InputLabel>
                      <TextFieldWrapper name="solutionID" label="solutionID" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <InputLabel sx={{ mb: 1 }}>Allocation User</InputLabel>
                      <SelectFieldWrapper
                        name="userId"
                        label="User Allocation"
                        options={userOptions}
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <InputLabel sx={{ mb: 1 }}>Status</InputLabel>
                      <SelectFieldWrapper
                        name="status"
                        label="status"
                        options={[
                          { value: "Active", label: "Active" },
                          { value: "NotActive", label: "Not Active" },
                        
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <InputLabel sx={{ mb: 1 }}>Start Date</InputLabel>
                      <DateSelectWrapper name="startDate" label="Start Date" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <InputLabel sx={{ mb: 1 }}>End Date</InputLabel>
                      <DateSelectWrapper name="endDate" label="End date" />
                    </Grid>


                    <Grid item xs={12} md={12}>
                      <Box textAlign="end">
                        <Button
                          variant="contained"
                          type="submit"
                          sx={{ width: 180 }}
                        >
                          {AddAssetQuery.isLoading ? (
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
    </div>
  );
};
export default AddEditSimcardsModal;