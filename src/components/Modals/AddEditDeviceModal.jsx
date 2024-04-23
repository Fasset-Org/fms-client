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
import SelectFieldWrapper from "../FormComponents/SelectFieldWrapper";
import AlertPopup from "../AlertPopup";
import AdminQuery from "../../stateQueries/Admin";
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

const AddEditDeviceModal = ({ device }) => {
  const [open, setOpen] = React.useState(false);

  //console.log(device);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const queryClient = useQueryClient();

  const AddAssetQuery = useMutation({
    mutationFn: async (formData) => {
      return await AssetQuery.AssetManagement.addDevice(formData);
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
      return AssetQuery.AssetManagement.editDevice(payload);
    },
    onSuccess: (data) => {
      setTimeout(() => {
        queryClient.invalidateQueries("assets");
        setOpen(false);
      }, 2000);
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
      {!device ? (
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Device
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
        />
      )}

      {editAssetQuery?.isSuccess && (
        <AlertPopup open={true} message={editAssetQuery?.data?.message} />
      )}
      {editAssetQuery?.isError && (
        <AlertPopup
          open={true}
          message={editAssetQuery.error?.response?.data?.message}
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
          Add Device
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Formik
            initialValues={{
              deviceId: device?.id,
              deviceName: device?.deviceName || "",
              deviceType: device?.deviceType || "",
              serialNumberImei: device?.serialNumberImei || "",
              warranty: device?.warranty || "",
              status: device?.status || "",
              assetTag: device?.assetTag || "",
              userId: device?.User?.id || "",
            }}
            // validationSchema={{}}
            validationSchema={
              Yup.object().shape({
                deviceName: Yup.string().required('device Name'),
                deviceType: Yup.string().required('deviceType required'),
                serialNumberImei: Yup.string().required('serialNumberImei required'),
                assetTag: Yup.string().required('assetTag required'),
                userId: Yup.string().required('userId required')
              })
             }
            onSubmit={(values) => {
              if (device) {
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
                      <InputLabel sx={{ mb: 1 }}>Device Name</InputLabel>
                      <TextFieldWrapper name="deviceName" label="Device Name" />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <InputLabel sx={{ mb: 1 }}>Device Type</InputLabel>
                      <SelectFieldWrapper
                        name="deviceType"
                        label="Device Type"
                        options={[
                          { value: "Laptop", label: "Laptop" },
                          { value: "Cellphone", label: "Cellphone" },
                          { value: "Other", label: "Other" },
                        ]}
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <InputLabel sx={{ mb: 1 }}>serial Imei Number</InputLabel>
                      <TextFieldWrapper
                        name="serialNumberImei"
                        label="serialNumberImei"
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <InputLabel sx={{ mb: 1 }}>warranty</InputLabel>
                      <TextFieldWrapper name="warranty" label="Warranty" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <InputLabel sx={{ mb: 1 }}>assetTag</InputLabel>
                      <TextFieldWrapper name="assetTag" label="assetTag" />
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
                      <InputLabel sx={{ mb: 1 }}>status</InputLabel>
                      <SelectFieldWrapper
                        name="status"
                        label="status"
                        options={[
                          { value: "Active", label: "Active" },
                          { value: "Storage", label: "storage" },
                          { value: "Disposed", label: "Disposed" },
                        ]}
                      />
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
export default AddEditDeviceModal;
