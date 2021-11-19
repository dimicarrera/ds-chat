import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Input } from "../components/Input";

import { login } from "../store/slices/auth.slice";

import { validateEmail, validateTextField } from "../utils/validate";

import logo from "../assets/logo.png";

import classnames from "./Login.module.css";

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
		<div className={classnames.loginWrapper}>
			<div className={classnames.container}>
				<div className={classnames.loginHeading}>
					<img
						src={logo}
						alt="DS chat demo app"
						className={classnames.loginLogo}
					/>
					<div className={classnames.loginGreeting}>
						<h1 className={classnames.loginH1}>
							Welcome{user.username && ","}
						</h1>
						<h2 className={classnames.loginH2}>{user.username}</h2>
					</div>
				</div>
				<form onSubmit={handleSubmit} className={classnames.form}>
					<Input
						label="Email Address"
						name="email"
						value={user.email}
						placeholder="any@email.com"
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
						<button
							className={classnames.button}
							disabled={isLoginButtonDisabled()}
						>
							Sign In
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
