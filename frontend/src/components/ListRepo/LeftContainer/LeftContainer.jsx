import React, { useContext, useEffect } from "react";
import "./LeftContainer.css";
import { StoreContext } from "../../../context/StoreContext";
import axios from "axios";

const LeftContainer = () => {
	const { currUser, setCurrUser, url, userData, setUserData } = useContext(StoreContext);

	const userInfo = async () => {
		if (!currUser) return;

		// Check if user data is already stored in localStorage for the current user
		const storedUserData = localStorage.getItem(`userData_${currUser}`);

		if (storedUserData) {
			// If data is found in localStorage, use it
			setUserData(JSON.parse(storedUserData));
		} else {
			// If not found, fetch it from the API
			try {
				console.log(currUser);
				const response = await axios.post(`${url}/api/git/user`, {
					user_id: currUser,
				});
				console.log(response.data); // Log the actual response data from the API
				setUserData(response.data.data);

				// Store the fetched user data in localStorage
				localStorage.setItem(`userData_${currUser}`, JSON.stringify(response.data.data));
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		}
	};

	// Retrieve currUser from localStorage when the component mounts
	useEffect(() => {
		const storedUser = localStorage.getItem("currUser");
		if (storedUser) {
			setCurrUser(storedUser); // Set the stored user back into the context
		}
	}, [setCurrUser]);

	// Store currUser in localStorage whenever it changes and fetch user data
	useEffect(() => {
		if (currUser) {
			localStorage.setItem("currUser", currUser);
			userInfo();
		}
	}, [currUser]);

	return (
		<div className='main-left-container'>
			{userData ? (
				<div className='user-profile'>
					<img className='profile-pic' src={userData.avatar_url} alt='' />
					<div className='profile-details'>
						<div className='name-username'>
							<div className='user-name'>{userData.name}</div>
							<a href={userData.html_url} target='_blank' rel='noopener noreferrer'>
								<p className='user-login'>@{userData.login}</p>
							</a>
						</div>

						{/* <div className='github-link'>
							<a href={userData.html_url} target='_blank' rel='noopener noreferrer'>
								<button className='github-button'>GitHub</button>
							</a>
						</div> */}

						<div className='additional-info'>
							<div className='bio'>{userData.bio || "No bio available"}</div>
							<div className='company'>🏢 {userData.company || "N/A"}</div>
							<div className='location'>📍 {userData.location || "N/A"}</div>
						</div>
						<div className='separator'></div>
						<div className='stats'>
							<div className='stats-item'>
								<span>Repositry:</span> {userData.public_repos}
							</div>
							<div className='stats-item'>
								<span>Followers: </span> {userData.followers}
							</div>
							<div className='stats-item'>
								<span>Following: </span> {userData.following}
							</div>
						</div>
						<div className='separator'></div>
					</div>
				</div>
			) : (
				<div className='user-profile'>
					<p>Loading user data...</p> {/* Loading message while data is being fetched */}
				</div>
			)}
		</div>
	);
};

export default LeftContainer;

// import React, { useContext, useEffect } from "react";
// import "./LeftContainer.css";
// import { StoreContext } from "../../../context/StoreContext";
// import axios from "axios";

// const LeftContainer = () => {
// 	const { currUser, setCurrUser, url, userData, setUserData } = useContext(StoreContext);

// 	const userInfo = async () => {
// 		if (!currUser) return;
// 		try {
// 			console.log(currUser);
// 			const response = await axios.post(`${url}/api/git/user`, {
// 				user_id: currUser,
// 			});
// 			console.log(response.data); // Log the actual response data from the API
// 			setUserData(response.data.data);
// 		} catch (error) {
// 			console.error("Error fetching user data:", error);
// 		}
// 	};

// 	// Retrieve currUser from localStorage when the component mounts
// 	useEffect(() => {
// 		const storedUser = localStorage.getItem("currUser");
// 		if (storedUser) {
// 			setCurrUser(storedUser); // Set the stored user back into the context
// 		}
// 	}, [setCurrUser]);

// 	// Store currUser in localStorage whenever it changes
// 	useEffect(() => {
// 		if (currUser) {
// 			localStorage.setItem("currUser", currUser);
// 			userInfo();
// 		}
// 	}, [currUser]);

// 	return (
// 		<div className='main-container'>
// 			{userData ? (
// 				<div className='user-info'>
// 					<img className='profile-pic' src={userData.avatar_url} alt='' />
// 					<div className='user-bio'>
// 						<div className='name-login'>
// 							<h2>{userData.name}</h2>
// 							<p className='login'>@{userData.login}</p>
// 						</div>

// 						<div className='github'>
// 							<a href={userData.html_url} target='_blank' rel='noopener noreferrer'>
// 								<button className='github-button'>Open On GitHub</button>
// 							</a>
// 						</div>

// 						<div className='end-details'>
// 							<div className='bio'>{userData.bio || "No bio available"}</div>
// 							<div className='company'>🏢 {userData.company || "N/A"}</div>
// 							<div className='location'>📍 {userData.location || "N/A"}</div>
// 						</div>

// 						<div className='follow-stats'>
// 							<div className='stats-box'>
// 								<strong>Repositry:</strong> {userData.public_repos}
// 							</div>
// 							<div className='stats-box'>
// 								<strong>Followers: </strong> {userData.followers}
// 							</div>
// 							<div className='stats-box'>
// 								<strong>Following: </strong> {userData.following}
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			) : (
// 				<div className='user-info'>
// 					<p>Loading user data...</p> // Loading message while data is being fetched
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default LeftContainer;
