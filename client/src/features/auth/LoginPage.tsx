import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { FieldInput } from "../../components";
import { axiosInstance } from "../../config/axios.config";
import { ROUTES } from "../../config/routes";
import styles from "./SignUpPage.module.css";
import { LoginFormData, loginSchema } from "./schemas/login.schema";

export function LoginPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(loginSchema),
	});

	async function onSubmit(data: LoginFormData) {
		try {
			await axiosInstance.post("/authenticate", data);
		} catch (error) {
			alert(error);
		}
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<h1>Login</h1>

			<FieldInput
				label="Email"
				id="email"
				register={register}
				placeholder="Enter first email"
				errorMessage={errors.email?.message}
			/>

			<FieldInput
				label="Password"
				id="password"
				type="password"
				register={register}
				placeholder="Enter your password"
				errorMessage={errors.password?.message}
			/>

			<button className="btn" type="submit">
				Login
			</button>

			<p>
				Don' have an account? Create one
				<NavLink to={ROUTES.SIGN_UP}> Sign up</NavLink>
			</p>
		</form>
	);
}
