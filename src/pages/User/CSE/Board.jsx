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
import BreadCrumbsHeader from "../../../components/BreadCrumbsHeader";
import AddEditBoardMemberModal from "../../../components/Modals/AddEditBoardMemberModal";
import { useQuery } from "@tanstack/react-query";
import UserQuery from "../../../stateQueries/User";
import CustomNoRowsOverlay from "../../../components/CustomNoRowsOverlay";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { DeleteBoardMemberConfirmModal } from "../../../components/Modals/DeleteBoardMemberConfirmModal";

const Board = () => {
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
    queryKey: ["boardMembers"],
    queryFn: async () => {
      return UserQuery.CSEQuery.getAllBoardMembers();
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
          { name: "Board", url: "/cse/board" }
        ]}
        sx={{ mb: 2 }}
      />

      <Stack alignItems="center" spacing={2}>
        <AddEditBoardMemberModal />
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
                  Fullname
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Position
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Image
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
                ? data?.boardMembers?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data?.boardMembers
              )?.map((boardMember, i) => {
                return (
                  <TableRow key={boardMember.id}>
                    <TableCell align="center" component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {boardMember.title}
                    </TableCell>

                    <TableCell component="th" scope="row" align="center">
                      {boardMember.fullname}
                    </TableCell>

                    <TableCell component="th" scope="row" align="center">
                      {boardMember.position}
                    </TableCell>

                    <TableCell component="th" scope="row" align="center">
                      <img
                        src={`${process.env.REACT_APP_PUBLIC_URL}/uploads/board-members/${boardMember.imageFileURL}`}
                        alt=""
                        height={100}
                      />
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {`${new Date(boardMember.createdAt).toDateString()}`}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {`${new Date(boardMember.updatedAt).toDateString()}`}
                    </TableCell>

                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={2}
                        // border={1}
                        justifyContent="center"
                      >
                        <AddEditBoardMemberModal boardMember={boardMember} />
                        <DeleteBoardMemberConfirmModal id={boardMember.id} />
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            {data?.boardMembers?.length > 0 && (
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
                    count={data?.boardMembers?.length || 0}
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
          {(!data?.boardMembers || data?.boardMembers?.length === 0) && (
            <Stack width="100%" padding={2}>
              <CustomNoRowsOverlay description="No Board Members Uploaded" />
            </Stack>
          )}
        </TableContainer>
      </Stack>
    </Stack>
  );
};

export default Board;
