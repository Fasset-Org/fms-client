import {
  Alert,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  InputLabel,
  LinearProgress,
  Stack,
  Typography
} from "@mui/material";
import React from "react";
import whiteLogo from "../../assets/images/whiteLogo-bgwhite.png";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import TextFieldWrapper from "../../components/FormComponents/TextFieldWrapper";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import AuthQuery from "../../stateQueries/Auth";

const LoginUser = () => {
  const navigate = useNavigate();
  const {data, isLoading} = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      return await AuthQuery.isUserLoggedIn()
    }
  })

  const authQuery = useMutation({
    mutationFn: (formData) => {
      return AuthQuery.loginUser(formData);
    },
    onSuccess: (data) => {
      localStorage.setItem("authToken", data?.user?.token);
      localStorage.setItem("refreshToken", data?.user?.refreshToken);
      setTimeout(() => {
        window.location.href = `${process.env.REACT_APP_PUBLIC_URL}/`;
      }, 1000);
    },
    onError: (err) => {
      console.log(err);
    }
  });

  if(isLoading){
    return <LinearProgress />
  }

  if(data){
    return <Navigate to='/' />
  }


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
          {authQuery.error && (
            <Alert color="error" sx={{ width: "100%" }}>
              {authQuery?.error?.response?.data?.message ||
                authQuery?.error?.message}
            </Alert>
          )}
          {authQuery.isSuccess && (
            <Alert color="success" sx={{ width: "100%" }}>
              {authQuery?.data?.message}
            </Alert>
          )}

          <Typography fontSize={20}>Welcome back</Typography>
          <Typography fontWeight="bolder" sx={{ color: "primary.main" }}>
            Sign in to continue to CMS
          </Typography>

          <Formik
            initialValues={{
              email: "",
              password: ""
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().required("Please provide email"),
              password: Yup.string().required("Please provide password")
            })}
            onSubmit={(values) => {
              authQuery.mutate(values);
            }}
          >
            {() => {
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <InputLabel>Email/UserName</InputLabel>
                      <TextFieldWrapper
                        name="email"
                        label="Email/UserName"
                        sx={{ mt: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Stack direction="row" justifyContent="space-between">
                        <InputLabel>Password</InputLabel>
                        <Typography
                          onClick={() => {
                            navigate("/forgotPassword");
                          }}
                          sx={{
                            fontWeight: "bolder",
                            color: "primary.main",
                            cursor: "pointer"
                          }}
                        >
                          Forgot Password?
                        </Typography>
                      </Stack>
                      <TextFieldWrapper
                        name="password"
                        label="Password"
                        sx={{ mt: 2 }}
                        type="password"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Remember Me"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Button
                        variant="contained"
                        fullWidth
                        type="submit"
                        // onClick={(e) => navigate("/fms/dashboard")}
                      >
                        {authQuery?.isLoading && authQuery.isLoading ? (
                          <CircularProgress color="secondary" />
                        ) : (
                          "Login"
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
};

export default LoginUser;
