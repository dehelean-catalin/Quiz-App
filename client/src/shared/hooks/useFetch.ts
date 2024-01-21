import { AxiosRequestConfig } from "axios";
import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../config/axios.config";

export type IErrorResponse = {
	message: string;
	statusCode: number;
};

export function useFetch<TData = unknown>(
	url: string,
	params?: AxiosRequestConfig
) {
	const [data, setData] = useState<TData | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<IErrorResponse | null>(null);

	const cancelRequest = useRef(false);

	async function fetchData() {
		setIsLoading(true);
		try {
			const response = await axiosInstance.get<TData>(url, params);

			if (cancelRequest.current) return;

			setData(response.data);
		} catch (err) {
			if (cancelRequest.current) return;

			setError(err?.response?.data as IErrorResponse);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		if (!url) return;

		cancelRequest.current = false;

		fetchData();

		return () => {
			cancelRequest.current = true;
		};
	}, [url, JSON.stringify(params)]);

	return { data, isLoading, error };
}
