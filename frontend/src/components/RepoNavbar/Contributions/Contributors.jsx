import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Contributors.css";
import { StoreContext } from "../../../context/StoreContext";

const Contributors = () => {
	const { currRepoName, currUser, setCurrRepoName, setCurrUser, url } = useContext(StoreContext);
	const [contributors, setContributors] = useState([]);
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
		const fetchContributors = async () => {
			if (currRepoName && currUser) {
				try {
					const response = await axios.post(`${url}/api/git/repo/contributors`, {
						user_id: currUser,
						repo_name: currRepoName,
					});
					setContributors(response.data.data);
					setLoading(false);
				} catch (error) {
					setError("Error fetching contributors");
					setLoading(false);
				}
			}
		};

		fetchContributors();
	}, [currRepoName, currUser]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	return (
		<div>
			<h2>Contributors</h2>
			<ul>
				{contributors.map((contributor) => (
					<li key={contributor.id}>
						<img src={contributor.avatar_url} alt={contributor.login} width={50} />
						<a href={contributor.html_url} target='_blank' rel='noopener noreferrer'>
							{contributor.login}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Contributors;
