import mongoose from "mongoose";

const searchHistorySchema = mongoose.Schema({
	search_history: {
		type: [String],
		default: [],
	},
	user_id : String,
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

const SearchHistory = mongoose.model("searchHistory", searchHistorySchema);

export default SearchHistory;
