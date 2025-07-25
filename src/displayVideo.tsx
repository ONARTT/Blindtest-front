import videosData from "./assets/videos.json"


export interface Video {
  name: string;
  artist: string;
  url: string;
  file: string;
}


export const video: Video[] = videosData.video;


var displayVideo = (id: number) => {
    

    const node = document.createElement("iframe");
    node.setAttribute('src', video[id].url );
    node.setAttribute('width', '560' );
    node.setAttribute('height', '315' );

    return document.getElementById("vidContainer")?.insertBefore(node, document.getElementById("inputGuess"));

    
}

export default displayVideo

