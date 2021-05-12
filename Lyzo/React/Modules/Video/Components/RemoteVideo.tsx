// Framework
import * as React from "react";

// Functionality
import useServices from "common/Hooks/useServices";

// Styles
import "./Styles/RemoteVideo.less";

type Props = {

}

export const RemoteVideo: React.FC<Props> = () => {

	const videoRef = React.useRef<HTMLVideoElement>(null);

	const { WebRTCService } = useServices();

	React.useEffect(() => {
		// const rtcConnection: RTCPeerConnection = WebRTCService.rtcConnection;

		// rtcConnection.ontrack = (event: RTCTrackEvent) => {
		// 	videoRef.current.srcObject = event.streams[0];
		// };
	}, [videoRef]);

	return (
		<div style={{ border: "1px solid black" }}>
			<video
				id="RemoteVideo"
				playsInline
				autoPlay
				ref={videoRef}></video>
		</div>
	);
}

export default RemoteVideo;