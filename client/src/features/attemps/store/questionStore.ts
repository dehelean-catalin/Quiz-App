import { create } from "zustand";
import { persist } from "zustand/middleware";

interface QuestionInfo {
	title: string | null;
	numberOfQuestions: number | null;
}

interface QuestionState {
	question: QuestionInfo;
	setQuestion: (state: QuestionInfo) => void;
	reset: () => void;
}

const initialState = {
	title: null,
	numberOfQuestions: null,
};

export const useQuestionStore = create(
	persist<QuestionState>(
		(set) => ({
			question: initialState,
			setQuestion: (q) => set(() => ({ question: q })),
			reset: () => {
				set(() => ({ question: initialState }));
				localStorage.removeItem("question");
			},
		}),
		{ name: "question" }
	)
);
