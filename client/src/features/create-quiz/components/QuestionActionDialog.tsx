import { useState } from "react";

export function QuestionActionDialog() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button type="button" onClick={() => setIsOpen((prev) => !prev)}>
				Add
			</button>
			<dialog open={isOpen}>
				<p>This modal dialog has a groovy backdrop!</p>
				<button onClick={() => setIsOpen(false)}>Submit</button>
				<button onClick={() => setIsOpen(false)}>Close</button>
			</dialog>
		</>
	);
}
