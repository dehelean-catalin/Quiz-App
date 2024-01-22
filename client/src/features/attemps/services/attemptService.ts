import { axiosInstance } from "../../../config/axios.config";
import { ROUTES } from "../../../config/routes";

export const attemptService = {
	postAnswers: async (
		formValues: Record<string, string[]>,
		attemptId: string
	) => {
		try {
			const response = await axiosInstance.post<string>(
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
			const response = await axiosInstance.post<string>(
				`${ROUTES.ATTEMPTS}/${attemptId}/finish`,
				formValues
			);
			return response.data;
		} catch (err) {
			console.error(err);
			throw err;
		}
	},
};
