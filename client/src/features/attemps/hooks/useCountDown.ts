import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { ROUTES } from "../../../config/routes";
import { CountDonwProps } from "../CountDown/CountDown";
import { attemptService } from "../services/attemptService";
import { useQuestionStore } from "../store/questionStore";
import { formatTimeDifference } from "../utils/formatTimeDiference";

export function useCountDown({ defaultValues, getValues }: CountDonwProps) {
	const { attemptId } = useParams();
	const [searchParams] = useSearchParams();
	const page = searchParams.get("page");
	const navigate = useNavigate();
	const { startDate, duration } = useQuestionStore((state) => state.question);
	const [endTime, setEndTime] = useState<number | null>(null);
	const [now, setNow] = useState<number | null>(null);
	const intervalRef = useRef<ReturnType<typeof setTimeout> | undefined>();

	useEffect(() => {
		if (!startDate || !duration) {
			return;
		}
		setEndTime(
			(prevEndTime) => prevEndTime ?? calculateEndTime(startDate, duration)
		);
		setNow((prevNow) => prevNow ?? Date.now());

		clearInterval(intervalRef.current);

		intervalRef.current = setInterval(() => {
			setNow(Date.now());
		}, 1000);

		return () => clearInterval(intervalRef.current);
	}, []);

	const closeAttempt = useCallback(async () => {
		if (!attemptId || !page) {
			return;
		}

		const newValues = clearPreviousState(getValues(), defaultValues);
		const path = `/${ROUTES.QUIZ}/${attemptId}/results`;

		return await attemptService
			.closeAttempt(newValues, attemptId, page)
			.then(() => navigate(path, { replace: true }))
			.catch((error) => console.error(error))
			.finally(() => clearInterval(intervalRef.current));
	}, [attemptId, defaultValues, getValues]);

	if (endTime == null || now == null) {
		return;
	}

	return formatTimeDifference(endTime, now, closeAttempt);
}

function calculateEndTime(startDate: string, durationInMins: number) {
	const expirationDate = new Date(startDate);

	expirationDate.setMinutes(expirationDate.getMinutes() + durationInMins);

	return expirationDate.getTime();
}

function clearPreviousState(
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
