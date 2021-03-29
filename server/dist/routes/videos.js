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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const youtube_1 = __importDefault(require("../controller/youtube"));
const videos = express_1.default.Router();
videos.get("/:query", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let query = req.params.query;
    if (!query) {
        res.json({ message: "Query required!", data: {}, status: 200 }).status(200);
    }
    else {
        let Youtube = new youtube_1.default();
        let videos = yield Youtube.getVideos(query);
        yield videos.items.map(video => video['url'] = `https://youtube.com/watch?v=${video.id.videoId}`);
        res.json({ message: "Videos", data: videos, status: 200 }).status(200);
    }
}));
exports.default = videos;
//# sourceMappingURL=videos.js.map