import { IQuestion } from "../../../shared";

export function initializeFormValues(questions: IQuestion[] | undefined) {
	if (!questions || !questions.length) {
		return {};
	}

	const defaultValues: Record<string, string[]> = {};

	questions.map(({ id }) => (defaultValues[id] = []));

	return defaultValues;
}
