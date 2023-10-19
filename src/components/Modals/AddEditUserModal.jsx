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
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  CircularProgress,
  Grid,
  InputLabel,
  LinearProgress,
  Slide,
  useMediaQuery,
} from "@mui/material";
import { Form, Formik } from "formik";
import TextFieldWrapper from "../FormComponents/TextFieldWrapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AdminQuery from "../../stateQueries/Admin";
import * as Yup from "yup";
import AlertPopup from "../AlertPopup";
import SelectFieldWrapper from "../FormComponents/SelectFieldWrapper";
/*import AuthQuery from "../../stateQueries/Auth";*/

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

const AddEditUserModal = (props) => {
  const [open, setOpen] = React.useState(false);
  let departments = [];
  // let modules = [];
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const userTypes = [
    {
      value: "Super",
      label: "Super",
    },
    {
      value: "Admin",
      label: "Admin",
    },
    {
      value: "User",
      label: "User",
    },
  ];

  const queryClient = useQueryClient();

  /*const { data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      return await AuthQuery.isUserLoggedIn();
    },
  });*/

  const { data: departmentQuery, isLoading: departmentFetchLoading } = useQuery(
    {
      queryKey: ["departments"],
      queryFn: async () => {
        return await AdminQuery.getAllDepartments();
      },
    }
  );

  // const { data: moduleQuery, isLoading: moduleFetchLoading } = useQuery({
  //   queryKey: ["modules"],
  //   queryFn: async () => {
  //     return await AdminQuery.getAllModules();
  //   },
  // });

  if (departmentQuery?.departments) {
    departments = [
      ...departmentQuery?.departments?.map((department) => {
        return {
          value: department.id,
          label: department.departmentName,
        };
      }),
    ];
  }

  // if (moduleQuery?.modules) {
  //   modules = [
  //     ...moduleQuery?.modules?.map((module) => {
  //       return {
  //         value: module.id,
  //         label: module.moduleName,
  //       };
  //     }),
  //   ];
  // }

  const addUserQuery = useMutation({
    mutationFn: async (formData) => {
      return await AdminQuery.addUser(formData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("users");
      setOpen(false);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const editUserQuery = useMutation({
    mutationFn: async (payload) => {
      return AdminQuery.editUser(payload);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("users");
      setOpen(false);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  if (departmentFetchLoading) {
    return <LinearProgress />;
  }

  return (
    <div>
      {!props.user ? (
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add User
        </Button>
      ) : (
        <IconButton color="secondary" onClick={() => setOpen(true)}>
          <EditIcon />
        </IconButton>
      )}
      {addUserQuery?.isSuccess && (
        <AlertPopup open={true} message={addUserQuery?.data?.message} />
      )}
      {addUserQuery?.isError && (
        <AlertPopup
          open={true}
          message={addUserQuery.error?.response?.data?.message}
        />
      )}

      {editUserQuery?.isSuccess && (
        <AlertPopup open={true} message={editUserQuery?.data?.message} />
      )}
      {editUserQuery?.isError && (
        <AlertPopup
          open={true}
          message={editUserQuery.error?.response?.data?.message}
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
          Add User
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Formik
            initialValues={{
              userId: props.user?.id,
              email: props.user?.email || "",
              userType: props.user?.userType || "",
              departmentId: props.user?.departmentId || "",
              /*moduleId: userInfo?.user?.id,*/
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .required("Email required")
                .test(
                  "email",
                  "Please provide valid fasset email",
                  function (email) {
                    if (email.split("@")[1] !== "fasset.org.za") {
                      return false;
                    }

                    return true;
                  }
                ),
              userType: Yup.string().required("User type required"),
              departmentId: Yup.string().required("Department required"),
              // moduleId: Yup.string().required("Module required"),
            })}
            onSubmit={(values) => {
              if (props.user) {
                editUserQuery.mutate(values);
              } else {
                addUserQuery.mutate(values);
              }
            }}
            enableReinitialize={true}
          >
            {() => {
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <InputLabel sx={{ mb: 1 }}>Email</InputLabel>
                      <TextFieldWrapper name="email" label="Email" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <InputLabel sx={{ mb: 1 }}>User Type</InputLabel>
                      <SelectFieldWrapper
                        name="userType"
                        label="User Type"
                        options={userTypes}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <InputLabel sx={{ mb: 1 }}>Department</InputLabel>
                      <SelectFieldWrapper
                        name="departmentId"
                        label="Department"
                        options={departments}
                      />
                    </Grid>
                    {/* <Grid item xs={12} md={12}>
                      <InputLabel sx={{ mb: 1 }}>Module</InputLabel>
                      <SelectFieldWrapper
                        name="moduleId"
                        label="Module"
                        options={modules}
                      />
                    </Grid> */}
                    <Grid item xs={12} md={12}>
                      <Box textAlign="end">
                        <Button
                          variant="contained"
                          type="submit"
                          sx={{ width: 180 }}
                        >
                          {addUserQuery.isLoading ? (
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

export default AddEditUserModal;
