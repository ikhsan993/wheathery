import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/user.js";

export const signin = async (req, res) => {
	const { email, password } = req.body;
	try {
		const existingUser = await user.findOne({ email });
		if (!existingUser) {
			return res
				.status(404)
				.json({ message: "User doesn't exist." });
		}
		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);
		if (!isPasswordCorrect)
			return res
				.status(400)
				.json({ message: "Invalid Credentials" });

		const token = jwt.sign(
			{ email: existingUser.email, id: existingUser._id },
			process.env.SECRET_KEY,
			{ expiresIn: "24h" }
		);

		

		res.status(200).json({ result: existingUser, token });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
export const signup = async (req, res) => {
	const { email, password, name, confirmPassword } =
		req.body;
	try {
		const existingUser = await user.findOne({ email });

		if (existingUser)
			return res
				.status(400)
				.json({ message: "User already exist" });

		if (password !== confirmPassword)
			return res
				.status(400)
				.json({ message: "Passwords don't match" });

		const hashedPassword = await bcrypt.hash(password, 12);

		const result = await user.create({
			email,
			password: hashedPassword,
			name: `${name}`,
		});

		const token = jwt.sign(
			{ email: result.email, id: result._id },
			process.env.SECRET_KEY,
			{ expiresIn: "24h" }
		);

		res.status(200).json({ result : {email : result.email,name:result.name }, token });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
