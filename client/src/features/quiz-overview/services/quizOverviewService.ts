import { axiosInstance } from "../../../config/axios.config";
import { ROUTES } from "../../../config/routes";

type Response = { id: string; startDate: string };

export const quizOverviewService = {
	createAttempt: async (id: string) => {
		try {
			const response = await axiosInstance.post<Response>(
				`${ROUTES.ATTEMPTS}/${id}`
			);

			return response.data;
		} catch (error) {
			throw new Error(error);
		}
	},
};
