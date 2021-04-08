import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import socketIOClient from "socket.io-client";
import Player from "../components/Player";
import Chat from "../components/Chat";
import VideoSongsService from "../services/videoSongs";
import {motion} from 'framer-motion'
import { getUser } from "../services/auth";
import  RoomService from "../services/rooms";
import { SourceProps } from "react-player/base";

const BASE_URL: string = process.env.REACT_APP_BASE_URL || "192.168.0.33:4000";

interface Song {
  length: string | string[] | MediaStream | SourceProps[] | undefined;
  song: string;
  date: Date;
  user: string;
  name: string;
  thumbnail: string;
}

interface User {
  name: string;
  token: string;
}

interface Message {
  txt: string;
  user: string;
}

export default function HomePage() {
  const [messages, setMessages] = useState<Message[] | null>([]);
  const [currentMessage, setCurrentMessage] = useState<any>("");
  const [room, setRoom]=useState(false);
  const [users, setUsers] = useState<String[]>([]);
  const [userId, setUserId] = useState<String>();
  const [songs, setSongs] = useState<Song[] | null>([]);
  const [currentSong, setCurrentSong] = useState<string>("");
  const [loaded, setLoaded] = useState<Boolean>(false);
  const [songsSearch, setSongsSearch] = useState([]);
  const bottomRef = useRef<any>();
  const socketRef = useRef<any>();

  useEffect(() => {
    (async () => {
      let localUser: any = await getUser();
      let localRoom: any = RoomService.getCurrentRoom();

      if (!localUser) {
        window.location.href = "/login";
      }

      if (!localRoom) {
        window.location.href = "/rooms";
      }

      socketRef.current = await socketIOClient(BASE_URL, {
        query: `auth_token=${localUser.token}`,
      });
      socketRef.current.emit("join", localRoom);
      setRoom(localRoom)
      console.log(localUser);
      await setUserId(localUser.name);

      await socketRef.current.on("users", (users: string[]) => setUsers(users));

      await socketRef.current.on("songs", (data: Array<Song>) => {
        console.log(data);
        setSongs(data);
      });

      await socketRef.current.on("messages", (data: Array<Message>) => {
        console.log(data);
        setMessages(data);
        goToBottom();
      });

      setLoaded(true);
    })();

    return () => socketRef.current.on("disconnect",room);
  }, []);

 

  async function handleSubmitSong(e: any) {
    e.preventDefault();
    let videos = await VideoSongsService.findSongs(currentSong);
    setSongsSearch(videos.data.items);
  }
  async function postSong(song: Song) {
    let user:any = userId
    song.user = user
    await socketRef.current.emit("addSong", {song, room});
    setCurrentSong("");
  }

  function handleSubmit(e: any): void {
    if (currentMessage && currentMessage.length !== 0) {
      socketRef.current.emit("addMessage", {message:{txt: currentMessage,
        user: userId},room});
      setCurrentMessage("");
      goToBottom();
    }
    e.preventDefault();
  }
  function goToBottom(): void {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  }

  return loaded ? (
    <motion.div
      initial={{
        y:"100vh",
        opacity:0
      }}
      animate={{
        y:"0vh",
        opacity:1,
      }}
      exit={{ y:"100vh",opacity:0,zIndex:5 }}
      transition={{ duration: .3 }}
    >
      {/* <Title>
        <h1>
          <b>Temaikenes</b>
        </h1>
      </Title> */}
      <Grid>
        <Player
          songs={songs}
          handleSubmitSong={handleSubmitSong}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          songsSearch={songsSearch}
          setSongsSearch={setSongsSearch}
          postSong={postSong}
        />
        <Chat
          users={users}
          messages={messages}
          userId={userId}
          handleSubmit={handleSubmit}
          bottomRef={bottomRef}
          currentMessage={currentMessage}
          setCurrentMessage={setCurrentMessage}
        />
      </Grid>
    </motion.div>
  ) : (
    <h1>loading...</h1>
  );
}

// const Title = styled.h1`
//   display: flex;
//   width: 100%;
//   max-width: 1280px;
//   margin: 0 auto;
//   justify-content: flex-end;
//   font-size: 2rem;
//   align-items: center;
//   position: relative;
// `;

const Grid = styled.div`
  position: relative;
  background-color: #030303;
  border-radius: 8px;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  min-height: calc(85vh);
  display: grid;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.6);
  padding: 2rem;
  grid-template-columns: 45% auto;
  grid-template-rows: 100%;
  grid-gap: 3rem;

  @media screen and (max-width: 1080px) {
    grid-template-columns: 100%;
    grid-template-rows: auto;
    height: auto;
  }
`;
