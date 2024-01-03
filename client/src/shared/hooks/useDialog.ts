import { useRef, useState } from "react";
import { FieldValues, UseFormReset } from "react-hook-form";

export function useDialog<T extends FieldValues>(
	resetFormValues?: UseFormReset<T>
) {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDialogElement>(null);

	function handleOpen() {
		setIsOpen(true);
		ref?.current?.showModal();
	}

	function handleClose() {
		resetFormValues && resetFormValues();
		setIsOpen(false);
		ref?.current?.close();
	}

	return { isOpen, ref, open: handleOpen, close: handleClose };
}
