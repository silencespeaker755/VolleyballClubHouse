import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { useMutation } from "react-query";
import { useUserInfo } from "../hooks/useInfo";
import SignUp from "./SignUp";
import axios from "../setting";

const blackTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  signBox: {
    marginTop: theme.spacing(25),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const { changeUser } = useUserInfo();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e, type) => {
    setUser({ ...user, [type]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const signin = useMutation(
    async (err) => {
      const data = await axios.post("/api/user/login", user);
      return data;
    },
    {
      onSuccess: ({ data }) => {
        changeUser(data.id, data.isAdmin);
        history.push("/home");
      },
    }
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    signin.mutate();
    handleClose();
  };

  return (
    <ThemeProvider theme={blackTheme}>
      <Container component="main" maxWidth="xs">
        <div className={classes.signBox}>
          <Typography component="h1" variant="h4">
            Sign In
          </Typography>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => handleChange(e, "email")}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => handleChange(e, "password")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => onSubmit(e)}
              disabled={user.email === "" || user.password === ""}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Button>Forgot password</Button>
              </Grid>
              <Grid item>
                <Button onClick={handleClickOpen}>sign up</Button>
              </Grid>
            </Grid>
          </form>
          {/* 跳窗 SignUp */}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
              <SignUp handleClose={handleClose} />
            </DialogContent>
          </Dialog>
        </div>
      </Container>
    </ThemeProvider>
  );
}
