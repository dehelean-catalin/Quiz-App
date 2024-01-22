import { useCallback, useEffect, useRef, useState } from "react";
import { UseFormGetValues } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { ROUTES } from "../../../config/routes";
import { attemptService } from "../services/attemptService";

type Props = {
	durationInMins: number;
	startDate: string;
	getValues: UseFormGetValues<Record<string, string[]>>;
	defaultValues: Record<string, string[]>;
};

export function CountDown({
	durationInMins,
	startDate,
	getValues,
	defaultValues,
}: Props) {
	const { attemptId } = useParams();
	const [endTime, setEndTime] = useState<number | null>(null);
	const [now, setNow] = useState<number | null>(null);
	const intervalRef = useRef<number | undefined>();

	const navigate = useNavigate();

	useEffect(() => {
		setEndTime(
			(prevEndTime) => prevEndTime ?? attemptEndTime(startDate, durationInMins)
		);
		setNow((prevNow) => prevNow ?? Date.now());

		clearInterval(intervalRef.current);

		intervalRef.current = setInterval(() => {
			setNow(Date.now());
		}, 1000);

		return () => {
			clearInterval(intervalRef.current);
		};
	}, []);

	const closeAttempt = useCallback(async () => {
		console.log(getValues(), defaultValues);
		const newValues = clearState(getValues(), defaultValues);

		return await attemptService
			.postFinishAttempt(newValues, attemptId)
			.then(() =>
				navigate(`/${ROUTES.QUIZ}/${attemptId}/results`, { replace: true })
			)
			.finally(() => clearInterval(intervalRef.current));
	}, [attemptId, defaultValues, getValues]);

	const formatDateTimeString = formatTimeDifference(endTime, now, closeAttempt);

	return <p>Time left: {formatDateTimeString}</p>;
}

function attemptEndTime(startDate: string, durationInMins: number) {
	const expirationDate = new Date(startDate);

	expirationDate.setMinutes(expirationDate.getMinutes() + durationInMins);

	return expirationDate.getTime();
}

function formatTimeDifference(
	endTime: number | null,
	now: number | null,
	closeAttempt: () => Promise<void>
) {
	if (endTime == null || now == null) {
		return <></>;
	}

	const timeDifference = endTime - now; // in milliseconds

	if (timeDifference <= 0) {
		closeAttempt();
		return;
	}

	const hours = Math.floor(timeDifference / 3600000); // 1 hour = 3600000 milliseconds
	const minutes = Math.floor((timeDifference % 3600000) / 60000); // 1 minute = 60000 milliseconds
	const seconds = Math.floor((timeDifference % 60000) / 1000); // 1 second = 1000 milliseconds

	const formattedTime = `${String(hours).padStart(2, "0")}:${String(
		minutes
	).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

	return formattedTime;
}

function clearState(
	formValues: Record<string, string[]>,
	defaultValues: Record<string, string[]>
) {
	const newFormValues: Record<string, string[]> = {};

	Object.keys(formValues).map((key) => {
		if (!formValues[key]) {
			newFormValues[key] = defaultValues[key];
		} else {
			newFormValues[key] = formValues[key];
		}
	});

	return newFormValues;
}
