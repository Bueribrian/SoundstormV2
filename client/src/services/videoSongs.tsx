const BASE_URL = process.env.REACT_APP_BASE_URL || "192.168.0.33:4000"
const VideoSongsService = {

    findSongs: async (query:string) => {
        const url = `http://localhost:4000/videos/${query}`
        console.log(url)
        const req = await fetch(url)
        const data = await req.json()
        return data
    }
}

export default VideoSongsService