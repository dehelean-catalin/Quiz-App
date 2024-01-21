import { IErrorResponse } from "../../shared";

export function FetchError({ error }: { error: IErrorResponse }) {
	return <div>{error.message}</div>;
}
