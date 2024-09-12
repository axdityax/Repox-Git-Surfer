import React, { useContext, useEffect, useState } from "react";
import axios from "axios"; // Import axios
import "./Issues.css";
import { StoreContext } from "../../../context/StoreContext";

const Issues = () => {
	const { currRepoName, currUser, setCurrRepoName, setCurrUser, url } = useContext(StoreContext);
	const [issues, setIssues] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

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
		const fetchIssues = async () => {
			if (currRepoName && currUser) {
				setLoading(true); // Start loading before fetching
				try {
					const response = await axios.post(`${url}/api/git/repo/issues`, {
						user_id: currUser,
						repo_name: currRepoName,
					});
					setIssues(response.data.data);
				} catch (error) {
					setError("Error fetching issues");
				} finally {
					setLoading(false); // End loading
				}
			}
		};

		fetchIssues();
	}, [currRepoName, currUser, url]);

	return (
		<div className='issues-container'>
			{loading && <p className='message'>Loading issues...</p>}
			{error && <p className='message'>{error}</p>}
			{!loading && !error && issues.length === 0 && (
				<p className='message'>No issues found.</p>
			)}
			<ul>
				{issues.map((issue) => (
					<li className='issue-item' key={issue.id}>
						<h3 className='issue-title'>{issue.title}</h3>
						<p className='issue-details'>Created by: {issue.login}</p>
						<p className='issue-details'>State: {issue.state}</p>
						<p className='issue-details'>
							Created at: {new Date(issue.created_at).toLocaleDateString()}
						</p>
						<p className='issue-details'>
							Updated at: {new Date(issue.updated_at).toLocaleDateString()}
						</p>
						{issue.closed_at && (
							<p className='issue-details'>
								Closed at: {new Date(issue.closed_at).toLocaleDateString()}
							</p>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Issues;
