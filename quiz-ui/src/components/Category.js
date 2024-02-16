import { createAPIEndpoint, ENDPOINT } from "../api";
import { Button, Grid, Typography, Card, CardContent } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import Centre from "./Centre";
import useStateContext from "../hooks/useStateContext";
import { useNavigate } from "react-router-dom";
import { purple, teal } from "@mui/material/colors";


export default function Category() {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(0);
  const { context, setContext, resetContext } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    createAPIEndpoint(ENDPOINT.categories)
      .fetchCategories()
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  

  // const handleCategoryToggle = (categoryId) => () => {
  //   const currentIndex = selectedCategories.indexOf(categoryId);
  //   const newSelectedCategories = [...selectedCategories];

  //   if (currentIndex === -1) {
  //     newSelectedCategories.push(categoryId);
  //   } else {
  //     newSelectedCategories.splice(currentIndex, 1);
  //   }
  //   //console.log(newSelectedCategories);
  //   setSelectedCategories(newSelectedCategories);
  // };

const handleSelectedCategory = (categoryID) => () => {
  setSelectedCategories(categoryID);
}

  const handleSubmit = () => {
    setContext({category: selectedCategories})
    console.log("Selected Categories:", selectedCategories);
    navigate("/quiz");
    
  };

  return (
    <div style={{display:"flex", flexDirection: "column", alignItems: "center"}}>
      <Grid container spacing={3} justifyContent={"center"}>
        {categories.map((category) => (
          <Grid item key={category.categoryID}>
            <Card
              sx={{
                minWidth: 275,
                padding: 5,
                margin: "10px",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: selectedCategories === category.categoryID ? purple[500] : "",
                //backgroundColor: selectedCategories.indexOf(category.categoryID) != -1 ? "blue" : "",
              }}
              variant="outlined"
              onClick={handleSelectedCategory(category.categoryID)}
            >
              <CardContent>
                <Typography variant="h6" component="h2">
                  {category.categoryName}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Start Quiz
      </Button>
    </div>
  );
}
