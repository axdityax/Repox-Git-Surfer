import React from "react";
import "./ErrorMessage.css"; // Import CSS file

const ErrorMessage = ({ message }) => {
	return <div className='error'>Error: {message}</div>;
};

export default ErrorMessage;
