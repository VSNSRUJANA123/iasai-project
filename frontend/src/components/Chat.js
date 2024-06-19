// Chat.js
import React from "react";
import Typewriter from "./Typewriter";
import "./styles/chat.css";

const Chat = (props) => {
  const { chatList } = props;
  return (
    <div className="chat-container">
      {chatList.map((items, index) => (
        <div key={index}>
          <div className="user-msg-container">
            <div className="user-msg">
              <p>
                <span className="chat-status">USER</span> : {items.message}
              </p>
            </div>
          </div>
          <div className="ai-reply">
            <span className="chat-status">IAS</span> :
            <Typewriter text={items.reply} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chat;
