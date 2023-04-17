import { Accordion, AccordionDetails, AccordionSummary, Box, CardMedia, List, ListItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import { BASE_URL } from '../api'
import { green, red } from '@mui/material/colors';

export default function Answer({qnsAnswer}) {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (e, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    const markCorrectOrNot = (qna, index) => {
        if([qna.answer, qna.selected].includes(index)){
            console.log("hi");
            return { sx: { color: qna.answer === index ? green[500] : red[500]}}
        }
    }


    
  return (
    <Box sx={{mt: 5, width: '100%', maxWidth: 640, mx: 'auto'}}>
        {
            qnsAnswer.map((question, j) => (<Accordion
                disableGutters
                key={j}
                expanded={expanded === j}
                onChange={handleChange(j)}
                >
                <AccordionSummary>
                    <Typography
                        sx={{width: '90%', flexShrink: 0}}>
                        {question.questionName}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {question.imageName ?
                        <CardMedia
                            component="img"
                            image={BASE_URL + 'images/' + question.imageName}
                            sx={{width:'auto', height:'300px', m:'10px auto'}}
                        /> : null 
                    }

                    <List>
                        {question.options.map((choices, index) =>
                            <ListItem>
                                <Typography {...markCorrectOrNot(question, index)}>
                                    <b>
                                        {String.fromCharCode(65 + index) + "."}
                                    </b>{choices}
                                </Typography>
                            </ListItem>
                        )}
                    </List>


                </AccordionDetails>

            </Accordion>))
        }

    </Box>
  )
}
