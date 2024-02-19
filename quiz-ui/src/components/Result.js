import React, { useEffect, useState } from "react";
import useStateContext from "../hooks/useStateContext";
import { ENDPOINT, createAPIEndpoint } from "../api";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getFormatedTime } from "../helper";
import { green, purple } from "@mui/material/colors";
import Answer from "./Answer";

export default function Result() {
  const { context, setContext } = useStateContext();
  const [score, setScore] = useState(0);
  const [qnsAnswers, setQnsAnswers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const ids = context.selectedOptions.map((x) => x.questionID);
    createAPIEndpoint(ENDPOINT.getAnswers)
      .post(ids)
      .then((res) => {
        const mergeQnA = context.selectedOptions.map((x) => ({
          ...x,
          ...res.data.find((y) => y.questionID === x.questionID),
        }));
        setQnsAnswers(mergeQnA);
        calculateScore(mergeQnA);
      })
      .catch((err) => console.log(err));
  }, [context.selectedOptions]);

  const calculateScore = (qna) => {
    let tempScore = qna.reduce((acc, curr) => {
      return curr.answer === curr.selected ? acc + 1 : acc;
    }, 0);
    setScore(tempScore);
  };

  const restart = () => {
    setContext({
      timeTaken: 0,
      selectedOptions: [],
    });
    navigate("/quiz");
  };

  const submitScore = () => {
    createAPIEndpoint(ENDPOINT.participant)
      .put(context.participantID, {
        participantID: context.participantID,
        score: score,
        timeTaken: context.timeTaken,
      })
      .then((res) => {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 4000);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const backToCategories = () => {
    navigate("/categories");
  };

  return (
    <>
      <Card
        sx={{
          mt: 5,
          display: "flex",
          width: "100%",
          maxWidth: 640,
          mx: "auto",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <CardContent sx={{ flex: "1 0 auto", textAlign: "center" }}>
            <Typography variant="h4">Congratulations!</Typography>

            <Typography variant="h6">YOUR SCORE</Typography>

            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              <Typography variant="span" color={green[500]}>
                {score}
              </Typography>
              /5
            </Typography>

            <Typography variant="h6">
              Took {getFormatedTime(context.timeTaken) + " mins"}
            </Typography>

            <Button
              variant="contained"
              sx={{ mx: 1, backgroundColor: purple[500]}}
              size="small"
              onClick={submitScore}
            >
              Submit
            </Button>

            <Button
              variant="contained"
              sx={{ mx: 1 }}
              size="small"
              onClick={restart}
            >
              Re-try
            </Button>

            <Button
              variant="contained"
              sx={{ mx: 7, marginTop: 5 }}
              size="small"
              onClick={backToCategories}
            >
              Back to Categories
            </Button>

            <Alert
              severity="success"
              variant="string"
              sx={{
                width: "60%",
                m: "auto",
                visibility: showAlert ? "visible" : "hidden",
              }}
            >
              Score Updated
            </Alert>
          </CardContent>
        </Box>

        <CardMedia component="img" sx={{ width: 220 }} image="./congrats.png" />
      </Card>
      <Answer qnsAnswer={qnsAnswers} />
    </>
  );
}
