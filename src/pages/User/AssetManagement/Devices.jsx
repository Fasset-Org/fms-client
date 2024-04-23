import { LinearProgress, Stack, Typography } from "@mui/material";
import React from "react";
import BreadCrumbsHeader from "../../../components/BreadCrumbsHeader";
import AddEditDeviceModal from "../../../components/Modals/AddEditDeviceModal";
import { useQuery } from "@tanstack/react-query";
import AssetQuery from "../../../stateQueries/Asset";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteDeviceModal } from "../../../components/Modals/DeleteDeviceModal";
import Chip from "@mui/material/Chip";

const Devices = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["devices"],
    queryFn: async () => {
      return await AssetQuery.AssetManagement.getAllDevices();
    },
  });

  //console.log(data);
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
          { name: "Asset Management", url: "/assetMangement" },
          { name: "Devices", url: "/devices" },
        ]}
        sx={{ mb: 2 }}
      />

      <Stack
        sx={{ width: "100%" }}
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <AddEditDeviceModal />

        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={data?.devices || []}
            columns={[
              { field: "deviceName", headerName: "device Name", width: 200 },
              { field: "deviceType", headerName: "device Type", width: 150 },

              {
                field: "serialNumberImei",
                headerName: "serialNumber Imei",
                width: 150,
              },
              { field: "warranty", headerName: "warranty", width: 150 },
              { field: "assetTag", headerName: "Asset Tag", width: 150 },
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
                width: 200,
                renderCell: (params) => {
                  let chipColor;
                  let chipLabel;

                  switch (params.row?.status) {
                    case "Active":
                      chipColor = "success";
                      chipLabel = "Active";
                      break;
                    case "Storage":
                      chipColor = "warning";
                      chipLabel = "Storage";
                      break;
                    case "Disposed":
                      chipColor = "error";
                      chipLabel = "Disposed";
                      break;
                    default:
                      chipColor = "default";
                      chipLabel = "Unknown";
                  }

                  return <Chip label={chipLabel} color={chipColor} />;
                },
              },

              {
                field: "action",
                headerName: "action",
                width: 200,
                sortable: false,
                renderCell: (params) => {
                  // console.log(params.row.id);s
                  return (
                    <Stack direction="row" spacing={2}>
                      <AddEditDeviceModal device={params.row} />
                      <DeleteDeviceModal id={params.row?.id} />
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
            rowCount={data?.devices?.length || 0}
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
        {/*data && data?.devices && (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: "background.paper" }}>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  DeviceName
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  SerialIMEINumber
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  AssetTag
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  DeviceType
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
              {data?.devices.map((device) => {
                return (
                  <TableRow>
                    <TableCell align="center" component="th" scope="row">
                      {device.DeviceName}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {device.SerialIMEINumber}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {device.AssetTag}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {device.deviceType}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {device.Status}
                    </TableCell>

                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={2}
                       
                        justifyContent="center"
                      >
                      <AddEditDeviceModal device={device}/>
                      <DeleteDeviceModal id={device.id} /> 
                        
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

export default Devices;
