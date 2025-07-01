import videoData from "./assets/videos.json"
import displayVideo, { video } from './displayVideo'
import { useRef, useState, useEffect } from "react";
import { useTimer } from "./Timer";


const GameStart = () => {
    const vidId = Math.floor(Math.random() * 4);
    const audioRef = useRef<HTMLAudioElement |null>(null);
    const [currentSong, setCurrentSong] = useState<string | undefined>(undefined);
    const [resetKey, setResetKey] = useState(0);
    const timer = useTimer(15, resetKey);
    const timerRef = useRef(timer);





    
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

    
    const handleClick = async () => {
        await changeAudio(vidId);
        if(audioRef.current) {
            audioRef.current.load();
            audioRef.current.play().catch((error: DOMException) => {
                console.log('error', error);
            })
        }
        
    }


    useEffect(() => {
        fillPlaylist(4,4);
    }, []);

    useEffect(() => {
        timerRef.current = timer;
    }, [timer]);
    







   
    return (
        <> 
            <div>{timer}</div>
            <button onClick={handleClick}>test audio</button>
            <audio id="audioPlayer" ref={audioRef} src={currentSong} preload='auto'></audio>
            
        </>
    )
}


export default GameStart