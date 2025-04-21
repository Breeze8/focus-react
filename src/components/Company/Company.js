import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "./Company.css";

import "swiper/css";

const companyImages = [
	{ src: "/img/company-1.webp", alt: "Partner company logo EasyPark", width: 118, height: 29 },
	{ src: "/img/company-2.webp", alt: "Partner company logo Tipico", width: 92, height: 30 },
	{ src: "/img/company-3.webp", alt: "Partner company logo Caleffi", width: 98, height: 59 },
	{ src: "/img/company-4.webp", alt: "Partner company logo TrafficGuard", width: 122, height: 61 },
	{ src: "/img/company-5.webp", alt: "Partner company logo GitNation", width: 114, height: 39 },
	{ src: "/img/company-6.webp", alt: "Partner company logo Secret Escapes", width: 123, height: 38 },
	{ src: "/img/company-7.webp", alt: "Partner company logo Bargreen Ellingson", width: 132, height: 68 },

	{ src: "/img/company-1.webp", alt: "Partner company logo EasyPark", width: 118, height: 29 },
	{ src: "/img/company-2.webp", alt: "Partner company logo Tipico", width: 92, height: 30 },
	{ src: "/img/company-3.webp", alt: "Partner company logo Caleffi", width: 98, height: 59 },
	{ src: "/img/company-4.webp", alt: "Partner company logo TrafficGuard", width: 122, height: 61 },
	{ src: "/img/company-5.webp", alt: "Partner company logo GitNation", width: 114, height: 39 },
	{ src: "/img/company-6.webp", alt: "Partner company logo Secret Escapes", width: 123, height: 38 },
	{ src: "/img/company-7.webp", alt: "Partner company logo Bargreen Ellingson", width: 132, height: 68 },
];

const Company = () => {
	const swiperRef = useRef(null);

	useEffect(() => {
		if (swiperRef.current) {
			const swiper = swiperRef.current.swiper;
			if (swiper) {
				swiper.params.autoplay.disableOnInteraction = true;
				swiper.params.speed = 5000;
			}
		}
	}, []);

	return (
		<div className="company">
			<Swiper
				ref={swiperRef}
				modules={[Autoplay]}
				slidesPerView="auto"
				centeredSlides={true}
				loop={true}
				speed={5000}
				autoplay={{
					delay: 1,
					disableOnInteraction: false,
				}}
				allowTouchMove={false}
				className="company-slider"
				breakpoints={{
					768: {
						spaceBetween: 16,
					},
					0: {
						spaceBetween: 24,
					},
				}}>
				{companyImages.map((company, index) => (
					<SwiperSlide key={index}>
						<div className="company-item">
							<img src={company.src} alt={company.alt} width={company.width} height={company.height} />
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default Company;
