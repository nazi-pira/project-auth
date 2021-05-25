import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../reducers/auth";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const url = process.env.REACT_APP_API_URL || "http://localhost:8080";

const handleSubmit = (
  event,
  name,
  email,
  password,
  dispatch,
  setIsRegistered
) => {
  event.preventDefault();
  console.log(url);
  fetch(`${url}/registration`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.json());
      }
    })
    .then((json) => {
      dispatch(auth.actions.userRegistered(json));
      setIsRegistered(true);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <div className="form-container">
      {isRegistered && (
        <div className="registered-success">
          <p className="success-message">
            You are now registered
            <span role="img" aria-label="check-mark">
              ✔️
            </span>
          </p>
          <button
            className="redirect-button"
            onClick={() => {
              dispatch(auth.actions.toggleSigninForm());
            }}
          >
            {" "}
            sign in to your account
          </button>
        </div>
      )}
      {!isRegistered && (
        <>
          <div className="upper-form-container">
            <h2>Sign up</h2>
            <p>
              Or{" "}
              <button
                className="redirect-button"
                onClick={() => {
                  dispatch(auth.actions.toggleSigninForm());
                }}
              >
                {" "}
                sign in to your account
              </button>
            </p>
          </div>

          <form
            onSubmit={(event) =>
              handleSubmit(
                event,
                name,
                email,
                password,
                dispatch,
                setIsRegistered
              )
            }
          >
            <div className="text-input">
              <TextField
                required
                className="outlined-basic"
                variant="outlined"
                label="Name"
                onChange={(event) => setName(event.target.value)}
              />
              <TextField
                required
                className="outlined-basic"
                variant="outlined"
                label="E-mail"
                type="email"
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                required
                className="outlined-basic"
                variant="outlined"
                label="Password"
                type="password"
                autoComplete="off"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <Button variant="contained" disableElevation type="submit">
              Create account
            </Button>
          </form>
        </>
      )}
    </div>
  );
};
