import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { Track, TrackData } from "./App.tsx";


declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
  }
}

interface IPlayerPage {
  player: Spotify.Player | undefined;
  trackData: TrackData;
}

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


export const PlayerPage = (props: IPlayerPage) => {
  const [device_id, setDeviceId] = useState<string>();
  const [is_paused, setPaused] = useState(false);


  const  accessToken  = Cookies.get("access_token");



  const searchAndLoadTrack = async () => {
    const searchRequestOptions: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
    };

    const searchRequestResponse = await fetch('https://api.spotify.com/v1/search?q=track%3AHero%27s+Come+Back%21%21&type=track&market=FR', searchRequestOptions);
    const searchRequestData = await searchRequestResponse.json();
    const { uri } = searchRequestData.tracks.items[0];
    console.log("uri", uri)

    const playRequestOptions: RequestInit = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      body: JSON.stringify({
        "uris": [uri],
        "position_ms": 0
      })
    }
    
    const playRequestResponse = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, playRequestOptions);
    const playRequestData = await playRequestResponse.json();
    console.log("playrequestData",playRequestData);
  } 



  return (
    <div className='answerBlock'>
      <div id="answer" style={{visibility: "hidden"}}>
        <div className="container">
            {props.trackData.current_track.album.images[0].url &&
              <div className="main-wrapper">
                <img src={props.trackData.current_track.album.images[0].url} 
                      className="now-playing__cover" alt="" />

                <div className="now-playing__side">
                    <div className="now-playing__name">{
                                  props.trackData.current_track.name
                                  }</div>

                    <div className="now-playing__artist">{
                                  props.trackData.current_track.artists[0].name
                                  }</div>
                </div>
            </div>}
            {props.player && (
              <>
                <button className="btn-spotify" onClick={() => { props.player?.previousTrack() }} >
                      &lt;&lt;
                </button>

                <button className="btn-spotify" onClick={() => { props.player?.togglePlay() }} >
                    { is_paused ? "PLAY" : "PAUSE" }
                </button>

                <button className="btn-spotify" onClick={() => { props.player?.nextTrack() }} >
                      &gt;&gt;
                </button>
              </>
            )}<br/>
            <button onClick={() => {searchAndLoadTrack()}}>Search</button>
        </div>
        </div>
      </div>
  )
}

export default PlayerPage
