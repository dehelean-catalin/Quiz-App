export function FetchError({ error }: { error: Error }) {
	return <div>{error.message}</div>;
}
