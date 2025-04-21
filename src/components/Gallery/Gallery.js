
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Gallery.css";
import "swiper/css";

const galleryItems = [
	{
		id: 1,
		title: "Calvin Klein 1",
		description:
			"An Iconic Shopify Online Store Reborn An Iconic Shopify Online Store Reborn An Iconic Shopify Online Store RebornAn Iconic Shopify Online Store RebornAn Iconic Shopify Online Store RebornAn Iconic Shopify Online Store RebornAn Iconic Shopify Online Store Reborn",
		image: "/img/gallery-1.webp",
		tags: [
			"UX Consultancy",
			"Perfomance",
			"Technical SEO & Data Layer",
			"UX Consultancy",
			"Perfomance",
			"Technical SEO & Data Layer",
			"UX Consultancy",
			"Perfomance",
			"Technical SEO & Data Layer",
		],
	},
	{
		id: 2,
		title: "Calvin Klein 2",
		description: "An Iconic Shopify Online Store Reborn",
		image: "/img/gallery-1.webp",
		tags: ["UX Consultancy", "Perfomance", "Technical SEO & Data Layer"],
	},
	{
		id: 3,
		title: "Calvin Klein 3",
		description: "An Iconic Shopify Online Store Reborn",
		image: "/img/gallery-1.webp",
		tags: ["UX Consultancy", "Perfomance", "Technical SEO & Data Layer"],
	},
	{
		id: 4,
		title: "Calvin Klein 4",
		description: "An Iconic Shopify Online Store Reborn",
		image: "/img/gallery-1.webp",
		tags: ["UX Consultancy", "Perfomance", "Technical SEO & Data Layer"],
	},
];

