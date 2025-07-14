import React, { useState, useEffect } from 'react';


declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: typeof YT;
  }
}

const YoutubePlayer = () => {
    
    useEffect(() => {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);

        window.onYouTubeIframeAPIReady = () => {
            const ytPlayer = new window.YT.Player('player', {
            height: '360',
            width: '640',
            videoId: 'OgXurg65hIE',
            events: {
                onReady: (event) => event.target.playVideo(),
            },
            });
        };
    }, []);
            
      
    
    return (
        <div id="player"></div>
    )
        
    
}

export default YoutubePlayer;