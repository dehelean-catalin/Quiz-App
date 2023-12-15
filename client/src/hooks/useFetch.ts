import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axios.config";

// TODO: 1.CANCEL REQUEST IS component unmounted; 2. Adjust the error object and define an interface

export default function useFetch<TData = unknown>(
	url: string,
	options?: unknown
) {
	const [data, setData] = useState<TData | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);

	console.log(options);

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true);
			try {
				const response = await axiosInstance.get<TData>(url);

				setData(response.data);
			} catch (err) {
				setError(true);
			} finally {
				setIsLoading(false);
			}
		}
		fetchData();
	}, [url]);

	return { data, isLoading, error };
}
