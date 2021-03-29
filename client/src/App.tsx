import { useEffect, useState, useRef } from "react";
import socketIOClient from "socket.io-client";
import Player from "./components/Player";
import Chat from "./components/Chat";
import VideoSongsService from "./services/videoSongs";
import { SourceProps } from "react-player/base";
import "./App.scss";

/*
TODO
Extraer logica del componente APP y crear rutas
Crear pages: Rooms, Login, Register, Home
*/

const BASE_URL: string = process.env.REACT_APP_BASE_URL || "192.168.0.33:4000";

interface Song {
  length: string | string[] | MediaStream | SourceProps[] | undefined;
  song: string;
  date: Date;
  user: string;
}

interface Message {
  txt: string;
  user: string;
}

function App() {
  const [messages, setMessages] = useState<Message[] | null>([]);
  const [currentMessage, setCurrentMessage] = useState<any>("");
  const [users, setUsers] = useState<String[]>([]);
  const [userId, setUserId] = useState<String>();
  const [songs, setSongs] = useState<Song[] | null>([]);
  const [currentSong, setCurrentSong] = useState<string>("");
  const [loaded, setLoaded] = useState<Boolean>(false);
  const [songsSearch, setSongsSearch] = useState([])
  const bottomRef = useRef<any>();
  const socketRef = useRef<any>();

  useEffect(() => {
    (async () => {
      let localUser: string | null =
        (await localStorage.getItem("user")) || null;

      if (!localUser) {
        localUser = (await "random_user_") + Date.now();
        await localStorage.setItem("user", localUser);
      }

      await setUserId(localUser);
      socketRef.current = await socketIOClient(BASE_URL, {
        query:
          "auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJidWVyaUB0aGUtOGFnZW5jeS5jb20iLCJwYXNzd29yZCI6IjEyMzQiLCJpYXQiOjE2MTY1MjY5NTl9.oHK9nvIEFzOQvIyyrUBMM0S1GzvKzfCA33kSxLhU_I4",
      });

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

    return () => socketRef.current.on("disconnect");
  }, []);

  async function handleSubmitSong(e: any) {
    e.preventDefault();
    let videos = await VideoSongsService.findSongs(currentSong);
    console.log(videos)
    setSongsSearch(videos.data.items)
  }
  async function postSong(song:object){
    console.log(song)
    await socketRef.current.emit("addSong", song);
    setCurrentSong("");
  }

  function handleSubmit(e: any): void {
    if (currentMessage && currentMessage.length !== 0) {
      socketRef.current.emit("addMessage", {
        txt: currentMessage,
        user: userId,
      });
      setCurrentMessage("");
      goToBottom();
    }
    e.preventDefault();
  }
  function goToBottom(): void {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    // window.scrollTo({behavior:'smooth',top: bottomRef.current.offsetTop})
  }

  return loaded ? (
    <div className="app pb-3">
      <h1 className="text-center w-full py-5">Songstorm 2.0</h1>
      <div className="container mx-auto p-3   flex flex-wrap bg-gray-700">
        {loaded ? (
          <>
            {" "}
            <Player
              className="flex-1 	p-5"
              songs={songs}
              handleSubmitSong={handleSubmitSong}
              currentSong={currentSong}
              setCurrentSong={setCurrentSong}
              songsSearch={songsSearch}
              setSongsSearch={setSongsSearch}
              postSong={postSong}
            />
            <Chat
              className="flex-1 chat mt-5 p-3 bg-gray-800 flex flex-col"
              users={users}
              messages={messages}
              userId={userId}
              handleSubmit={handleSubmit}
              bottomRef={bottomRef}
              currentMessage={currentMessage}
              setCurrentMessage={setCurrentMessage}
            />
          </>
        ) : (
          "loading..."
        )}
      </div>
    </div>
  ) : (
    <h1>loading...</h1>
  );
}

export default App;
