import {
  Button,
  Card,
  Grid,
  InputLabel,
  Stack,
  Typography
} from "@mui/material";
import React from "react";
import whiteLogo from "../../assets/images/blue_bg_text_logo.png";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import TextFieldWrapper from "../../components/FormComponents/TextFieldWrapper";

const ForgotPassword = () => {
  return (
    <Stack>
      {/* {isLoading && <LinearProgress />} */}
      <Stack
        height={300}
        sx={{ backgroundColor: "primary.main" }}
        alignItems="center"
        padding={2}
      >
        <img src={whiteLogo} alt="" height="50%" width="12%" />
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
          {/* {error?.response?.status === 404 && (
              <Alert color="error" sx={{ width: "100%" }}>
                {error.response.data.message}
              </Alert>
            )} */}

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
              console.log(values);
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
                        type="password"
                        sx={{ mt: 2 }}
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Button
                        variant="contained"
                        fullWidth
                        type="submit"
                        // onClick={(e) => navigate("/fms/dashboard")}
                      >
                        Reset Password
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

export default ForgotPassword;
