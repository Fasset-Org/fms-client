import {
  Alert,
  Box,
  Button,
  Grid,
  InputLabel,
  Stack,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import BreadCrumbsHeader from "../../../components/BreadCrumbsHeader";
import { Field, Form, Formik } from "formik";
import TextFieldWrapper from "../../../components/FormComponents/TextFieldWrapper";
import TextAreaFieldWrapper from "../../../components/FormComponents/TextAreaFieldWrapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AdminQuery from "../../../stateQueries/Admin";
import SelectFieldWrapper from "../../../components/FormComponents/SelectFieldWrapper";
import AddPositionQuestion from "../../../components/Modals/AddPositionQuestion";
import AddQualificationModal from "../../../components/Modals/AddQualificationModal";
import UserQuery from "../../../stateQueries/User";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import * as Yup from "yup";
import AlertPopup from "../../../components/AlertPopup";
import { useNavigate, useParams } from "react-router-dom";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5)
}));

const EditPosition = () => {
  let departments = [];
  let qualifications = [];
  const [isQualificationRequired, setIsQualificationRequired] = useState(false);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const { positionId } = useParams();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const positionQuery = useQuery({
    queryKey: ["position", positionId],
    queryFn: async () => {
      return await UserQuery.HumanResourceQuery.getPositionById(positionId);
    },
    enabled: !!positionId
  });

  const position = positionQuery?.data?.position;

  let userQualifications = [];

  if (position?.PositionQualifications?.length > 0) {
    userQualifications = position.PositionQualifications.map(
      (positionQualification) => {
        return {
          value: positionQualification.Qualification.id,
          label: `${positionQualification.Qualification.qualificationLevel} in  ${positionQualification.Qualification.qualificationName}`
        };
      }
    );
  }

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
        navigate("/humanResource/currentPositions");
      }, 1000);
    }
  });

  if (data?.qualifications) {
    qualifications = [
      ...data?.qualifications?.map((qualification) => {
        return {
          value: qualification.id,
          label: `${qualification.qualificationLevel}  ${qualification.qualificationName}`
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
          { name: "Add/Edit Position", url: "/addEditPositiosn" }
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

      <Stack px={20}>
        <Stack spacing={2} padding={2} border={1}>
          <Typography fontSize={20} fontWeight="bolder" textAlign="center">
            Add Position
          </Typography>

          <Formik
            initialValues={{
              jobTitle: position?.jobTitle || "",
              purposeOfJob: position?.purposeOfJob || "",
              departmentId: position?.departmentId || "",
              reportingTo: position?.reportingTo || "",
              remuneration: position?.remuneration || "",
              applicationsEmail: position?.applicationsEmail || "",
              jobSpecDocumentName: position?.jobSpecDocumentName || "",
              qualifications: (userQualifications && userQualifications) || []
            }}
            validationSchema={Yup.object().shape({
              jobTitle: Yup.string().required("Job title required"),
              purposeOfJob: Yup.string().required("Purpose of job required"),
              departmentId: Yup.string().required("Please select deparment"),
              reportingTo: Yup.string().required("Line manager required"),
              applicationsEmail: Yup.string()
                .email("Invalid email format")
                .required("Email required"),
              jobSpecDocumentName: Yup.string().required(
                "Please upload the job description document"
              )
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
                        name="applicationsEmail"
                        label="Email To Receive Applications"
                        type="email"
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
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mt={2}
                      >
                        {!isQualificationRequired && (
                          <Box>
                            <Button
                              variant="contained"
                              sx={{ mr: 2 }}
                              onClick={() => setIsQualificationRequired(true)}
                            >
                              Edit Qualification
                            </Button>
                          </Box>
                        )}
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
                            defaultValue={
                              values.qualifications.length > 0
                                ? values.qualifications
                                : null
                            }
                            onChange={(e, value) => {
                              setFieldValue("qualifications", value);
                            }}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.label}
                            isOptionEqualToValue={(option, value) => {
                              return option.value === value.value;
                            }}
                            renderOption={(props, option, { selected }) => {
                              return (
                                <li {...props} key={option.value}>
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

                    {values.qualifications.length > 0 && (
                      <Grid item xs={12} md={12}>
                        <Paper
                          sx={{
                            display: "flex",
                            justifyContent: "start",
                            flexWrap: "wrap",
                            listStyle: "none",
                            p: 0.5,
                            m: 0
                          }}
                          component="ul"
                        >
                          {values.qualifications.length > 0 &&
                            values.qualifications.map((data) => {
                              return (
                                <ListItem key={data.key}>
                                  <Chip label={data.label} />
                                </ListItem>
                              );
                            })}
                        </Paper>
                      </Grid>
                    )}

                    <Grid item xs={12} md={12}>
                      <Box textAlign="end">
                        <AddPositionQuestion positionId={position?.id} />
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Box textAlign="end">
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{ width: 217 }}
                        >
                          Update
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

export default EditPosition;
