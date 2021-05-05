import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";

export default function Navbar() {
	const [click, setclick] = useState(false);
	const closeMobileMenu = () => setclick(false);
	const handleClick = () => {
		setclick(!click);
	};

	return (
		<>
			<nav className="navbar">
				<div className="navbar-container container">
					<Link to="/" onClick={closeMobileMenu} className="navbar-logo">
						movie<span className="rise">rise</span>
					</Link>
					<div className={click ? "btn-container  active" : "btn-container"}>
						<Link className="btn-link" onClick={closeMobileMenu}>
							<button className="btn--borderNone">Sign in</button>
						</Link>
						<Link className="btn-link" onClick={closeMobileMenu}>
							<button className="btn--info">Sign up</button>
						</Link>
					</div>
					<div className="menu-icon" onClick={handleClick}>
						{click ? <FaTimes /> : <FaBars />}
					</div>
				</div>
			</nav>
		</>
	);
}
