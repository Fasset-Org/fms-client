import {
  Alert,
  Box,
  Button,
  Grid,
  InputLabel,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import BreadCrumbsHeader from "../../../components/BreadCrumbsHeader";
import { Field, Form, Formik } from "formik";
import TextFieldWrapper from "../../../components/FormComponents/TextFieldWrapper";
import TextAreaFieldWrapper from "../../../components/FormComponents/TextAreaFieldWrapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AdminQuery from "../../../stateQueries/Admin";
import SelectFieldWrapper from "../../../components/FormComponents/SelectFieldWrapper";
import AddQualificationModal from "../../../components/Modals/AddQualificationModal";
import UserQuery from "../../../stateQueries/User";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import * as Yup from "yup";
import AlertPopup from "../../../components/AlertPopup";
import { useNavigate } from "react-router-dom";
import DateTimePickerWrapper from "../../../components/FormComponents/DateTimePickerWrapper";

const AddEditPosition = () => {
  let departments = [];
  let qualifications = [];
  const [isQualificationRequired, setIsQualificationRequired] = useState(true);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const departmentQuery = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      return await AdminQuery.getAllDepartments();
    }
  });

  const { data } = useQuery({
    queryKey: ["qualifications"],
    queryFn: async () => {
      return await UserQuery.HumanResourceQuery.getAllQualification();
    }
  });

  const addPositionMutation = useMutation({
    mutationFn: async (formData) => {
      return await UserQuery.HumanResourceQuery.addPosition(formData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("positions");
      setTimeout(() => {
        navigate("/humanResource/openPositions");
      }, 1000);
    }
  });

  if (data?.qualifications) {
    qualifications = [
      ...data?.qualifications?.map((qualification) => {
        return {
          value: qualification.id,
          label: qualification.qualificationName
        };
      })
    ];
  }

  if (departmentQuery?.data?.departments) {
    departments = [
      ...departmentQuery?.data?.departments?.map((department) => {
        return {
          value: department.id,
          label: department.departmentName
        };
      })
    ];
  }

  return (
    <Stack spacing={2}>
      <BreadCrumbsHeader
        title="Welcome back Tiyisela Themba Makamu"
        menus={[
          { name: "Dashboard", url: "/dashboard" },
          { name: "Human Resource", url: "/humanResource" },
          { name: "Add Position", url: "/addPositiosn" }
        ]}
        sx={{ mb: 2, width: "100%" }}
      />
      {addPositionMutation.isError && (
        <AlertPopup
          open={true}
          message={
            addPositionMutation.error?.response?.data?.message || "Server Error"
          }
          severity="error"
        />
      )}
      {addPositionMutation.isSuccess && (
        <AlertPopup open={true} message={addPositionMutation.data?.message} />
      )}

      <Stack px={{ md: 20, xs: 0 }}>
        <Stack
          spacing={2}
          padding={2}
          sx={{ borderRadius: 2 }}
          component={Paper}
        >
          <Typography fontSize={20} fontWeight="bolder" textAlign="center">
            Add Position
          </Typography>

          <Formik
            initialValues={{
              jobTitle: "",
              purposeOfJob: "",
              departmentId: "",
              reportingTo: "",
              remuneration: "",
              applicationsEmail: "",
              emailForQueries: "",
              jobSpecDocumentName: "",
              closingDate: "",
              qualifications: []
            }}
            validationSchema={Yup.object().shape({
              jobTitle: Yup.string().required("Job title required"),
              purposeOfJob: Yup.string().required("Purpose of job required"),
              departmentId: Yup.string().required("Please select deparment"),
              reportingTo: Yup.string().required("Line manager required"),
              applicationsEmail: Yup.string()
                .email("Invalid email format")
                .required("Email required"),
              emailForQueries: Yup.string()
                .email("Invalid email format")
                .required("Email required"),
              jobSpecDocumentName: Yup.string().required(
                "Please upload the job description document"
              ),
              closingDate: Yup.string().required("Closing date required")
            })}
            onSubmit={(values) => {
              const formData = new FormData();
              for (const [key, value] of Object.entries(values)) {
                if (key === "qualifications")
                  formData.append(key, JSON.stringify([...value]));
                else formData.append(key, value);
              }

              addPositionMutation.mutate(formData);
            }}
            enableReinitialize
          >
            {({ values, setFieldValue }) => {
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <TextFieldWrapper name="jobTitle" label="Job Title" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextAreaFieldWrapper
                        name="purposeOfJob"
                        label="Purpose Of Job"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <SelectFieldWrapper
                        name="departmentId"
                        label="Department"
                        options={departments}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextFieldWrapper
                        name="reportingTo"
                        label="Reporting To"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextFieldWrapper
                        name="remuneration"
                        label="Remuneration Package"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <InputLabel
                        sx={{ color: "warning.main", fontSize: 12, mb: 1 }}
                      >
                        If you don't have an email, please ask IT department to
                        create one for you before uploading the position.
                      </InputLabel>
                      <TextFieldWrapper
                        name="emailForQueries"
                        label="Email For Queries"
                        type="email"
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <TextFieldWrapper
                        name="applicationsEmail"
                        label="Email To Receive Applications"
                        type="email"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <DateTimePickerWrapper
                        name="closingDate"
                        label="Closing Date"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Field name="jobSpecDocumentName">
                        {({ field, form, meta }) => (
                          <TextField
                            type="file"
                            label="Position Job Description"
                            InputLabelProps={{
                              shrink: true
                            }}
                            error={meta.touched && meta.error}
                            helperText={
                              meta.touched && meta.error && meta.error
                            }
                            fullWidth
                            onChange={(event) => {
                              form.setFieldValue(
                                field.name,
                                event.currentTarget.files[0]
                              );
                            }}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <InputLabel>Is Any Qualification Required?</InputLabel>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mt={2}
                      >
                        <Box>
                          <Button
                            variant={isQualificationRequired && "contained"}
                            sx={{ mr: 2 }}
                            onClick={() => setIsQualificationRequired(true)}
                          >
                            Yes
                          </Button>
                          <Button
                            variant={!isQualificationRequired && "contained"}
                            onClick={() => setIsQualificationRequired(false)}
                          >
                            No
                          </Button>
                        </Box>
                        {isQualificationRequired && (
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                          >
                            <Typography fontSize={12} fontWeight="bolder">
                              Don't find qualification you looking for?
                            </Typography>
                            <AddQualificationModal />
                          </Stack>
                        )}
                      </Stack>
                    </Grid>

                    {isQualificationRequired && (
                      <Grid item xs={12} md={12}>
                        {qualifications?.length > 0 ? (
                          <Autocomplete
                            multiple
                            options={
                              qualifications?.length > 0 && qualifications
                            }
                            onChange={(e, value) => {
                              setFieldValue("qualifications", value);
                            }}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.label}
                            renderOption={(props, option, { selected }) => {
                              return (
                                <li {...props} key={option.id}>
                                  <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                  />
                                  {option.label}
                                </li>
                              );
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Qualification"
                                placeholder="Qualification"
                              />
                            )}
                          />
                        ) : (
                          <Alert variant="standard" color="info">
                            <Typography>
                              No Qualification Available Please Add
                              Qualifications To Select From
                            </Typography>
                          </Alert>
                        )}
                      </Grid>
                    )}

                    <Grid item xs={12} md={12}>
                      <Box textAlign="end">
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{ width: 200 }}
                        >
                          Submit
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AddEditPosition;
