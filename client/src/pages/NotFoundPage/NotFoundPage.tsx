import { useNavigate } from "react-router";
import styles from "./NotFoundPage.module.css";

export function NotFoundPage() {
	const navigate = useNavigate();

	function handleNavigateBack() {
		navigate(-1);
	}

	return (
		<div className={styles.container}>
			<h1>
				Oops, <span>nothing</span> here ...
			</h1>
			<p>
				We can't find the page you are looking for. Try going back to previous
				page or Contact us for more information
			</p>

			<button onClick={handleNavigateBack}>Go back</button>
		</div>
	);
}
