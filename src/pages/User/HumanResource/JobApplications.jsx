import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Stack
} from "@mui/material";
import React, { useEffect, useState } from "react";
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

  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [applications, setApplications] = useState([]);
  const [selectValue, setSelectValue] = useState("");

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  const filterOptions = [
    {
      value: "",
      label: "None"
    },
    {
      value: "submitted",
      label: "Submitted"
    },
    {
      value: "shortlisted",
      label: "ShortListed"
    },
    {
      value: "rejected",
      label: "Rejected"
    }
  ];

  const { data, isLoading, isError } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      return await UserQuery.HumanResourceQuery.getPositionApplications(
        positionId
      );
    },
    enabled: !!positionId
  });

  console.log(data?.applications);

  const { data: applicationData, isLoading: loading } = useQuery({
    queryKey: ["position"],
    queryFn: async () => {
      return await UserQuery.HumanResourceQuery.getPositionById(positionId);
    },
    enabled: !!positionId
  });

  console.log(applicationData?.position?.PositionQuestions[0]?.question);

  let positionQuestions = [];

  if (applicationData?.position?.PositionQuestions?.length > 0) {
    for (const question of applicationData?.position?.PositionQuestions) {
      positionQuestions.push({
        field: question.question,
        headerName: question.question,
        editable: true
      });
    }
  }

  const ActionButtons = ({ params }) => {
    return (
      <Stack
        direction="row"
        spacing={2}
        // border={1}
        justifyContent="center"
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
    { field: "idNumber", headerName: "ID" },
    {
      field: "fullname",
      headerName: "Full Name",
      editable: true
    },
    {
      field: "email",
      headerName: "Email",
      editable: true
    },
    {
      field: "gender",
      headerName: "Gender",
      editable: true
    },
    {
      field: "nationality",
      headerName: "Nationality",
      editable: true
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
      renderCell: (params) => <ActionButtons params={params} />
    }
  ];

  const handleFilter = (filterValue) => {
    setApplications(data?.applications);
    if (filterValue !== "") {
      setApplications((prevApplications) => {
        return prevApplications.filter(
          (option) => option.status === filterValue
        );
      });
    }
  };

  useEffect(() => {
    if (!isLoading && !isError) {
      setApplications(data?.applications);
    }
  }, [data?.applications, isError, isLoading]);

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
      <Stack direction="row" width="100%" alignItems="center" spacing={2}>
        <Box width="80%">
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
                handleFilter(e.target.value);
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
        </Box>

        <RejectAllApplicationModal position={applicationData.position} />
      </Stack>

      <Box sx={{ height: 400, width: "100%", overflowX: "auto" }}>
        <DataGrid
          rows={data?.applications}
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
            // "--DataGrid-overlayHeight": "300px",
            height: 400,
            width: "100%",
            overflowX: "auto"
          }}
        />
      </Box>

      {/* <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead sx={{ backgroundColor: "background.paper" }}>
            <TableRow>
              <TableCell
                align="center"
                sx={{ fontWeight: "bolder", fontSize: 12 }}
              >
                Fullname
              </TableCell>
            
              <TableCell
                align="center"
                sx={{ fontWeight: "bolder", fontSize: 12 }}
              >
                Gender
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bolder", fontSize: 12 }}
              >
                Nationality
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bolder", fontSize: 12 }}
              >
                Id/Passport Number
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                Contact Number
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                Date Submitted
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bolder", fontSize: 12 }}
              >
                Status
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bolder", fontSize: 12 }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? applications?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : applications
            )?.map((application, i) => {
              return (
                <TableRow key={application.id}>
                  <TableCell
                    align="center"
                    component="th"
                    scope="row"
                    sx={{ fontSize: 12 }}
                  >
                    {application.fullname}
                  </TableCell>
                  
                  <TableCell
                    align="center"
                    component="th"
                    scope="row"
                    sx={{ fontSize: 12 }}
                  >
                    {application.gender}
                  </TableCell>
                  <TableCell
                    align="center"
                    component="th"
                    scope="row"
                    sx={{ fontSize: 12 }}
                  >
                    {application.nationality}
                  </TableCell>
                  <TableCell
                    align="center"
                    component="th"
                    scope="row"
                    sx={{ fontSize: 12 }}
                  >
                    {application.idNumber}
                  </TableCell>
                  <TableCell
                    align="center"
                    component="th"
                    scope="row"
                    sx={{ fontSize: 12 }}
                  >
                    {application.cellphone}
                  </TableCell>
                  <TableCell
                    align="center"
                    component="th"
                    scope="row"
                    sx={{ fontSize: 12 }}
                  >
                    {application.createdAt}
                  </TableCell>
                  <TableCell
                    align="center"
                    component="th"
                    scope="row"
                    sx={{ fontSize: 12 }}
                  >
                    <Chip
                      color={
                        application.status === "submitted"
                          ? "primary"
                          : application.status === "shortlisted"
                          ? "success"
                          : "error"
                      }
                      label={
                        application.status === "submitted"
                          ? "submitted"
                          : application.status === "shortlisted"
                          ? "shortlisted"
                          : "rejected"
                      }
                    />
                  </TableCell>

                  <TableCell align="center">
                    <Stack
                      direction="row"
                      spacing={2}
                      // border={1}
                      justifyContent="center"
                    >
                      <Button
                        variant="outlined"
                        sx={{ fontSize: 10, width: 70 }}
                        onClick={() => {
                          navigate(
                            `/humanResource/jobApplications/${positionId}/viewApplication/${application.id}`
                          );
                        }}
                      >
                        View
                      </Button>
                      <ShortListModal application={application} />
                      <RejectApplicationModal application={application} />
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          {applications?.length > 0 && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  // colSpan={3}
                  count={applications?.length || 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page"
                    },
                    native: true
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          )}
        </Table>
        {(!applications || applications?.length === 0) && (
          <Stack width="100%" padding={2}>
            <CustomNoRowsOverlay description="No Application Made So far" />
          </Stack>
        )}
      </TableContainer> */}
    </Stack>
  );
};

export default JobApplications;
