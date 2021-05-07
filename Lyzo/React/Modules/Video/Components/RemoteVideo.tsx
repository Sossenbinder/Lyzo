// Framework
import * as React from "react";

// Functionality
import { useServices } from "common/Hooks/useServices";

// Styles
import "./Styles/RemoteVideo.less";

type Props = {

}

export const RemoteVideo: React.FC<Props> = () => {

	const videoRef = React.useRef<HTMLVideoElement>(null);
	const { WebRTCService } = useServices();

	const [mediaStream, setMediaStream] = React.useState<MediaStream>();

	React.useEffect(() => {
		if (!WebRTCService) {
			return;
		}

		const rtcConnection: RTCPeerConnection = WebRTCService.rtcConnection;

		// @ts-ignore
		rtcConnection.ontrack((event: RTCTrackEvent) => {
			setMediaStream(event.streams[0]);
			console.log(mediaStream);
		})
	}, [WebRTCService]);

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