import "./Modal.scss";

const Modal = ({ onClose, children }) => {
	return (
		<div className="modal">
			<div className="modal__content">
			<span className="login__logo"></span>
				{children}
				<button className="modal__close" onClick={onClose}>
					Back to Login
				</button>
			</div>
		</div>
	);
};

export default Modal;
