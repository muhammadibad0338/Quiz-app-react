import React, { useState, useEffect } from "react"
import logo from './logo.svg';
import './App.css';
import Question from './questions.json';
import { makeStyles, createStyles } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Rating from '@material-ui/lab/Rating';


const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    bar: {
      backgroundColor: "rgb(157, 157, 158)",
      height: 15,
      marginBottom: 50
    },
    card: {
      width: '60%',
      margin: '0 auto',
      height: '91vh',
      boxShadow: 'none',
    },
    typh5: {
      marginBottom: '10%',
      marginTop: '5%'
    },
    bottomProgress: {
      width: '100%',
      border: "1px solid black",
      borderRadius: '4px',
      height: '50px',
      display: "flex",
    },
    lc: {
      backgroundColor: "black",
      height: "100%"
    },
    score: {
      backgroundColor: "gray",
      height: '100%'
    },
    Maxscore: {
      backgroundColor: "#c1bbbb",
      height: '100%'
    },
    Scoreboard: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: '22%'
    },
    Scrbrd: {
      display: "flex",
      justifyContent: "space-between",
    }

  }),
);


function App() {
  const classes = useStyles();
  const [number, setnumber] = useState(0)
  const [disButon, setdisButton] = useState(false)
  const [Answer, setAnswer] = useState('')
  const [correct, setcorrect] = useState(0)
  const [wrong, setwrong] = useState(0)
  const [questnBar, setquestnBar] = useState(100 / Question.length)
  const [leastScore, setleastScore] = useState(0);
  const [scoreperc, setscoreperc] = useState(0);
  const [maxScore, setmaxScore] = useState(0);
  const [option, setoption] = useState([]);
  const [select, setselect] = useState()
  // console.log(Question)
  // console.log(Question[number].correct_answer)


  // const shuffleArray = (array) =>{
  //  return [...array].sort(() => Math.random() - 0.5);
  // }
  // let option = [...Question[number].incorrect_answers, Question[number].correct_answer]
  // const shuffleArray= () =>{
  //   if(!disButon){
  //    return   [...Question[number].incorrect_answers, Question[number].correct_answer].sort(() => Math.random() - 0.5);
  //   }

  // }

  // let option = [...Question[number].incorrect_answers, Question[number].correct_answer].sort(() => Math.random() - 0.5);
  const rating = () => {
    if (Question[number].difficulty == "hard") {
      return 3
    }
    else if (Question[number].difficulty == "medium") {
      return 2
    }
    else if (Question[number].difficulty == "easy") {
      return 1
    }
  }


  const hande = (val, i) => {
    setselect(i)
    setdisButton(true)
    // console.log(val)
    if (val === Question[number].correct_answer) {
      setAnswer("Correct!")
      setcorrect(correct + 1)
      // setleastScore((correct*100)/Question.length)
    }
    else {
      setAnswer("Sorry!")
      setwrong(wrong + 1)
    }
  }

  const nextQuestion = () => {
    setselect(99)
    setnumber(number + 1)
    // setquestnBar(Math.floor(((number+2) / Question.length) * 100))
    setquestnBar((e) => e + (100 / Question.length))
    setdisButton(false)
  }

  useEffect(() => {
    setleastScore((correct * 100) / Question.length)
    setscoreperc(Math.floor((correct / (correct + wrong)) * 100))
    setmaxScore(Math.floor((correct + (Question.length - (correct + wrong))) * 100) / Question.length)
  }, [correct])
  useEffect(() => {
    setscoreperc(Math.floor((correct / (correct + wrong)) * 100))
    setmaxScore(Math.floor((correct + (Question.length - (correct + wrong))) * 100) / Question.length)
  }, [wrong])
  useEffect(() => {
    let option = [...Question[number].incorrect_answers, Question[number].correct_answer];
    if (!disButon) {
      setoption([...option].sort(() => Math.random() - 0.5));
    }
  }, [number])

  return (
    <div >
      <Grid container className="root">
        <Grid item xs={8}>
          <Paper className={classes.root}>
            {/* <h2>correct{correct} wrong{wrong}</h2> */}
            <div className={classes.bar} style={{ width: questnBar + '%' }} />
            {/* <h2>{questnBar}%</h2> */}
            <Card className={classes.card}>
              <Typography variant="h4" gutterBottom={true}>Question {number + 1} of {Question.length}</Typography>
              <Typography gutterBottom={true}>{decodeURIComponent(Question[number].category)}</Typography>
              <Rating name="read-only" value={rating()} readOnly size="small" style={{ color: "black" }} />
              <Typography variant="h5" className={classes.typh5} >{decodeURIComponent(Question[number].question)}</Typography>
              {
                option.map((val, i) => {
                  return (
                    <button key={i} disabled={disButon} className={select == i ? "selBtn" : "optBtn"} onClick={() => hande(val, i)}>{decodeURIComponent(val)}</button>
                  )
                })
              }
              {
                disButon && <div>
                  <h1>{Answer}</h1>
                  {number < Question.length - 1 ? <button onClick={nextQuestion} className="nxt">Next Question</button> : null}
                </div>
              }
              <div className={disButon ? classes.Scrbrd : classes.Scoreboard}>
                <h5>Score: {scoreperc ? scoreperc : 0}%</h5>
                <h5>Max Score: {maxScore}%</h5>
              </div>
              <Grid item xs={12} className={classes.bottomProgress}>
                {/* <div className={classes.bottomProgress}></div> */}
                <div className={classes.lc} style={{ width: leastScore + "%" }} />
                <div className={classes.score} style={{ width: scoreperc - leastScore + "%" }} />
                <div className={classes.Maxscore} style={{ width: maxScore - scoreperc + "%" }} />
              </Grid>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;