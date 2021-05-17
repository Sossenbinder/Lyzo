// Framework
import * as React from "react";

// Type
import { VideoParticipant } from 'modules/Video/types';

// Styles
import "./Styles/RemoteVideo.less";

type Props = {
	participant: VideoParticipant;
}

export const RemoteVideo: React.FC<Props> = ({ participant }) => {

	const videoRef = React.useRef<HTMLVideoElement>(null);

	const [connected, setConnected] = React.useState(false);

	const play = async () => {
		setConnected(true);
	}

	React.useEffect(() => {
		if (participant.connection) {
			participant.connection.ontrack = event => {

				if (event.streams.length === 0) {
					return;
				}

				videoRef.current.srcObject = event.streams[0];
				play();
			}
		}
	}, [participant.connection]);

	return (
		<div style={{ border: "1px solid black" }}>
			Remote Video
			<If condition={!connected}>
				Connecting...
			</If>
			<video
				id="RemoteVideo"
				playsInline
				autoPlay
				ref={videoRef}></video>
		</div>
	);
}

export default RemoteVideo;