"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = require("node-fetch");
class YoutubeController {
    constructor() {
        this.URL = "https://www.googleapis.com/youtube/v3/search?";
        this.params = {
            type: "video",
            part: "snippet",
            videoDuration: "medium",
            videoCategoryId: 10,
            maxResults: 15,
        };
    }
    getVideos(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch(`${this.URL}q=${query}&type=${this.params.type}&part=${this.params.part}&videoDuration=${this.params.videoDuration}&videoCategoryId=${this.params.videoCategoryId}&maxResults=${this.params.maxResults}&key=${process.env.YOUTUBE_API_KEY}`);
            let data = yield response.json();
            return data;
        });
    }
}
exports.default = YoutubeController;
//# sourceMappingURL=youtube.js.map