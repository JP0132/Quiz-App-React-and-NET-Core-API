import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINT } from "../api";
import useForm from "../hooks/useForm";
import useStateContext from "../hooks/useStateContext";
import Centre from "./Centre";
import { useNavigate } from "react-router-dom";

// Getting the details of the user.
export const getLoginDetails = () => ({
  name: "",
  email: "",
  password: "",
});

export default function Login() {
  const { context, setContext, resetContext } = useStateContext();
  const navigate = useNavigate();
  const [userType, setUserType] = useState("participant");

  const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(getLoginDetails);

  useEffect(() => {
    resetContext();
  }, []);

  const login = (e) => {
    e.preventDefault();
    if (validate()) {
      if (userType === "participant") {
        createAPIEndpoint(ENDPOINT.participant)
          .post(values)
          .then((res) => {
            console.log(res);
            setContext({ participantID: res.data.participantID});
            navigate("/categories");
          })
          .catch((err) => console.log(err));
      }else{
        createAPIEndpoint(ENDPOINT.admin)
          .fetchByObject(values)
          .then((res) => {
            console.log(res);
            setContext({ participantID: res.data.adminID, type: "admin" });
            navigate("/dashboard");
          })
          .catch((err) => console.log(err));

      }
    }
  };

  const validate = () => {
    let temp = {};
    temp.email = /\S+@\S+\.\S+/.test(values.email) ? "" : "Email is not valid.";
    temp.name = values.name !== "" ? "" : "This field is required.";
    if (userType === "admin") {
      temp.password = values.password !== "" ? "" : "This field is required";
    }
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const changeType = (e, type) => {
    setUserType(type);
  };

  return (
    <Centre>
      {context.participantID}
      <Card sx={{ width: "400px" }}>
        <Tabs value={userType} onChange={changeType} centered>
          <Tab label="Participant" value="participant" />
          <Tab label="Admin" value="admin" />
        </Tabs>

        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h3" sx={{ my: 3 }}>
            Quiz App
          </Typography>
          <Box
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: "90%",
              },
            }}
          >
            <form noValidate onSubmit={login}>
              <TextField
                label="Email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                variant="outlined"
                {...(errors.email && { error: true, helperText: errors.email })}
              />
              <TextField
                label="Name"
                name="name"
                value={values.name}
                onChange={handleInputChange}
                variant="outlined"
                {...(errors.name && { error: true, helperText: errors.name })}
              />
              {userType === "admin" && (
                <TextField
                  label="Password"
                  name="password"
                  value={values.password}
                  onChange={handleInputChange}
                  variant="outlined"
                  {...(errors.password && {
                    error: true,
                    helperText: errors.password,
                  })}
                />
              )}
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ width: "90%" }}
              >
                Login
              </Button>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Centre>
  );
}
