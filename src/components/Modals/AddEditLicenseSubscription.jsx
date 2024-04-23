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
import DateSelectWrapper from "../FormComponents/DateSelectWrapper";
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

const AddEditLicenseSubscriptionModal = ({ licensesubscription }) => {
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const queryClient = useQueryClient();

  const AddAssetQuery = useMutation({
    mutationFn: async (formData) => {
      return await AssetQuery.AssetManagement.addLicenseSubscription(formData);
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
      return AssetQuery.AssetManagement.editLicenseSubscription(payload);
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
      {!licensesubscription ? (
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add License and Subscription
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
          severity="error"
        />
      )}

      {editAssetQuery?.isSuccess && (
        <AlertPopup open={true} message={editAssetQuery?.data?.message} />
      )}
      {editAssetQuery?.isError && (
        <AlertPopup
          open={true}
          message={editAssetQuery.error?.response?.data?.message}
          severity="error"
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
          Add License Subscription
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Formik
            initialValues={{
              licensesubscriptionId: licensesubscription?.id,
              productName: licensesubscription?.productName || "",
              licenseSubscriptionType:
                licensesubscription?.licenseSubscriptionType || "",
              licenseKeySubscriptionCode:
                licensesubscription?.licenseKeySubscriptionCode || "",
              usageLimits: licensesubscription?.usageLimits || "",
              startDate:
                (licensesubscription?.startDate &&
                  new Date(licensesubscription?.startDate)) ||
                new Date(),
              endDate:
                (licensesubscription?.endDate &&
                  new Date(licensesubscription?.endDate)) ||
                new Date(),
              vendorProvider: licensesubscription?.vendorProvider || "",
              renewalStatus: licensesubscription?.renewalStatus || "",
              userId: licensesubscription?.User?.id || "",
            }}
            validationSchema={Yup.object().shape({
              productName: Yup.string().required("Product name required"),
              licenseSubscriptionType: Yup.string().required(
                "licenseSubscriptionType required"
              ),
              licenseKeySubscriptionCode: Yup.string().required(
                "licenseKeySubscriptionCode required"
              ),
              usageLimits: Yup.string().required("usageLimits required"),
            })}
            onSubmit={(values) => {
              console.log(values);

              if (licensesubscription) {
                editAssetQuery.mutate(values);
              } else {
                AddAssetQuery.mutate(values);
              }
            }}
            enableReinitialize={true}
          >
            {({ errors }) => {
              // console.log(errors);
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <InputLabel sx={{ mb: 1 }}>Product Name</InputLabel>
                      <TextFieldWrapper
                        name="productName"
                        label="Product Name"
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <InputLabel sx={{ mb: 1 }}>
                        license and subscription Type
                      </InputLabel>
                      <SelectFieldWrapper
                        name="licenseSubscriptionType"
                        label="licenseSubscriptionType"
                        options={[
                          { value: "License", label: "License" },
                          { value: "Subscription", label: "Subscription" },
                          { value: "Other", label: "Other" },
                        ]}
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <InputLabel sx={{ mb: 1 }}>
                        LicenseKey Subscription Code
                      </InputLabel>
                      <TextFieldWrapper
                        name="licenseKeySubscriptionCode"
                        label="licenseKeySubscriptionCode"
                      />
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
                      <InputLabel sx={{ mb: 1 }}>startDate</InputLabel>
                      <DateSelectWrapper name="startDate" label="Start Date" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <InputLabel sx={{ mb: 1 }}>endDate</InputLabel>
                      <DateSelectWrapper name="endDate" label="End date" />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <InputLabel sx={{ mb: 1 }}>usagelimits</InputLabel>
                      <TextFieldWrapper
                        name="usageLimits"
                        label="Usage Limits"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <InputLabel sx={{ mb: 1 }}>vendorProvider</InputLabel>
                      <TextFieldWrapper
                        name="vendorProvider"
                        label="Vendor Provider"
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <InputLabel sx={{ mb: 1 }}>Status</InputLabel>
                      <SelectFieldWrapper
                        name="renewalStatus"
                        label="status"
                        options={[
                          { value: "Active", label: "Active" },

                          { value: "expired", label: "expired" },
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
      </Dialog>
    </div>
  );
};
export default AddEditLicenseSubscriptionModal;
