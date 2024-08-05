import { useState } from "react";
import { createPortal } from "react-dom";
import Modal from "./Modal/Modal";

const ModalPortal = ({ onClose }) => {
	const [resetEmail, setResetEmail] = useState("");

	const handleResetSubmit = async (event) => {
		event.preventDefault();
		const response = await fetch("/reset-password", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ email: resetEmail })
		});

		if (response.ok) {
			console.log("Password reset email sent");
			onClose();
		} else {
			console.log("Password reset failed");
		}
	};

	return createPortal(
		<Modal onClose={onClose}>
			<form onSubmit={handleResetSubmit} className="reset__form">
				<label htmlFor="resetEmail"></label>
				<input className="reset__form-input" type="email" id="resetEmail" name="resetEmail" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} />
				<button type="submit" className="reset__modal-button">
					Send Reset Link
				</button>
			</form>
		</Modal>,
		document.body
	);
};

export default ModalPortal;
