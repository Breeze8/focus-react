import React from "react";
import Button from "../UI/Button/Button";
import "./Hero.css";

const Hero = () => {
	return (
		<section className="hero">
			<div className="container">
				<div className="hero__content">
					<h1 className="h1 hero__title">
						<span className="hero__title-text hero__title-text_1">
							Headless
							<img src="/img/hero-img-1.webp" className="hero__content-img hero__content-img_first" alt="" width="128" height="117" role="presentation" />
						</span>
						<span className="green hero__title-text hero__title-text_2">
							<img src="/img/hero-img-2.webp" className="hero__content-img hero__content-img_second" alt="" width="161" height="116" role="presentation" />
							commerce
						</span>
						<span className="hero__title-text hero__title-text_3">
							agency
							<Button href="#" className="btn-green btn-large bubble btn_hero" aria-label="Request a quote" tabIndex="0">
								REQUEST A QUOTE
							</Button>
						</span>
					</h1>
				</div>
				<div className="hero__footer">
					<div className="hero__logo">
						<img src="/img/clutch-logo.svg" className="hero__logo-img" alt="Focus Reactive ratings on Clutch platform" width="91" height="48" />
					</div>
					<p className="hero__footer-text">We build CMS websites and content-rich eCommerce platforms for businesses with complex needs</p>
					<ul className="socials">
						<li className="socials__item">
							<a href="#" target="_blank" className="bubble socials__link" aria-label="Follow us on Twitter/X" tabIndex="0">
								<span className="bubble-circle"></span>
								<span className="socials__text">X</span>
							</a>
						</li>
						<li className="socials__item">
							<a href="#" target="_blank" className="bubble socials__link" aria-label="Connect with us on LinkedIn" tabIndex="0">
								<span className="bubble-circle"></span>
								<span className="socials__text">LI</span>
							</a>
						</li>
						<li className="socials__item">
							<a href="#" target="_blank" className="bubble socials__link" aria-label="Like us on Facebook" tabIndex="0">
								<span className="bubble-circle"></span>
								<span className="socials__text">FB</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
};

export default Hero;
