import { LinearProgress, Stack, Typography } from "@mui/material";
import React from "react";
import BreadCrumbsHeader from "../../../components/BreadCrumbsHeader";
import AddEditLicenseSubscriptionModal from "../../../components/Modals/AddEditLicenseSubscription";
import { useQuery } from "@tanstack/react-query";
import AssetQuery from "../../../stateQueries/Asset";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteLicenseSubscriptionModal } from "../../../components/Modals/DeleteLicenseSubscription";
import Chip from "@mui/material/Chip";
//import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

const LicenseSubscription = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["licensesubscriptions"],
    queryFn: async () => {
      return await AssetQuery.AssetManagement.getAllLicenseSubscription();
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
          { name: "License Subscription", url: "/licensesubscription" },
        ]}
        sx={{ mb: 2 }}
      />
      <Stack
        sx={{ width: "100%" }}
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <AddEditLicenseSubscriptionModal />
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={data?.licensesubscriptions || []} // Make sure simcards is properly formatted as expected by DataGrid
            columns={[
              { field: "productName", headerName: "product Name", width: 180 },
              {
                field: "licenseSubscriptionType",
                headerName: "licensesubscription Type",
                width: 150,
              },
              {
                field: "vendorProvider", headerName: "vendor Provider", width: 200,},

              {
                field: "licenseKeySubscriptionCode",
                headerName: "licenseKeysubscription code",
                width: 150,
              },
              { field: "startDate", headerName: "start Date", width: 200 },
              { field: "endDate", headerName: "end Date", width: 180 },
              {
                field: "userId",
                headerName: "Allocated User",
                width: 200,
                renderCell: (params) => {
                  return <Typography>{params.row.User.fullName}</Typography>;
                },
              },
              {
                field: "renewalStatus",
                headerName: "status",
                width: 180,
                renderCell: (params) =>
                  params.row?.renewalStatus === "Active" ? (
                    <Chip label="active" color="success" />
                  ) : (
                    <Chip label="expired" color="warning" />
                  ),
              },
              {
                field: "action",
                headerName: "action",
                width: 180,
                sortable: false,
                renderCell: (params) => {
                  // console.log(params);
                  return (
                    <Stack direction="row" spacing={2}>
                      <AddEditLicenseSubscriptionModal
                        licensesubscription={params.row}
                      />
                      <DeleteLicenseSubscriptionModal id={params.row?.id} />
                    </Stack>
                  );
                },
              }, // Add more columns as nee
            ]}
            pageSize={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            rowCount={data?.licensesubscriptions?.length || 0}
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
        {/*data && data?.licensesubscriptions && (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: "background.paper" }}>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  ProductName
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  LicenseSubscriptionType
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  LicenseKeySubscriptionCode
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  VendorProvider
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
              {data?.licensesubscriptions.map((licensesubscription) => {
                return (
                  <TableRow>
                    <TableCell align="center" component="th" scope="row">
                      {licensesubscription.ProductName}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {licensesubscription.LicenseSubscriptionType}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {licensesubscription.VendorProvider}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {licensesubscription.LicenseKeySubscriptionCode}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {licensesubscription.Status}
                    </TableCell>

                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={2}
                       
                        justifyContent="center"
                      >

                      <AddEditLicenseSubscriptionModal licensesubscription={licensesubscription}/>
                      
                    
                       
                        
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
                )*/}
      </Stack>
    </Stack>
  );
};

export default LicenseSubscription;
