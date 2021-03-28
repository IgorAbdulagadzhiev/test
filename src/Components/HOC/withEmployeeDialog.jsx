import React from "react";

import EmployeeDialog from "../Dialogs/EmployeeDialog";

const withEmployeeDialog = (WrappedComponent) => {
  return class extends React.Component {
    state = {
      isOpen: false,
      title: '',
      data: {},
      callback: null
    };

    onCloseDialog = () => {
      this.setState({
        isOpen: false,
      });
    };

    onOpenDialog = (title, data = {}, callback) => {
      this.setState({
        isOpen: true,
        title,
        data,
        callback
      });
    };

    render() {
      const { isOpen, title, data, callback } = this.state;

      return (
        <>
          <WrappedComponent
            onOpenDialog={this.onOpenDialog}
            {...this.props}
          />
          <EmployeeDialog
            handleClose={this.onCloseDialog}
            isOpen={isOpen}
            title={title}
            data={data}
            callback={callback}
          />
        </>
      );
    }
  };
};

export default withEmployeeDialog;
