import { useState } from "react";
import ModalPortal from "../ModalPortal";

import "./Login.scss";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showModal, setShowModal] = useState(false);

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
				<button type="button" className="reset__button" onClick={() => setShowModal(true)}>
					Forgot password?
				</button>
			</form>
			{showModal && <ModalPortal onClose={() => setShowModal(false)} />}
		</div>
	);
};

export default Login;
