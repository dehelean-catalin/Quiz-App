import { NavLink } from "react-router-dom";
import { ROUTES } from "../../config/routes";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
	return (
		<div className={styles.landing}>
			<h1> Welcome to QuizRank</h1>
			<p>
				Dive into the world of software wizardry with our quiz app, where every
				question unlocks a new level of programming prowess.
			</p>
			<NavLink className="btn" to={ROUTES.SIGN_UP}>
				Sign up
			</NavLink>
			<NavLink className="btn" to={ROUTES.QUIZ}>
				For developers
			</NavLink>
			<footer>
				<span>Developed by</span>
				<a href="https://github.com/dehelean-catalin">
					@Dehelean Rares Catalin
				</a>
			</footer>
		</div>
	);
}
