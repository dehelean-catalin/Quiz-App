import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { FieldInput } from "../../components";
import { axiosInstance } from "../../config/axios.config";
import { ROUTES } from "../../config/routes";
import styles from "./SignUpPage.module.css";
import { RegiserFormData, registerSchema } from "./schemas/register.schema";

export function SignUpPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(registerSchema),
	});

	async function onSubmit(data: RegiserFormData) {
		try {
			await axiosInstance.post("/sign-up", data);
		} catch (error) {
			alert(error);
		}
	}

	return (
		<>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<h1>Sign up</h1>

				<div className={styles.container}>
					<FieldInput
						label="First Name"
						id="firstName"
						register={register}
						placeholder="Enter first name"
						errorMessage={errors.firstName?.message}
					/>
					<FieldInput
						label="Last Name"
						id="lastName"
						register={register}
						placeholder="Enter last name"
						errorMessage={errors.lastName?.message}
					/>
				</div>
				<FieldInput
					label="Email"
					id="email"
					type="email"
					register={register}
					placeholder="Enter your email address"
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
				<FieldInput
					label="Confirm Password"
					id="confirmPassword"
					type="password"
					register={register}
					placeholder="Confirm your password"
					errorMessage={errors.confirmPassword?.message}
				/>

				<button className="btn" type="submit">
					Sign up
				</button>

				<p>
					Already have an account? Try to
					<NavLink to={ROUTES.LOGIN}> Login</NavLink>
				</p>
			</form>
		</>
	);
}
