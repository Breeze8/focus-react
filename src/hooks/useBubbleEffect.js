import { useEffect } from "react";

export default function useBubbleEffect(selector = ".bubble") {
	useEffect(() => {
		const buttons = document.querySelectorAll(selector);

		buttons.forEach((button) => {
			const circle = button.querySelector(".bubble-circle");
			if (!circle) return;

			const handleMouseEnter = function (e) {
				const parentRect = this.getBoundingClientRect();
				const relX = e.clientX - parentRect.left;
				const relY = e.clientY - parentRect.top;

				circle.style.left = `${relX}px`;
				circle.style.top = `${relY}px`;
				circle.classList.remove("desplode-circle");
				circle.classList.add("explode-circle");
			};

			const handleMouseLeave = function (e) {
				const parentRect = this.getBoundingClientRect();
				const relX = e.clientX - parentRect.left;
				const relY = e.clientY - parentRect.top;

				circle.style.left = `${relX}px`;
				circle.style.top = `${relY}px`;
				circle.classList.remove("explode-circle");
				circle.classList.add("desplode-circle");
			};

			button.addEventListener("mouseenter", handleMouseEnter);
			button.addEventListener("mouseleave", handleMouseLeave);

			button._handleMouseEnter = handleMouseEnter;
			button._handleMouseLeave = handleMouseLeave;
		});

		return () => {
			buttons.forEach((button) => {
				if (button._handleMouseEnter) button.removeEventListener("mouseenter", button._handleMouseEnter);
				if (button._handleMouseLeave) button.removeEventListener("mouseleave", button._handleMouseLeave);
			});
		};
	}, [selector]);
}
