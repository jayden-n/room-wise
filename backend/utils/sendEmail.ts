import nodemailer from "nodemailer";

interface EmailOptions {
	email: string;
	subject: string;
	message: string;
}

export default async (options: EmailOptions) => {
	// docs: https://mailtrap.io/inboxes/2489195/messages

	const transport = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: process.env.SMTP_PORT,
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASSWORD,
		},
	});

	// send back to clients
	const message = {
		from: `${process.env.SMTP_NAME} <${process.env.SMTP_EMAIL}>`,
		to: options.email,
		subject: options.subject,
		html: options.message,
	};

	await transport.sendMail(message);
};
