import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import {
  Typography,
  Button,
  Card,
  CardActionArea,
  Divider,
  InputBase,
} from "@material-ui/core";
import { fade, makeStyles, createMuiTheme } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { useUserInfo } from "../hooks/useInfo";
import axios from "../setting";
import DeleteSection from "../my_record/DeleteSection";
import AddButton from "../components/AddButton";
import AddMatchModal from "./modal/AddMatchModal";
import Loading from "../components/Loading";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 800,
      lg: 1280,
      xl: 1920,
    },
  },
});

const useStyles = makeStyles(() => ({
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // background: "#eaeaea",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  outFrame: {
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
    width: "70%",
    minHeight: "600px",
    minWidth: "400px",
    maxWidth: "900px",
    margin: "50px 50px 10px 50px",
    border: "8px solid #6d6966",
    borderRadius: "25px",
    height: "100%",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  outPaperFrame: {
    margin: "20px 30px 10px 30px",
    width: "90%",
    maxHeight: "800px",
    overflow: "auto",
  },
  outCardFrame: {
    width: "98%",
    minHeight: "80px",
    borderRadius: "20px",
    margin: "8.5px auto",
    "&:last-child": {
      marginBottom: "10px",
    },
  },
  actionArea: {
    width: "100%",
    height: "100%",
    minHeight: "80px",
    padding: "10px 30px 10px 30px",
    background: "#f9f9f9",
    "&:hover": {
      transition: "all ease 0.5s",
      background: "#303b53",
      "& $deleteSection": {
        display: "block",
      },
      "& $cardText": {
        transition: "all ease 1s",
        color: "#FFFFFF",
      },
    },
  },
  deleteSection: { display: "none" },
  cardText: {
    color: "#000000",
  },
  outTitle: {
    marginTop: "40px",
    fontSize: "4em",
    fontWeight: 700,
  },
  subtitle: {
    fontWeight: 500,
  },
  divider: {
    width: "120%",
    height: "2px",
    background: "black",
    transition: theme.transitions.create("width"),
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
  },
  type: {
    marginTop: "10px",
    marginBottom: "5px",
  },
  search: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade("#5a5a5a", 0.15),
    "&:hover": {
      backgroundColor: fade("#5a5a5a", 0.25),
    },
    margin: "30px 0 0 35px",
    width: "60%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "black",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "18ch",
      "&:focus": {
        width: "36ch",
      },
    },
    [`@media screen and (min-width: 600px) and (max-width: 960px)`]: {
      width: "18ch",
      "&:focus": {
        width: "36ch",
      },
    },
  },
  titleSection: {
    position: "relative",
    marginLeft: "35px",
  },
  noData: {
    width: "35%",
    margin: "5% 0 0 35%",
    opacity: "0.6",
  },
}));

export default function MyRecord() {
  const classes = useStyles();
  const history = useHistory();
  const { userInfo } = useUserInfo();
  const [searchInput, setSearchInput] = useState("");
  const [matchModal, setMatchModal] = useState(false);

  const {
    data: recordList = [],
    isLoading: isListLoading,
    refetch: refetchRecordList,
    isFetching: isRecordListFetching,
  } = useQuery(
    "RecordList",
    async () => {
      const { data } = await axios.get("/api/match/records");
      return data;
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      onSuccess: () => {},
    }
  );

  const handleClick = (id) => () => {
    history.push(`/home/record/${id}`);
  };

  useEffect(() => {
    document.title = "比賽數據列表";
  }, []);

  if (isRecordListFetching || isListLoading) return <Loading />;

  return (
    <>
      <div className={classes.flexCenter}>
        <div className={classes.outFrame}>
          <div className={classes.titleSection}>
            <Typography className={classes.outTitle}>Records</Typography>
            <Divider className={classes.divider} />
          </div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
          </div>
          <div className={classes.outPaperFrame}>
            {recordList.length === 0 ? (
              <img
                src={`${process.env.PUBLIC_URL}/no-data.svg`}
                alt="no-data"
                className={classes.noData}
              />
            ) : (
              recordList
                .filter(
                  ({
                    type = "",
                    title = "",
                    date = "",
                    team = "",
                    opponent = "",
                  }) => {
                    if (!searchInput || searchInput === "") return true;
                    return (
                      type.includes(searchInput) ||
                      title.includes(searchInput) ||
                      date.includes(searchInput) ||
                      team.includes(searchInput) ||
                      opponent.includes(searchInput)
                    );
                  }
                )
                .map((element) => (
                  <Card key={element._id} className={classes.outCardFrame}>
                    <CardActionArea
                      className={classes.actionArea}
                      onClick={handleClick(element._id)}
                    >
                      {userInfo.isAdmin && userInfo.id === element.creator ? (
                        <div className={classes.deleteSection}>
                          <DeleteSection
                            recordId={element._id}
                            refetch={refetchRecordList}
                          />
                        </div>
                      ) : null}
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        align="left"
                        className={`${classes.type} ${classes.cardText}`}
                      >
                        {element.type}
                      </Typography>
                      <Typography
                        variant="h5"
                        className={`${classes.subtitle} ${classes.cardText}`}
                        align="left"
                      >
                        {element.team} v.s. {element.opponent}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        component="p"
                        align="right"
                        className={classes.cardText}
                      >
                        {element.date}
                      </Typography>
                    </CardActionArea>
                  </Card>
                ))
            )}
          </div>
        </div>
      </div>
      {userInfo.isAdmin ? (
        <AddButton
          inView
          openModal={() => setMatchModal(true)}
          height={60}
          width={60}
          bottom={48}
          right={20}
        />
      ) : null}
      <AddMatchModal
        open={matchModal}
        handleClose={() => setMatchModal(false)}
        refetch={refetchRecordList}
      />
    </>
  );
}
