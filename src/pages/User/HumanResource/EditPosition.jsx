import {
  AccordionDetails,
  Alert,
  Box,
  Button,
  CircularProgress,
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
import { useParams } from "react-router-dom";
import DateTimePickerWrapper from "../../../components/FormComponents/DateTimePickerWrapper";
import { DeleteQuestionModal } from "../../../components/Modals/DeleteQuestionModal";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import dayjs from "dayjs";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5)
}));

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 5,
  "&:before": {
    display: "none"
  }
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)"
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1)
  }
}));

const EditPosition = () => {
  let departments = [];
  let qualifications = [];
  const [isQualificationRequired, setIsQualificationRequired] = useState(false);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const { positionId } = useParams();
  const [expanded, setExpanded] = React.useState(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

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

  const editPositionMutation = useMutation({
    mutationFn: async (formData) => {
      return await UserQuery.HumanResourceQuery.editPosition(formData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("position");
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
          { name: "Edit Position", url: "/editPositiosn" }
        ]}
        sx={{ mb: 2, width: "100%" }}
      />
      {editPositionMutation.isError && (
        <AlertPopup
          open={true}
          message={
            editPositionMutation.error?.response?.data?.message ||
            "Server Error"
          }
          severity="error"
        />
      )}
      {editPositionMutation.isSuccess && (
        <AlertPopup open={true} message={editPositionMutation.data?.message} />
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
              positionId: positionId || "",
              jobTitle: position?.jobTitle || "",
              purposeOfJob: position?.purposeOfJob || "",
              departmentId: position?.departmentId || "",
              reportingTo: position?.reportingTo || "",
              remuneration: position?.remuneration || "",
              applicationsEmail: position?.applicationsEmail || "",
              jobSpecDocumentName: position?.jobSpecDocumentName || "",
              closingDate: dayjs(position?.closingDate) || "",
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

              editPositionMutation.mutate(formData);
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
                            // inputProps={{
                            //   accept:
                            //     ".doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            // }}
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
                        {qualifications?.length &&
                        qualifications?.length > 0 ? (
                          <Autocomplete
                            multiple
                            options={qualifications && qualifications}
                            defaultValue={
                              values.qualifications
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
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        mb={2}
                        alignItems="center"
                      >
                        <InputLabel sx={{ fontWeight: "bolder" }}>
                          Additional Questions
                        </InputLabel>

                        <Box textAlign="end">
                          <AddPositionQuestion positionId={position?.id} />
                        </Box>
                      </Stack>

                      {position?.PositionQuestions?.length > 0 ? (
                        <Paper sx={{ padding: 2 }}>
                          <Stack spacing={2}>
                            {position?.PositionQuestions?.map((question, i) => {
                              return (
                                <Accordion
                                  expanded={expanded === i}
                                  onChange={handleChange(i)}
                                  TransitionProps={{ unmountOnExit: true }}
                                  key={i}
                                >
                                  <AccordionSummary
                                    aria-controls="panel1d-content"
                                    id="panel1d-header"
                                  >
                                    <Stack
                                      direction="row"
                                      justifyContent="space-between"
                                      width="100%"
                                      alignItems="center"
                                    >
                                      <Typography>
                                        {question.question}
                                      </Typography>
                                      <DeleteQuestionModal id={question.id} />
                                    </Stack>
                                  </AccordionSummary>
                                  <AccordionDetails>
                                    <Typography>
                                      {`Expected Answer : ${
                                        question.expectedAnswer
                                          ? question.expectedAnswer
                                          : "No Provided"
                                      }`}
                                    </Typography>
                                  </AccordionDetails>
                                </Accordion>
                              );
                            })}
                          </Stack>
                        </Paper>
                      ) : (
                        <Typography>No Additional Questions</Typography>
                      )}
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Box textAlign="end">
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{ width: 217 }}
                        >
                          {editPositionMutation.isLoading ? (
                            <CircularProgress color="secondary" />
                          ) : (
                            "Update"
                          )}
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
