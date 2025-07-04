import videoData from "./assets/videos.json"
import displayVideo, { video } from './displayVideo'
import { useRef, useState, useEffect } from "react";
import { useTimer } from "./Timer";
import showAnswer from "./useAnswer";
import useAnswer from "./useAnswer";
import Scores from "./Scores";

const GameStart = () => {
    const {
        timeSec,
        timeEnd,
        start,
    } = useTimer();

    const {
        showAnswer,
        clearAnswer,
    } = useAnswer()

    const vidId = Math.floor(Math.random() * 4);
    const [resetKey, setResetKey] = useState(0);
    const time = timeSec;
    const [playlist, setPlaylist] = useState<number[]>([]);
    const audioRef = useRef(new Audio());
    const [round, setRound] = useState(0);
    const [score, setScore] = useState(0);
    var guess: string;
   

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

      
      setTimeout(() => {
        console.log('test');
        clearAnswer();
        start(5);
      },5000);
      
    }

    

    function setGuess(e: string) {
        return guess = e;
    }

    const handleGuess = (e: React.KeyboardEvent) => {

    if (e.key == 'Enter') {
        if (guess == video[playlist[round-1]].name) {
            setScore(score +5);
        }
     }
    
    }



    //Game Start

    useEffect(() => {
        fillPlaylist(4,4);
        
    }, []);

   useEffect(() => {
        const audio = audioRef.current;
        if(time >= 5) {
            audio.pause();
            showAnswer(video[playlist[round-1]].artist, video[playlist[round-1]].name);
            if( round < 4) {
                nextRound();
            }
            
        } else if(round <= 3) {
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
            <input id="inputGuess" placeholder='Guess ...' value={guess} onKeyDown={handleGuess} onChange={(e) => setGuess(e.target.value)}></input>
            <div>{time}</div>
            <button onClick={()=> start(5)}>test audio</button>
            <div>
                <Scores score={score}></Scores>
            </div>
        </>
    )
}


export default GameStart