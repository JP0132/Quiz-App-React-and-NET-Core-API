import React, { useEffect, useState } from 'react'
import useStateContext from '../hooks/useStateContext'
import { ENDPOINT, createAPIEndpoint, BASE_URL} from '../api';
import { Box, Card, CardContent, CardHeader, CardMedia, LinearProgress, List, ListItemButton, Typography } from '@mui/material';
import { getFormatedTime } from '../helper';
import { useNavigate } from 'react-router-dom';


export default function Quiz() {

  const [qns, setQns] = useState([]);
  const [qnsIndex, setqnsIndex] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const {context, setContext} = useStateContext();
  const navigate = useNavigate();

  let timer;

  const startTimer = () =>{
    timer = setInterval(() => {
      setTimeTaken(prev => prev + 1);
    }, [1000])
  }

  useEffect(() => {
    //Refreshes the local storage upon refresh
    setContext({
        timeTaken: 0,
        selectedOptions: []
      });

    console.log("Caterogy", context.category);

    createAPIEndpoint(ENDPOINT.question)
      .fetchQuestions(context.category)
      .then(res=>{
        setQns(res.data)
        startTimer();
      })
      .catch(err=>{console.log(err);})

    return () => {clearInterval(timer)}

    }, []);

    const updateAnswer = (questionID, optionIndex) => {
      const temp = [...context.selectedOptions]
      temp.push({
        questionID,
        selected: optionIndex
      })

      //Checks if its is the last question
      //If: increment index for next question
      //Else: Save all data for results
      if(qnsIndex < 4){
        setContext({selectedOptions:[...temp]})
        setqnsIndex(qnsIndex+1)
      }

      else{
        setContext({
          selectedOptions:[...temp],
          timeTaken: timeTaken
        })
        navigate("/result")
      }
    }


   
    return (
      qns.length !== 0 ? 
      <Card sx={{maxWidth:640,mx:'auto', mt: 5, '& MuiCardHeader-action': {m: 0, alignSelf: 'center'}}}>
        <CardHeader 
          title={'Question ' + (qnsIndex + 1) + ' of 5'}
          action={<Typography>{getFormatedTime(timeTaken)}</Typography>}/>
          <Box>
            <LinearProgress variant="determinate" value={(qnsIndex+1)*100/5}/>
          </Box>
          {
            qns[qnsIndex].imageName != null
              ? <CardMedia 
                    component="img"
                    image={BASE_URL+'images/'+qns[qnsIndex].imageName}
                    sx={{width:'auto', height:'300px', m:'10px auto'}}
                />
              : null
          }
        <CardContent>
          <Typography variant='h6'>
            {qns[qnsIndex].questionName}
          </Typography>
          <List>
          {qns[qnsIndex].options.map((item, optionIndex) =>
            <ListItemButton key={optionIndex} disableRipple onClick={() => updateAnswer(qns[qnsIndex].questionID, optionIndex)}>
              <div>
                <b>{String.fromCharCode(65+optionIndex)+"."}{item}</b>
              </div>
            </ListItemButton>
          )}
            
          </List>

        </CardContent>

      </Card>
      :null
    
  )
}


