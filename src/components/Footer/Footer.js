import React from "react";
import "./Footer.css";

const Footer = () => {
	return (
		<footer className="footer" role="contentinfo">
			<div className="container">
				<div className="footer__content">
					<div className="footer__logo">
						<img src="/img/clutch-logo.svg" className="footer__logo-image" alt="Focus Reactive ratings on Clutch platform" width="197" height="104" />
					</div>
					<h3 className="h3 footer__title">
						Our{" "}
						<a href="#" aria-label="Read our customer reviews" aria-describedby="reviews-description" className="green footer__title-link" tabIndex="0">
							customer reviews
						</a>{" "}
						are excellent
					</h3>
					<div className="footer__subtitle">Join the success stories!</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
