import { React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, TextField, Typography, Container } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "react-query";
import { useUserInfo } from "../hooks/useInfo";
import axios from "../setting";
import Loading from "../components/Loading";

const useStyles = makeStyles((theme) => ({
  signUp: {
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
  alert: {
    marginTop: "10px",
  },
}));

export default function SignUp({ handleClose }) {
  const classes = useStyles();
  const history = useHistory();
  const { changeUser } = useUserInfo();
  const [isErr, setIsErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [account, setAccount] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e, type) => {
    setAccount({ ...account, [type]: e.target.value });
  };

  const { mutate: signup, isLoading } = useMutation(
    async (err) => {
      const data = await axios.post("/api/user/signup", account);
      return data;
    },
    {
      onSuccess: ({ data }) => {
        localStorage.setItem("isAdmin", data.isAdmin);
        localStorage.setItem("id", data.id);
        localStorage.setItem("auth", data.auth);
        changeUser(data.id, data.isAdmin, data.auth);
        if (data.auth) history.push("/home");
        else history.push("/auth");
        handleClose();
      },
      onError: (err) => {
        if (err.response.status === 401) {
          setIsErr(true);
          setErrMsg(err.response.data);
        }
      },
    }
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    signup();
  };

  if (isLoading) return <Loading />;

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.signUp}>
        <Typography component="h1" variant="h4">
          Sign up
        </Typography>
        {isErr ? (
          <Alert className={classes.alert} severity="error">
            {errMsg}
          </Alert>
        ) : null}
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoFocus
            onChange={(e) => handleChange(e, "name")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            type="email"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
            onClick={onSubmit}
            disabled={
              account.name === "" ||
              account.email === "" ||
              account.password === ""
            }
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
}
