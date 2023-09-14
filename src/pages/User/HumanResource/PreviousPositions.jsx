import {
  Chip,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from "@mui/material";
import React from "react";
import BreadCrumbsHeader from "../../../components/BreadCrumbsHeader";
import { useQuery } from "@tanstack/react-query";
import UserQuery from "../../../stateQueries/User";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { DeletePositionModal } from "../../../components/Modals/DeletePositionModal";

const PreviousPositions = () => {
  const navigate = useNavigate();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["previousPositions"],
    queryFn: async () => {
      return await UserQuery.HumanResourceQuery.getAllPreviousPositions();
    }
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
          { name: "Previous Positions", url: "/previousPositions" }
        ]}
        sx={{ mb: 2, width: "100%" }}
      />
      {data?.positions?.length > 0 ? (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: "background.paper" }}>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Job Title
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Department
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Line Manager
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Closing Date
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Status
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.positions?.map((position) => {
                return (
                  <TableRow>
                    <TableCell align="center" component="th" scope="row">
                      {position.jobTitle}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {position.Department?.departmentName}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {position.reportingTo}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {`${new Date(position.closingDate).toDateString()} @ ${
                        new Date(position.closingDate).getHours() > 11
                          ? new Date(position.closingDate).getHours() +
                            ":" +
                            new Date(position.closingDate).getMinutes() +
                            "PM"
                          : new Date(position.closingDate).getHours() +
                            ":" +
                            new Date(position.closingDate).getMinutes() +
                            "AM"
                      }`}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      <Chip color="error" label="closed" />
                    </TableCell>

                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={2}
                        // border={1}
                        justifyContent="center"
                      >
                        <IconButton
                          color="secondary"
                          onClick={() =>
                            navigate(
                              `/humanResource/editPreviousPosition/${position.id}`
                            )
                          }
                        >
                          <EditIcon />
                        </IconButton>
                        <DeletePositionModal id={position.id} />
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
        <Stack width="100%">
          <Stack
            sx={{
              height: 60,
              border: 1,
              borderColor: "primary.main",
              padding: 2,
              borderRadius: 2
            }}
            component={Paper}
            justifyContent="center"
          >
            <Typography fontWeight="bolder">
              No Closed Positions Available
            </Typography>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default PreviousPositions;
