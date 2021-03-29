import { FC } from "react";


interface Message {
  txt: string;
  user: string;
  date: Date;
}


const Chat: FC<any> = ({ users, messages, userId, handleSubmit, bottomRef, currentMessage, setCurrentMessage, ...rest }): JSX.Element => {
  return (
    <div {...rest}>
      <small className="users_connected">
        Usuarios conectados: {users.length}
      </small>
      <div className="messages-wrapper min-full container  overflow-y-scroll flex flex-col	py-3 px-6 mb-3" >
        {messages.length === 0 ? <div
          className="message"
        >
          <p className="message__text">No hay mensajes se el primero!</p>

        </div> : messages?.map(({ txt, date, user }: Message, key: number) => (
          <div
            className={`message p-3 my-1 pl-2 w-auto bg-gray-900 rounded-lg w-max ${user === userId ? "ml-auto bg-blue-100 text-black" : ""}`}
            key={key}
          >
            <p className="message__text">{txt}</p>
            <time
              dateTime={new Date(date).toLocaleTimeString()}
              className="message__time text-gray-600"
            >
              {new Date(date).toLocaleTimeString()}
            </time>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>
      <form className="form container mt-auto flex mt-5" onSubmit={handleSubmit}>
        <input
          type="text"
          value={currentMessage}
          className='text-black flex-1 px-2 py-1'
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button className='flex-3 px-2 bg-gray-800' type="submit">📨</button>
      </form>
    </div>
  );
};

export default Chat;
