import NewPassword from "@/components/user/NewPassword";

export const metadata = {
	title: "Reset Password",
};

interface IProps {
	params: { token: string };
}

const NewPasswordPage = ({ params }: IProps) => {
	return (
		<div>
			<NewPassword token={params?.token} />
		</div>
	);
};

export default NewPasswordPage;
