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
import { useQuery } from "@tanstack/react-query";
import AdminQuery from "../../stateQueries/Admin";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import AddEditModuleModal from "../../components/Modals/AddEditModuleModal";
import BreadCrumbsHeader from "../../components/BreadCrumbsHeader";

const Modules = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["modules"],
    queryFn: async () => {
      return await AdminQuery.getAllModules();
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
          { name: "Modules", url: "/modules" }
        ]}
        sx={{ mb: 2, width: "100%" }}
      />
      <AddEditModuleModal />
      <Box sx={{ height: 350, width: "100%" }}>
        {data && data?.modules && (
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
                {data?.modules.map((module, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell align="center" component="th" scope="row">
                        {module.moduleName}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {module.moduleDesc}
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

export default Modules;
