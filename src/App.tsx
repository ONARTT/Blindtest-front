import { video } from "./assets/videos.json"
import './App.css'
import displayVideo from './displayVideo'
import { useState } from "react";
import GameStart from "./GameStart.tsx";



const vidId = Math.floor(Math.random() * 4);


function App() {
  const [startTimer, setStartTimer] = useState(false);
  return (
    <div>
      <h1>Test VGM</h1>
      <div id="vidContainer">
        <div id="gameSpace">
          
        </div>

        
        <button id="startButton" onClick={() => { setStartTimer(true);}}>Start</button>
        <button onClick={() => setStartTimer(false)}>Stop Timer </button> 
        
        {startTimer && <GameStart></GameStart>}
      </div>
    </div>
  )
}

export default App
