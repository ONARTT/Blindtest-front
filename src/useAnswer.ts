

const useAnswer = () => {

    const showAnswer = (artistData: string, titleData: string) => {


        const node = document.createElement('div');
        const artist = document.createElement("p");
        artist.textContent = "Artist : " + artistData;
        const title = document.createElement("p");
        title.textContent = "Title : " + titleData;
    
        node.appendChild(artist);
        node.appendChild(title);

        return document.getElementById("gameSpace")?.appendChild(node)
    }


    const clearAnswer = () => {
        const node = document.getElementById("gameSpace")
        if(node != null) {
            node.innerHTML = "";
            return node
        }
    }

    return {
        showAnswer,
        clearAnswer,
    }

}



export default useAnswer