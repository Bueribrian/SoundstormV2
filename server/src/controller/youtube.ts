const fetch = require("node-fetch");

class YoutubeController {
  public URL = "https://www.googleapis.com/youtube/v3/search?";
  public params = {
    type: "video",
    part: "snippet",
    videoDuration: "medium",
    videoCategoryId: 10,
    maxResults: 30,
    order:'viewCount'
  };
  async getVideos(query) {
    let response = await fetch(
      `${this.URL}q=${query}&type=${this.params.type}&part=${this.params.part}&maxResults=${this.params.maxResults}&key=${process.env.YOUTUBE_API_KEY}`
    );
    let data = await response.json();
    return data;
  }
}


export default YoutubeController
