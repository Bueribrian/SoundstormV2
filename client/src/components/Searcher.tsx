import React, { ReactElement, useState, useRef } from "react";
import styled from "styled-components";
import { ListScroll as SongsList } from "./ListScroll";
import { SourceProps } from "react-player/base";

interface Song {
  length: string | string[] | MediaStream | SourceProps[] | undefined;
  song: string;
  date: Date;
  user: string;
  name: string;
  thumbnail: string;
}

interface Props {
  handleSubmitSong: any;
  setCurrentSong: any;
  currentSong: any;
  songsSearch: any;
  postSong: Function;
  setSongsSearch: Function;
}

function Searcher({
  handleSubmitSong,
  setCurrentSong,
  currentSong,
  songsSearch,
  postSong,
  setSongsSearch,
}: Props): ReactElement {
  const fullScreenSearcherRef = useRef(null);
  const [searching, setSearching] = useState(false);

  return (
    <SearcherWrapper className={`${searching ? "fullview" : ""}`}>
      <form onSubmit={handleSubmitSong}>
        <input
          className="text-gray-400"
          type="text"
          onChange={(e) => setCurrentSong(e.target.value)}
          onKeyDown={(e) => setSearching(true)}
          value={currentSong}
          placeholder="Nombre de la cancion"
        />
        <button className="" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#ffffff"
            viewBox="0 0 24 24"
          >
            <path d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z" />
          </svg>
        </button>
        {searching ? (
          <button className="exit-btn" onClick={() => setSearching(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#ffffff"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
            </svg>
          </button>
        ) : (
          ""
        )}
      </form>
      {currentSong?.length !== 0 ? (
          <SongsList>
            {songsSearch || songsSearch.lenght > 0
              ? songsSearch.map((song: any, key: number) => (
                  <div
                    key={key}
                    onClick={(e) => {
                      postSong({
                        song: song.url,
                        name: song.snippet.title,
                        thumbnail: song.snippet.thumbnails.medium.url,
                      });
                      setSongsSearch([]);
                      setSearching(false);
                    }}
                  >
                    <h3>{song.snippet.title}</h3>
                    <img
                      width="200"
                      height="200"
                      src={song.snippet.thumbnails.medium.url}
                      alt=""
                    />
                  </div>
                ))
              : "Hola"}
          </SongsList>
        ) : (
          <></>
        )}
    </SearcherWrapper>
  );
}

const SearcherWrapper = styled.div`
  margin-top: 0rem;
  width: 100%;
  padding: 1rem 0rem;
  & form {
    overflow: hidden;
    border-radius: 10px;
  }
  &.fullview {
    background: #030303;
    & form {
      max-width: 700px;
      margin: 0 auto;
      flex-wrap: wrap;
    }
    & .exit-btn {
      position: absolute;
      right: 1rem;
      top: 1rem;
    }
    .results-list {
      width: 100%;
      margin-top: 1.5rem;

      & > div {
        margin-bottom: 1rem;
        cursor: pointer;
        transition: 0.3s all;

        &:hover,
        &:focus {
          transform: translateX(10px);
          color: pink;
          transition: 0.3s all;
        }
      }
    }
  }
  & form {
    width: 100%;
    display: flex;
  }

  & input {
    background: #fff !important;
    color: #000 !important;
    height: 3rem;
    padding: 1rem;
    flex: 8;

    &:focus,
    &:hover,
    &:active {
      outline: none;
    }
  }
  & button[type="submit"] {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1a1919;
    min-width: 4rem;

  }
`;

export default Searcher;
