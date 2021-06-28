import { React, useState } from "react";
import {
  Paper,
  Button,
  Typography,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import "../css/Profile.css";

import EditProfile from "./EditProfile";

export default function Profile() {
  const [open, setOpen] = useState(false);

  const [profileData, setProfileData] = useState({
    username: "洪佳生",
    city: "Taipei",
    position: "Lifter",
    isAdmin: true,
    about:
      "Web Developer\nLives in New York\nPhotographer\nPhotographer\nPhotographer\nPhotographer\nPhotographer\nPhotographer\nPhotographer\nPhotographer\nPhotographer\nPhotographer\nPhotographer\nPhotographer\nPhotographer",
  });

  const mappingArrayToText = (array) => {
    if (array.length === 0 || (array.length === 1 && array[0] === ""))
      return (
        <Typography
          variant="body1"
          component="p"
          className="font-italic mb-0 profileText"
        >
          &nbsp;none
        </Typography>
      );
    return array.map((el, i, all) => {
      return (
        <Typography
          key={`${i}+${el}`}
          variant="body1"
          component="p"
          className="font-italic mb-0 profileText"
        >
          &nbsp;{el}
        </Typography>
      );
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="row py-5 ">
      <div className="margin-sm col-md-5 mx-auto">
        <Paper
          elevation={3}
          style={{
            minHeight: "650px",
            minWidth: "450px",
            overflow: "hidden",
          }}
        >
          <div className="px-4 pt-0 pb-4 cover">
            <div className="media align-items-end profile-head">
              <div className="profile mr-3 d-flex flex-column">
                <img
                  src="/profileTest.jpeg"
                  alt="..."
                  width="170"
                  className="rounded mb-2 img-thumbnail"
                />
                <Button variant="outlined" onClick={handleClickOpen}>
                  Edit profile
                </Button>
              </div>
              <div className="media-body mb-5 text-white">
                <h4 className="mt-0 mb-0 profileUser">
                  {profileData.username}
                </h4>
                <p className="mt-0 mb-3">{profileData.city}</p>
              </div>
            </div>
          </div>
          <div className="bg-light p-4 d-flex justify-content-end text-center">
            <ul className="list-inline mb-0">
              <li className="list-inline-item px-3">
                <h2 className="font-weight-bold mb-0 d-block">
                  {profileData.position}
                </h2>
                <small className="text-muted">Position</small>
              </li>
              <li className="list-inline-item px-3">
                <h2 className="font-weight-bold mb-0 d-block">
                  {profileData.isAdmin ? "Admin" : "User"}
                </h2>
                <small className="text-muted">identity</small>
              </li>
            </ul>
          </div>
          <div className="px-4 py-3">
            <h5 className="mb-0 profileTitle">About</h5>
            <div
              className="p-4 rounded shadow-sm bg-light"
              style={{
                minHeight: "350px",
                maxHeight: "400px",
                overflow: "scroll",
              }}
            >
              {mappingArrayToText(profileData.about.split("\n"))}
            </div>
          </div>
        </Paper>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <EditProfile
            handleClose={handleClose}
            ProfileData={profileData}
            setProfileData={setProfileData}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
