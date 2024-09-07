import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
const Navbar = ({ setShowLogin }) => {
	const [userStatus, setUserStatus] = useState(false);
	return (
		<div className='container'>
			<div className='navbar'>
				<div className='navbar-left'>
					<img className='menu-icon' src={assets.menu_icon} alt='' />
					<div className='logo'>RepoX</div>
				</div>

				<div className='navbar-center'>
					<div className='search-bar'>
						<input className='search-box' type='search' placeholder='Search' />
						<div className='search-logo'>
							<img className='search-img' src={assets.search_icon} alt='' />
						</div>
					</div>
				</div>

				<div className='navbar-right'>
					{userStatus ? (
						<button className='status'>Profile</button>
					) : (
						<button
							onClick={() => {
								setShowLogin(true);
							}}
							className='status'>
							Sign-In
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
