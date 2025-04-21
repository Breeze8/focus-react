import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import "./Provide.css";

const Provide = () => {
	const [allTitlesVisible, setAllTitlesVisible] = useState(false);

	const [titleRef1, inView1] = useInView({ threshold: 0.1, triggerOnce: true });
	const [titleRef2, inView2] = useInView({ threshold: 0.1, triggerOnce: true });
	const [titleRef3, inView3] = useInView({ threshold: 0.1, triggerOnce: true });

	useEffect(() => {
		if (inView1 && inView2 && inView3 && !allTitlesVisible) {
			setAllTitlesVisible(true);
		}
	}, [inView1, inView2, inView3, allTitlesVisible]);

	return (
		<section className="provide">
			<div className="container">
				<div className="provide__content">
					<div className="provide__subtitle">we provide</div>
					<div className="provide__wrap">
						<h2 className="h2 provide__title">
							<span ref={titleRef1} className={`animate-title provide__title-text ${inView1 ? "visible" : ""}`}>
								Future-proof
							</span>
							<span ref={titleRef2} className={`animate-title provide__title-text ${inView2 ? "visible" : ""}`}>
								e-commerce solutions
							</span>
							<span ref={titleRef3} className={`animate-title provide__title-text ${inView3 ? "visible" : ""}`}>
								at optimal budget
							</span>
						</h2>

						<div className="provide-box">
							<div className={`provide-item ${allTitlesVisible ? "visible" : ""}`}>
								<svg className="provide-item__icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
									<path d="M13.1391 10H0.414062" stroke="black" strokeMiterlimit="10" />
									<path d="M11.5469 3.63281L17.9135 9.99948L11.5469 16.3661" stroke="black" strokeMiterlimit="10" />
									<path d="M7.57812 3.63281L13.9448 9.99948L7.57812 16.3661" stroke="black" strokeMiterlimit="10" />
								</svg>
								<span>BUILD FAST</span>
							</div>
							<div className={`provide-item ${allTitlesVisible ? "visible" : ""}`}>
								<svg className="provide-item__icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
									<g clipPath="url(#clip0_1_715)">
										<path d="M11.6641 10H18.2807H18.3307" stroke="black" strokeMiterlimit="10" />
										<path d="M8.33073 10H1.71406H1.66406" stroke="black" strokeMiterlimit="10" />
										<path d="M4.9974 6.66699L1.66406 10.0003L4.9974 13.3337" stroke="black" strokeMiterlimit="10" />
										<path d="M15 13.3337L18.3333 10.0003L15 6.66699" stroke="black" strokeMiterlimit="10" />
										<path d="M10 18.3337V18.2837V11.667" stroke="black" strokeMiterlimit="10" />
										<path d="M10 1.66699V1.71699V8.33366" stroke="black" strokeMiterlimit="10" />
										<path d="M13.3307 5.00033L9.9974 1.66699L6.66406 5.00033" stroke="black" strokeMiterlimit="10" />
										<path d="M6.66406 15L9.9974 18.3333L13.3307 15" stroke="black" strokeMiterlimit="10" />
									</g>
									<defs>
										<clipPath id="clip0_1_715">
											<rect width="20" height="20" fill="white" />
										</clipPath>
									</defs>
								</svg>
								<span>DREAM BIG</span>
							</div>
							<div className={`provide-item ${allTitlesVisible ? "visible" : ""}`}>
								<svg className="provide-item__icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
									<path d="M18.3333 1.72461L6.375 13.6746" stroke="black" strokeMiterlimit="10" />
									<path d="M18.2177 9.08294V1.72461H10.8594" stroke="black" strokeMiterlimit="10" />
									<path
										d="M4.4224 18.2745C5.94578 18.2745 7.18073 17.0395 7.18073 15.5161C7.18073 13.9928 5.94578 12.7578 4.4224 12.7578C2.89901 12.7578 1.66406 13.9928 1.66406 15.5161C1.66406 17.0395 2.89901 18.2745 4.4224 18.2745Z"
										stroke="black"
										strokeMiterlimit="10"
									/>
								</svg>
								<span>GROW FAR</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Provide;
