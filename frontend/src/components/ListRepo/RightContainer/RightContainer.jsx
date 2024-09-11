import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import "./RightContainer.css"; // Import CSS file
import { StoreContext } from "../../../context/StoreContext";
import LoadingIndicator from "./LoadingIndicator/LoadingIndicator";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import RepoTable from "./RepoTable/RepoTable";
import NoReposMessage from "./NoReposMessage/NoReposMessage";

const RightContainer = () => {
	const { url, currUser } = useContext(StoreContext);

	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [sortOption, setSortOption] = useState("name");
	const [searchQuery, setSearchQuery] = useState("");

	// Function to fetch repositories
	const getAllRepos = async () => {
		try {
			const response = await axios.post(`${url}/api/git/listrepos`, {
				user_id: currUser,
			});

			if (response.data.success) {
				setRepos(response.data.data);
				localStorage.setItem(`repos_${currUser}`, JSON.stringify(response.data.data));
			} else {
				setError(response.data.message || "Error fetching repositories");
			}
		} catch (error) {
			console.error("Error fetching repositories:", error);
			setError("An error occurred while fetching repositories.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const fetchRepos = async () => {
			if (!currUser) {
				console.log("hello");
				setError("User not logged in or user ID missing.");
				setLoading(false);
				return;
			}

			try {
				// Check local storage for repositories
				const storedRepos = localStorage.getItem(`repos_${currUser}`);
				if (storedRepos) {
					setRepos(JSON.parse(storedRepos));
					setLoading(false);
				} else {
					await getAllRepos(); // Fetch repos if not in local storage
				}
			} catch (err) {
				setError("An error occurred while fetching repositories from local storage.");
				setLoading(false);
			}
		};

		fetchRepos();
	}, [currUser]); // Fetch repositories when currUser changes

	// Function to handle sort option change
	const handleSortChange = (e) => {
		setSortOption(e.target.value);
	};

	// Function to handle search query change
	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	// Function to filter repositories based on search query
	const filteredRepos = repos.filter((repo) =>
		repo.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// Function to sort repositories based on selected option
	const sortedRepos = [...filteredRepos].sort((a, b) => {
		switch (sortOption) {
			case "name":
				return a.name.localeCompare(b.name);
			case "stars":
				return b.stargazers_count - a.stargazers_count;
			case "issues":
				return b.open_issues - a.open_issues;
			case "forks":
				return b.forks - a.forks;
			default:
				return 0;
		}
	});

	if (loading) return <LoadingIndicator />;
	if (error) return <ErrorMessage message={error} />;

	return (
		<div className='main-right-container'>
			<div className='search-sort'>
				<div className='section-title'>Repository</div>

				<div className='search-sort-controls'>
					<div>
						<input
							type='text'
							className='search-input'
							placeholder='Search repositories...'
							value={searchQuery}
							onChange={handleSearchChange}
						/>
					</div>
					<select
						className='sort-select'
						name='sort'
						value={sortOption}
						onChange={handleSortChange}>
						<option value='name'>Name</option>
						<option value='stars'>Stars</option>
						<option value='issues'>Open Issues</option>
						<option value='forks'>Forks</option>
					</select>
				</div>
			</div>
			{repos.length > 0 ? <RepoTable repos={sortedRepos} /> : <NoReposMessage />}
		</div>
	);
};

export default RightContainer;
