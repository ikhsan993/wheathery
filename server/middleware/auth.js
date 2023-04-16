import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

const auth = (req, res, next) => {
	dotenv.config()
	try {
		const token = req.headers.authorization.split(" ")[1];
		const isCustomAuth = token.length < 500;
		let decodedData;
		if (token && isCustomAuth) {
			decodedData = jwt.verify(token, process.env.SECRET_KEY);
			req.userId = decodedData?.id;
		} else {
			jwt.decode(token);
			req.userId = decodedData?.sub;
		}
		next();
	} catch (error) {
		console.log(error);
	}
};

export default auth;
