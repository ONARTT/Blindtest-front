import videoData from "./assets/videos.json"
import displayVideo, { video } from './displayVideo'
import { useRef, useState, useEffect } from "react";
import { useTimer } from "./Timer";


const GameStart = () => {
    const {
        timeSec,
        timeEnd,
        start,
    } = useTimer();

    const vidId = Math.floor(Math.random() * 4);
    const [resetKey, setResetKey] = useState(0);
    const time = timeSec;
    const [playlist, setPlaylist] = useState<number[]>([]);
    const audioRef = useRef(new Audio());
    const [round, setRound] = useState(0);

   

    const fillPlaylist = (max: number, count: number) => {
        setPlaylist([]);
        while (playlist.length < count) {
            const i = Math.floor(Math.random() * max);
            if (playlist.indexOf(i) == -1) {
                playlist.push(i);
            }
        }

        console.log(playlist);
        setPlaylist(playlist);
    }
    
   
    const nextRound = () => {

      displayVideo(round);
      setTimeout(() => {
        console.log('test');
      },5000);
      
    }


    //Game Start

    useEffect(() => {
        fillPlaylist(4,4);
        
    }, []);

   useEffect(() => {
        const audio = audioRef.current;
        if(time >= 5) {
            audio.pause();
            nextRound();
        } else {
            start(5);
            setRound(round+1);
            console.log('round', round);
            console.log('playlist', playlist[round]);
            console.log(playlist);
            audio.src = video[playlist[round]].file;
            audio.addEventListener('canplaythrough', function () {
                audio.play();
            });
        }
   }, [timeEnd]);

    
   
    
   
    return (
        <> 
            <div>{time}</div>
            <button onClick={()=> start(5)}>test audio</button>
            
        </>
    )
}


export default GameStart