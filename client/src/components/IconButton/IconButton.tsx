import { DetailedHTMLProps } from "react";
import styles from "./IconButton.module.css";
interface Props
	extends DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	text?: string;
	icon?: JSX.Element;
	severity?: "info" | "primary" | "submit";
}

export function IconButton({
	text,
	icon,
	className,
	severity = "primary",
	...rest
}: Props) {
	return (
		<button
			className={`${styles.iconBtn} ${className ? className : ""} ${
				styles[severity]
			}`}
			type="button"
			{...rest}
		>
			{icon}
			{text}
		</button>
	);
}
