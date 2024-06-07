import {
  LinearProgress,
  Link,
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
import BreadCrumbsHeader from "../../../components/BreadCrumbsHeader";
import AddEditAnnualReportsModal from "../../../components/Modals/AddEditAnnualReportsModal";
import { useQuery } from "@tanstack/react-query";
import UserQuery from "../../../stateQueries/User";
import CustomNoRowsOverlay from "../../../components/CustomNoRowsOverlay";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { DeleteAnnualReportConfirmModal } from "../../../components/Modals/DeleteAnnualReportConfirmModal";

const AnnualReports = () => {
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
    queryKey: ["anuualReports"],
    queryFn: async () => {
      return UserQuery.CSEQuery.getAllAnnualeports();
    }
  });

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <Stack spacing={2}>
      <BreadCrumbsHeader
        title="Welcome back Tiyisela Themba Makamu"
        menus={[
          { name: "Dashboard", url: "/dashboard" },
          { name: "Website Management", url: "/websiteManagement" },
          { name: "Annual Reports", url: "/cse/annualReports" }
        ]}
        sx={{ mb: 2 }}
      />

      <Stack alignItems="center" spacing={2}>
        <AddEditAnnualReportsModal />

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: "background.paper" }}>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bolder", width: 150 }}
                >
                  No#
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Start Date
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  End Date
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Document Name
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Date Created
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Date Updated
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? data?.annualReports?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data?.annualReports
              )?.map((annualReport, i) => {
                return (
                  <TableRow key={annualReport.id}>
                    <TableCell align="center" component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {`${new Date(annualReport.startDate).toDateString()}`}
                    </TableCell>

                    <TableCell align="center" component="th" scope="row">
                      {`${new Date(annualReport.endDate).toDateString()}`}
                    </TableCell>

                    <TableCell component="th" scope="row" align="center">
                      <Link
                        href={`${process.env.REACT_APP_API_URL}/api/dev/cse/downloadAnnualReportDocument?fileName=${annualReport.annualReportFileURL}`}
                      >
                        {annualReport.annualReportFileURL}
                      </Link>
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {`${new Date(annualReport.createdAt).toDateString()}`}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {`${new Date(annualReport.updatedAt).toDateString()}`}
                    </TableCell>

                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={2}
                        // border={1}
                        justifyContent="center"
                      >
                        <AddEditAnnualReportsModal
                          annualReport={annualReport}
                        />
                        <DeleteAnnualReportConfirmModal id={annualReport.id} />
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            {data?.annualReports?.length > 0 && (
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
                    count={data?.annualReports?.length || 0}
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
          {(!data?.annualReports || data?.annualReports?.length === 0) && (
            <Stack width="100%" padding={2}>
              <CustomNoRowsOverlay description="No Annual Reports Uploaded" />
            </Stack>
          )}
        </TableContainer>
      </Stack>
    </Stack>
  );
};

export default AnnualReports;
