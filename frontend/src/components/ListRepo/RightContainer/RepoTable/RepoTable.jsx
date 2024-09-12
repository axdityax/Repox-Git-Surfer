import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./RepoTable.css"; // Import the new CSS file
import { StoreContext } from "../../../../context/StoreContext";

const RepoTable = ({ repos }) => {
	const { setCurrRepoName, currRepoName } = useContext(StoreContext);
	const navigate = useNavigate();

	const handleRepoClick = (e) => {
		const repoName = e.target.textContent; // Get the text content of the clicked element
		setCurrRepoName(repoName);

		// Use repoName directly, as currRepoName won't be updated immediately
		console.log(repoName);
		localStorage.setItem("currRepoName", repoName);

		// Navigate to the repository page
		navigate("/repo");
	};

	return (
		<div className='repo-table-container'>
			<div className='repo-table-header'>
				<b>Sr. No</b>
				<b>Name</b>
				<b>Description</b>
				<b>Forks</b>
				<b>Open Issues</b>
				<b>Stars</b>
				<b>URL</b>
			</div>
			{repos.map((repo, index) => (
				<div key={repo.id} className='repo-table-row'>
					<p className='repo-table-cell'>{index + 1}</p>
					<p
						onClick={handleRepoClick}
						value={repo.name}
						className='repo-table-cell repo-link'>
						{repo.name}
					</p>
					<p className='repo-table-cell'>
						{repo.description || "No description available"}
					</p>
					<p className='repo-table-cell'>{repo.forks}</p>
					<p className='repo-table-cell'>{repo.open_issues}</p>
					<p className='repo-table-cell'>{repo.stargazers_count}</p>
					<p className='repo-table-cell'>
						<a
							href={repo.html_url}
							target='_blank'
							rel='noopener noreferrer'
							className='repo-link'>
							GitHub
						</a>
					</p>
				</div>
			))}
		</div>
	);
};

export default RepoTable;
