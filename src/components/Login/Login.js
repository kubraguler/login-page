import { useState } from "react";

import "./Login.scss";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		const response = await fetch("/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ email, password })
		});

		if (response.ok) {
			console.log("Login successful");
		} else {
			console.log("Login failed");
		}
	};

	return (
		<div className="login">
			<span className="login__logo"></span>
			<form onSubmit={handleSubmit} className="login__form">
				<label htmlFor="email"></label>
				<input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<label htmlFor="password"></label>
				<input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				<button type="submit" className="login__button">
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
