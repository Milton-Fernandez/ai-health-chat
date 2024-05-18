import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Robot from './Robot/index.js';
import Swal from 'sweetalert2'


function App() {
  const [textInput, setTextInput] = useState('')
  const [answerTest, setAnswerText] = useState('Heath answer...')

  useEffect(() => {
    setTextInput('')
    let processing = true
    //axiosFetchData(processing)
    return() => {
      processing = true
    }
  }, [])

  const axiosPostData = async() => {
    const postData = {
      text: textInput
    }

    await axios.post('http://localhost:4000/message', postData)
    .then(res => {
      setAnswerText(res.data[0].response);
      
    }).catch(err => {
      Swal.fire({
        icon: "error",
        title: "",
        text: "Sorry, something went wrong. Please try again later."
      });
    })
  }

  function handleChange(value) {
    setTextInput(value)
  }

  function handleSubmit(value) {
    setTextInput('')
    setAnswerText('')
    axiosPostData()
  }

  return (
    <div className="App">
      <div className="page-container">
        <Robot className="robot-container"/>
        <div className="input-container">
          <TextField label="Enter your question" value={textInput} onChange={(e)=> handleChange(e.target.value)}  fullWidth id="fullWidth" />
          <Button className="submit-button" onClick={() => handleSubmit(textInput) } variant="contained">Submit</Button>
        </div>

        <div className="answer-container">
          <div className="answer-container-text">
            <p>{answerTest}</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
