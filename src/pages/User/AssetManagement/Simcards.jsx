import {
  LinearProgress,
  Stack, Typography /*Paper,,Table,TableBody,TableCell,TableContainer,TableFooter,TableHead,TablePagination,TableRow,*/,
} from "@mui/material";
import React from "react";
import BreadCrumbsHeader from "../../../components/BreadCrumbsHeader";
import AddEditSimcardsModal from "../../../components/Modals/AddEditSimcards";
import { DeleteSimcardsModal } from "../../../components/Modals/DeleteSimcards";
import { useQuery } from "@tanstack/react-query";
import AssetQuery from "../../../stateQueries/Asset";
//import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { DataGrid } from "@mui/x-data-grid";
import Chip from "@mui/material/Chip";

const Simcards = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["simcards"],
    queryFn: async () => {
      return await AssetQuery.AssetManagement.getAllSimcards();
    },
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
    <Stack>
      <BreadCrumbsHeader
        title="Welcome back Tiyisela Themba Makamu"
        menus={[
          { name: "Dashboard", url: "/dashboard" },
          { name: "Asset Management", url: "/assetManagement" },
          { name: "Simcards", url: "/simcards" },
        ]}
        sx={{ mb: 2 }}
      />
      <Stack
        sx={{ width: "100%" }}
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <AddEditSimcardsModal />
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={data?.simcards || []} // Make sure simcards is properly formatted as expected by DataGrid
            columns={[
              { field: "simcardName", headerName: "simcard Name", width: 150 },
              { field: "simcardType", headerName: "simcard Type", width: 150 },
              { field: "number", headerName: "number", width: 150 },
              { field: "solutionID", headerName: "solution ID", width: 150 },
              { field: "startDate", headerName: "start Date", width: 150 },
              { field: "endDate", headerName: "end Date", width: 150 },
              {
                field: "userId",
                headerName: "Allocated User",
                width: 200,
                renderCell: (params) => {
                  return <Typography>{params.row.User.fullName}</Typography>
                },
              },
              {
                field: "status",
                headerName: "status",
                width: 150,
                renderCell: (params) => {
                  const status = params.row?.status;
                  if (status === "Active") {
                    return <Chip label="Active" color="success" />;
                  } else {
                    return <Chip label="Not active" color="warning" />;
                  }
                }
              },
                
              {
                field: "action",
                headerName: "action",
                width: 150,
                sortable: false,
                renderCell: (params) => {
                  return (
                    <Stack direction="row" spacing={2}>
                      <AddEditSimcardsModal simcards={params.row} />
                      <DeleteSimcardsModal id={params.row?.id} />
                    </Stack>
                  );
                },
              },

              // Add more columns as nee
            ]}
            pageSize={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            rowCount={data?.simcards?.length || 0}
            onPageSizeChange={handleChangeRowsPerPage}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>

        {/* {data && data?.simcards && (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: "background.paper" }}>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Number
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  StartDate
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  EndDate
                </TableCell>
                
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Status
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.simcards.map((simcards) => {
                return (
                  <TableRow>
                    <TableCell align="center" component="th" scope="row">
                      {simcards.Number}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {simcards.StartDate}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {simcards.EndDate}
                    </TableCell>
                    
                    <TableCell align="center" component="th" scope="row">
                      {simcards.Status}
                    </TableCell>

                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={2}
                       
                        justifyContent="center"
                      >
                       <AddEditSimcardsModal simcards={simcards}/>
                        
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
                  
                  count={data?.departments?.length || 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )} */}
      </Stack>
    </Stack>
  );
};

export default Simcards;
