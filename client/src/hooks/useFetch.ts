import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../config/axios.config";

export function useFetch<TData = unknown>(url: string) {
	const [data, setData] = useState<TData | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const cancelRequest = useRef(false);

	async function fetchData() {
		setIsLoading(true);
		try {
			const response = await axiosInstance.get<TData>(url);

			if (cancelRequest.current) return;

			setData(response.data);
		} catch (err) {
			if (cancelRequest.current) return;
			setError(err as Error);
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
	}, [url]);

	return { data, isLoading, error };
}
