import { video } from "./assets/videos.json"
import './App.css'
import displayVideo from './displayVideo'
import { useEffect, useState } from "react";
import GameStart from "./GameStart.tsx";
import useLogin from "./useLogin.ts";
import WebPlayback from "./SpotifyPlayer.tsx";
import Cookies from "js-cookie";
import YoutubePlayer from "./YoutubePlayer.tsx";
import useYtSearch from "./useYtSearch.ts";

interface TrackInfo {
  added_at: string;
  name: string;
  artist: string;
  url: string;
}
  
export interface EnrichedTrack extends TrackInfo {
  youtubeId: string,
}

function App() {
  const [startTimer, setStartTimer] = useState(false);
  const [test, setTest] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [final, setFinal] = useState<EnrichedTrack[]>()
  const {
    connectToSpotify,
    getUserSongs,
  } = useLogin()
  const {
    ytSearch,
  } = useYtSearch();
  

  const token = Cookies.get("access_token");

  
  const fillPlaylist = async (max: number, count: number) => {
        const params = new URLSearchParams({
            count: count.toString(),
            max: max.toString(),
        });

        const res = await fetch("http://127.0.0.1:3000/playlist?" + params, {
            method: 'GET',
        });

        const data = await res.json();
        setPlaylist(data);
    }
  fillPlaylist(449,30);

  const addYtIDs = async (tracks: (TrackInfo | null)[]) => {
    const filtered = tracks.filter((t): t is TrackInfo => t !== null);
    const enrichedTracks = await Promise.all(
      filtered.map(async(track) => {
        const youtubeId: string = await ytSearch(`${track.artist} ${track.name}`);
        return {
          ...track,
          youtubeId,
        };
      })
    );
    return enrichedTracks
  }
  
  

  return (
    <div>
      <h1>Test VGM</h1>
      
      <button onClick={() => connectToSpotify()}>Connect to spotify</button> 
      <button onClick={() => getUserSongs()}>Get User's songs</button> 
      <div id="vidContainer">
        <div id="gameSpace">
          
        </div>

        
        <button id="serser" onClick={async() => { await ytSearch(`${video[0].artist} ${video[0].name}`)}}>test</button>
        <button id="startButton" onClick={() => { setStartTimer(true);}}>Start</button>
        <button onClick={() => setStartTimer(false)}>Stop Timer </button> 
        
        {startTimer && final && <GameStart playlist={final}></GameStart>}

        
      </div>
    </div>
  )
}

export default App
