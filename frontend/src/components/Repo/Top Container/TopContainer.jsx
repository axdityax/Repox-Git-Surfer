import React, { useContext, useState, useEffect } from "react";
import "./TopContainer.css";
import axios from "axios";
import { StoreContext } from "../../../context/StoreContext";
import { Link, Outlet } from "react-router-dom";
Outlet;
const TopContainer = () => {
	const {
		currRepoName,
		setCurrRepoName,
		setCurrUser,
		setCurrRepoData,
		currRepoData,
		currUser,
		url,
	} = useContext(StoreContext);
	const [loading, setLoading] = useState(true);

	const fetchRepoInfo = async () => {
		if (!currRepoName || !currUser) return;
		const storageKey = `repoData_${currUser}_${currRepoName}`;

		try {
			const storedRepoData = localStorage.getItem(storageKey);

			if (storedRepoData) {
				setCurrRepoData(JSON.parse(storedRepoData));
			} else {
				const response = await axios.post(`${url}/api/git/repo`, {
					user_id: currUser,
					repo_name: currRepoName,
				});

				const repoData = {
					id: response.data.data.id,
					full_name: response.data.data.full_name,
					description: response.data.data.description,
					html_url: response.data.data.html_url,
					stargazers_count: response.data.data.stargazers_count,
					forks_count: response.data.data.forks_count,
					language: response.data.data.language,
					open_issues_count: response.data.data.open_issues_count,
				};

				localStorage.setItem(storageKey, JSON.stringify(repoData));

				setCurrRepoData(repoData);
			}
		} catch (error) {
			console.error("Error fetching repository data:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		// Retrieve currRepoName from localStorage
		const storedRepoName = localStorage.getItem("currRepoName");
		if (storedRepoName) {
			setCurrRepoName(storedRepoName);
		}

		// Retrieve currUser from localStorage
		const storedUser = localStorage.getItem("currUser");
		if (storedUser) {
			setCurrUser(storedUser);
		}
	}, [setCurrRepoName, setCurrUser]);

	// useEffect to fetch repo info when currRepoName or currUser changes
	useEffect(() => {
		if (currRepoName && currUser) {
			fetchRepoInfo();
		}

		console.log(currRepoData);
	}, [currRepoName, currUser]);

	return (
		<div className='main-top-container'>
			{loading ? (
				<div className='loading-message'>Loading...</div>
			) : (
				<div className='repo-info'>
					<div className='repo-header'>
						<div className='repository-name'>{currRepoName}</div>
						<div className='full-name'>{currRepoData?.full_name}</div>
					</div>

					<div className='repo-description'>{currRepoData?.description}</div>

					<div className='repo-stats'>
						<div className='stat-item'>
							<span className='stat-label'>Stars:</span>{" "}
							{currRepoData?.stargazers_count}
						</div>
						<div className='stat-item'>
							<span className='stat-label'>Forks:</span> {currRepoData?.forks_count}
						</div>
						<div className='stat-item'>
							<span className='stat-label'>Issues:</span>{" "}
							{currRepoData?.open_issues_count}
						</div>
					</div>
					<div className='detailed-analysis'>
						<nav className='repo-navbar'>
							<Link className='repo-navlink' to='commitsactivity'>
								Commits-Activity
							</Link>
							<Link className='repo-navlink' to='commits'>
								Commits
							</Link>
							<Link className='repo-navlink' to='readME'>
								ReadME
							</Link>
							<Link className='repo-navlink' to='contributors'>
								Contributors
							</Link>
							<Link className='repo-navlink' to='issues'>
								Issues
							</Link>
						</nav>
						<div className='repo-content'>
							<Outlet />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
export default TopContainer;
