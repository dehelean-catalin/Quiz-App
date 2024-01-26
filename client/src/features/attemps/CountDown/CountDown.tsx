import { UseFormGetValues } from "react-hook-form";
import { useCountDown } from "../hooks/useCountDown";

export type CountDonwProps = {
	getValues: UseFormGetValues<Record<string, string[]>>;
	defaultValues: Record<string, string[]>;
};

export function CountDown({ getValues, defaultValues }: CountDonwProps) {
	const formatDateTimeString = useCountDown({
		defaultValues,
		getValues,
	});

	return <p>Time left: {formatDateTimeString}</p>;
}
