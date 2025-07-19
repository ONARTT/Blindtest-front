import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
  }
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


export const PlayerPage = () => {
  const [player, setPlayer] = useState<Spotify.Player>();
  const [device_id, setDeviceId] = useState<string>();
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);

  const  accessToken  = Cookies.get("access_token");

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

          console.log(is_active);
          console.log(track);
          console.log(current_track);

          player.connect();
      }
    };
   
  }, []);

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
    console.log(playRequestData);
  } 



  return (
    <>
      <div className="container">
          {current_track.album.images[0].url &&
            <div className="main-wrapper">
              <img src={current_track.album.images[0].url} 
                    className="now-playing__cover" alt="" />

              <div className="now-playing__side">
                  <div className="now-playing__name">{
                                current_track.name
                                }</div>

                  <div className="now-playing__artist">{
                                current_track.artists[0].name
                                }</div>
              </div>
          </div>}
          {player && (
            <>
              <button className="btn-spotify" onClick={() => { player.previousTrack() }} >
                    &lt;&lt;
              </button>

              <button className="btn-spotify" onClick={() => { player.togglePlay() }} >
                  { is_paused ? "PLAY" : "PAUSE" }
              </button>

              <button className="btn-spotify" onClick={() => { player.nextTrack() }} >
                    &gt;&gt;
              </button>
            </>
          )}<br/>
          <button onClick={() => {searchAndLoadTrack()}}>Search</button>
      </div>
      </>
  )
}

export default PlayerPage
