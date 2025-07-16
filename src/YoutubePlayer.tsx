import React, { useState, useEffect } from 'react';


declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: typeof YT;
  }
}

interface IYoutubePlayer {
    getPlayer: Function,
    first: string
}

const YoutubePlayer = (props: IYoutubePlayer) => {

    let ytPlayer: YT.Player;
    useEffect(() => {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);

        window.onYouTubeIframeAPIReady = () => {
            ytPlayer = new window.YT.Player('player', {
            height: '360',
            width: '640',
            videoId: props.first,
            events: {
                onReady: (event) => {event.target.playVideo(); props.getPlayer(ytPlayer);}
            },
            });
            
        };
        
    }, []);
     
    
   
    
    return (
        <>
        <div>
             <div id="player"></div>
        </div>
        </>
        
       
    )
        
    
}

export default YoutubePlayer;