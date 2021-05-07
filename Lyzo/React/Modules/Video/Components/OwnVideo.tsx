// Framework
import * as React from "react";

// Functionality
import useServices from "common/Hooks/useServices";

// Types

// Styles
import "./Styles/OwnVideo.less";

type Props = {

}

export const OwnVideo: React.FC<Props> = () => {
	const videoRef = React.useRef<HTMLVideoElement>(null);

	const { WebRTCService } = useServices();

	const [mediaStream, setMediaStream] = React.useState<MediaStream>();

	const initializeUserMedia = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: true,
			})

			setMediaStream(stream);

			videoRef.current.srcObject = stream;
		} catch (e) {
			window.alert("Getting media device failed");
		}
	}

	React.useEffect(() => {
		initializeUserMedia();
	}, []);

	return (
		<div style={{ border: "1px solid black" }}>
			<video
				id="ownVideo"
				playsInline
				autoPlay
				ref={videoRef}></video>
		</div>
	);
}

export default OwnVideo;