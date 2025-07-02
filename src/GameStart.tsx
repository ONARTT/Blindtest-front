import videoData from "./assets/videos.json"
import displayVideo, { video } from './displayVideo'
import { useRef, useState, useEffect } from "react";
import { Timer } from "./Timer";


const GameStart = () => {
    const vidId = Math.floor(Math.random() * 4);
    const audioRef = useRef<HTMLAudioElement |null>(null);
    const [currentSong, setCurrentSong] = useState<string | undefined>(undefined);
    const [resetKey, setResetKey] = useState(0);
    const [time, setTime] = useState(0);
     var playlist: number[] = [];
    
    
    const fillPlaylist = (max: number, count: number) => {
        playlist = []
        while (playlist.length < count) {
            const i = Math.floor(Math.random() * max);
            if (playlist.indexOf(i) == -1) {
                playlist.push(i);
            }
        }

        console.log(playlist);
        return playlist;
    }
    
    const restartTimer = () => {
        setResetKey(prev => prev + 1); 
    };

    const changeAudio = (newSrc: number) => {
        setCurrentSong(video[newSrc].file);
    }

    
    const getTime = (timeSec: number) => {
        setTime(timeSec);
    }


    const handleClick = async () => {
        await changeAudio(vidId);
        if(audioRef.current) {
            audioRef.current.load();
            audioRef.current.play().catch((error: DOMException) => {
                console.log('error', error);
            })
        }
        
    }




    //Game Start

    useEffect(() => {
        fillPlaylist(4,4);
    }, []);

   

    

    
   
    return (
        <> 
            <div>{time}</div>
            <button onClick={handleClick}>test audio</button>
            <audio id="audioPlayer" ref={audioRef} src={currentSong} preload='auto'></audio>
            <Timer duration={5} resetKey={0} getTime={getTime}></Timer>
        </>
    )
}


export default GameStart