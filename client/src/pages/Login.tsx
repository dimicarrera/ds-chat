import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Input } from "../components/Input";

import { login } from "../store/slices/auth.slice";

import { validateEmail, validateTextField } from "../utils/validate";

import logo from "../assets/logo.png";

export interface FormFields {
  email: string;
  username: string;
}

export interface FormErrors {
  email?: string;
  username?: string;
}

export const Login: React.FC = () => {
  const [user, setUser] = useState<FormFields>({ email: "", username: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const dispatch = useDispatch();

  const validate = (name: string, value: string) => {
    switch (name) {
      case "email":
        setErrors({ ...errors, [name]: validateEmail(value) });
        break;
      case "username":
        setErrors({ ...errors, [name]: validateTextField(value) });
        break;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login(user));
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value,
    });

    if (errors[name as keyof FormErrors]) {
      validate(name, value);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    validate(name, value);
  };

  const isLoginButtonDisabled = () => {
    if (!user.email || !user.username) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <div className="container">
        <img src={logo} alt="DS chat demo app" />
        <h1>Sign In</h1>

        <form onSubmit={handleSubmit}>
          <Input
            label="Email Address"
            name="email"
            value={user.email}
            placeholder="your@email.com"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
          />
          <Input
            label="Username"
            name="username"
            value={user.username}
            placeholder="very_cool_username"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.username}
          />
          <div>
            <button disabled={isLoginButtonDisabled()}>Sign in</button>
          </div>
          <p>Don't have an account yet? That's fine.</p>
        </form>
      </div>
    </div>
  );
};
