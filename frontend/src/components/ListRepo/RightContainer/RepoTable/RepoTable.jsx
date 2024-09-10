import React from "react";
import "./RepoTable.css"; // Import the new CSS file

const RepoTable = ({ repos }) => {
	return (
		<div className='repo-table'>
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
					<p>{index + 1}</p>
					<p>{repo.name}</p>
					<p>{repo.description || "No description available"}</p>
					<p>{repo.forks}</p>
					<p>{repo.open_issues}</p>
					<p>{repo.stargazers_count}</p>
					<p>
						<a href={repo.html_url} target='_blank' rel='noopener noreferrer'>
							View on GitHub
						</a>
					</p>
				</div>
			))}
		</div>
	);
};

export default RepoTable;
