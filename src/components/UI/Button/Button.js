import React from "react";
import "./Button.css";

const Button = ({ children, className = "", href, type = "button", onClick, ...props }) => {
	const ButtonElement = href ? "a" : "button";
	const buttonProps = href ? { href, ...props } : { type, onClick, ...props };

	return (
		<ButtonElement className={`btn ${className}`} {...buttonProps}>
			{className.includes("bubble") && <span className="bubble-circle"></span>}
			<span className="btn-text">{children}</span>
		</ButtonElement>
	);
};

export default Button;
