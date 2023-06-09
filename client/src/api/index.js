import axios from "axios";

const API = axios.create({ baseURL: "https://wheathery-ikhsan993.vercel.app" });

API.interceptors.request.use((req) => {
	if (localStorage.getItem("profile")) {
		req.headers.Authorization = `Bearer ${
			JSON.parse(localStorage.getItem("profile")).token
		}`;
	}
	return req;
});

export const getDataWeather = (search) => API.post("/weather", search);
export const getHistory = () => API.post("/weather/history");
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
