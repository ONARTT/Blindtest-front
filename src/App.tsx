import { video } from "./assets/videos.json"
import './App.css'
import displayVideo from './displayVideo'
import { useState } from "react";
import GameStart from "./GameStart.tsx";


const vidId = Math.floor(Math.random() * 4);

var guess: string;

function setGuess(e: string) {
  return guess = e;
}

const handleGuess = (e: React.KeyboardEvent) => {

  if (e.key == 'Enter') {
    if (guess == video[vidId].name) {
      alert("correct");
    }
  }
  
}



function App() {
  const [startTimer, setStartTimer] = useState(false);
  return (
    <div>
      <h1>Test VGM</h1>
      <div id="vidContainer">


        <input id="inputGuess" placeholder='Guess ...' value={guess} onKeyDown={handleGuess} onChange={(e) => setGuess(e.target.value)}></input>
        <button id="startButton" onClick={() => {document.getElementById("vidContainer")?.insertBefore(displayVideo(vidId), document.getElementById("inputGuess")); setStartTimer(true);}}>Start</button>
        <button onClick={() => setStartTimer(true)}>Start Timer </button> 
        <button onClick={() => setStartTimer(false)}>Stop Timer </button> 
        
        <GameStart></GameStart>
      </div>
    </div>
  )
}

export default App
