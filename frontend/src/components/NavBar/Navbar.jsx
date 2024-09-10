import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
	const { setSearchQuery } = useContext(StoreContext);
	const [inputValue, setInputValue] = useState(""); // Local state for input
	const navigate = useNavigate();
	const [userStatus, setUserStatus] = useState(false);

	// Function to handle the Enter key press
	const handleKeyPress = (e) => {
		if (e.key === "Enter" && inputValue.trim()) {
			performSearch();
		}
	};

	// Handle input change
	const handleInputChange = (e) => {
		setInputValue(e.target.value); // Update local state
	};

	// Perform search action
	const performSearch = () => {
		setSearchQuery(inputValue);
		navigate("/search");
	};

	return (
		<div className='navbar'>
			<div className='navbar-left'>
				<img className='menu-icon' src={assets.menu_icon} alt='' />
				<Link to='/' className='logo'>
					RepoX
				</Link>
			</div>

			<div className='navbar-center'></div>

			<div className='navbar-right'>
				<div className='search-bar'>
					<input
						className='search-box'
						type='search'
						placeholder='Search'
						value={inputValue} // Use local state value
						onChange={handleInputChange}
						onKeyPress={handleKeyPress}
					/>
					<button className='search-button' onClick={performSearch}>
						<img className='search-img' src={assets.search_icon} alt='Search' />
					</button>
				</div>
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
	);
};

export default Navbar;
