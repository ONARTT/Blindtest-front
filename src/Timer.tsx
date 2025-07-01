import { useEffect, useState } from "react";


export function useTimer (duration: number, resetKey: any)  {
    
    const [timeSec, setTimeSec] = useState(0);
    

    useEffect(() => {
        setTimeSec(0);
        const baseTime = Date.now();
        const interval = setInterval(() => {
            setTimeSec(() => {
                const currentTime = Math.floor((Date.now() - baseTime)/1000);
                if(currentTime >= duration) {
                    clearInterval(interval);
                 }
                
                return currentTime;
            });
        },1000);
        
        return () => clearInterval(interval);
        
    }, [duration, resetKey]);
    
    return timeSec
}



