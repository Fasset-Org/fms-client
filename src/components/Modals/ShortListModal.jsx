import React from "react";
// import { useMsal } from "@azure/msal-react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserQuery from "../../stateQueries/User";
import AlertPopup from "../AlertPopup";

/**
 * Renders a sign-out button
 */
export const ShortListModal = ({ application, width }) => {
  const [open, setOpen] = React.useState(false);
  const formData = {
    id: application.id,
    positionId: application.positionId
  };
  const queryClient = useQueryClient();
  const { data, mutate, isLoading, isError, isSuccess, error } = useMutation({
    mutationFn: async (formData) => {
      return await UserQuery.HumanResourceQuery.shortlistApplication(formData);
    },
    onSuccess: (data) => {
      setOpen(false);
      queryClient.invalidateQueries(["applications"]);
      queryClient.invalidateQueries(["application"]);
    }
  });

  const unSelectApplicationQuery = useMutation({
    mutationFn: async (id) => {
      return await UserQuery.HumanResourceQuery.unSelectApplication(id);
    },
    onSuccess: (data) => {
      setOpen(false);
      queryClient.invalidateQueries(["applications"]);
      queryClient.invalidateQueries(["application"]);
    }
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        sx={{ fontSize: 10, width: width ? width : 70 }}
        color="success"
        onClick={handleClickOpen}
      >
        {application.status === "shortlisted" ? "Unselect" : "ShortList"}
      </Button>

      {isError && (
        <AlertPopup
          open={true}
          message={error?.response?.data?.message || "Server Error"}
          severity="error"
        />
      )}
      {isSuccess && <AlertPopup open={true} message={data?.message} />}

      {unSelectApplicationQuery.isError && (
        <AlertPopup
          open={true}
          message={
            unSelectApplicationQuery.error?.response?.data?.message ||
            "Server Error"
          }
          severity="error"
        />
      )}
      {unSelectApplicationQuery.isSuccess && (
        <AlertPopup
          open={true}
          message={unSelectApplicationQuery.data?.message}
        />
      )}

      <Dialog
        sx={{ border: "3px solid #F44336 " }}
        open={open}
        maxWidth="sm"
        fullWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {application.status === "shortlisted" ? "Unselect" : "ShortList"}
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to{" "}
            {application.status === "shortlisted" ? "unselect" : "shortList"}
            &nbsp;
            <Typography
              component="span"
              sx={{ color: "warning.main", fontWeight: "bolder" }}
            >
              {application.firstName}'s
            </Typography>
            &nbsp; application?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>

          <Button
            color="success"
            variant="outlined"
            onClick={() => {
              if (application.status === "shortlisted") {
                unSelectApplicationQuery.mutate(application.id);
              } else {
                mutate(formData);
              }
            }}
          >
            {application.status === "shortlisted" ? (
              <>
                {unSelectApplicationQuery.isLoading ? (
                  <CircularProgress color="warning" />
                ) : (
                  "Unselect"
                )}
              </>
            ) : (
              <>
                {isLoading ? <CircularProgress color="warning" /> : "ShortList"}
              </>
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
