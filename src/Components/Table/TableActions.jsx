import React from "react";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

const ActionButton = ({ onClick, title, ...restProps }) => {
  return (
    <Tooltip title={title}>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        {...restProps}
      />
    </Tooltip>
  );
};

export const EditAction = (props) => (
  <ActionButton size="small" color="primary" {...props}>
    <CreateIcon />
  </ActionButton>
);

export const DeleteAction = (props) => (
  <ActionButton size="small" color="primary" {...props}>
    <DeleteIcon />
  </ActionButton>
);

export const AddAction = ({ title = "создать", ...props }) => (
  <ActionButton title={title} {...props}>
    <AddIcon />
  </ActionButton>
);

ActionButton.defaultProps = {
  onClick: () => {},
};
