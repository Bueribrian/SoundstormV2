import { FC } from "react";


interface Message {
    txt: string;
    user: string;
    date: Date;
  }
  

const Chat: FC<any> = ({users, messages, userId, handleSubmit, bottomRef, currentMessage, setCurrentMessage}): JSX.Element => {
  return (
    <div>
      <small className="users_connected">
        Usuarios conectados: {users.length}
      </small>
      <div className="chat container">
      console.log(messages, messages.length)
        {messages.length === 0 ?  <div
            className="message"
          >
            <p className="message__text">No hay mensajes se el primero!</p>
           
          </div> : messages?.map(({ txt, date, user }: Message, key:number) => (
          <div
            className={`message ${user === userId ? "current-user" : ""}`}
            key={key}
          >
            <p className="message__text">{txt}</p>
            <time
              dateTime={new Date(date).toLocaleTimeString()}
              className="message__time"
            >
              {new Date(date).toLocaleTimeString()}
            </time>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>
      <form className="form container" onSubmit={handleSubmit}>
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button type="submit">📨</button>
      </form>
    </div>
  );
};

export default Chat;
