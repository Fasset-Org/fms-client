import {
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
} from "@mui/material";
import React from "react";
import AddEditUserModal from "../../components/Modals/AddEditUserModal";
import { useQuery } from "@tanstack/react-query";
import AdminQuery from "../../stateQueries/Admin";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import BreadCrumbsHeader from "../../components/BreadCrumbsHeader";
import { DeleteUserModal } from "../../components/Modals/DeleteUserModal";

const Users = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return await AdminQuery.getAllUsers();
    },
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
          { name: "Users", url: "/users" },
        ]}
        sx={{ mb: 2, width: "100%" }}
      />
      <AddEditUserModal />
      {data && data?.users && (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: "background.paper" }}>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Email
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  UserName
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  FullName
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  UserType
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.users.map((user) => {
                return (
                  <TableRow>
                    <TableCell align="center" component="th" scope="row">
                      {user.email}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {user.userName}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {user.fullName}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {user.userType}
                    </TableCell>

                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={2}
                        // border={1}
                        justifyContent="center"
                      >
                        <AddEditUserModal user={user} />
                        <DeleteUserModal  id={user.id} />
                        
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
                      "aria-label": "rows per page",
                    },
                    native: true,
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
    </Stack>
  );
};

export default Users;
