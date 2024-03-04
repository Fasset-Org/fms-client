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
import React, { useState } from "react";
import BreadCrumbsHeader from "../../../components/BreadCrumbsHeader";
import ImageCropModal from "../../../components/crop/ImageCropModal";
import UploadButton from "../../../components/crop/utils/UploadButton";
import { useQuery } from "@tanstack/react-query";
import UserQuery from "../../../stateQueries/User";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import CustomNoRowsOverlay from "../../../components/CustomNoRowsOverlay";
import { DeleteBannerImageModal } from "../../../components/Modals/DeleteBannerImageModal";

const Banners = () => {
  const [photoURL, setPhotoURL] = React.useState(null);
  const [originalFile, setOriginalFile] = useState(null);
  const [cropOpen, setCropOpen] = useState(false);

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
    queryKey: ["banners"],
    queryFn: async () => {
      return await UserQuery.CSEQuery.getAllBannerImages();
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
          { name: "Banners", url: "/cse/banners" }
        ]}
        sx={{ mb: 2 }}
      />
      <Stack justifyContent="center" alignItems="center" spacing={2}>
        <UploadButton
          {...{ setCropOpen, setPhotoURL, setOriginalFile }}
          title="Upload Banner"
        />
        {cropOpen &&
          photoURL &&
          originalFile && (
            <ImageCropModal
              photoURL={photoURL}
              cropOpen={cropOpen}
              setCropOpen={setCropOpen}
              setPhotoURL={setPhotoURL}
              originalFile={originalFile}
            />
          )}

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
                ? data?.banners?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data?.banners
              )?.map((banner, i) => {
                return (
                  <TableRow key={banner.id}>
                    <TableCell align="center" component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      <img
                        src={`http://102.37.217.58:5000/uploads/banners/${banner.bannerImageURL}`}
                        alt=""
                        height={100}
                      />
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {`${new Date(banner.createdAt).toDateString()}`}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {`${new Date(banner.updatedAt).toDateString()}`}
                    </TableCell>

                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={2}
                        // border={1}
                        justifyContent="center"
                      >
                        <DeleteBannerImageModal id={banner.id} />
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            {data?.banners?.length > 0 && (
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
                    count={data?.banners?.length || 0}
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
          {(!data?.banners || data?.banners?.length === 0) && (
            <Stack width="100%" padding={2}>
              <CustomNoRowsOverlay description="No Banner Images Available" />
            </Stack>
          )}
        </TableContainer>
      </Stack>
    </Stack>
  );
};

export default Banners;
