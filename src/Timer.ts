import { useEffect, useState } from "react";


export const useTimer = ()  => {
    
    const [timeSec, setTimeSec] = useState(0);
    const [timeEnd, setTimeEnd] = useState(false);

    // useEffect(() => {
    //     setTimeSec(0);
    //     setTimeEnd(false);
    //     const baseTime = Date.now();
    //     const interval = setInterval(() => {
    //         setTimeSec(() => {
    //             const currentTime = Math.floor((Date.now() - baseTime)/1000);
    //             if(currentTime >= props.duration) {
    //                 clearInterval(interval);
    //                 setTimeEnd(true);
    //              }
    //             return currentTime;
    //         });
    //     },1000);
        
    //     return () => clearInterval(interval);
        
    // }, [props.duration]);

 
   
    

    const start = (duration: number) => {
        setTimeSec(0);
        setTimeEnd(false);
        const baseTime = Date.now();
        const interval = setInterval(() => {
            setTimeSec(() => {
                const currentTime = Math.floor((Date.now() - baseTime)/1000);
                if(currentTime >= duration) {
                    clearInterval(interval);
                    setTimeEnd(true);
                 }
                return currentTime;
            });
        },1000);
    }
    
    return {
        timeSec,
        timeEnd,
        start,
    }
}



