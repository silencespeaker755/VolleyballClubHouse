import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  // Link,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DescriptionIcon from "@material-ui/icons/Description";
import HomeIcon from "@material-ui/icons/Home";
import PollIcon from "@material-ui/icons/Poll";
import { useUserInfo } from "../hooks/useInfo";

const useStyle = makeStyles((theme) => ({
  flex: {
    display: "flex",
  },
  list: {
    position: "relative",
    display: "flex",
    overflow: "auto",
    flexGrow: 1,
  },
  listItems: {
    width: "250px",
  },
  listItem: {
    "&:hover": {
      backgroundColor: "#9e9e9e",
      color: "white",
    },
  },
  notAdmin: {
    display: "none",
  },
  width_100: {
    width: "100%",
  },
  white: {
    color: "white",
  },
  link: {
    textDecoration: "none",
  },
}));

export default function RightDrawer(props) {
  const { open, toggleDrawer } = props;
  const classes = useStyle();
  const { userInfo } = useUserInfo();

  const menuList = [
    {
      label: "Home",
      icon: <HomeIcon />,
      link: `/home`,
      event: null,
      visible: true,
    },
    {
      label: "Profile",
      icon: <AccountCircleIcon />,
      link: `/home/profile/${userInfo.id}`,
      event: null,
      visible: true,
    },
    {
      label: "My Records",
      icon: <AssignmentIcon />,
      link: `/home/analysis/${userInfo.id}`,
      event: null,
      visible: userInfo.isAdmin,
    },
    {
      label: "Practice",
      icon: <DescriptionIcon />,
      link: `/home/posts`,
      event: null,
      visible: true,
    },
    {
      label: "Match",
      icon: <PollIcon />,
      link: "/home/match",
      event: null,
      visible: true,
    },
  ];

  const handleLogOut = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("auth");
  };

  return (
    <Drawer
      anchor="right"
      className={classes.flex}
      PaperProps={{ style: { backgroundColor: "#757575" } }}
      open={open}
      onClose={toggleDrawer(false)}
    >
      <div className={classes.list} onClick={toggleDrawer(false)}>
        <div className={classes.listItems}>
          <List>
            {menuList.map((item) => (
              <Link
                to={item.link}
                key={item.label}
                className={`${classes.link} ${clsx(classes.link, {
                  [classes.notAdmin]: !item.visible,
                })}`}
                onClick={item.event}
              >
                <ListItem className={classes.listItem} button>
                  <ListItemIcon className={classes.white}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    className={classes.white}
                    primary={item.label}
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        </div>
      </div>
      <div className={classes.width_100} onClick={toggleDrawer(false)}>
        <Link to="/" className={classes.link} onClick={handleLogOut}>
          <ListItem className={classes.listItem} button>
            <ListItemIcon className={classes.white}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText className={classes.white} primary="log out" />
          </ListItem>
        </Link>
      </div>
    </Drawer>
  );
}
