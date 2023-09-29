import { Stack } from "@mui/material";
import React from "react";
import AddEditDownloadsModal from "../../../components/Modals/AddDownloadsModal";

const Downloads = () => {
  return (
    <Stack spacing={2}>
      <Stack justifyContent="center" alignItems="center">
        <AddEditDownloadsModal />
      </Stack>
      {/* <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
                <Table aria-label="simple table">
                  <TableHead sx={{ backgroundColor: "primary.main" }}>
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{ fontWeight: "bolder", color: "#FFFFFF" }}
                      >
                        Name Of Bidder
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontWeight: "bolder", color: "#FFFFFF" }}
                      >
                        B-BBEE Levels
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? data?.tender?.bidders?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : data?.tender?.bidders
                    ).map((bidder, i) => (
                      <TableRow
                        key={i}
                        sx={{
                          backgroundColor: i % 2 === 0 ? "action.hover" : ""
                        }}
                      >
                        <TableCell align="center" component="th" scope="row">
                          {bidder.bidderName}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {bidder.bbeeLevel}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
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
                        count={data?.tender?.bidders?.length || 0}
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
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        )}

        {winner && (
          <Accordion sx={{ width: "100%" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#FFFFFF" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ backgroundColor: "primary.main" }}
            >
              <Typography>Awarded Bidder</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                textAlign="center"
                fontFamily="Helvetica Neue"
                fontWeight="bolder"
                fontSize={20}
              >
                Date Posted:
                <span style={{ color: "#1f2f79", fontWeight: "lighter" }}>
                  {new Date(winner.datePosted).toDateString()}
                </span>
              </Typography>

              <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
                <Table aria-label="simple table">
                  <TableHead sx={{ backgroundColor: "primary.main" }}>
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{ fontWeight: "bolder", color: "#FFFFFF" }}
                      >
                        Name Of Bidder
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontWeight: "bolder", color: "#FFFFFF" }}
                      >
                        B-BBEE Levels
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" component="th" scope="row">
                        {winner.bidderName}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {winner.bbeeLevel}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer> */}
    </Stack>
  );
};

export default Downloads;
