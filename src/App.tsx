import { video } from "./assets/videos.json"
import './App.css'
import displayVideo from './displayVideo'
import { useEffect, useState } from "react";
import GameStart from "./GameStart.tsx";
import useLogin from "./useLogin.ts";
import WebPlayback from "./SpotifyPlayer.tsx";
import Cookies from "js-cookie";
import YoutubePlayer from "./YoutubePlayer.tsx";
import useYtSearch from "./usePlayer.ts";

export interface TrackInfo {
  added_at: string;
  name: string;
  artist: string;
  url: string;
  uri: string;
}
  
export interface EnrichedTrack extends TrackInfo {
  youtubeId: string,
}

export interface TrackData {
  device_id: string | undefined;
  is_paused: boolean;
  is_active: boolean;
  current_track: Track;
}

export type Track = {
  name: string;
  album: {
    images: {
      url: string;
    }[];
  };
  artists: {
    name: string;
  }[];
};

const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}


function App() {
  const [startTimer, setStartTimer] = useState(false);
  const [test, setTest] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [final, setFinal] = useState<EnrichedTrack[]>()
  const [player, setPlayer] = useState<Spotify.Player>();
  const [device_id, setDeviceId] = useState<string>();
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);
  const {
    connectToSpotify,
    getUserSongs,
  } = useLogin()
  const {
    ytSearch,
    loadTrack,
  } = useYtSearch();
  

  const accessToken = Cookies.get("access_token");

  
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
  

  useEffect(() => {
    fillPlaylist(449,30);
  },[])
  // const addYtIDs = async (tracks: (TrackInfo | null)[]) => {
  //   const filtered = tracks.filter((t): t is TrackInfo => t !== null);
  //   const enrichedTracks = await Promise.all(
  //     filtered.map(async(track) => {
  //       const youtubeId: string = await ytSearch(`${track.artist} ${track.name}`);
  //       return {
  //         ...track,
  //         youtubeId,
  //       };
  //     })
  //   );
  //   return enrichedTracks
  // }
  

   useEffect(() => {
      if (accessToken){
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
  
        document.body.appendChild(script);
  
        window.onSpotifyWebPlaybackSDKReady = () => {
  
            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(accessToken); },
                volume: 0.09
            });
  
            setPlayer(player);
  
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                setDeviceId(device_id);
                document.cookie ="device_id=" + device_id;
            });
  
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });
  
            player.addListener('player_state_changed', ( state => {
                if (!state) {
                    return;
                }
  
                setTrack(state.track_window.current_track);
                setPaused(state.paused);
  
                player.getCurrentState().then( state => { 
                    (!state)? setActive(false) : setActive(true) 
                });
            }));
  
            console.log("is active",is_active);
            console.log("track",track);
            console.log("curent_track",current_track);
  
            player.connect();
        }
      };
     
    }, []);
  
    const trackData: TrackData = {
      current_track: current_track,
      device_id: device_id,
      is_active: is_active,
      is_paused: is_paused,

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
        
        {startTimer && <GameStart playlist={playlist} player={player} trackData={trackData}></GameStart>}
        

        
      </div>
    </div>
  )
}

export default App
