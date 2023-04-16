import SearchHistory from "../models/searchHistory.js";
import axios from 'axios'

export const getDataWeather = async (req, res) => {
	let {search} = req.body;
	const API_KEY = process.env.WEATHER_API;
	if (!req.userId) res.json({ message: "Unauthenticated" });	
	try {
		let history =  await SearchHistory.updateOne({ user_id: req.userId }, { $addToSet: { search_history: search.toLowerCase() } }, { upsert: true });
		let dataWeather = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${search}`)
		res.status(200).json(dataWeather.data);
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};

export const history = async (req,res) => {
	if (!req.userId) res.json({ message: "Unauthenticated" });
	try {
		let searchHistory = await SearchHistory.findOne({user_id:req.userId},{search_history:1,_id:0})
		res.status(200).json(searchHistory);
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
}

