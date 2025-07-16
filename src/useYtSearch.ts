

const useYtSearch = () => {


    const ytSearch = async (query: string) => {
        const video = "video=" + query
        const test = await fetch("http://127.0.0.1:3000/search?" + video, {
            method: 'GET', 
        });

        const data = await test.json();
        console.log(data);
        return data;
    }

    return {
        ytSearch,
    }
}


export default useYtSearch;
    