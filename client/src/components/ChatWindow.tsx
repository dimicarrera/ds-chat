import React from "react";
import dayjs from "dayjs";

import { Message } from "../utils/types";

export interface Props {
  messages: Message[];
  messageInput: string;
  handleSubmitForm: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ChatWindow: React.FC<Props> = ({
  messages,
  messageInput,
  handleSubmitForm,
  handleChangeInput,
}) => {
  return (
    <div>
      <div className="chat">
        <div>
          {messages.map((message, i) => (
            <div key={`${message.author}-${message.date}-${i}`}>
              <div>
                <span>{message.author}</span>{" "}
                <span>{dayjs(message.date).format("h:mm A")}</span>
              </div>
              <p>{message.content}</p>
            </div>
          ))}
        </div>
        <div>
          <form onSubmit={handleSubmitForm}>
            <input
              type="text"
              name="messageInput"
              value={messageInput}
              onChange={handleChangeInput}
            />
            <button>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};
