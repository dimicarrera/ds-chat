import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import dayjs from "dayjs";

import { Sidebar } from "../components/Sidebar";
import { ChatWindow } from "../components/ChatWindow";
import { Navbar } from "../components/Navbar";

import { getMessages, sendMessage } from "../store/slices/messages.slice";
import {
  getUsers,
  sendThisUserIsTyping,
  sendThisUserStoppedTyping,
} from "../store/slices/users.slice";
import { logout } from "../store/slices/auth.slice";

import { RootState, Message } from "../utils/types";

export const Chat: React.FC = () => {
  const dispatch = useDispatch();
  const [messageInput, setMessageInput] = useState("");

  const { currentUser } = useSelector((state: RootState) => state.authState);
  const { users, typingUsers } = useSelector(
    (state: RootState) => state.usersState
  );
  const { messages } = useSelector((state: RootState) => state.messagesState);

  const debouncedTypingIndicationEmit = useCallback(
    _.debounce(
      () => dispatch(sendThisUserIsTyping(currentUser!.username)),
      1000
    ),
    []
  );

  const handleSubmitForm = (event: any) => {
    event.preventDefault();

    if (messageInput && messageInput.trim() !== "") {
      const message: Message = {
        content: messageInput.trim(),
        date: dayjs().format(),
        author: currentUser!.username,
      };

      dispatch(sendThisUserStoppedTyping(currentUser!.username));
      dispatch(sendMessage(message));
    }
    setMessageInput("");
  };

  const handleChangeInput = (event: any) => {
    if (event.target.value !== "") {
      debouncedTypingIndicationEmit();
    }
    setMessageInput(event.target.value);
  };

  const handleLogoutClick = (event: any) => {
    localStorage.removeItem("user");
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getMessages());
  }, [dispatch]);

  // remove "is typing" if messageInput is empty
  useEffect(() => {
    if (messageInput === "") {
      dispatch(sendThisUserStoppedTyping(currentUser!.username));

      setTimeout(() => {
        dispatch(sendThisUserStoppedTyping(currentUser!.username));
      }, 1000);
    }
  }, [messageInput, currentUser, dispatch]);

  return (
    <>
      <Navbar onClick={handleLogoutClick} />
      <div className="content">
        <Sidebar
          currentUser={currentUser}
          users={users}
          typingUsers={typingUsers}
        />
        <ChatWindow
          messages={messages}
          messageInput={messageInput}
          handleChangeInput={handleChangeInput}
          handleSubmitForm={handleSubmitForm}
        />
      </div>
    </>
  );
};
