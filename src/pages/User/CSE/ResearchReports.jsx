import React from "react";
import BreadCrumbsHeader from "../../../components/BreadCrumbsHeader";
import AddEditResearchReportsModal from "../../../components/Modals/AddEditResearchReportsModal";
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
import { useQuery } from "@tanstack/react-query";
import UserQuery from "../../../stateQueries/User";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import CustomNoRowsOverlay from "../../../components/CustomNoRowsOverlay";
import { DeleteResearchReportConfirmModal } from "../../../components/Modals/DeleteResearchReportConfirmModal";

const ResearchReports = () => {
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
    queryKey: ["researchReports"],
    queryFn: async () => {
      return UserQuery.CSEQuery.getAllResearcheports();
    }
  });

  console.log(data);

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
          { name: "Research Reports", url: "/cse/researchReports" }
        ]}
        sx={{ mb: 2 }}
      />

      <Stack alignItems="center" spacing={2}>
        <AddEditResearchReportsModal />
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
                  Title
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Description
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Document Name
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Year
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
                ? data?.researchReports?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data?.researchReports
              )?.map((annualReport, i) => {
                return (
                  <TableRow key={annualReport.id}>
                    <TableCell align="center" component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {annualReport.documentTitle}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {annualReport.documentDesc}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      <Link
                        href={`${process.env.REACT_APP_API_URL}/cse/downloadResearchReportDocument?fileName=${annualReport.researchReportFileURL}`}
                      >
                        {annualReport.researchReportFileURL}
                      </Link>
                    </TableCell>

                    <TableCell align="center" component="th" scope="row">
                      {annualReport.year}
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
                        <AddEditResearchReportsModal
                          researchReport={annualReport}
                        />
                        <DeleteResearchReportConfirmModal
                          id={annualReport.id}
                        />
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            {data?.researchReports?.length > 0 && (
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
                    count={data?.researchReports?.length || 0}
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
          {(!data?.researchReports || data?.researchReports?.length === 0) && (
            <Stack width="100%" padding={2}>
              <CustomNoRowsOverlay description="No Research Reports Uploaded" />
            </Stack>
          )}
        </TableContainer>
      </Stack>
    </Stack>
  );
};

export default ResearchReports;
