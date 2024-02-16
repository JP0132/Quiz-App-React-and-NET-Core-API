import React, { useState } from "react";
import {
  Button,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material"; // Import necessary components from Material-UI
import { grey } from "@mui/material/colors";
import { ENDPOINT, createAPIEndpoint } from "../api";

const QuestionForm = ({ isOpen, onClose, categories }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [category, setCategory] = useState(0);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = () => {
    if (!handleValidation) {
      alert("Fill in entire form please!");
    } else {
      const newQuestion = {
        questionName: question,
        option1: options[0],
        option2: options[1],
        option3: options[2],
        option4: options[3],
        answer: correctAnswer,
        categoryID: category,
      };

      createAPIEndpoint(ENDPOINT.newQuestion)
        .postNewQuestion(newQuestion)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      // Reset form fields
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
      setCategory(0);
      onClose();
    }
    // Handle form submission here, sending data to server)

    //window.location.reload();
  };

  const handleValidation = () => {
    // const checkArray = arraysAreEqual(options, ["", "", "", ""]);
    // if (
    //   question != "" ||
    //   correctAnswer != "" ||
    //   category != 0 ||
    //   arraysAreEqual(options, ["", "", "", ""])
    // ) {
    //   console.log("sfgoksadjgk");
    //   return false;
    // }
    // return true;
  };

  const arraysAreEqual = (arr1, arr2) => {
    // Check if the arrays have the same length
    if (arr1.length !== arr2.length) {
      return false;
    }

    // Check if all elements are equal
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    // If all elements are equal and lengths are the same, arrays are equal
    return true;
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          backgroundColor: grey[900],
          transform: "translate(-50%, -50%)",
          boxShadow: 24,
          p: 4,
          width: 400,
        }}
      >
        <TextField
          label="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          fullWidth
          margin="normal"
        />

        {[0, 1, 2, 3].map((index) => (
          <TextField
            key={index}
            label={`Option ${index + 1}`}
            value={options[index]}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            fullWidth
            margin="normal"
          />
        ))}

        <FormControl fullWidth margin="normal">
          <InputLabel>Correct Answer</InputLabel>
          <Select
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value - 1)}
          >
            {[0, 1, 2, 3].map((index) => (
              <MenuItem key={index} value={index + 1}>
                Option {index + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category.categoryID} value={category.categoryID}>
                {category.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" onClick={handleSubmit} sx={{ mr: 2 }}>
          Submit
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default QuestionForm;
