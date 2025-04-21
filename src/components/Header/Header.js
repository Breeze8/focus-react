import React, { useState, useEffect, useRef } from "react";
import Button from "../UI/Button/Button";
import "./Header.css";

const Header = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
	const [activeSubmenus, setActiveSubmenus] = useState([]);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
	const dropdownRefs = useRef([]);
	const submenuRefs = useRef([]);

	useEffect(() => {
		const handleResize = () => {
			const wasMobile = isMobile;
			const newIsMobile = window.innerWidth < 768;
			setIsMobile(newIsMobile);

			if (wasMobile !== newIsMobile) {
				setupDropdownToggle(newIsMobile);
			}

			if (window.innerWidth >= 768) {
				setIsMobileMenuOpen(false);
			}
		};

		const handleKeydown = (e) => {
			if (e.key === "Escape") {
				document.querySelectorAll(".has-dropdown.open").forEach((item) => {
					const trigger = item.querySelector("a");
					trigger.setAttribute("aria-expanded", "false");
					item.classList.remove("open");
					trigger.focus();
				});
				setActiveSubmenus([]);
			}
		};

		window.addEventListener("resize", handleResize);
		document.addEventListener("keydown", handleKeydown);
		setupDropdownToggle(isMobile);

		return () => {
			window.removeEventListener("resize", handleResize);
			document.removeEventListener("keydown", handleKeydown);
		};
	}, [isMobile, setIsMobileMenuOpen]);

	const setupDropdownToggle = (isMobileView) => {
		const dropdownContainers = document.querySelectorAll(".menu .has-dropdown");

		dropdownContainers.forEach((container) => {
			container.classList.remove("active");

			const submenu = container.querySelector(".has-dropdown > a + *");
			if (submenu) {
				submenu.classList.remove("active");
				submenu.style.height = "";
			}
		});

		setActiveSubmenus([]);
	};

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const handleMenuKeyDown = (e, index) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			const expanded = e.target.getAttribute("aria-expanded") === "true";
			e.target.setAttribute("aria-expanded", !expanded);

			const parentLi = e.target.parentElement;
			if (expanded) {
				parentLi.classList.remove("open");
				setActiveSubmenus(activeSubmenus.filter((item) => item !== index));
			} else {
				parentLi.classList.add("open");
				setActiveSubmenus([...activeSubmenus, index]);

				setTimeout(() => {
					const submenuLink = parentLi.querySelector(".submenu__link");
					if (submenuLink) submenuLink.focus();
				}, 10);
			}
		}
	};

	const toggleSubmenu = (e, index) => {
		if (isMobile) {
			e.preventDefault();
			const submenuEl = submenuRefs.current[index];
			const parentDropdown = dropdownRefs.current[index];

			if (!activeSubmenus.includes(index)) {
				setActiveSubmenus([...activeSubmenus, index]);

				if (submenuEl && parentDropdown) {
					submenuEl.classList.add("active");
					parentDropdown.classList.add("active");
					submenuEl.style.height = "auto";
					const height = submenuEl.clientHeight + "px";
					submenuEl.style.height = "0px";

					setTimeout(() => {
						submenuEl.style.height = height;
					}, 0);
				}
			} else {
				if (submenuEl && parentDropdown) {
					submenuEl.style.height = "0px";

					const handleTransitionEnd = () => {
						submenuEl.classList.remove("active");
						parentDropdown.classList.remove("active");
						submenuEl.removeEventListener("transitionend", handleTransitionEnd);
						setActiveSubmenus(activeSubmenus.filter((item) => item !== index));
					};

					submenuEl.addEventListener("transitionend", handleTransitionEnd);
				}
			}
		}
	};

	const menuItems = [
		{
			title: "Services",
			hasDropdown: true,
			submenu: [
				{ title: "Services 1", link: "#" },
				{ title: "Services 2", link: "#" },
				{ title: "Services 3", link: "#" },
			],
		},
		{
			title: "Technologies",
			hasDropdown: false,
			link: "#",
		},
		{
			title: "Our Works",
			hasDropdown: true,
			submenu: [
				{ title: "Services 1", link: "#" },
				{ title: "Services 2", link: "#" },
				{ title: "Services 3", link: "#" },
			],
		},
		{
			title: "Careers",
			hasDropdown: false,
			link: "#",
		},
		{
			title: "About",
			hasDropdown: false,
			link: "#",
		},
	];

	return (
		<header className="header" role="banner">
			<div className="container">
				<div className="header-row">
					<a href="#" className="logo" tabIndex="0" aria-label="Focus Reactive - Return to homepage">
						<img src="img/logo.svg" className="logo__img" alt="Focus Reactive logo" width="114" height="40" />
					</a>

					<nav className={`menu ${isMobileMenuOpen ? "open" : ""}`} role="navigation" aria-label="Main navigation">
						<ul className="menu__list" role="menubar">
							{menuItems.map((item, index) => {
								const menuId = item.title.toLowerCase().replace(/\s+/g, "-");

								return (
									<li
										className={`menu__item ${item.hasDropdown ? "has-dropdown" : ""} ${activeSubmenus.includes(index) ? "active" : ""}`}
										role="none"
										key={index}
										ref={(el) => item.hasDropdown && (dropdownRefs.current[index] = el)}>
										<a
											href={item.link || "#"}
											className="menu__link"
											tabIndex="0"
											role="menuitem"
											aria-haspopup={item.hasDropdown ? "true" : "false"}
											aria-expanded={activeSubmenus.includes(index) ? "true" : "false"}
											aria-controls={item.hasDropdown ? `${menuId}-submenu` : null}
											id={item.hasDropdown ? `${menuId}-menu` : null}
											onClick={(e) => item.hasDropdown && toggleSubmenu(e, index)}
											onKeyDown={(e) => item.hasDropdown && handleMenuKeyDown(e, index)}>
											{item.title}
											{item.hasDropdown && (
												<svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
													<path d="M8 0L4 4L0 0H8Z" fill="#00E56D" />
												</svg>
											)}
										</a>

										{item.hasDropdown && (
											<ul
												className={`submenu ${activeSubmenus.includes(index) ? "active" : ""}`}
												role="menu"
												id={`${menuId}-submenu`}
												aria-labelledby={`${menuId}-menu`}
												ref={(el) => (submenuRefs.current[index] = el)}
												style={isMobile && activeSubmenus.includes(index) ? { height: "auto" } : {}}>
												{item.submenu.map((subItem, subIndex) => (
													<li className="submenu__item" role="none" key={subIndex}>
														<a href={subItem.link} className="submenu__link" tabIndex="-1" role="menuitem">
															{subItem.title}
														</a>
													</li>
												))}
											</ul>
										)}
									</li>
								);
							})}
						</ul>
					</nav>

					<Button href="#" className="btn-green header_btn bubble" aria-label="Contact Us" tabIndex="0">
						Contact Us
					</Button>

					<div
						className={`hamburger hamburger--vortex ${isMobileMenuOpen ? "is-active" : ""}`}
						tabIndex="0"
						role="button"
						aria-label="Toggle menu"
						aria-expanded={isMobileMenuOpen ? "true" : "false"}
						onClick={toggleMobileMenu}>
						<div className="hamburger-box">
							<div className="hamburger-inner"></div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
