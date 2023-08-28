import {
  Chip,
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
import { useQuery } from "@tanstack/react-query";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import UserQuery from "../../../stateQueries/User";
import BreadCrumbsHeader from "../../../components/BreadCrumbsHeader";
import AddEditTenderModal from "../../../components/Modals/AddEditTenderModal";
import { DeleteConfirmModal } from "../../../components/Modals/DeleteComfirmModal";

const PreviousTenders = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const { data, isLoading } = useQuery({
    queryKey: ["previousTenders"],
    queryFn: async () => {
      return await UserQuery.SCMQuery.getAllPreviousTenders();
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

  return (
    <Stack justifyContent="center" alignItems="center" spacing={2}>
      <BreadCrumbsHeader
        title="Welcome back Tiyisela Themba Makamu"
        menus={[
          { name: "Dashboard", url: "/dashboard" },
          { name: "Supply Chain", url: "/scm" },
          { name: "Previous Tenders", url: "/previousTenders" }
        ]}
        sx={{ mb: 2, width: "100%" }}
      />
      <Typography sx={{ color: "error.main" }}>
        To submit tender as new one, change the closing date when editing
      </Typography>
      {data?.previousTenders?.length > 0 && (
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
              {data?.previousTenders?.map((tender) => {
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
                      <Chip color="warning" label="past" />
                    </TableCell>

                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                      >
                        <AddEditTenderModal tender={tender} />
                        <DeleteConfirmModal />
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

export default PreviousTenders;
