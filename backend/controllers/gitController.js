import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.GITHUB_TOKEN;

const getAllUsers = async (req, res) => {
	try {
		const { username } = req.body;
		if (!username) {
			return res.status(400).json({ success: false, message: "Username is required" });
		}
		if (!token) {
			// console.error("GitHub token is not set in environment variables");
			// console.log(process.env);
		} else {
			// console.log("GitHub Token: ", process.env.GITHUB_TOKEN);
		}

		// Fetching the users from the GitHub API
		const usersData = await axios.get(`https://api.github.com/search/users?q=${username}`, {
			headers: {
				Authorization: `token ${token}`,
			},
		});

		// Extracting only required fields
		const filteredData = usersData.data.items.map((user) => ({
			id: user.id,
			login: user.login,
			html_url: user.html_url,
			avatar_url: user.avatar_url,
		}));

		if (filteredData.length > 0) {
			res.json({ success: true, message: "Users found", data: filteredData });
		} else {
			res.json({ success: false, message: "User not found" });
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error fetching users",
			error: error.message,
		});
	}
};

const getRepo = async (req, res) => {
	try {
		const { user_id, repo_name } = req.body;
		if (!user_id) {
			return res.status(400).json({ success: false, message: "User ID is required" });
		}

		const response = await axios.get(`https://api.github.com/repos/${user_id}/${repo_name}`, {
			headers: {
				Authorization: `token ${token}`, // Replace with your actual token
			},
		});

		const { data } = response;

		// Filter the data to include only the required fields
		const filteredData = {
			id: data.id,
			full_name: data.full_name,
			description: data.description,
			html_url: data.html_url,
			stargazers_count: data.stargazers_count,
			forks_count: data.forks_count,
			language: data.language,
			open_issues_count: data.open_issues_count,
		};
		// console.log(filteredData);
		res.json({ success: true, data: filteredData });
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error fetching repository",
			error: error.message,
		});
	}
};

const getUser = async (req, res) => {
	try {
		const { user_id } = req.body;
		if (!user_id) {
			return res.status(400).json({ success: false, message: "User ID is required" });
		}

		const user = await axios.get(`https://api.github.com/users/${user_id}`, {
			headers: {
				Authorization: `token ${token}`,
			},
		});
		res.json({ success: true, data: user.data });
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error fetching user",
			error: error.message,
		});
	}
};

const getAllRepos = async (req, res) => {
	try {
		const { user_id } = req.body;
		if (!user_id) {
			return res.status(400).json({ success: false, message: "User ID is required" });
		}

		let repos = [];
		let page = 1;
		const perPage = 100; // Max per page is 100

		while (true) {
			const response = await axios.get(`https://api.github.com/users/${user_id}/repos`, {
				headers: {
					Authorization: `token ${token}`,
				},
				params: {
					page,
					per_page: perPage,
				},
			});

			const data = response.data;
			if (data.length === 0) {
				break; // Exit loop if no more repositories are found
			}

			repos = repos.concat(data); // Append repositories from the current page
			page++; // Move to the next page
		}

		// Filter data
		const filteredData = repos.map((item) => ({
			id: item.id,
			name: item.name,
			forks: item.forks_count,
			open_issues: item.open_issues_count,
			stargazers_count: item.stargazers_count,
			html_url: item.html_url,
			description: item.description,
		}));

		res.status(200).json({ success: true, data: filteredData });
	} catch (error) {
		// console.error("Error fetching repositories:", error);
		res.status(500).json({
			success: false,
			message: "Error fetching repositories",
			error: error.message,
		});
	}
};

// const getRepoCommits = async (req, res) => {
// 	try {
// 		const { user_id, repo_name } = req.body;
// 		if (!user_id) {
// 			return res.status(400).json({ success: false, message: "User ID is required" });
// 		}
// 		console.log(user_id, repo_name);
// 		const response = await axios.get(
// 			`https://api.github.com/repos/${user_id}/${repo_name}/commits`,
// 			{
// 				headers: {
// 					Authorization: `token ${token}`, // Replace with your actual token
// 				},
// 			}
// 		);

// 		const { data } = response;
// 		console.log(data);
// 		// Filter the data to include only the required fields
// 		const filteredData = data.map((commit) => ({
// 			sha: commit.sha,
// 			message: commit.commit.message,
// 			date: commit.commit.author.date, // Add the commit date and time
// 			commit: {
// 				author: {
// 					login: commit.author.login,
// 					id: commit.author.id,
// 					avatar_url: commit.author.avatar_url,
// 				},
// 			},
// 		}));

