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
import AddEditGeneralNoticeModal from "../../Modals/AddEditGeneralNoticeModal";
import { useQuery } from "@tanstack/react-query";
import UserQuery from "../../../stateQueries/User";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import CustomNoRowsOverlay from "../../CustomNoRowsOverlay";

const Notices = () => {


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
    queryKey: [" notices"],
    queryFn: async () => {
      return await UserQuery.CSEQuery.getAllGeneralNotices();
    }
  });

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <Stack spacing={2} width="100%">
      <Stack direction="row" justifyContent="space-between">
        <Typography fontSize={20} textAlign="center">
          Notices
        </Typography>
        <AddEditGeneralNoticeModal />
      </Stack>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead sx={{ backgroundColor: "background.paper" }}>
            <TableRow>
              <TableCell
                align="center"
                sx={{ fontWeight: "bolder", width: 150 }}
              >
                Title
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                Content
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
              ? data?.notices?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : data?.notices
            )?.map((notice) => {
              return (
                <TableRow key={notice.id}>
                  <TableCell align="center" component="th" scope="row">
                    {notice.title}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ width: 500 }}
                  >
                    <Typography
                      sx={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        width: 500,
                      }}
                    >
                      {notice.content}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {`${new Date(notice.createdAt).toDateString()}`}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {`${new Date(notice.updatedAt).toDateString()}`}
                  </TableCell>

                  <TableCell align="center">
                    <Stack
                      direction="row"
                      spacing={2}
                      // border={1}
                      justifyContent="center"
                    >
                      <IconButton color="secondary">
                        <AddEditGeneralNoticeModal notice={notice} />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          {data?.notices?.length > 0 && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  // colSpan={3}
                  count={data?.notices?.length || 0}
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
        {(!data?.notices || data?.notices?.length === 0) && (
          <Stack width="100%" padding={2}>
            <CustomNoRowsOverlay description="No Notices Available" />
          </Stack>
        )}
      </TableContainer>
    </Stack>
  );
};

export default Notices;
