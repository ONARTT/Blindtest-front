import { video } from "./assets/videos.json"
import './App.css'
import displayVideo from './displayVideo'
import { useState } from "react";
import GameStart from "./GameStart.tsx";
import useLogin from "./useLogin.ts";
import WebPlayback from "./SpotifyPlayer.tsx";
import Cookies from "js-cookie";
import YoutubePlayer from "./YoutubePlayer.tsx";



function App() {
  const [startTimer, setStartTimer] = useState(false);
  const [test, setTest] = useState(false);
  const {
    connectToSpotify,
    getUserSongs,
  } = useLogin()
  

  const token = Cookies.get("access_token");

  return (
    <div>
      <h1>Test VGM</h1>
      
      <button onClick={() => connectToSpotify()}>Connect to spotify</button> 
      <button onClick={() => getUserSongs()}>Get User's songs</button> 
      <div id="vidContainer">
        <div id="gameSpace">
          
        </div>

        
        <button id="startButton" onClick={() => { setStartTimer(true);}}>Start</button>
        <button onClick={() => setStartTimer(false)}>Stop Timer </button> 
        
        {startTimer && <GameStart></GameStart>}

        <button onClick={() => setTest(true)}>test </button> 
        <script src="https://www.youtube.com/iframe_api"></script>
        {test && <YoutubePlayer></YoutubePlayer>}
        
      </div>
    </div>
  )
}

export default App
