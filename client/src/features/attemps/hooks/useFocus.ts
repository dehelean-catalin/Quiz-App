import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useBeforeUnload } from "react-router-dom";
import { ROUTES } from "../../../config/routes";
import { attemptService } from "../services/attemptService";
import { useAttemptDetails } from "./useAttemptDetails";

export default function useFocus(
	page: number,
	id: string | undefined,
	attemptId: string | undefined
) {
	const navigate = useNavigate();
	const { isOnTheLastPage, nextPage } = useAttemptDetails(page);

	const path = `/quizzes/${id}/${ROUTES.QUESTIONS}/${attemptId}`;
	const resultsPath = `/quizzes/${attemptId}/results`;

	const isClosingOrRefreshingTab = useRef(true);

	const onbeforeunload = useCallback((event: BeforeUnloadEvent) => {
		event.preventDefault();
		event.returnValue = "";

		//TODO: add logic to set the status of attempt as ABANDONED

		isClosingOrRefreshingTab.current = false;
	}, []);

	useBeforeUnload(onbeforeunload);

	const punishCheater = async () => {
		if (!isClosingOrRefreshingTab.current) {
			isClosingOrRefreshingTab.current = true;
			return;
		}

		if (!attemptId) return;

		if (isOnTheLastPage) {
			await attemptService.closeAttempt({}, attemptId, page);
			navigate(resultsPath, { replace: true });
			return;
		}

		await attemptService.postAnswers({}, attemptId, page);

		navigate(`${path}?page=${nextPage}`, { replace: true });
	};

	useEffect(() => {
		window.addEventListener("blur", punishCheater);

		return () => window.removeEventListener("blur", punishCheater);
	}, [page]);
}
