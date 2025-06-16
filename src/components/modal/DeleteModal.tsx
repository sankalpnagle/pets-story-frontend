import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

interface DeleteModalProps {
  open: boolean; 
  handleAction: (confirmed: boolean) => void; 
}

const DeleteModal: React.FC<DeleteModalProps> = ({ open, handleAction }) => {
  return (
    <Dialog open={open} onClose={() => handleAction(false)}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this item? This action cannot be undone.
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleAction(false)} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => handleAction(true)}
          color="secondary"
          variant="contained"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
