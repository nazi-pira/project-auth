import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { auth } from "../reducers/auth";

const url = process.env.REACT_APP_API_URL || "http://localhost:8080";

export const LoggedInArea = () => {
  const dispatch = useDispatch();
  const { accessToken, name } = useSelector((store) => store.auth.user);

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`${url}/`, {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.json());
        }
      })
      .then((json) => {
        setData(json);
      })
      .catch((err) => {
        dispatch(auth.actions.logOutUser());
      });
  }, [accessToken, dispatch]);

  return (
    <div className="logedin-area">
      <h2>Welcome {name}</h2>
      <List
        className="secret-message"
        component="nav"
        aria-label="secondary mailbox folders"
      >
        {data.map((item, index) => (
          <ListItem button key={index}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
      <Button
        className="signout-btn"
        disableElevation
        variant="contained"
        color="primary"
        type="button"
        onClick={() => dispatch(auth.actions.logOutUser())}
      >
        Sign out
      </Button>
    </div>
  );
};
