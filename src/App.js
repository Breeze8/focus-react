// src/App.js
import React, { useState, useEffect } from "react";
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

	useEffect(() => {
		const buttons = document.querySelectorAll(".bubble");
  
		buttons.forEach((button) => {
			const circle = button.querySelector(".bubble-circle");
  
			const handleMouseEnter = function(e) {
				if (circle) {
					const parentRect = this.getBoundingClientRect();
					const relX = e.clientX - parentRect.left;
					const relY = e.clientY - parentRect.top;
  
					circle.style.left = relX + "px";
					circle.style.top = relY + "px";
					circle.classList.remove("desplode-circle");
					circle.classList.add("explode-circle");
				}
			};
  
			const handleMouseLeave = function(e) {
				if (circle) {
					const parentRect = this.getBoundingClientRect();
					const relX = e.clientX - parentRect.left;
					const relY = e.clientY - parentRect.top;
  
					circle.style.left = relX + "px";
					circle.style.top = relY + "px";
					circle.classList.remove("explode-circle");
					circle.classList.add("desplode-circle");
				}
			};
  
			button.addEventListener("mouseenter", handleMouseEnter);
			button.addEventListener("mouseleave", handleMouseLeave);
			
			button._handleMouseEnter = handleMouseEnter;
			button._handleMouseLeave = handleMouseLeave;
		});
  
		return () => {
			buttons.forEach((button) => {
				const handleMouseEnter = button._handleMouseEnter;
				const handleMouseLeave = button._handleMouseLeave;
			
				if (handleMouseEnter) button.removeEventListener("mouseenter", handleMouseEnter);
				if (handleMouseLeave) button.removeEventListener("mouseleave", handleMouseLeave);
			});
		};
	}, []);

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