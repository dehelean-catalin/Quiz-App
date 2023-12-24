import { ReactNode, useState } from "react";
import styles from "./QuestionActionDialog.module.css";

type Props = {
	form: ReactNode;
	onSubmit: () => void;
};

export default function QuestionActionDialog({ form, onSubmit }: Props) {
	const [isOpen, setIsOpen] = useState(false);

	function handleOpen() {
		setIsOpen(true);
		document.querySelector("dialog")?.showModal();
	}

	function handleClose() {
		setIsOpen(false);
		document.querySelector("dialog")?.close();
	}
	function handleSubmit() {
		onSubmit();
		handleClose();
	}

	return (
		<>
			<button type="button" onClick={handleOpen}>
				Add
			</button>
			<dialog className={styles.dialog} open={isOpen}>
				{form}
				<button type="button" onClick={handleClose}>
					Submit
				</button>
				<button type="button" onClick={handleSubmit}>
					Close
				</button>
			</dialog>
		</>
	);
}
