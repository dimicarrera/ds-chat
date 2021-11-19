import React from "react";

import { User } from "../utils/types";

import classnames from "./Sidebar.module.css";

export interface Props {
  currentUser: User | null;
  users: User[];
  typingUsers: string[];
}

export const Sidebar: React.FC<Props> = ({
  users,
  currentUser,
  typingUsers,
}) => {
  return (
    <div className={classnames.sidebarWrapper}>
      <div className={classnames.sidebar}>
        <h2>Users</h2>
        {users.map((user, i: number) => (
          <div key={`${user.username}-${i}`} className={classnames.user}>
            <div>
              <span>{user.username}</span>
              {user.username === currentUser!.username && <span>(you)</span>}
              {typingUsers.find((username) => user.username === username) && (
                <span> is typing...</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
