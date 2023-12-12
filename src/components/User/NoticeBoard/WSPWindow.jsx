import {
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
import GrantsWindowModal from "../../Modals/GrantsWindowModal";
import CustomNoRowsOverlay from "../../CustomNoRowsOverlay";
import { useQuery } from "@tanstack/react-query";
import UserQuery from "../../../stateQueries/User";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import ImageCrop from "../../ImageCrop";

const WSPWindow = () => {
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
    queryKey: [" garnts"],
    queryFn: async () => {
      return await UserQuery.CSEQuery.getAllGrantsWindows();
    }
  });

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <Stack spacing={2} width="100%">
      <Stack direction="row" justifyContent="space-between">
        <Typography fontSize={20} textAlign="center">
          WSP Window Notice
        </Typography>
        <GrantsWindowModal />
        <ImageCrop />
      </Stack>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead sx={{ backgroundColor: "background.paper" }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                Title
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                Grant Type
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                Closing Date
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
              ? data?.grants?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : data?.grants
            )?.map((grant) => {
              return (
                <TableRow key={grant.id}>
                  <TableCell align="center" component="th" scope="row">
                    {grant.title}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography align="center">{grant.grantType}</Typography>
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {`${new Date(grant.closingDate).toDateString()} @ ${
                      new Date(grant.closingDate).getHours() > 11
                        ? new Date(grant.closingDate).getHours() +
                          ":" +
                          new Date(grant.closingDate).getMinutes() +
                          "PM"
                        : new Date(grant.closingDate).getHours() +
                          ":" +
                          new Date(grant.closingDate).getMinutes() +
                          "AM"
                    }`}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {`${new Date(grant.createdAt).toDateString()}`}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {`${new Date(grant.updatedAt).toDateString()}`}
                  </TableCell>

                  <TableCell align="center">
                    <Stack
                      direction="row"
                      spacing={2}
                      // border={1}
                      justifyContent="center"
                    >
                      <IconButton color="secondary">
                        <GrantsWindowModal grant={grant} />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          {data?.grants?.length > 0 && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  // colSpan={3}
                  count={data?.grants?.length || 0}
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
        {(!data?.grants || data?.grants?.length === 0) && (
          <Stack width="100%" padding={2}>
            <CustomNoRowsOverlay description="No Notices Available" />
          </Stack>
        )}
      </TableContainer>
    </Stack>
  );
};

export default WSPWindow;
