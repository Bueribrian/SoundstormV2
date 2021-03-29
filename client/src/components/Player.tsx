import { FC, useState, useRef } from "react";
import ReactPlayer from "react-player";
import { SourceProps } from "react-player/base";

interface Song {
  length: string | string[] | MediaStream | SourceProps[] | undefined;
  song: string;
  date: Date;
  user: string;
}

const Player: FC<any> = ({
  songs,
  handleSubmitSong,
  currentSong,
  setCurrentSong,
  songsSearch,
  setSongsSearch,
  postSong,
  ...rest
}): JSX.Element => {
  const [soundCounter, setSoundCounter] = useState(0);
  const [muted, setMuted] = useState<boolean | undefined>(true);
  const [playing, setPlaying] = useState(true);
  const fullScreenSearcherRef = useRef(null);

  return (
    <div {...rest}>
      {songs?.length !== 0 ? (
        <>
          <div className="player-wrapper">
            <ReactPlayer
              className="react-player"
              onPause={() => setPlaying(false)}
              playing={playing}
              width="100%"
              height="100%"
              volume={0.2}
              muted={muted}
              controls={true}
              onEnded={() =>
                setSoundCounter(
                  soundCounter + 1 >= songs.length ? 0 : soundCounter + 1
                )
              }
              url={songs[soundCounter].song || ""}
            />
          </div>
          <div>
            <h2 className="text-center mt-3 mb-2">Controls</h2>
            <div className="flex justify-center bg-gray-800 p-3">
              <button
                className="mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => setMuted(!muted)}
              >
                unmuted
              </button>
              <button
                onClick={() => setPlaying(!playing)}
                className="mx-1 bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                {playing ? "pause" : "play"}
              </button>
              <button
                onClick={() =>
                  setSoundCounter(
                    soundCounter + 1 >= songs.length ? 0 : soundCounter + 1
                  )
                }
                className="mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                next
              </button>
              <button
                onClick={() =>
                  setSoundCounter(
                    soundCounter - 1 === -1
                      ? songs.length - 1
                      : soundCounter - 1
                  )
                }
                className="mx-1 bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                prev
              </button>
              <button className="mx-1 bg-blue-200 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                repeat
              </button>
            </div>
          </div>
          <div>
            <h2 className="text-center mt-3 mb-2">Search</h2>
            <form className="flex" onSubmit={handleSubmitSong}>
              <input
                className="flex-1 px-2 py-1 text-black"
                type="text"
                onChange={(e) => setCurrentSong(e.target.value)}
                value={currentSong}
                placeholder="youtube.com/watch?v=ExVtrgh..."
              />
              <button className="flex-4 px-2 bg-gray-800" type='submit'>
                🎶
              </button>
            </form>
            {currentSong.length !== 0 ? (
              <div ref={fullScreenSearcherRef} className="fullscreen-searcher">
                <div className='searcher'>
                  <form className="flex" onSubmit={handleSubmitSong}>
                    <input
                      className="flex-1 px-2 py-1 text-black"
                      type="text"
                      onChange={(e) => setCurrentSong(e.target.value)}
                      value={currentSong}
                      placeholder="youtube.com/watch?v=ExVtrgh..."
                    />
                    <button className="flex-4 px-2 bg-gray-800" type="submit">
                      🎶
                    </button>
                  </form>
                </div>
                <div className="results">
                  {songsSearch || songsSearch.lenght > 0 ? songsSearch.map((song:any,key:number) => <div key={key} onClick={e=>{postSong({song:song.url,user:'random',date:Date.now()})}}>{song.snippet.title}</div>):"Hola"}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </>
      ) : (
        ""
      )}
      <h3 className="mt-5 text-xl">List</h3>
      <ul className="mt-5">
        {songs?.map((song: Song, key: number) => (
          <li
            className={`flex flex-col px-5 py-3 rounded-lg ${
              soundCounter === key ? "bg-blue-400" : ""
            }`}
            key={key}
            style={{ color: "#fff" }}
          >
            <b>{song.user}</b> sumo a la lista{" "}
            <a className="text-bold" href={song.song}>
              🎶 Link Youtube
            </a>
            <br></br>
            <small>{new Date(song.date).toLocaleTimeString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Player;
