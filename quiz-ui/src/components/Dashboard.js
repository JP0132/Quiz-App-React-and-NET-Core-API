import React, { useEffect, useState } from "react";
import useStateContext from "../hooks/useStateContext";
import { BASE_URL, ENDPOINT, createAPIEndpoint } from "../api";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Tabs,
  Tab,
  List,
  ListItem,
  CardMedia,
  Select,
  MenuItem,
} from "@mui/material";
import { green, grey, purple } from "@mui/material/colors";
import QuestionForm from "./QuestionFrom";

export default function Dashboard() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isCreateQuestionModalOpen, setCreateQuestionModalOpen] =
    useState(false); // State to control modal visibility

  useEffect(() => {
    createAPIEndpoint(ENDPOINT.categories)
      .fetchCategories()
      .then((res) => {
        setAllCategories(res.data);
        console.log(allCategories);
      })
      .catch((err) => {
        console.log(err);
      });

    createAPIEndpoint(ENDPOINT.allQuestions)
      .fetch()
      .then((res) => {
        setAllQuestions(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // return () => {
    //   second
    // }
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleCreateQuestionModalOpen = () => {
    setCreateQuestionModalOpen(true);
  };

  const handleCreateQuestionModalClose = () => {
    setCreateQuestionModalOpen(false);
  };

  const filteredQuestions = selectedCategory
    ? allQuestions.filter(
        (question) => question.categoryID === selectedCategory
      )
    : allQuestions;

  //filter((question) => question.categoryID === selectedCategory.categoryID)

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "20px 10px 10px 10px",
        }}
      >
        <Button
          onClick={handleCreateQuestionModalOpen}
          sx={{ backgroundColor: grey[800] }}
        >
          Create New Question
        </Button>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          sx={{ backgroundColor: grey[800] }}
        >
          <MenuItem value="">All</MenuItem>
          {allCategories.map((category, index) => (
            <MenuItem value={category.categoryID} key={category.categoryID}>
              {category.categoryName}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {filteredQuestions.map((question, index) => (
          <Card
            sx={{
              minWidth: 275,
              padding: 5,
              margin: "10px",
              textAlign: "center",
              cursor: "pointer",

              //backgroundColor: selectedCategories.indexOf(category.categoryID) != -1 ? "blue" : "",
            }}
            key={question.questionID}
            variant="outlined"
          >
            <CardContent>
              <Typography variant="h6" component="h2">
                {question.questionName}
              </Typography>
              {question.imageName ? (
                <CardMedia
                  component="img"
                  image={BASE_URL + "images/" + question.imageName}
                  sx={{ width: "auto", height: "150px", m: "10px auto" }}
                />
              ) : null}
              <List>
                
                <ListItem sx={{color: 0 === question.answer ? green[500] : ""}}>{question.option1}</ListItem>
                <ListItem sx={{color: 1 === question.answer ? green[500] : ""}}>{question.option2}</ListItem>
                <ListItem sx={{color: 2 === question.answer ? green[500] : ""}}>{question.option3}</ListItem>
                <ListItem sx={{color: 3 === question.answer ? green[500] : ""}}>{question.option4}</ListItem>
              </List>
            </CardContent>
          </Card>
        ))}
      </div>
      <QuestionForm
        isOpen={isCreateQuestionModalOpen}
        onClose={handleCreateQuestionModalClose}
        categories={allCategories}
      />
    </div>
  );
}
