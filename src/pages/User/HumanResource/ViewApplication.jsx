import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import React from "react";
import BreadCrumbsHeader from "../../../components/BreadCrumbsHeader";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import UserQuery from "../../../stateQueries/User";
import { Form, Formik } from "formik";
import TextFieldWrapper from "../../../components/FormComponents/TextFieldWrapper";
import { ShortListModal } from "../../../components/Modals/ShortListModal";
import { RejectApplicationModal } from "../../../components/Modals/RejectApplicationModal";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ViewApplication = () => {
  const { positionId, applicationId } = useParams();
  const [expanded, setExpanded] = React.useState(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["application"],
    queryFn: async () => {
      return await UserQuery.HumanResourceQuery.getApplicationById(
        positionId,
        applicationId
      );
    },
    enabled: !!positionId && !!applicationId
  });

  console.log(data);

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <Stack justifyContent="center" alignItems="center" spacing={2}>
      <BreadCrumbsHeader
        title="Welcome back Tiyisela Themba Makamu"
        menus={[
          { name: "Dashboard", url: "/dashboard" },
          { name: "Human Resource", url: "/humanResource" },
          { name: "Job Applications", url: "/jobApplications" }
        ]}
        sx={{ mb: 2, width: "100%" }}
      />
      <Stack component={Paper} width="70%" m="auto" padding={2} spacing={2}>
        <Typography textAlign="center" mb={2} fontSize={20}>
          {data?.application.firstName} {data?.application?.lastName}'s
          application
        </Typography>
        <Formik
          initialValues={{
            firstName: data?.application?.firstName || "",
            lastName: data?.application?.lastName || "",
            email: data?.application.email || "",
            nationality: data?.application.nationality || "",
            idNumber: data?.application.idNumber || "",
            gender: data?.application.gender || "",
            cellphone: data?.application.cellphone || "",
            idDcumentName: data?.application.idDocumentName,
            matricDocumentName: data?.application.matricDocumentName,
            qualificationDocumentName:
              data?.application.qualificationDocumentName,
            resumeDocumentName: data?.application.resumeDocumentName
          }}
          enableReinitialize
        >
          {(values) => {
            return (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <TextFieldWrapper
                      fullWidth
                      label="First Name"
                      name="firstName"
                      disabled
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <TextFieldWrapper
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      disabled
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <TextFieldWrapper
                      fullWidth
                      label="Email"
                      name="email"
                      disabled
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <TextFieldWrapper
                      // fullWidth
                      label="Nationality"
                      name="nationality"
                      disabled
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <TextFieldWrapper
                      fullWidth
                      label="Identification/Passport Number"
                      name="idNumber"
                      disabled
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <TextFieldWrapper
                      fullWidth
                      label="Gender"
                      name="gender"
                      disabled
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <TextFieldWrapper
                      fullWidth
                      label="Cellphone"
                      name="cellphone"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <TextFieldWrapper
                      name="idDcumentName"
                      label="Id/Passport Copy"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <Button
                      variant="outlined"
                      sx={{ height: "100%" }}
                      fullWidth
                    >
                      <a
                        href={`${process.env.REACT_APP_API_URL}/api/dev/humanResource/downloadApplicationDocument?email=${data?.application.email}&positionId=${data?.application.positionId}&filename=${data?.application?.idDocumentName}`}
                        download
                        target="_blank"
                        rel="noreferrer"
                        style={{ all: "unset" }}
                      >
                        Download ID
                      </a>
                    </Button>
                  </Grid>

                  <Grid item xs={8} md={8}>
                    <TextFieldWrapper
                      name="matricDocumentName"
                      label="Matric Copy"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <Button
                      variant="outlined"
                      sx={{ height: "100%" }}
                      fullWidth
                    >
                      <a
                        href={`${process.env.REACT_APP_API_URL}/api/dev/humanResource/downloadApplicationDocument?email=${data?.application.email}&positionId=${data?.application.positionId}&filename=${data?.application?.matricDocumentName}`}
                        download
                        target="_blank"
                        rel="noreferrer"
                        style={{ all: "unset" }}
                      >
                        Download Matric
                      </a>
                    </Button>
                  </Grid>

                  <Grid item xs={8} md={8}>
                    <TextFieldWrapper
                      name="qualificationDocumentName"
                      label="Highest Qualification Copy"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <Button
                      variant="outlined"
                      sx={{ height: "100%" }}
                      fullWidth
                    >
                      <a
                        href={`${process.env.REACT_APP_API_URL}/api/dev/humanResource/downloadApplicationDocument?email=${data?.application.email}&positionId=${data?.application.positionId}&filename=${data?.application?.qualificationDocumentName}`}
                        download
                        target="_blank"
                        rel="noreferrer"
                        style={{ all: "unset" }}
                      >
                        Download Qualification
                      </a>
                    </Button>
                  </Grid>

                  <Grid item xs={8} md={8}>
                    <TextFieldWrapper
                      name="resumeDocumentName"
                      label="Resume Copy"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <Button
                      variant="outlined"
                      sx={{ height: "100%" }}
                      fullWidth
                    >
                      <a
                        href={`${process.env.REACT_APP_API_URL}/api/dev/humanResource/downloadApplicationDocument?email=${data?.application.email}&positionId=${data?.application.positionId}&filename=${data?.application?.resumeDocumentName}`}
                        download
                        target="_blank"
                        rel="noreferrer"
                        style={{ all: "unset" }}
                      >
                        Download Resume
                      </a>
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>

        <Stack spacing={2}>
          <Paper sx={{ padding: 2 }}>
            <Stack spacing={2}>
              {data?.application?.ApplicationAnswers?.map(
                (applicationAnswer, i) => {
                  return (
                    <Accordion
                      expanded={expanded === i}
                      onChange={handleChange(i)}
                      TransitionProps={{ unmountOnExit: true }}
                      key={i}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
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
                            {applicationAnswer.PositionQuestion.question}
                          </Typography>
                          {/* <DeleteQuestionModal id={question.id} /> */}
                        </Stack>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          {`Expected : ${
                            applicationAnswer.PositionQuestion.expectedAnswer
                              ? applicationAnswer.PositionQuestion
                                  .expectedAnswer
                              : "Not Provided"
                          }`}
                        </Typography>
                        <Typography>{`Answer : ${
                          applicationAnswer.answer
                            ? applicationAnswer.answer
                            : "No Answer"
                        }`}</Typography>
                      </AccordionDetails>
                    </Accordion>
                  );
                }
              )}
            </Stack>
          </Paper>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          width="100%"
        >
          <ShortListModal application={data?.application} width={200} />
          <RejectApplicationModal application={data?.application} width={200} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ViewApplication;
