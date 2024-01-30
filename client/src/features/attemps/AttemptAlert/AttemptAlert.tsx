import { useBlocker } from "react-router";
import { ROUTES } from "../../../config/routes";
import styles from "./AttemptAlert.module.css";

export function AttemptAlert({
	blockCondition,
	onSubmit,
}: {
	blockCondition: boolean;
	onSubmit: () => void;
}) {
	const blocker = useBlocker(({ nextLocation }) => {
		return (
			!nextLocation.pathname.includes(ROUTES.QUESTIONS) &&
			blockCondition &&
			!nextLocation.pathname.includes("results")
		);
	});

	async function closeAttempt() {
		if (!blocker.proceed) {
			return;
		}
		onSubmit();
		blocker.proceed();
	}
	async function closeDialog() {
		if (!blocker.reset) {
			return;
		}
		blocker.reset();
	}

	return (
		<dialog open={blocker.state === "blocked"} className={styles.dialog}>
			<p>Are you sure you want to leave? Current attempt will be closed.</p>
			<button onClick={closeAttempt}>Yes</button>
			<button onClick={closeDialog}>Cancel</button>
		</dialog>
	);
}
