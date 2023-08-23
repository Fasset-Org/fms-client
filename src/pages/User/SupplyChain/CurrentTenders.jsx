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
  TableRow
} from "@mui/material";
import React from "react";
import AddEditTenderModal from "../../../components/Modals/AddEditTenderModal";
import { useQuery } from "@tanstack/react-query";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import UserQuery from "../../../stateQueries/User";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BreadCrumbsHeader from "../../../components/BreadCrumbsHeader";

const CurrentTenders = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const { data, isLoading } = useQuery({
    queryKey: ["currentTenders"],
    queryFn: async () => {
      return await UserQuery.SCMQuery.getAllCurrentTenders();
    }
  });

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

  console.log(data)

  return (
    <Stack justifyContent="center" alignItems="center" spacing={2}>
      <BreadCrumbsHeader
        title="Welcome back Tiyisela Themba Makamu"
        menus={[
          { name: "Dashboard", url: "/dashboard" },
          { name: "Supply Chain", url: "/scm" },
          { name: "Current Tenders", url: "/currentTenders" }
        ]}
        sx={{ mb: 2, width: "100%" }}
      />
      <AddEditTenderModal />

      {data?.currentTenders.length > 0 && (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: "background.paper" }}>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Tender Name
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Tender Reference
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Tender Closing Date
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Tender Status
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.currentTenders?.map((tender) => {
                return (
                  <TableRow>
                    <TableCell align="center" component="th" scope="row">
                      {tender.tenderName}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {tender.tenderReference}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {tender.closingDate}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      <Chip color="success" label="active" />
                    </TableCell>

                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={2}
                        // border={1}
                        justifyContent="center"
                      >
                        <AddEditTenderModal tender={tender} />
                        <IconButton color="error">
                          <DeleteForeverIcon />
                        </IconButton>
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
      )}
    </Stack>
  );
};

export default CurrentTenders;
