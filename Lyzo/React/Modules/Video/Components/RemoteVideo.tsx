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

	React.useEffect(() => {

		if (!participant.connection) {
			return;
		}

		participant.connection.ontrack = (event: RTCTrackEvent) => {
			videoRef.current.srcObject = event.streams[0];
		};
	}, [videoRef, participant.connection]);

	return (
		<div style={{ border: "1px solid black" }}>
			Remote Video
			<video
				id="RemoteVideo"
				playsInline
				autoPlay
				ref={videoRef}></video>
		</div>
	);
}

export default RemoteVideo;