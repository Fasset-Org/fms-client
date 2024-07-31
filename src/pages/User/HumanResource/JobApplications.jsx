import {
  Box,
  Button,
  Chip,
  LinearProgress,
  Stack,
  Typography
} from "@mui/material";
import React from "react";
import BreadCrumbsHeader from "../../../components/BreadCrumbsHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import UserQuery from "../../../stateQueries/User";
import { RejectAllApplicationModal } from "../../../components/Modals/RejectAllApplicationModal";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CustomNoRowsGridOverlay from "../../../components/CustomNoRowsGridOverlay";
import { ShortListModal } from "../../../components/Modals/ShortListModal";
import { RejectApplicationModal } from "../../../components/Modals/RejectApplicationModal";

const JobApplications = () => {
  const { positionId } = useParams();
  const navigate = useNavigate();


  const { data, isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      return await UserQuery.HumanResourceQuery.getPositionApplications(
        positionId
      );
    },
    enabled: !!positionId
  });

  const { data: applicationData, isLoading: loading } = useQuery({
    queryKey: ["position"],
    queryFn: async () => {
      return await UserQuery.HumanResourceQuery.getPositionById(positionId);
    },
    enabled: !!positionId
  });

  const getApplicationQuestion = (id) => {
    const question = applicationData?.position?.PositionQuestions?.find(
      (positionQuestion) => {
        return positionQuestion.id === id;
      }
    );

    return question?.question;
  };

  const compareAnswer = (answer, id) => {
    const question = applicationData?.position?.PositionQuestions?.find(
      (positionQuestion) => {
        return positionQuestion.id === id;
      }
    );

    // console.log(question)

    return answer >= question?.answer || answer === question?.answer
      ? true
      : false;
  };

  let positionQuestions = [];
  let applications = [];

  if (applicationData?.position?.PositionQuestions?.length > 0) {
    for (const question of applicationData?.position?.PositionQuestions) {
      positionQuestions.push({
        field: question.question,
        headerName: question.question,
        editable: true
      });
    }

    if (data?.applications?.length > 0) {
      for (const application of data?.applications) {
        let positionQuestionAnswers = {};

        for (const answer of application?.ApplicationAnswers) {
          Object.assign(positionQuestionAnswers, {
            [getApplicationQuestion(answer.positionQuestionId)]: answer.answer
          });
        }

        applications.push({ ...application, ...positionQuestionAnswers });
      }
    }
  }

  console.log(data?.applications)

  const ActionButtons = ({ params }) => {
    return (
      <Stack
        direction="row"
        spacing={2}
        // border={1}
        justifyContent="center"
        // border={1}
      >
        <Button
          variant="outlined"
          sx={{ fontSize: 10, width: 70 }}
          onClick={() => {
            navigate(
              `/humanResource/jobApplications/${positionId}/viewApplication/${params.row.id}`
            );
          }}
        >
          View
        </Button>
        <ShortListModal application={params.row} />
        <RejectApplicationModal application={params.row} />
      </Stack>
    );
  };

  const columns = [
    { field: "idNumber", headerName: "ID/Passport Number" },
    {
      field: "firstName",
      headerName: "First Name",
      editable: true
    },
    {
      field: "lastName",
      headerName: "Last Name",
      editable: true
    },
    {
      field: "email",
      headerName: "Email",
      editable: true,
      hide: true
    },
    {
      field: "gender",
      headerName: "Gender",
      editable: true,
      hide: true
    },
    {
      field: "nationality",
      headerName: "Nationality",
      editable: true,
      hide: true
    },
    ...positionQuestions,
    {
      field: "status",
      headerName: "Status",
      sortable: false,
      renderCell: (params) => (
        <Chip
          color={
            params.row.status === "submitted"
              ? "primary"
              : params.row.status === "shortlisted"
              ? "success"
              : "error"
          }
          label={
            params.row.status === "submitted"
              ? "submitted"
              : params.row.status === "shortlisted"
              ? "shortlisted"
              : "rejected"
          }
        />
      )
    },
    {
      // field: "action",
      headerName: "Action",
      sortable: false,
      width: 260,
      headerAlign: "center",
      cellAlign: "center",
      renderCell: (params) => <ActionButtons params={params} />
    }
  ];

  if (isLoading || loading) {
    return <LinearProgress />;
  }

  return (
    <Stack justifyContent="center" alignItems="center" spacing={2}>
      <BreadCrumbsHeader
        title="Welcome back Tiyisela Themba Makamu"
        menus={[
          { name: "Dashboard", url: "/dashboard" },
          { name: "Human Resource", url: "/humanResource" },
          { name: "Job Applications", url: "/jobApplications" },
          { name: applicationData?.position?.jobTitle, url: `` }
        ]}
        sx={{ mb: 2, width: "100%" }}
      />
      <Stack
        direction="row"
        width="100%"
        alignItems="center"
        spacing={2}
        justifyContent="space-between"
      >
        <Typography
          sx={{ fontSize: 20, fontWeight: "bolder", color: "primary.main" }}
        >
          {applicationData?.position?.jobTitle} {"Applications"}
        </Typography>
        {/* <Box width="80%">
          <FormControl fullWidth>
            <InputLabel id="select">Select Filter</InputLabel>
            <Select
              labelId="select"
              id="select_id"
              fullWidth
              label="Select Filter"
              value={selectValue}
              onChange={(e) => {
                setSelectValue(e.target.value);
                // handleFilter(e.target.value);
              }}
            >
              {filterOptions.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box> */}

        <RejectAllApplicationModal position={applicationData.position} />
      </Stack>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={applications.length > 0 && applications}
          columns={columns}
          autoHeight
          autoHeightMax={400}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5
              }
            }
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          slots={{
            noRowsOverlay: CustomNoRowsGridOverlay,
            toolbar: GridToolbar
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true
            }
          }}
          sx={{
            "--DataGrid-overlayHeight": "250px",
            height: 400,
            width: "100%",
            // boxShadow: 2,
            // border: 1,
            // borderColor: "primary.light",
            // "& .MuiDataGrid-cell:hover": {
            //   color: "primary.main"
            // },
            "& .warning": {
              // border: 1,
              // borderColor: "warning.main",
              // color: 'warning.main'
            }
          }}
          getRowClassName={(params) => {
            const applicationAnswers = params.row.ApplicationAnswers;

            let bool = false;

            for (const applicationAnswer of applicationAnswers) {
              if (
                !compareAnswer(applicationAnswer.answer, applicationAnswer.id)
              ) {
                bool = true;
              }
            }

            return bool && "warning";
          }}
        />
      </Box>
    </Stack>
  );
};

export default JobApplications;
