

const useLogin = () => {
    const connectToSpotify = () => {
        window.location.href = "http://127.0.0.1:3000/login"
    }

    

    const getUserSongs = async () =>  {
        const res = await fetch("http://127.0.0.1:3000/library", {
            method: 'GET',
            credentials: 'include',
        });

        const data = await res.json;
        return data;
    }

    return {
        connectToSpotify,
        getUserSongs,
    }
}


export default useLogin;