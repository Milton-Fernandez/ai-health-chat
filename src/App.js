import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2'


function App() {
  const [textInput, setTextInput] = useState('')
  const [answerTest, setAnswerText] = useState('Heath answer...')
  const [userLogs, setUserLogs] = useState()
  const [chatBox, setChatBox] = useState([
    { message: 'Hey! Welcome to Health AI Chat Bot. Feel free to ask any question down below.', user: false } 
  ])

  
  useEffect(() => {
    setTextInput('')
    let processing = true
    
    axiosFetchData(processing)
    return() => {
      processing = true
    }
  }, [])


  const axiosFetchData = async () => {
    await axios.get('http://localhost:4000/logs').then(res => {
      setUserLogs(res.data)
    }).catch(err => {
      Swal.fire({
        icon: "error",
        title: "",
        text: "Sorry, something went wrong. Please try again later."
      });
    })
   
  }

  const axiosPostData = async() => {
    const postData = {
      text: textInput
    }

    if ( textInput !== '') {
      let myObject = { message: textInput, user: true };
      setChatBox(chatBox => [...chatBox, myObject])

      await axios.post('http://localhost:4000/message', postData)
      .then(res => {
        setAnswerText(res.data[0].response);
        let myObject = { message: res.data[0].response, user: false };
        setChatBox(chatBox => [...chatBox, myObject])

      }).catch(err => {
        Swal.fire({
          icon: "error",
          title: "",
          text: "Sorry, something went wrong. Please try again later.",
          confirmButtonColor: '#1976d2'
        });
      })
    } else {
      Swal.fire({
        icon: "error",
        confirmButtonColor: '#1976d2',
        title: "",
        text: "Please don't leave the input box empty"
      });
    }
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
  
        <div className="chat-window">
          {chatBox?.map(function (chat) {
            return (
              <div className={chat?.user ? 'chat-message chat-user' : 'chat-message chat-bot'}>
                <p className="chat-text">{chat?.message}</p>
              </div>
            )
          })}

        </div>

        <div className="input-container">
          <TextField label="Enter your question" value={textInput} onChange={(e)=> handleChange(e.target.value)}  fullWidth id="fullWidth" />
          <Button className="submit-button" onClick={() => handleSubmit(textInput) } variant="contained">Send</Button>
        </div>


      </div>
    </div>
  );
}

export default App;
