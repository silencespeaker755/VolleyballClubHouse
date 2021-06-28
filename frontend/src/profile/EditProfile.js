import React, { isValidElement, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useMutation } from "react-query";
import { useUserInfo } from "../hooks/useInfo";
import instance from "../setting";

const useStyles = makeStyles((theme) => ({
  head: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 6),
  },
}));

export default function EditProfile({
  refetchEvents,
  handleClose,
  ProfileData,
  setProfileData,
}) {
  const classes = useStyles();
  const { userInfo } = useUserInfo();
  const [user, setUser] = useState({
    username: ProfileData.username,
    city: ProfileData.city,
    position: ProfileData.position,
    isAdmin: ProfileData.isAdmin,
    about: ProfileData.about,
  });

  const handleChange = (e, type) => {
    setUser({ ...user, [type]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setProfileData({
      username: user.username,
      city: user.city,
      position: user.position,
      isAdmin: ProfileData.isAdmin,
      about: user.about,
    });
    handleClose();
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.head}>
        <Typography component="h1" variant="h4">
          Edit
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            value={user.username}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            onChange={(e) => handleChange(e, "username")}
          />
          <TextField
            value={user.city}
            id="outlined-multiline-static"
            label="City"
            margin="normal"
            required
            fullWidth
            variant="outlined"
            type="text"
            onChange={(e) => handleChange(e, "city")}
          />
          <TextField
            value={user.position}
            variant="outlined"
            margin="normal"
            fullWidth
            required
            id="position"
            label="Position"
            name="positon"
            onChange={(e) => handleChange(e, "position")}
          />
          <TextField
            value={user.about}
            variant="outlined"
            margin="normal"
            multiline
            rows={6}
            fullWidth
            id="about"
            label="About"
            name="about"
            onChange={(e) => handleChange(e, "about")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
            disabled={
              user.name === "" ||
              user.city === "" ||
              user.about === "" ||
              user.position === ""
            }
          >
            Edit
          </Button>
        </form>
      </div>
    </Container>
  );
}