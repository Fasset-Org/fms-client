import { Button, Grid, InputLabel, Paper, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import React from 'react'
import TextFieldWrapper from '../FormComponents/TextFieldWrapper';

const AddUserEmail = () => {
  return (
    <Stack
        width="100%"
        // border={1}
        alignItems="center"
        justifyContent="center"
      >
        <Stack component={Paper} padding={4} width="50%">
          <Typography
            textAlign="center"
            sx={{ color: "primary.main", fontSize: 20, fontWeight: "bolder" }}
          >
            Add User Email
          </Typography>
          <Formik
            initialValues={{
              email: ""
            }}
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
                      <Button variant="contained" fullWidth>
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </Stack>
      </Stack>
  )
}

export default AddUserEmail