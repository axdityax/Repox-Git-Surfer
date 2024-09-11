import React from "react";
import "./RepoTable.css"; // Import the new CSS file

const RepoTable = ({ repos }) => {
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
					<p className='repo-table-cell'>{repo.name}</p>
					<p className='repo-table-cell'>{repo.description || "No description available"}</p>
					<p className='repo-table-cell'>{repo.forks}</p>
					<p className='repo-table-cell'>{repo.open_issues}</p>
					<p className='repo-table-cell'>{repo.stargazers_count}</p>
					<p className='repo-table-cell'>
						<a href={repo.html_url} target='_blank' rel='noopener noreferrer' className='repo-link'>
							GitHub
						</a>
					</p>
				</div>
			))}
		</div>
	);
};

export default RepoTable;
