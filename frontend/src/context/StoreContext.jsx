import React, { createContext, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
	const [Username, setUserName] = useState("");
	const [userList, setUserList] = useState("");
	const [currUser, setCurrUser] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [userData, setUserData] = useState({});
	const [currRepoName, setCurrRepoName] = useState("");
	const [currRepoData, setCurrRepoData] = useState({});
	const [commits, setCommits] = useState([]);

	const url = "https://repox-backend.onrender.com";

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
		currRepoName,
		setCurrRepoName,
		currRepoData,
		setCurrRepoData,
		commits,
		setCommits,
	};

	return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;
