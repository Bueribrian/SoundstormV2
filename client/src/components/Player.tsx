import { FC, useState } from "react";
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
}): JSX.Element => {
  const [muted, setMuted] = useState<boolean | undefined>(true);

  return (
    <>
      {songs?.length !== 0 ? (
          <>
        <ReactPlayer
          playing
          muted={muted}
          controls={true}
          url={songs ? songs[0].song : ""}
        />
        <button onClick={() => setMuted(!muted)}>unmuted</button>
        </>
      ) : (
        ""
      )}
      <form onSubmit={handleSubmitSong}>
        <input
          type="text"
          onChange={(e) => setCurrentSong(e.target.value)}
          value={currentSong}
        />
        <button type="submit"> + song</button>
      </form>
      <ul>
        {songs?.map((song: Song, key: number) => (
          <li key={key} style={{ color: "#fff" }}>
            <b>{song.user}</b> sumo a la lista{" "}
            <a href={song.song}>{song.song}</a>
            <br></br>
            <small>{new Date(song.date).toLocaleTimeString()}</small>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Player;
