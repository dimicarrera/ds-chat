import React from "react";
import dayjs from "dayjs";

import { Message } from "../utils/types";

import classnames from "./ChatWindow.module.css";

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
		<div className={classnames.chatWrapper}>
			<div className={classnames.chat}>
				<div className={classnames.msgArea}>
					{messages.map((message, i) => (
						<div key={`${message.author}-${message.date}-${i}`}>
							<div>
								<span className={classnames.msgSender}>{message.author}</span>{" "}
								<span className={classnames.msgDate}>{dayjs(message.date).format("h:mm A")}</span>
							</div>
							<p>{message.content}</p>
						</div>
					))}
				</div>
				<div>
					<form onSubmit={handleSubmitForm}>
						<input
							className={classnames.msgInput}
							type="text"
							name="messageInput"
							value={messageInput}
							onChange={handleChangeInput}
              placeholder="Share your thoughts..."
						/>
						<button className={classnames.button}>Send</button>
					</form>
				</div>
			</div>
		</div>
	);
};
