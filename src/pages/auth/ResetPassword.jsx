import {
  Alert,
  Button,
  Card,
  CircularProgress,
  Grid,
  InputLabel,
  LinearProgress,
  Stack,
  Typography
} from "@mui/material";
import React, { useEffect } from "react";
import whiteLogo from "../../assets/images/whiteLogo-bgwhite.png";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import TextFieldWrapper from "../../components/FormComponents/TextFieldWrapper";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import AuthQuery from "../../stateQueries/Auth";
import AlertPopup from "../../components/AlertPopup";

const ResetPassword = () => {
  let { resetToken } = useParams();
  const navigate = useNavigate();

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: async (formData) => {
      return await AuthQuery.verifyResetToken(formData);
    },
    onSuccess: (data) => {
      console.log(data);
      resetToken = null;
    },
    onError: (err) => {
      console.log(err);
      resetToken = null;
    }
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (formData) => {
      return AuthQuery.resetUserPassword(formData);
    },
    onSuccess: (data) => {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  });

  useEffect(() => {
    mutate({ resetToken: resetToken });
  }, [mutate, resetToken]);

  if (isLoading) {
    return <LinearProgress />;
  }

  if (isError) {
    return (
      <Stack
        height="100vh"
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Alert severity="error" sx={{ width: "80%" }}>
          Link expired
        </Alert>
      </Stack>
    );
  } else {
    return (
      <Stack>
        {/* {isLoading && <LinearProgress />} */}
        <Stack
          height={300}
          sx={{ backgroundColor: "primary.main" }}
          alignItems="center"
          padding={2}
        >
          <img src={whiteLogo} alt="" height="50%" width="11%" />
        </Stack>
        <Stack justifyContent="center" alignItems="center">
          <Card
            component={Stack}
            padding={2}
            py={4}
            width="35%"
            justifyContent="center"
            alignItems="center"
            sx={{ position: "relative", bottom: 100 }}
          >
            {resetPasswordMutation.isSuccess && (
              <AlertPopup
                open={true}
                message={resetPasswordMutation.data?.message}
              />
            )}

            {resetPasswordMutation.isError && (
              <AlertPopup
                open={true}
                message={
                  resetPasswordMutation.error?.response?.data?.message ||
                  "Server Error"
                }
                severity="error"
              />
            )}

            <Typography fontSize={20}>Welcome</Typography>
            <Typography fontWeight="bolder" sx={{ color: "primary.main" }}>
              Reset Password to Sign in to CMS
            </Typography>

            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
                resetToken: resetToken
              }}
              validationSchema={Yup.object().shape({
                password: Yup.string().required("Password required"),
                confirmPassword: Yup.string()
                  .required("Comfirm paswword required")
                  .oneOf([Yup.ref("password")], "Passwords does not match")
              })}
              onSubmit={(values) => {
                resetPasswordMutation.mutate(values);
              }}
            >
              {() => {
                return (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={12}>
                        <InputLabel>New Password</InputLabel>
                        <TextFieldWrapper
                          name="password"
                          label="New Password"
                          type="password"
                          sx={{ mt: 2 }}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <Stack direction="row" justifyContent="space-between">
                          <InputLabel>Confirm Password</InputLabel>
                        </Stack>
                        <TextFieldWrapper
                          name="confirmPassword"
                          label="Confirm Password"
                          sx={{ mt: 2 }}
                          type="password"
                        />
                      </Grid>

                      <Grid item xs={12} md={12}>
                        <Button
                          variant="contained"
                          fullWidth
                          type="submit"
                          // onClick={(e) => navigate("/fms/dashboard")}
                        >
                          {resetPasswordMutation.isLoading ? (
                            <CircularProgress color="secondary" />
                          ) : (
                            "Reset Password"
                          )}
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </Card>
        </Stack>
      </Stack>
    );
  }
};

export default ResetPassword;
