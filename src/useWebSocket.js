import { useEffect, useState } from "react";

const useWebSocket = (url, messageToSend) => {
	const [data, setData] = useState(null);

	useEffect(() => {
		const socket = new WebSocket(url);

		socket.onopen = () => {
			socket.send(messageToSend);
		};

		socket.onmessage = (event) => {
			const messageData = JSON.parse(event.data);
			if (messageData.price && messageData.dt) {
				setData(messageData);
			}
		};

		socket.onclose = () => {
			console.log("WebSocket closed");
		};

		return () => {
			socket.close();
		};
	}, [url, messageToSend]);

	return { data };
};

export default useWebSocket;
