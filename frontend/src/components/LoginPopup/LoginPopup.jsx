import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";

const LoginPopup = ({ setShowLogin }) => {
	const [currState, setCurrState] = useState("Sign Up");

	const handleFormSubmit = (e) => {
		e.preventDefault();
		// Add form submission logic here
	};

	return (
		<div className='login-popup'>
			<form onSubmit={handleFormSubmit} className='login-popup-container'>
				<div className='login-popup-title'>
					<h2 className='title'>{currState}</h2>
					<img
						onClick={() => setShowLogin(false)}
						src={assets.cross_icon}
						alt='Close button'
					/>
				</div>
				<div className='login-popup-inputs'>
					{currState === "Sign Up" && <input type='text' placeholder='Your Name' />}
					<input type='email' placeholder='Your email' />
					<input type='password' placeholder='Password' />
				</div>
				<button type='submit'>
					{currState === "Sign Up" ? "Create account" : "Login"}
				</button>
				<div className='login-popup-condition'>
					<input type='checkbox' required />
					<p>By continuing, I agree to the terms of use & privacy policy.</p>
				</div>
				{currState === "Login" ? (
					<p className='change-state'>
						Create a new account?
						<span onClick={() => setCurrState("Sign Up")}>Click here</span>
					</p>
				) : (
					<p className='change-state'>
						Already have an account?
						<span onClick={() => setCurrState("Login")}>Login here</span>
					</p>
				)}
			</form>
		</div>
	);
};

export default LoginPopup;
