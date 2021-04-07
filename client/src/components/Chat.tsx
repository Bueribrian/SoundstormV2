import { FC } from "react";
import styled from "styled-components";

interface MessageI {
  txt: string;
  user: string;
  date: Date;
}

const ChatWrapper = styled.div`
  height: 100%;
  max-height:54rem;
  min-height:54.2rem;
  width: 100%;
  background: #1a1919;
  padding: 1rem 1rem;
  border-radius: 5px;
  display: grid;
  grid-template-rows: 3rem auto 3rem;
  grid-gap: 1rem;

  // @media screen and (max-width: 1080px){
  // grid-template-rows: 3rem 32rem 3rem;

  // }
`;

const UsersOnline = styled.div`
  width: 100%;
  height: 3rem;
  padding: 1rem 1.5rem;
  font-size: 0.9rem;
  grid-row: 1/2;
`;
const MessagesWrapper = styled.div`
  padding: 1rem 2rem 4rem 2rem;
  overflow-y: scroll;
  grid-row: 2/3;
  background: linear-gradient( 359deg ,#1a1919,#0a0a0a29);
`;
const PostMessageForm = styled.form`
  width: 100%;
  display: flex;
  grid-row: 3/4;
  background: #c4c4c4;
  border-radius: 10px;
  overflow: hidden;
  position: relative;

  & input {
    width: 100%;
    height: 100%;
    color: #000000;
    padding: 0rem 4.5rem 0rem 1rem;
    &:focus {
      outline: 2px solid purple;
    }
  }
  & button {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    padding: 0.5rem;
    background: #181818;
    border-radius: 8px;
    & svg {
      fill: #efefef;
      height:50%;
    }
  }
`;

const MessageWrap = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem 2rem;
  background: #373434;
  color: #fff;
  font-size: 1.2rem;
  display:block;
  width: auto;
  max-width: 85%;
  overflow-x: hidden;
  border-radius: 0px 25px 25px 25px;
  box-shadow: 2px 4px 22px rgb(0 0 0 / 54%);

  & .message {
    &__user {
      color: rgb(160 157 157);
    }
    &__text {
      word-wrap: break-word;
    }
    &__time {
      font-size: 0.7rem;
      color: rgb(160 157 157);
    }
  }
  &.owner {
    margin-left: auto !important;
    background: #290C7E !important;
    border-radius: 25px 0px 25px 25px !important;

    & .message__time{
      color: rgb(86 86 86);
    }
  }
`;

const Message: FC<any> = ({ data, userId, key }: any): JSX.Element => {
  return (
    <MessageWrap
      className={`message ${data.user === userId ? "owner" : ""}`}
      key={key}
    >
      {data.user !== userId ? (
        <p className="message__user">{data.user} dijo:</p>
      ) : (
        ""
      )}
      <p className="message__text">{data.txt}</p>
      <time
        dateTime={new Date(data.date).toLocaleTimeString()}
        className="message__time"
      >
        {new Date(data.date).toLocaleTimeString()}
      </time>
    </MessageWrap>
  );
};

const Chat: FC<any> = ({
  users,
  messages,
  userId,
  handleSubmit,
  bottomRef,
  currentMessage,
  setCurrentMessage,
  ...rest
}): JSX.Element => {
  return (
    <ChatWrapper {...rest}>
      <UsersOnline>Usuarios conectados: {users.length}</UsersOnline>
      <MessagesWrapper>
        {messages.length === 0 ? (
          <div className="message">
            <p className="message__text">No hay mensajes se el primero!</p>
          </div>
        ) : (
          messages?.map((data: MessageI, key: number) => (
            <Message userId={userId} key={key} data={data} />
          ))
        )}
        <div ref={bottomRef}></div>
      </MessagesWrapper>
      <PostMessageForm onSubmit={handleSubmit}>
        <input
          type="text"
          value={currentMessage}
          className=""
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button className="" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z" />
          </svg>
        </button>
      </PostMessageForm>
    </ChatWrapper>
  );
};

export default Chat;
