import React, { createContext, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
	const [Username, setUserName] = useState(""); // Fixed useState import
	const [userList, setUserList] = useState("");
	const [currUser, setCurrUser] = useState("");
	const [searchQuery, setSearchQuery] = useState(""); // Add searchQuery state
	const [userData, setUserData] = useState({}); // Add searchQuery state

	const url = "http://localhost:4000"; // Removed if not used

	const contextValue = {
		searchQuery,
		setSearchQuery,
		userList,
		setUserList,
		url,
		currUser,
		setCurrUser,
		userData,
		setUserData,
	};

	return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;
