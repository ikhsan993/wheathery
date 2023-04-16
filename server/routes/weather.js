import express from "express";
import {
	getDataWeather,history
} from "../controllers/weather.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/", auth, getDataWeather);
router.post("/history", auth, history);
export default router;
