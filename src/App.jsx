import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Home } from "./components/home/Home";
import { MovieDetail } from "./components/moviedetail/MovieDetail";
import Navbar from "./components/navbar/Navbar";

export function App() {
	return (
		<main>
			<Navbar />
			<Switch>
				<Route path="/" component={Home} exact />
				<Route path="/movie/:id" component={MovieDetail} />
			</Switch>
		</main>
	);
}

export default App;
