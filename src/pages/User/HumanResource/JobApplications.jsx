import {
  Alert,
  Button,
  Chip,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow
} from "@mui/material";
import React from "react";
import BreadCrumbsHeader from "../../../components/BreadCrumbsHeader";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import UserQuery from "../../../stateQueries/User";
import { RejectApplicationModal } from "../../../components/Modals/RejectApplicationModal";

const JobApplications = () => {
  const { positionId } = useParams();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filterOptions = [
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

  const { data, isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      return await UserQuery.getPositionApplications(positionId);
    },
    enabled: !!positionId
  });

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
      <FormControl fullWidth>
        <InputLabel id="select">Select Filter</InputLabel>
        <Select labelId="select" id="select_id" fullWidth label="Select Filter">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {filterOptions.map((item, index) => {
            return (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      {data?.applications?.length > 0 ? (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: "background.paper" }}>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Fullname
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Email
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Gender
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Nationality
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Id/Passport Number
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Contact Number
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Application Status
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.applications?.map((application) => {
                return (
                  <TableRow key={application.id}>
                    <TableCell align="center" component="th" scope="row">
                      {application.fullname}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {application.email}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {application.gender}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {application.nationality}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {application.idNumber}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {application.cellphone}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      <Chip color="success" label="submitted" />
                    </TableCell>

                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={2}
                        // border={1}
                        justifyContent="center"
                      >
                        <Button sx={{ fontSize: 12 }}>View</Button>
                        <Button sx={{ fontSize: 12 }} color="success">
                          Short List
                        </Button>
                        <RejectApplicationModal />
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  // colSpan={3}
                  count={data?.departments?.length || 0}
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
          </Table>
        </TableContainer>
      ) : (
        <Alert severity="info">No Applications Available</Alert>
      )}
    </Stack>
  );
};

export default JobApplications;
