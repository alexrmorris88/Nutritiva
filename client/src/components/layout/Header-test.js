// Material UI Imports
import {
  AppBar,
  Avatar,
  Badge,
  InputBase,
  Toolbar,
  Typography,
  CardMedia,
} from "@mui/material";
import { Cancel, Mail, Notifications, Search } from "@mui/icons-material";

// React Imports
import { useState } from "react";

// Redux Imports
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../state/actions/userActions";

// Component Imports
import { useStyles } from "../../theme/styles/NavbarStyles";

const Header = () => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);
  const style = useStyles();
  const classes = useStyles({ open });

  const logoutHandler = () => {
    dispatch(logoutUser());
    alert.success("Logged out successfully");
  };

  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        <CardMedia
          image="images/nutritiva_logo.png"
          title="Nutritiva"
          alt="Nutritiva"
          component="img"
          className={style.logoLg}
        />

        <div className={classes.search}>
          <Search />
          <InputBase placeholder="Search..." className={classes.input} />
          <Cancel className={classes.cancel} onClick={() => setOpen(false)} />
        </div>
        <div className={classes.icons}>
          <Search
            className={classes.searchButton}
            onClick={() => setOpen(true)}
          />
          <Badge badgeContent={4} color="secondary" className={classes.badge}>
            <Mail />
          </Badge>
          <Badge badgeContent={2} color="secondary" className={classes.badge}>
            <Notifications />
          </Badge>
          <Avatar
            alt={user ? user.firstName + " " + user.lastName : ""}
            src={"images/default_avatar.jpg"}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
