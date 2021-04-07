import React, { ReactElement } from "react";
import styled from "styled-components";

interface Props {
  setMuted: Function;
  setPlaying: Function;
  setSoundCounter: Function;
  soundCounter: number;
  muted: boolean | undefined;
  playing: boolean;
  songs: object[];
}

const Controls = styled.div`
    width: 100%;
    height:4rem;
    background: #160741;
    margin-top: 1rem;
    display: flex;
    justify-content:center;
    border-radius: 10px;

    & button{
        height: 100%;
        transition: .3s all;

        &:focus{
            outline: none;
            & svg{fill: pink:}
        }
        &:hover{
          transform:scale(1.3);
          transition: .3s all;
      }
    }

    & svg {
        fill: #fff;
        margin: 0rem 1rem;
        height:100%;
        transition: .3s all;

       
    }
`;

function PlayerControls({
  setMuted,
  setPlaying,
  setSoundCounter,
  soundCounter,
  muted,
  playing,
  songs,
}: Props): ReactElement {
  return (
    <div>
      <Controls>
        <button className="" onClick={() => setMuted(!muted)}>
          {muted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M5 17h-5v-10h5v10zm2-10v10l9 5v-20l-9 5zm15.324 4.993l1.646-1.659-1.324-1.324-1.651 1.67-1.665-1.648-1.316 1.318 1.67 1.657-1.65 1.669 1.318 1.317 1.658-1.672 1.666 1.653 1.324-1.325-1.676-1.656z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M5 17h-5v-10h5v10zm2-10v10l9 5v-20l-9 5zm17 4h-5v2h5v-2zm-1.584-6.232l-4.332 2.5 1 1.732 4.332-2.5-1-1.732zm1 12.732l-4.332-2.5-1 1.732 4.332 2.5 1-1.732z" />
            </svg>
          )}
        </button>
        <button
          onClick={() =>
            setSoundCounter(
              soundCounter - 1 === -1 ? songs.length - 1 : soundCounter - 1
            )
          }
          className=""
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className=""
            style={{ transform: "rotate(180deg)" }}
            viewBox="0 0 24 24"
          >
            <path d="M14 12l-14 9v-18l14 9zm-4-9v4l8.022 5-8.022 5v4l14-9-14-9z" />
          </svg>
        </button>
        <button onClick={() => setPlaying(!playing)} className="">
          {playing ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M3 22v-20l18 10-18 10z" />
            </svg>
          )}
        </button>
        <button
          onClick={() =>
            setSoundCounter(
              soundCounter + 1 >= songs.length ? 0 : soundCounter + 1
            )
          }
          className=""
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M14 12l-14 9v-18l14 9zm-4-9v4l8.022 5-8.022 5v4l14-9-14-9z" />
          </svg>
        </button>

        <button className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M13.5 2c-5.629 0-10.212 4.436-10.475 10h-3.025l4.537 5.917 4.463-5.917h-2.975c.26-3.902 3.508-7 7.475-7 4.136 0 7.5 3.364 7.5 7.5s-3.364 7.5-7.5 7.5c-2.381 0-4.502-1.119-5.876-2.854l-1.847 2.449c1.919 2.088 4.664 3.405 7.723 3.405 5.798 0 10.5-4.702 10.5-10.5s-4.702-10.5-10.5-10.5z" />
          </svg>
        </button>
      </Controls>
    </div>
  );
}

export default PlayerControls;
