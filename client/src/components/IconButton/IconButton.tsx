import clsx from "clsx";
import { DetailedHTMLProps } from "react";
import styles from "./IconButton.module.css";
interface Props
	extends DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	text?: string;
	iconRight?: JSX.Element;
	iconLeft?: JSX.Element;
	severity?: "info" | "primary" | "submit";
}

export function IconButton({
	text,
	iconLeft,
	iconRight,
	className,
	severity = "primary",
	...rest
}: Props) {
	const btnClassName = clsx(styles.iconBtn, styles[severity], {
		[String(className)]: !!className,
	});

	return (
		<button className={btnClassName} type="button" {...rest}>
			{iconLeft}
			{text}
			{iconRight}
		</button>
	);
}
