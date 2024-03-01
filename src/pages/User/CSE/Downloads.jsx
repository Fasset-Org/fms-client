import {
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
import AddEditDownloadsModal from "../../../components/Modals/AddDownloadsModal";
import BreadCrumbsHeader from "../../../components/BreadCrumbsHeader";
import { useQuery } from "@tanstack/react-query";
import UserQuery from "../../../stateQueries/User";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import CustomNoRowsOverlay from "../../../components/CustomNoRowsOverlay";
import { useNavigate } from "react-router-dom";

const Downloads = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      return await UserQuery.CSEQuery.getlAllDOcumentsTitle();
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
          { name: "Downloads", url: "/cse/downloads" }
        ]}
        sx={{ mb: 2 }}
      />
      <Stack justifyContent="center" alignItems="center">
        <AddEditDownloadsModal />
      </Stack>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead sx={{ backgroundColor: "background.paper" }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                Documents Title
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
              ? data?.titles?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : data?.titles
            )?.map((title) => {
              return (
                <TableRow>
                  <TableCell align="center" component="th" scope="row">
                    {title.title}
                  </TableCell>

                  <TableCell align="center" component="th" scope="row">
                    {`${new Date(title.createdAt).toDateString()}`}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {`${new Date(title.updatedAt).toDateString()}`}
                  </TableCell>
                  <TableCell align="center">
                    <Stack
                      direction="row"
                      spacing={2}
                      // border={1}
                      justifyContent="center"
                    >
                      <AddEditDownloadsModal downloadsTitle={title} />
                      <Button
                        variant="outlined"
                        sx={{ fontSize: 10 }}
                        onClick={() => {
                          navigate(`/cse/downloads/${title.id}`);
                        }}
                      >
                        View
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          {data?.titles?.length > 0 && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  // colSpan={3}
                  count={data?.titles?.length || 0}
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
        {(!data?.titles || data?.titles?.length === 0) && (
          <Stack width="100%" padding={2}>
            <CustomNoRowsOverlay description="No Open Downloads Available" />
          </Stack>
        )}
      </TableContainer>
    </Stack>
  );
};

export default Downloads;
