import { TrackInfo } from "./App";
import { useState } from "react";
import Cookies from "js-cookie";

const useYtSearch = () => {
    
    const device_id = Cookies.get("device_id");
    const accessToken = Cookies.get("access_token");

    const ytSearch = async (query: string) => {
        const video = "video=" + query
        const test = await fetch("http://127.0.0.1:3000/search?" + video, {
            method: 'GET', 
        });

        const data = await test.json();
        console.log(data.videoId);
        return data.videoId.toString();
    }


    const loadTrack = async (currentSong: string) => {

        const uri  = currentSong;
        console.log("uri", uri)

        const playRequestOptions: RequestInit = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify({
            "uris": [uri],
            "position_ms": Math.floor(Math.random() * 60000)
        })
        }
        
        const playRequestResponse = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, playRequestOptions);
        const playRequestData = await playRequestResponse.json();
        console.log(playRequestData);
    } 




    return {
        ytSearch,
        loadTrack,
    }
}


export default useYtSearch;
    