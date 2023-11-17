import { Grid, LinearProgress, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import BreadCrumbsHeader from "../../../components/BreadCrumbsHeader";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import UserQuery from "../../../stateQueries/User";
import AddTitleDocumemnts from "../../../components/Modals/AddTitleDocuments";
import { DeleteDocumentModal } from "../../../components/Modals/DeleteDocumentModal";

const DownloadsDocuments = () => {
  const { titleId } = useParams();

  const { data: titleData } = useQuery({
    queryKey: ["documentTitle"],
    queryFn: async () => {
      return await UserQuery.CSEQuery.getDocumentTitleById(titleId);
    },
    enabled: !!titleId
  });

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      return await UserQuery.CSEQuery.getAllDocuments();
    },
    queryKey: ["documents"]
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
          { name: "Downloads", url: "/cse/downloads" },
          {
            name: `${titleData?.documentTitle?.title}`,
            url: `/cse/downloads/${titleId}`
          }
        ]}
        sx={{ mb: 2 }}
      />

      <Stack
        spacing={2}
        justifyContent="center"
        alignItems="center"
        key={document.id}
      >
        <AddTitleDocumemnts downloadsTitle={titleData?.documentTitle} />
        <Grid container spacing={2}>
          {data?.documents?.length > 0 &&
            data?.documents?.map((document) => {
              return (
                <Grid item xs={12} md={6}>
                  <Stack minHeight={60} direction="row" component={Paper}>
                    <Stack width="90%" justifyContent="center" padding={2}>
                      <Typography fontWeight="bolder" fontSize={14}>
                        {document.documentName}
                      </Typography>
                    </Stack>
                    <Stack width="10%" justifyContent="center" alignItems="end">
                      <DeleteDocumentModal id={document.id} />
                    </Stack>
                  </Stack>
                </Grid>
              );
            })}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default DownloadsDocuments;
