import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { createAPIEndpoint, ENDPOINT } from "../api";
import useForm from "../hooks/useForm";
import useStateContext from "../hooks/useStateContext";
import Centre from "./Centre";
import { useNavigate } from "react-router-dom";

export const getLoginDetails = () => ({
    name: '',
    email: '',
});

export default function Login() {
  const {context, setContext, resetContext} = useStateContext();
  const navigate = useNavigate();

  const { values, setValues, errors, setErrors, handleInputChange } = useForm(getLoginDetails);

  useEffect(() => {
    resetContext()
    
  }, [])
  

  const login = e => {
    e.preventDefault();
    if(validate()){
        createAPIEndpoint(ENDPOINT.participant)
        .post(values)
        .then(res => {
          setContext({participantID: res.data.participantID})
          navigate('/quiz')
        })
        .catch(err => console.log(err));
    }

   
  }

  const validate = () => {
    let temp = {};
    temp.email = (/\S+@\S+\.\S+/).test(values.email)?"":"Email is not valid.";
    temp.name =  values.name !== ""?"":"This field is required.";
    setErrors(temp);
    return Object.values(temp).every(x=> x === "");

  }

  return (
    <Centre>
      {context.participantID}
      <Card sx={{ width: "400px" }}>
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
              <TextField label="Email" name="email" value={values.email} onChange={handleInputChange} variant="outlined" {...(errors.email && {error:true, helperText: errors.email})}/>
              <TextField label="Name" name="name" value={values.name} onChange={handleInputChange} variant="outlined"  {...(errors.name && {error:true, helperText: errors.name})}/>
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
