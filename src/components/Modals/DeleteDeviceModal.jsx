import React from 'react'
import {
  Button,
  CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle,
  IconButton,
  Typography
} from "@mui/material";
import { Delete } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AlertPopup from '../AlertPopup';
import AssetQuery from '../../stateQueries/Asset';

export const DeleteDeviceModal = ({id})  =>{
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const { data, mutate, isLoading, isError, isSuccess, error} = useMutation({
    mutationFn: async (id) => {
      return await AssetQuery.AssetManagement
      .deleteDevice(id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("devices");
    }
  });

  const handleClickOpen = () =>{
    setOpen(true);
  };

  const handleClose = () =>{
    setOpen(false);
  };
  return (
    <div>
      <Tooltip title="Delete Device">
        <IconButton 
        color="error"
        size="small"
        aria-label=""
        onClick={handleClickOpen}>
          <Delete />
        </IconButton>
      </Tooltip>

      {isError && (
        <AlertPopup
        open={true}
        message={error?.response?.data?.message || "Server Error" }
        severity="error"
        />
      )}
      {isSuccess && <AlertPopup open={true} message={data?.message} />}

      <Dialog
      sx={{ border: "3px solid #F44336"}}
      open={open}
      maxWidth="sm"
      fullWidth
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
        <DialogContent>
          <Typography
          variant="h6"
          sx={{
            fontWeight:"fontWeightBold",
            color: "text.primary"
            
          }}
          >
            Are you sure you want to permanetly delete?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">Cancel
          </Button>

          <Button
          color="error"
          variant="outlined"
          onClick={() => {
          mutate(id);
          }}
           autoFocus
          >
            {isLoading ? <CircularProgress color="warning" /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
        };

  
  

