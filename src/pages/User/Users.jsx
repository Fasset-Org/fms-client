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
  TableRow
} from "@mui/material";
import React from "react";
import AddEditUserModal from "../../components/Modals/AddEditUserModal";
import { useQuery } from "@tanstack/react-query";
import AdminQuery from "../../stateQueries/Admin";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import BreadCrumbsHeader from "../../components/BreadCrumbsHeader";
import CustomNoRowsOverlay from "../../components/CustomNoRowsOverlay";

const Users = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return await AdminQuery.getAllUsers();
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
          { name: "Users", url: "/users" }
        ]}
        sx={{ mb: 2, width: "100%" }}
      />
      <AddEditUserModal />

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
            {(rowsPerPage > 0
              ? data?.users?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : data?.users
            )?.map((user) => {
              return (
                <TableRow key={user.id}>
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
                      {/* <Button variant="outlined">View</Button> */}
                      {/* <Button variant="contained">Edit</Button> */}
                      <AddEditUserModal user={user} />
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          {data?.users?.length > 0 && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  // colSpan={3}
                  count={data?.users?.length || 0}
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
        {(!data?.users || data?.users?.length === 0) && (
          <Stack width="100%" padding={2}>
            <CustomNoRowsOverlay description="No Users Available" />
          </Stack>
        )}
      </TableContainer>
    </Stack>
  );
};

export default Users;

// export default function Users() {
//   const { data, isLoading } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       return await AdminQuery.getAllUsers();
//     }
//   });

//   console.log(data?.users);

//   const columns = [
//     {
//       field: "email",
//       headerName: "User Email",
//       textAlign: "center",
//       width: 300
//     },
//     {
//       field: "userName",
//       headerName: "UserName",
//       textAlign: "center",
//       width: 200
//     },
//     {
//       field: "fullName",
//       headerName: "FullName",
//       textAlign: "center",
//       width: 200
//     },
//     {
//       field: "userType",
//       headerName: "User Type",
//       textAlign: "center",
//       width: 200
//     }
//   ];

//   return (
//     <Stack spacing={2} alignItems="center">
//       <AddEditUserModal />
//       <Box sx={{ height: 400, width: "100%" }}>
//         <DataGrid
//           rows={data ? data?.users : []}
//           sx={{ "--DataGrid-overlayHeight": "300px" }}
//           disableColumnSelector
//           disableDensitySelector
//           columns={columns}
//           slots={{ toolbar: GridToolbar, noRowsOverlay: CustomNoRowsOverlay }}
//           slotProps={{
//             toolbar: {
//               showQuickFilter: true
//             }
//           }}
//         />
//       </Box>
//     </Stack>
//   );
// }
