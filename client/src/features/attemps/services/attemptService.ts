import { axiosInstance } from "../../../config/axios.config";
import { ROUTES } from "../../../config/routes";

export const attemptService = {
	postAnswers: async (
		formValues: Record<string, string[]>,
		attemptId: string,
		page: string | number
	) => {
		try {
			const response = await axiosInstance.post<string>(
				`${ROUTES.ATTEMPTS}/${attemptId}/questions`,
				formValues,
				{ params: { page } }
			);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	},
	closeAttempt: async (
		formValues: Record<string, string[]>,
		attemptId: string,
		page: string | number
	) => {
		try {
			const response = await axiosInstance.post<string>(
				`${ROUTES.ATTEMPTS}/${attemptId}/finish`,
				formValues,
				{ params: { page } }
			);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	},
};