// 		console.log(filteredData);
// 		res.json({ success: true, data: filteredData });
// 	} catch (error) {
// 		res.status(500).json({
// 			success: false,
// 			message: "Error fetching repository",
// 			error: error.message,
// 		});
// 	}
// };

const getRepoCommits = async (req, res) => {
	try {
		const { user_id, repo_name } = req.body;
		if (!user_id) {
			return res.status(400).json({ success: false, message: "User ID is required" });
		}
		// console.log(user_id, repo_name);

		// Fetch the first 100 commits
		const response = await axios.get(
			`https://api.github.com/repos/${user_id}/${repo_name}/commits`,
			{
				headers: {
					Authorization: `token ${token}`, // Replace with your actual token
				},
				params: {
					per_page: 100, // Set the number of commits per page
					page: 1, // Set the page number to fetch
				},
			}
		);

		const { data } = response;
		// console.log(data);

		// Filter the data to include only the required fields
		const filteredData = data.map((commit) => ({
			sha: commit.sha,
			message: commit.commit.message,
			date: commit.commit.author.date, // Add the commit date and time
			commit: {
				author: {
					login: commit.author ? commit.author.login : "Unknown", // Handle cases where author may be null
					id: commit.author ? commit.author.id : "Unknown", // Handle cases where author may be null
					avatar_url: commit.author ? commit.author.avatar_url : "Unknown", // Handle cases where author may be null
				},
			},
		}));

		// console.log(filteredData);
		res.json({ success: true, data: filteredData });
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error fetching repository",
			error: error.message,
		});
	}
};

const getRepoCommitsActivity = async (req, res) => {
	try {
		const { user_id, repo_name } = req.body;
		if (!user_id || !repo_name) {
			return res
				.status(400)
				.json({ success: false, message: "User ID and Repo Name are required" });
		}

		// console.log(user_id, repo_name);

		// Attempt to fetch the commit activity data
		const response = await axios.get(
			`https://api.github.com/repos/${user_id}/${repo_name}/stats/commit_activity`,
			{
				headers: {
					Authorization: `token ${token}`,
				},
			}
		);

		// If GitHub is processing the data, respond accordingly
		if (response.status === 202) {
			return res.status(202).json({
				success: false,
				message: "Commit activity data is being processed, please try again later.",
			});
		}

		// If data is returned successfully
		const { data } = response;
		// console.log(data);

		// Aggregate total commits
		const totalCommits = data.reduce((acc, week) => acc + week.total, 0);
		// console.log(totalCommits);

		res.json({ success: true, totalCommits, data });
	} catch (error) {
		console.error("Error fetching commit activity:", error.message);
		res.status(500).json({
			success: false,
			message: "Error fetching commit activity. Please try again later.",
			error: error.message,
		});
	}
};
const getRepoContributors = async (req, res) => {
	try {
		const { user_id, repo_name } = req.body;
		if (!user_id || !repo_name) {
			return res
				.status(400)
				.json({ success: false, message: "User ID and Repo Name are required" });
		}

		console.log(user_id, repo_name);

		// Fetch the contributors data
		const response = await axios.get(
			`https://api.github.com/repos/${user_id}/${repo_name}/contributors`,
			{
				headers: {
					Authorization: `token ${token}`,
				},
			}
		);

		// Extract relevant information from the response
		const contributors = response.data.map((contributor) => ({
			login: contributor.login,
			id: contributor.id,
			avatar_url: contributor.avatar_url,
			html_url: contributor.html_url,
		}));

		// Return the extracted data
		res.json({ success: true, data: contributors });
	} catch (error) {
		console.error("Error fetching commit activity:", error.message);
		res.status(500).json({
			success: false,
			message: "Error fetching commit activity. Please try again later.",
			error: error.message,
		});
	}
};

const getRepoReadMe = async (req, res) => {
	try {
		const { user_id, repo_name } = req.body;
		if (!user_id || !repo_name) {
			return res
				.status(400)
				.json({ success: false, message: "User ID and Repo Name are required" });
		}

		console.log(user_id, repo_name);

		// Fetch the README data
		const response = await axios.get(
			`https://api.github.com/repos/${user_id}/${repo_name}/readme`,
			{
				headers: {
					Authorization: `token ${token}`, // Ensure token is defined or passed properly
				},
			}
		);

		// Decode the README content from Base64
		const readmeContent = Buffer.from(response.data.content, "base64").toString("utf-8");

		// Return the extracted README content
		res.json({ success: true, data: readmeContent });
	} catch (error) {
		console.error("Error fetching README:", error.message);
		res.status(500).json({
			success: false,
			message: "Error fetching README. Please try again later.",
			error: error.message,
		});
	}
};

