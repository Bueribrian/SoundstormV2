import e from "express";
import express from "express";
import YoutubeController from "../controller/youtube";
const videos = express.Router();

videos.get("/:query", async (req, res) => {
  let query = req.params.query
  if (!query){
    res.json({ message: "Query required!", data: {}, status: 200 }).status(200);
  }else{
    let Youtube = new YoutubeController();
  
    let videos = await Youtube.getVideos(query);
    await videos.items.map(video => video['url']=`https://youtube.com/watch?v=${video.id.videoId}`)
    res.json({ message: "Videos", data: videos, status: 200 }).status(200);
  }
});


export default videos