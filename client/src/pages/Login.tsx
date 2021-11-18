import React, { useState } from "react";
import { useDispatch } from "react-redux";

export interface FormFields {
  email: string;
  username: string;
}

export interface FormErrors {
  email?: string;
  username?: string;
}

export const Login: React.FC = () => {
  return (
    <div>
      <div className="container">
        <h1>Sign In</h1>
      </div>
    </div>
  );
};
