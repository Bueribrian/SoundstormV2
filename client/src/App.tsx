import { useEffect, useState, useRef } from "react";
import socketIOClient from "socket.io-client";
import Player from "./components/Player";
import Chat from "./components/Chat";
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
        setSongs(data);
      });

      await socketRef.current.on("messages", (data: Array<Message>) => {
        console.log(data);
        setMessages(data);
        goToBottom();
      });

      setLoaded(true);
    })();

    return () => socketRef.current.disconect();
  }, []);

  function handleSubmitSong(e: any) {
    socketRef.current.emit("addSong", {
      song: currentSong,
      user: userId,
      date: Date.now(),
    });
    setCurrentSong("");

    e.preventDefault();
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
  }

  return loaded ? (
    <div className="App">
      <Player
        songs={songs}
        handleSubmitSong={handleSubmitSong}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
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
    </div>
  ) : (
    <h1>loading...</h1>
  );
}

export default App;
