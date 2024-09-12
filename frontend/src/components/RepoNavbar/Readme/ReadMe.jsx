import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { StoreContext } from "../../../context/StoreContext";
import "./ReadMe.css";

const ReadMe = () => {
	const { currRepoName, currUser, setCurrRepoName, setCurrUser, url } = useContext(StoreContext);
	const [readme, setReadme] = useState("");
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
		const fetchReadme = async () => {
			if (currRepoName && currUser) {
				setLoading(true);
				try {
					const response = await axios.post(`${url}/api/git/repo/readme`, {
						user_id: currUser,
						repo_name: currRepoName,
					});
					setReadme(response.data.data);
				} catch (error) {
					setError("Error fetching README");
				} finally {
					setLoading(false);
				}
			}
		};

		fetchReadme();
	}, [currRepoName, currUser, url]);

	return (
		<div className='readme-container'>
			{loading && (
				<div className='loading-spinner'>
					<div className='spinner-border' role='status'>
						<span className='sr-only'>Loading...</span>
					</div>
				</div>
			)}
			{error && <div className='error-message'>{error}</div>}
			{!loading && !error && (
				<ReactMarkdown
					className='readme-content'
					children={readme}
					remarkPlugins={[remarkGfm]}
				/>
			)}
		</div>
	);
};

export default ReadMe;
