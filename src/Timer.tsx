import { useEffect, useState } from "react";

export interface ITimer {
    duration: number;
    resetKey: number;
    getTime: (timeSec: number) => void;
}

export const Timer = (props: ITimer)  => {
    
    const [timeSec, setTimeSec] = useState(0);
    const [timeEnd, setTimeEnd] = useState(false);

    useEffect(() => {
        setTimeSec(0);
        setTimeEnd(false);
        const baseTime = Date.now();
        const interval = setInterval(() => {
            setTimeSec(() => {
                const currentTime = Math.floor((Date.now() - baseTime)/1000);
                if(currentTime >= props.duration) {
                    clearInterval(interval);
                    setTimeEnd(true);
                 }
                return currentTime;
            });
        },1000);
        
        return () => clearInterval(interval);
        
    }, [props.duration, props.resetKey]);

    useEffect(() => {
        if(timeEnd) {
            props.getTime(timeSec);
        }
    }, [timeEnd]);
    return timeSec
}



