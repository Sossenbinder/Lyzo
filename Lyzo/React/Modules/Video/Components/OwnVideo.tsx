// Framework
import * as React from "react";

// Functionality

// Types

// Styles
import "./Styles/OwnVideo.less";

type Props = {

}

export const OwnVideo: React.FC<Props> = () => {

	const videoRef = React.useRef<HTMLVideoElement>(null);

	const [mediaStream, setMediaStream] = React.useState<MediaStream>();

	const initializeUserMedia = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: true,
			})

			setMediaStream(stream);
			console.log(mediaStream);

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