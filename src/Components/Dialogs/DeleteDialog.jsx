import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function DeleteDialog({
  handleCloseOk,
  handleClose,
  name,
  isOpen,
}) {
  return (
    <Dialog
      open={isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{`Вы действительно хотите удалить ${name}?`}</DialogTitle>
      <DialogActions>
        <Button onClick={handleCloseOk} color="primary">
          Да
        </Button>

        <Button onClick={handleClose} color="primary" autoFocus>
          Нет
        </Button>
      </DialogActions>
    </Dialog>
  );
}