const Gallery = () => {
	const swiperRef = useRef(null);
	const [currentSlide, setCurrentSlide] = useState(1);
	const [totalSlides, setTotalSlides] = useState(galleryItems.length);

	useEffect(() => {
		const state = {
			isSliding: false,
			lastActiveCursorClass: null,
			isLargeScreen: window.innerWidth >= 1200,
			isCursorOverSlider: false,
		};

		const elements = {
			body: document.querySelector("body"),
			cursors: {
				left: createCursor("left"),
				right: createCursor("right"),
				view: createCursor("view"),
			},
		};

		const config = {
			breakpoint: 1200,
			slideTransitionTime: 550,
			counterUpdateDelay: 50,
			cursorVisibilityClasses: {
				body: "custom-cursor-active",
				cursor: "visible",
			},
		};

		function createCursor(type) {
			const cursor = document.createElement("div");
			cursor.classList.add("custom-cursor", `cursor-${type}`);

			switch (type) {
				case "left":
					cursor.innerHTML = `
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M36.99 28.99C36.4432 29.5367 35.5568 29.5367 35.0101 28.99L24 17.9799L12.99 28.99C12.4432 29.5367 11.5568 29.5367 11.0101 28.99C10.4633 28.4432 10.4633 27.5568 11.0101 27.0101L23.0101 15.0101C23.5568 14.4633 24.4432 14.4633 24.99 15.0101L36.99 27.0101C37.5367 27.5568 37.5367 28.4432 36.99 28.99Z"
              fill="white" />
          </svg>
          `;
					break;
				case "right":
					cursor.innerHTML = `
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M19.01 36.99C18.4633 36.4432 18.4633 35.5568 19.01 35.0101L30.0201 24L19.01 12.99C18.4633 12.4432 18.4633 11.5568 19.01 11.0101C19.5568 10.4633 20.4432 10.4633 20.9899 11.0101L32.9899 23.0101C33.5367 23.5568 33.5367 24.4432 32.9899 24.99L20.9899 36.99C20.4432 37.5367 19.5568 37.5367 19.01 36.99Z"
              fill="white" />
          </svg>
          `;
					break;
				case "view":
					cursor.innerHTML = "<span>view case</span>";
					break;
			}

			return cursor;
		}

		function appendCursors() {
			Object.values(elements.cursors).forEach((cursor) => {
				elements.body.appendChild(cursor);
			});
		}

		function removeCursors() {
			Object.values(elements.cursors).forEach((cursor) => {
				if (cursor.parentNode) {
					cursor.parentNode.removeChild(cursor);
				}
			});
		}

		function isMouseInSliderArea(event) {
			const sliderContainer = document.querySelector(".gallery-slider");
			if (!sliderContainer) return false;

			const containerRect = sliderContainer.getBoundingClientRect();

			const adjustedTop = containerRect.top + 20;

			const isWithinSliderHorizontally = event.clientX >= containerRect.left && event.clientX <= containerRect.right;
			const isWithinSliderVertically = event.clientY >= adjustedTop && event.clientY <= containerRect.bottom;

			return isWithinSliderHorizontally && isWithinSliderVertically;
		}

		function isMouseInImageArea(event) {
			if (!isMouseInSliderArea(event)) return false;

			const activeSlide = document.querySelector(".swiper-slide-active");

			if (!activeSlide) return true;

			const activeRow = activeSlide.querySelector(".gallery-item__row");
			if (!activeRow) return true;

			const rowTop = activeRow.getBoundingClientRect().top - 70;

			return event.clientY < rowTop;
		}

		function getSliderZone(event) {
			if (!isMouseInImageArea(event)) return null;

			const sliderContainer = document.querySelector(".gallery-slider");
			if (!sliderContainer) return null;

			const containerRect = sliderContainer.getBoundingClientRect();
			const relativeX = event.clientX - containerRect.left;
			const containerWidth = containerRect.width;

			if (relativeX < containerWidth * 0.2) {
				return "left";
			} else if (relativeX > containerWidth * 0.8) {
				return "right";
			} else {
				return "view";
			}
		}

		function updateCursorVisibility(event) {
			if (state.isSliding || !state.isLargeScreen) return;

			const zone = getSliderZone(event);
			const isOverImageArea = isMouseInImageArea(event);

			state.isCursorOverSlider = isOverImageArea;

			if (zone && isOverImageArea) {
				elements.body.classList.add(config.cursorVisibilityClasses.body);

				Object.entries(elements.cursors).forEach(([cursorType, cursor]) => {
					if (cursorType === zone) {
						cursor.classList.add(config.cursorVisibilityClasses.cursor);
					} else {
						cursor.classList.remove(config.cursorVisibilityClasses.cursor);
					}
				});

				state.lastActiveCursorClass = zone;
			} else {
				elements.body.classList.remove(config.cursorVisibilityClasses.body);

				Object.values(elements.cursors).forEach((cursor) => {
					cursor.classList.remove(config.cursorVisibilityClasses.cursor);
				});

				state.lastActiveCursorClass = null;
			}
		}

		function handleMouseMove(event) {
			if (!state.isLargeScreen) return;

			const { clientX, clientY } = event;
			const isOverImageArea = isMouseInImageArea(event);

			if (isOverImageArea) {
				Object.values(elements.cursors).forEach((cursor) => {
					cursor.style.left = `${clientX}px`;
					cursor.style.top = `${clientY}px`;
				});
			}

			updateCursorVisibility(event);
		}

		function handleClick(event) {
			if (!state.isLargeScreen || state.isSliding) return;

			const zone = getSliderZone(event);
			if (!zone) return;

			if (zone === "left") {
				swiperRef.current.slidePrev();
				event.preventDefault();
				event.stopPropagation();
			} else if (zone === "right") {
				swiperRef.current.slideNext();
				event.preventDefault();
				event.stopPropagation();
			} else if (zone === "view") {
				const activeSlideImg = document.querySelector(".swiper-slide-active .gallery-item__img");
				if (activeSlideImg) {
					activeSlideImg.click();
				}
			}
		}

		function handleResize() {
			const wasLargeScreen = state.isLargeScreen;
			state.isLargeScreen = window.innerWidth >= config.breakpoint;

			if (wasLargeScreen !== state.isLargeScreen) {
				if (state.isLargeScreen) {
					appendCursors();
					attachDesktopEventListeners();
				} else {
					removeCursors();
					detachDesktopEventListeners();
					elements.body.classList.remove(config.cursorVisibilityClasses.body);
				}
			} else {
				if (swiperRef.current) {
					setTimeout(() => {
						swiperRef.current.update();
						swiperRef.current.slideNext(0);
						swiperRef.current.slidePrev(0);
					}, 100);
				}
			}
		}

		function attachDesktopEventListeners() {
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("click", handleClick);
		}

		function detachDesktopEventListeners() {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("click", handleClick);
		}

		function initSlider() {
			if (state.isLargeScreen) {
				appendCursors();
				attachDesktopEventListeners();
			}
		}

		initSlider();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
			detachDesktopEventListeners();
			removeCursors();
		};
	}, []);

	const handleSlideChange = (swiper) => {
		setCurrentSlide(swiper.realIndex + 1);
	};

	const handleSwiperInit = (swiper) => {
		swiperRef.current = swiper;
		setTotalSlides(galleryItems.length);
		setCurrentSlide(swiper.realIndex + 1);

		setTimeout(() => {
			swiper.update();
			swiper.slideNext(0);
			swiper.slidePrev(0);
		}, 50);
	};

	return (
		<div className="gallery">
			<Swiper
				onSwiper={handleSwiperInit}
				spaceBetween={0}
				speed={500}
				slidesPerView="auto"
				autoHeight={true}
				loop={true}
				watchSlidesProgress={true}
				preventInteractionOnTransition={true}
				className="gallery-slider"
				onSlideChange={handleSlideChange}
				breakpoints={{
					1200: {
						loopAdditionalSlides: 1,
					},
				}}>
				{galleryItems.map((item) => (
					<SwiperSlide key={item.id}>
						<div className="gallery-item">
							<a href="#" className="gallery-item__img" tabIndex="0" aria-label="View Calvin Klein case study details">
								<img src={item.image} alt="Calvin Klein e-commerce website showcase" width="1130" height="612" className="gallery-item__img-image" />
							</a>
							<div className="gallery-item__row">
								<div className="gallery-item__content">
									<div className="gallery-item__name">{item.title}</div>
									<p className="gallery-item__text">{item.description}</p>
								</div>
								<ul className="gallery-item__list">
									{item.tags.map((tag, tagIndex) => (
										<li className="gallery-item__list-item" key={tagIndex}>
											{tag}
										</li>
									))}
								</ul>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			<div className="gallery-counter">
				<span className="gallery-counter__text">{currentSlide}</span>
				<span className="gallery-counter__line gallery-counter__text"></span>
				<span className="gallery-counter__text">{totalSlides}</span>
			</div>
		</div>
	);
};

export default Gallery;
