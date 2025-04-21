import React from "react";
import { useInView } from "react-intersection-observer";
import "./Features.css";

const Features = () => {
	const [ref1, inView1] = useInView({ threshold: 0.1, triggerOnce: true });
	const [ref2, inView2] = useInView({ threshold: 0.1, triggerOnce: true });
	const [ref3, inView3] = useInView({ threshold: 0.1, triggerOnce: true });

	return (
		<div className="features animation-wrapper">
			<div className="container">
				<div className="features-content">
					<div ref={ref1} className={`features-item animate-title ${inView1 ? "visible" : ""}`}>
						<div className="features-item__num">3.5%</div>
						<div className="features-item__title">
							Conversion <br />
							Rate
						</div>
					</div>

					<div ref={ref2} className={`features-item animate-title ${inView2 ? "visible" : ""}`}>
						<div className="features-item__num">$1200</div>
						<div className="features-item__title">
							Customer <br />
							Lifetime Value
						</div>
					</div>

					<div ref={ref3} className={`features-item animate-title ${inView3 ? "visible" : ""}`}>
						<div className="features-item__num">100</div>
						<div className="features-item__title">
							Website <br />
							Performance
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Features;
