import { useState } from "react";
import ModalPortal from "../ModalPortal";
import useWebSocket from "../../useWebSocket";

import "./Login.scss";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showModal, setShowModal] = useState(false);
	const { data } = useWebSocket("ws://stream.tradingeconomics.com/?client=guest:guest", JSON.stringify({ topic: "subscribe", to: "EURUSD:CUR" }));

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
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
				console.log("Login failed", response.status, response.statusText);
			}
		} catch (error) {
			console.error("Error during fetch", error);
		}
	};

	const formatTimestamp = (timestamp) => {
		const date = new Date(timestamp);
		return date.toLocaleString();
	};

	return (
		<>
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
			<div className="exchange__rate">
				{data ? (
					<>
						<p className="exchange__rate-latest">
							<i>Latest Price:</i> {data.price}
						</p>
						<p className="exchange__rate-latest">
							<i>Latest Timestamp:</i> {formatTimestamp(data.dt)}
						</p>
					</>
				) : (
					<p>Loading latest EUR/USD exchange rate...</p>
				)}
			</div>
		</>
	);
};

export default Login;
