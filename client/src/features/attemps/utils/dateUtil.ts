export function formatDateTimeString(dateTime: string) {
	const event = new Date(dateTime);

	const dateOptions: Intl.DateTimeFormatOptions = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	const timeOptions: Intl.DateTimeFormatOptions = {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	};

	const time = event.toLocaleTimeString([], timeOptions);

	const date = event.toLocaleDateString(undefined, dateOptions);

	return `${date}, ${time}`;
}
