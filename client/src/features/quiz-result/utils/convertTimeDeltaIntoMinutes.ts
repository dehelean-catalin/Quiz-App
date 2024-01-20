export function convertTimeDeltaIntoMinutes(seconds: number | undefined) {
	const SECONDS_PER_MINUTE = 60;

	if (typeof seconds == "undefined") {
		return;
	}

	if (seconds < SECONDS_PER_MINUTE) {
		return `${seconds} secs`;
	}

	const minutes = Math.round(seconds / SECONDS_PER_MINUTE);

	return `${minutes} mins`;
}
