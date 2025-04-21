import React, { useState, useEffect } from "react";
import useBubbleEffect from "./hooks/useBubbleEffect";
import "./App.css";

import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Gallery from "./components/Gallery/Gallery";
import Company from "./components/Company/Company";
import Provide from "./components/Provide/Provide";
import Features from "./components/Features/Features";
import Footer from "./components/Footer/Footer";

function App() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useBubbleEffect();

	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.classList.add("hidden");
		} else {
			document.body.classList.remove("hidden");
		}

		return () => {
			document.body.classList.remove("hidden");
		};
	}, [isMobileMenuOpen]);

	return (
		<>
			<Header isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
			<main className="main" role="main">
				<Hero />
				<Gallery />
				<Company />
				<Provide />
				<Features />
			</main>
			<Footer />
		</>
	);
}

export default App;
