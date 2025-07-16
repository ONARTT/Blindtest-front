import videoData from "./assets/videos.json"
import displayVideo, { video } from './displayVideo'
import { useRef, useState, useEffect } from "react";
import { useTimer } from "./Timer";
import showAnswer from "./useAnswer";
import useAnswer from "./useAnswer";
import Scores from "./Scores";
import YoutubePlayer from "./YoutubePlayer";
import { EnrichedTrack } from "./App.tsx";


interface IGameStart {
    playlist: EnrichedTrack[]
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
    const [player, setPlayer] = useState<YT.Player | null>(null);
    const [nextVid, setNextVid] = useState("");



    
   
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
            clearAnswer();
            setArtistFound(false);
            setTitleFound(false);
            start(roundTime);
        },5000);
      
    }

    

 

    const handleGuess = (e: React.KeyboardEvent) => {

        if (e.key == 'Enter') {
            const guessOutput = guess.toLowerCase().replace(/\s/g, '');

            // if (guessOutput.indexOf((video[props.playlist[round-1]].name).toLowerCase().replace(/\s/g, '')) != -1) {
            //     setTitleFound(true);
            // }

            // if (guessOutput.indexOf((video[props.playlist[round-1]].artist).toLowerCase().replace(/\s/g, '')) != -1) {
            //     setArtistFound(true);
            // }

            setGuess("");
        }
    
    }


    const volumeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        audioRef.current.volume = parseFloat(e.target.value)/10
    }


    const getPlayer = (player: YT.Player) => {
        setPlayer(player);
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


   useEffect(() => {

    const gameHandler = async () => {
        console.log("player", await player);
        
        if(time >= roundTime) {
            player?.pauseVideo();
            //showAnswer(video[playlist[round-1]].artist, video[playlist[round-1]].name);
            if( round < 4) {
                nextRound();
            }
            
        } else if(round <= 3) {
            start(roundTime);
            setRound(round+1);
            console.log(props.playlist);
            player?.loadVideoById("s5fEG1omAUE")
            player?.playVideo();
        }
    }
    gameHandler();
   }, [timeEnd]);

    
   
    
   
    return (
        <> 
            <input id="inputGuess" placeholder='Guess ...' value={guess} onKeyDown={handleGuess} onChange={(e) => setGuess(e.target.value)}></input>
            <div>{time}</div>
            <div>
                <Scores score={score}></Scores>
            </div>

            <input type="range" id="volume" name="volume" min="0" max="10" onChange={(e) => volumeSelect(e)}></input>


            <script src="https://www.youtube.com/iframe_api"></script>
            <YoutubePlayer getPlayer={getPlayer} first='OgXurg65hIE'></YoutubePlayer>

        
        </>
    )
}


export default GameStart