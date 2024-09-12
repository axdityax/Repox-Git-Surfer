// import React, { useContext, useEffect } from "react";
// import "./Commits.css";
// import axios from "axios";
// import { StoreContext } from "../../../context/StoreContext";

// const Commits = () => {
// 	const { commits, setCurrRepoName, setCurrUser, setCommits, url, currUser, currRepoName } =
// 		useContext(StoreContext);

// 	const getCommits = async () => {
// 		const localStorageKey = `${currUser}_${currRepoName}_commits`;
// 		const storedCommits = localStorage.getItem(localStorageKey);

// 		if (storedCommits) {
// 			setCommits(JSON.parse(storedCommits));
// 			console.log("Loaded commits from localStorage:", JSON.parse(storedCommits));
// 			return; // Exit early if data is found in local storage
// 		}

// 		try {
// 			const response = await axios.post(`${url}/api/git/repo/commits`, {
// 				user_id: currUser,
// 				repo_name: currRepoName,
// 			});

// 			console.log(response);
// 			const filteredData = response.data.data.map((commit) => ({
// 				sha: commit.sha,
// 				message: commit.message,
// 				date: new Date(commit.date).toLocaleDateString(), // Format the date
// 				author: commit.commit.author.login,
// 				author_avatar_url: commit.commit.author.avatar_url,
// 			}));

// 			// Set the filtered data into commits state
// 			setCommits(filteredData);

// 			// Save the filtered data to local storage
// 			localStorage.setItem(localStorageKey, JSON.stringify(filteredData));
// 			console.log("Saved commits to localStorage:", filteredData);
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	};

// 	useEffect(() => {
// 		// Retrieve currRepoName from localStorage
// 		const storedRepoName = localStorage.getItem("currRepoName");
// 		if (storedRepoName) {
// 			setCurrRepoName(storedRepoName);
// 		}

// 		// Retrieve currUser from localStorage
// 		const storedUser = localStorage.getItem("currUser");
// 		if (storedUser) {
// 			setCurrUser(storedUser);
// 		}
// 	}, [setCurrRepoName, setCurrUser]);

// 	useEffect(() => {
// 		getCommits();
// 	}, [currRepoName, currUser]); // Add currRepoName and currUser as dependencies

// 	return (
// 		<div className='commits-container'>
// 			<div className='commit-operations'>
// 				<input type='text' />
// 			</div>
// 			{commits && commits.length > 0 ? (
// 				commits.map((commit, index) => (
// 					<div key={index} className='commit-item'>
// 						<img
// 							src={commit.author_avatar_url}
// 							alt='Author Avatar'
// 							className='commit-avatar'
// 						/>
// 						<div className='commit-details'>
// 							<p className='commit-message'>
// 								<strong>Message:</strong> {commit.message}
// 							</p>
// 							<p className='commit-author'>
// 								<strong>Author:</strong> {commit.author}
// 							</p>
// 							<p className='commit-date'>
// 								<strong>Date:</strong> {commit.date}
// 							</p>
// 						</div>
// 					</div>
// 				))
// 			) : (
// 				<p>Loading commits...</p>
// 			)}
// 		</div>
// 	);
// };

// export default Commits;

import React, { useContext, useEffect, useState } from "react";
import "./Commits.css";
import axios from "axios";
import { StoreContext } from "../../../context/StoreContext";

const Commits = () => {
	const { commits, setCurrRepoName, setCurrUser, setCommits, url, currUser, currRepoName } =
		useContext(StoreContext);

	const [searchTerm, setSearchTerm] = useState("");
	const [authorName, setAuthorName] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	const getCommits = async () => {
		const localStorageKey = `${currUser}_${currRepoName}_commits`;
		const storedCommits = localStorage.getItem(localStorageKey);

		if (storedCommits) {
			setCommits(JSON.parse(storedCommits));
			console.log("Loaded commits from localStorage:", JSON.parse(storedCommits));
			return; // Exit early if data is found in local storage
		}

		try {
			const response = await axios.post(`${url}/api/git/repo/commits`, {
				user_id: currUser,
				repo_name: currRepoName,
				// Add filters here if your backend supports it
			});

			console.log(response);
			const filteredData = response.data.data.map((commit) => ({
				sha: commit.sha,
				message: commit.message,
				date: new Date(commit.date).toLocaleDateString(), // Format the date
				author: commit.commit.author.login,
				author_avatar_url: commit.commit.author.avatar_url,
			}));

			setCommits(filteredData);
			localStorage.setItem(localStorageKey, JSON.stringify(filteredData));
			console.log("Saved commits to localStorage:", filteredData);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const storedRepoName = localStorage.getItem("currRepoName");
		if (storedRepoName) {
			setCurrRepoName(storedRepoName);
		}

		const storedUser = localStorage.getItem("currUser");
		if (storedUser) {
			setCurrUser(storedUser);
		}
	}, [setCurrRepoName, setCurrUser]);

	useEffect(() => {
		getCommits();
	}, [currRepoName, currUser]);

	const filteredCommits = commits.filter(
		(commit) =>
			commit.message.toLowerCase().includes(searchTerm.toLowerCase()) &&
			commit.author.toLowerCase().includes(authorName.toLowerCase()) &&
			(!startDate || new Date(commit.date) >= new Date(startDate)) &&
			(!endDate || new Date(commit.date) <= new Date(endDate))
	);

	return (
		<div className='commits-container'>
			<div className='commit-operations'>
				<input
					type='text'
					placeholder='Search by message'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<input
					type='text'
					placeholder='Search by author'
					value={authorName}
					onChange={(e) => setAuthorName(e.target.value)}
				/>
				<input
					type='date'
					value={startDate}
					onChange={(e) => setStartDate(e.target.value)}
				/>
				<input type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
			</div>
			<div className='commit-summary'>
				<p>Total Commits: {filteredCommits.length}</p>
			</div>
			{filteredCommits && filteredCommits.length > 0 ? (
				filteredCommits.map((commit, index) => (
					<div key={index} className='commit-item'>
						<img
							src={commit.author_avatar_url}
							alt='Author Avatar'
							className='commit-avatar'
						/>
						<div className='commit-details'>
							<p className='commit-message'>
								<strong>Message:</strong> {commit.message}
							</p>
							<p className='commit-author'>
								<strong>Author:</strong> {commit.author}
							</p>
							<p className='commit-date'>
								<strong>Date:</strong> {commit.date}
							</p>
						</div>
					</div>
				))
			) : (
				<p>No commits found</p>
			)}
		</div>
	);
};

export default Commits;
