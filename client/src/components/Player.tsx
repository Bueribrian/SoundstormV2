import { FC, useState, useRef } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import PlayerControls from "./PlayerControls";
import Searcher from "./Searcher";
import { SourceProps } from "react-player/base";

interface Song {
  length: string | string[] | MediaStream | SourceProps[] | undefined;
  song: string;
  date: Date;
  user: string;
  name: string;
  thumbnail: string;
}

const decodeHtmlEntity = function (str: string) {
  return str.replace(/&#(\d+);/g, function (match, dec) {
    return String.fromCharCode(dec);
  });
};

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
              volume={1}
              muted={muted}
              controls={true}
              onEnded={() => {
                setSoundCounter(
                  soundCounter + 1 >= songs.length ? 0 : soundCounter + 1
                );
                return setTimeout(() => setPlaying(true), 500);
              }}
              url={songs[soundCounter].song || ""}
            />
          </div>
          <PlayerControls
            setMuted={setMuted}
            setPlaying={setPlaying}
            setSoundCounter={setSoundCounter}
            soundCounter={soundCounter}
            playing={playing}
            muted={muted}
            songs={songs}
          />
          <Searcher
            handleSubmitSong={handleSubmitSong}
            setCurrentSong={setCurrentSong}
            currentSong={currentSong}
            songsSearch={songsSearch}
            postSong={postSong}
            setSongsSearch={setSongsSearch}
          />
        </>
      ) : (
        ""
      )}
      <SongsResultsList>
        {songs?.map((song: Song, key: number) => (
          <li
            className={` ${soundCounter === key ? "bg-blue-900" : ""}`}
            onClick={() => {
              setSoundCounter(key);
              setPlaying(true);
            }}
            key={key}
            style={{ color: "#fff" }}
          >
            <div className="flex items-center justify-between pt-2">
              <p className="pr-5 ">
                <span className="font-thin text-sm">
                  {song.user} sumo a la lista{" "}
                </span>{" "}
                <br></br>
                {decodeHtmlEntity(song.name ? song.name : "untitled")}
              </p>
              <img
                src={song.thumbnail}
                alt="song thumbnail"
                width="150px"
                height="125px"
                className="rounded"
              />
            </div>
            {/* <small>
              {new Date(song.date).toLocaleTimeString(navigator.language, {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small> */}
          </li>
        ))}
      </SongsResultsList>
    </div>
  );
};

const SongsResultsList = styled.ul`
  width: 100%;
  height: 100%;
  margin-top: 0rem;
  max-height: 25rem;
  padding: 0rem 1rem 0rem 0rem;
  overflow-y: scroll;
  background: #0a0a0a;
  border-radius: 10px;

  & > li {
    cursor: pointer;
    transition: 0.2s all;
    padding: 0.5rem 1.5rem;

    & > * {
      margin-bottom: 0.5rem;
    }

    &:not(:last-child) {
      border-bottom: 1px solid #131313;
    }

    &:hover,
    &:focus {
      background: #160741;
      transition: 0.2s all;
    }

    @media screen and (max-width: 480px) {
      & > div {
        display: flex;
        flex-direction: column;
        align-items: start;
        & > * {
          margin-bottom: .3rem;
        }
      }
    }
  }
`;

export default Player;
