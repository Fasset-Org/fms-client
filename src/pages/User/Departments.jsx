import {
  Box,
  Button,
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
  TableRow
} from "@mui/material";
import React from "react";
import AddEditDepartment from "../../components/Modals/AddEditDepartment";
import { useQuery } from "@tanstack/react-query";
import AdminQuery from "../../stateQueries/Admin";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import BreadCrumbsHeader from "../../components/BreadCrumbsHeader";

const Departments = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      return await AdminQuery.getAllDepartments();
    }
  });

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <Stack justifyContent="center" alignItems="center" spacing={2}>
      <BreadCrumbsHeader
        title="Welcome back Tiyisela Themba Makamu"
        menus={[
          { name: "Dashboard", url: "/dashboard" },
          { name: "User Management", url: "/userManagement" },
          { name: "Departments", url: "/departments" }
        ]}
        sx={{ mb: 2, width: "100%" }}
      />
      <AddEditDepartment />
      <Box sx={{ height: 350, width: "100%" }}>
        {data && data?.departments && (
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead sx={{ backgroundColor: "background.paper" }}>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                    Department Name
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                    Department Description
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.departments.map((department) => {
                  return (
                    <TableRow>
                      <TableCell align="center" component="th" scope="row">
                        {department.departmentName}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {department.departmentDesc}
                      </TableCell>

                      <TableCell align="center">
                        <Stack
                          direction="row"
                          spacing={2}
                          // border={1}
                          justifyContent="center"
                        >
                          {/* <Button variant="outlined">View</Button> */}
                          <Button variant="contained">Edit</Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 }
                    ]}
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
        )}
      </Box>
    </Stack>
  );
};

export default Departments;
