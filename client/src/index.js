import React from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./reducers";
import "./index.css";

import App from "./App";

const store = createStore(reducers, compose(applyMiddleware(thunk)));
const rootElement = document.getElementById('root');
createRoot(rootElement).render(
	<Provider store={store}>
		<App />
	</Provider>
);
