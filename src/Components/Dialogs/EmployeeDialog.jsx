import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Form from "../Form";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  title: {
    width: 500
  }
}));

export default function EmployeeDialog({
  title,
  isOpen,
  ...props
}) {
  const classes = useStyles();
  return (
    <Dialog
      open={isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"

    >
      <DialogTitle className={classes.title} id="alert-dialog-title">{title}</DialogTitle>
      <Form {...props}/>
    </Dialog>
  );
}