const getRepoIssues = async (req, res) => {
	try {
		const { user_id, repo_name } = req.body;
		if (!user_id || !repo_name) {
			return res
				.status(400)
				.json({ success: false, message: "User ID and Repo Name are required" });
		}

		const token = process.env.GITHUB_TOKEN; // Or another method to access your token

		let allIssues = [];
		let page = 1;
		let totalPages = 1; // To keep track of the number of pages
		const perPage = 100; // Number of issues per page

		while (page <= totalPages) {
			// Fetch the issues data
			const response = await axios.get(
				`https://api.github.com/repos/${user_id}/${repo_name}/issues`,
				{
					headers: {
						Authorization: `token ${token}`,
					},
					params: {
						state: "open", // Fetch only open issues
						per_page: perPage, // Number of issues per page
						page: page, // Page number
					},
				}
			);

			const totalCount = response.data.length;
			console.log("Total Open Issues on Page:", totalCount);

			// Stop if no issues are found
			if (totalCount === 0) {
				break;
			}

			// Update totalPages if this is the first page
			if (page === 1) {
				const linkHeader = response.headers.link;
				if (linkHeader) {
					const links = linkHeader.split(",").map((link) => link.trim());
					const lastPageLink = links.find((link) => link.endsWith('rel="last"'));
					if (lastPageLink) {
						totalPages = parseInt(lastPageLink.split("page=")[1], 10);
					}
				}
			}

			// Map the issues to the desired format
			const issues = response.data.map((issue) => ({
				title: issue.title,
				id: issue.id,
				login: issue.user.login,
				// state: issue.state,
				created_at: issue.created_at,
				// updated_at: issue.updated_at,
			}));

			allIssues = allIssues.concat(issues);
			page++;
		}

		// Return the accumulated data
		res.json({ success: true, data: allIssues });
	} catch (error) {
		console.error("Error fetching issue data:", error.message);
		res.status(500).json({
			success: false,
			message: "Error fetching issue data. Please try again later.",
			error: error.message,
		});
	}
};

export {
	getAllUsers,
	getUser,
	getAllRepos,
	getRepo,
	getRepoCommits,
	getRepoReadMe,
	getRepoContributors,
	getRepoIssues,
	getRepoCommitsActivity,
};

// const getRepoIssues = async (req, res) => {
// 	try {
// 		const { user_id, repo_name } = req.body;
// 		if (!user_id || !repo_name) {
// 			return res
// 				.status(400)
// 				.json({ success: false, message: "User ID and Repo Name are required" });
// 		}

// 		// Define or access your token here
// 		const token = process.env.GITHUB_TOKEN; // Or another method to access your token

// 		// Fetch the issues data (first 100 issues)
// 		const response = await axios.get(
// 			`https://api.github.com/repos/${user_id}/${repo_name}/issues`,
// 			{
// 				headers: {
// 					Authorization: `token ${token}`,
// 				},
// 				params: {
// 					state: "all", // To include open and closed issues
// 					per_page: 100, // Number of issues per page
// 					page: 10, // Page number to get the first set of issues
// 				},
// 			}
// 		);
// 		const totalCount = response.data.length;
// 		console.log("Total Issues:", totalCount);
// 		// Extract relevant information from the response
// 		const issues = response.data
// 			.filter((issue) => issue.state !== "closed") // Filter out closed issues
// 			.map((issue) => ({
// 				title: issue.title,
// 				id: issue.id,
// 				user: {
// 					login: issue.user.login,
// 				},
// 				labels: issue.labels.map((label) => ({
// 					name: label.name,
// 					description: label.description,
// 				})),
// 				state: issue.state,
// 				created_at: issue.created_at,
// 				updated_at: issue.updated_at,
// 				closed_at: issue.closed_at,
// 				// Uncomment and adjust if including reactions
// 				// reactions: {
// 				// 	total_count: issue.reactions.total_count || 0,
// 				// 	"+1": issue.reactions["+1"] || 0,
// 				// 	"-1": issue.reactions["-1"] || 0,
// 				// 	laugh: issue.reactions.laugh || 0,
// 				// 	hooray: issue.reactions.hooray || 0,
// 				// 	confused: issue.reactions.confused || 0,
// 				// 	heart: issue.reactions.heart || 0,
// 				// 	rocket: issue.reactions.rocket || 0,
// 				// 	eyes: issue.reactions.eyes || 0,
// 				// },
// 			}));

// 		// Return the extracted data
// 		res.json({ success: true, data: issues });
// 	} catch (error) {
// 		console.error("Error fetching issue data:", error.message);
// 		res.status(500).json({
// 			success: false,
// 			message: "Error fetching issue data. Please try again later.",
// 			error: error.message,
// 		});
// 	}
// };
