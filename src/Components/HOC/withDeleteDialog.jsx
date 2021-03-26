import React from "react";

import DeleteDialog from "../Dialogs/DeleteDialog";

const withDeleteDialog = (WrappedComponent) => {
  return class extends React.Component {
    state = {
      name: "этот объект",

      isOpen: false,

      deleteAction: null,
    };

    onCloseDeleteDialog = () => {
      this.setState({
        isOpen: false,
      });
    };

    onOpenDeleteDialog = (deleteAction, name = "этот объект") => {
      this.setState({
        isOpen: true,

        name,

        deleteAction,
      });
    };

    onDelete = () => {
      const { deleteAction } = this.state;

      deleteAction();

      this.onCloseDeleteDialog();
    };

    render() {
      const { isOpen, name } = this.state;

      return (
        <>
          <WrappedComponent
            onOpenDeleteDialog={this.onOpenDeleteDialog}
            {...this.props}
          />

          <DeleteDialog
            handleCloseOk={this.onDelete}
            handleClose={this.onCloseDeleteDialog}
            isOpen={isOpen}
            name={name}
          />
        </>
      );
    }
  };
};

export default withDeleteDialog;
