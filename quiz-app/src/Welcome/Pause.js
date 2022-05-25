import React, { useState } from "react";
import { VscDebugStart } from "react-icons/vsc";
function Pause(props) {
	const handlePause = () => {
		props.pause(true);
	};
	return (
		<div className="pause" onClick={handlePause}>
			<VscDebugStart />
		</div>
	);
}

export default Pause;
