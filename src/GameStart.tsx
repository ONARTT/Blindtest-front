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
    const [guess, setGuess] = useState("");
    const [artistFound, setArtistFound] = useState(false);
    const [titleFound, setTitleFound] = useState(false);
    const roundTime: number = 10;

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
        let currentScore: number = 0;
        if(artistFound) {
            currentScore = currentScore + 5;
        } 
        if(titleFound) {
            currentScore = currentScore + 5;
        }  
        if(titleFound && artistFound) {
            currentScore = currentScore + 5;
        }
        setScore(score + currentScore);

        setTimeout(() => {
            console.log('test');
            clearAnswer();
            setArtistFound(false);
            setTitleFound(false);
            start(roundTime);
        },5000);
      
    }

    

 

    const handleGuess = (e: React.KeyboardEvent) => {

        if (e.key == 'Enter') {
            const guessOutput = guess.toLowerCase().replace(/\s/g, '');

            if (guessOutput.indexOf((video[playlist[round-1]].name).toLowerCase().replace(/\s/g, '')) != -1) {
                setTitleFound(true);
            }

            if (guessOutput.indexOf((video[playlist[round-1]].artist).toLowerCase().replace(/\s/g, '')) != -1) {
                setArtistFound(true);
            }

            setGuess("");
        }
    
    }



    //Game Start

    useEffect(() => {
        fillPlaylist(4,4);
        
    }, []);

   useEffect(() => {
        const audio = audioRef.current;
        if(time >= roundTime) {
            audio.pause();
            showAnswer(video[playlist[round-1]].artist, video[playlist[round-1]].name);
            if( round < 4) {
                nextRound();
            }
            
        } else if(round <= 3) {
            start(roundTime);
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
            <div>
                <Scores score={score}></Scores>
            </div>
        </>
    )
}


export default GameStart