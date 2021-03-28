import React from "react";
import { Link as RouterLink } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  list: {
    display: "flex",
  },
  item: {
    width: "auto",
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <header>
      <List className={classes.list}>
        <ListItem className={classes.item}>
          <RouterLink to="/" component={Link}>
            Главная
          </RouterLink>
        </ListItem>
        <ListItem className={classes.item}>
          <RouterLink to="/about" component={Link}>
            О нас
          </RouterLink>
        </ListItem>
      </List>
    </header>
  );
};

export default Header;
