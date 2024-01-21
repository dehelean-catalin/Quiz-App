import { axiosInstance } from "../../../config/axios.config";
import { ROUTES } from "../../../config/routes";

export const attemptService = {
	postAnswers: async (
		formValues: Record<string, string[]>,
		attemptId: string
	) => {
		try {
			const response = await axiosInstance.post(
				`${ROUTES.ATTEMPTS}/${attemptId}/questions`,
				formValues
			);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	},

	postFinishAttempt: async (
		formValues: Record<string, string[]>,
		attemptId: string
	) => {
		try {
			const response = await axiosInstance.post(
				`${ROUTES.ATTEMPTS}/${attemptId}/finish`,
				formValues
			);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	},

	// try {
	// 		if (data?.lastPage) {
	// 			await axiosInstance.post(
	// 				`${ROUTES.ATTEMPTS}/${attemptId}/finish`,
	// 				formValues
	// 			);

	// 			const path = `/quizzes/${attemptId}/results`;
	// 			navigate(path, { replace: true });
	// 			return;
	// 		} else {
	// 			await axiosInstance.post(
	// 				`${ROUTES.ATTEMPTS}/${attemptId}/questions`,
	// 				formValues
	// 			);
	// 		}

	// 		const nextPage = Number(page) + 1;
	// 		const replace = !data?.allowBack;

	// 		navigate(`${path}?page=${nextPage}&size=${size}`, { replace });
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
};
