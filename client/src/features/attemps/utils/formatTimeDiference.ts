export function formatTimeDifference(
	endTime: number,
	now: number,
	closeAttempt: () => Promise<void>
) {
	const timeDifference = endTime - now;

	if (timeDifference <= 0) {
		closeAttempt();
		return;
	}

	const hours = Math.floor(timeDifference / 3600000);
	const minutes = Math.floor((timeDifference % 3600000) / 60000);
	const seconds = Math.floor((timeDifference % 60000) / 1000);

	const formattedTime = `${String(hours).padStart(2, "0")}:${String(
		minutes
	).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

	return formattedTime;
}
