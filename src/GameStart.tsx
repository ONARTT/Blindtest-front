import videoData from "./assets/videos.json"
import displayVideo, { video } from './displayVideo'
import { useRef, useState, useEffect } from "react";
import { useTimer } from "./Timer";
import showAnswer from "./useAnswer";
import useAnswer from "./useAnswer";
import Scores from "./Scores";
import YoutubePlayer from "./YoutubePlayer";
import { EnrichedTrack, TrackData } from "./App.tsx";
import useYtSearch from "./usePlayer.ts";
import PlayerPage from "./SpotifyPlayer.tsx";

interface IGameStart {
    playlist: EnrichedTrack[];
    player: Spotify.Player | undefined;
    trackData: TrackData;
}
const GameStart = (props: IGameStart) => {
    const {
        timeSec,
        timeEnd,
        start,
    } = useTimer();

    const {
        showAnswer,
        clearAnswer,
    } = useAnswer()

    const {
        ytSearch,
        loadTrack,
    } = useYtSearch();

    const vidId = Math.floor(Math.random() * 4);
    const [resetKey, setResetKey] = useState(0);
    const time = timeSec;
    const audioRef = useRef(new Audio());
    const [round, setRound] = useState(0);
    const [score, setScore] = useState(0);
    const [guess, setGuess] = useState("");
    const [artistFound, setArtistFound] = useState(false);
    const [titleFound, setTitleFound] = useState(false);
    const roundTime: number = 10;
    const [test, setTest] = useState(false);
    const [player, setPlayer] = useState<Spotify.Player | null>(null);
    const [nextVid, setNextVid] = useState("");
    const answerPage = document.getElementById("answer");
    const [renderHandle, setRenderHandle] = useState(0);

    
   
    const nextRound = async () => {
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
            if( answerPage != null) {
                answerPage.style.visibility = "hidden";
            }
            clearAnswer();
            setArtistFound(false);
            setTitleFound(false);
            start(roundTime);
        },5000);
      
    }

    const cleanTitle = (title: string) => {
    return title
        .normalize("NFD")               // Split accented letters into base + diacritics
        .replace(/[\u0300-\u036f]/g, '') // Remove the diacritics
        .replace(/\(.*?\)/g, '')        // Remove anything in parentheses
        .replace(/\s/g, '')             // Remove all whitespace
        .replace(/[^\w\s]|_/g, '') 
        .toLowerCase();                 // Optional: make lowercase
    };

 

    const handleGuess = (e: React.KeyboardEvent) => {

        if (e.key == 'Enter') {
            const guessOutput = cleanTitle(guess);

            if (guessOutput.indexOf(cleanTitle(props.playlist[round-1].name)) != -1) {
                setTitleFound(true);
            }

            if (guessOutput.indexOf(cleanTitle(props.playlist[round-1].artist)) != -1) {
                setArtistFound(true);
            }

            setGuess("");
        }
    
    }



    //Game Start



//    useEffect(() => {
//         const audio = audioRef.current;
//         if(time >= roundTime) {
//             audio.pause();
//             showAnswer(video[playlist[round-1]].artist, video[playlist[round-1]].name);
//             if( round < 4) {
//                 nextRound();
//             }
            
//         } else if(round <= 3) {
//             start(roundTime);
//             setRound(round+1);
//             console.log('round', round);
//             console.log('playlist', playlist[round]);
//             console.log(playlist);
//             audio.src = video[playlist[round]].file;
//             audio.addEventListener('canplaythrough', function () {
//                 audio.play();
//             });
//         }
//    }, [timeEnd]);

const gameHandler = async () => {
        console.log("player", await props.player);

        
        if(time >= roundTime) {
            
            showAnswer(props.playlist[round-1].artist, props.playlist[round-1].name);
            
            if( answerPage != null) {
                answerPage.style.visibility='visible';
            }
            
            
            if( round < 10) {
                nextRound();
            } else {
                player?.togglePlay();
            }
            
        } else if(round <= 9) {
            start(roundTime);
            setRound(round+1);
            console.log(props.playlist);
            
            loadTrack(props.playlist[round].uri)
            
            
            
        }
    }


    useEffect(() => {
        gameHandler();
    }, [timeEnd]);

    
   
    
   
    return (
        <> 

            <PlayerPage player={props.player} trackData={props.trackData}></PlayerPage>
            <input id="inputGuess" placeholder='Guess ...' value={guess} onKeyDown={handleGuess} onChange={(e) => setGuess(e.target.value)}></input>
            <div>{time}</div>
            <div>
                <Scores score={score}></Scores>
            </div>

            <input type="range" id="volume" name="volume" min="0" max="100" onChange={(e) => props.player?.setVolume((parseInt(e.target.value))/100)}></input>

            


        
        </>
    )
}


export default GameStart