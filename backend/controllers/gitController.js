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
			console.error("GitHub token is not set in environment variables");
			console.log(process.env);
		} else {
			console.log("GitHub Token: ", process.env.GITHUB_TOKEN);
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
		console.error("Error fetching repositories:", error);
		res.status(500).json({
			success: false,
			message: "Error fetching repositories",
			error: error.message,
		});
	}
};

export { getAllUsers, getUser, getAllRepos };

// const getAllUsers = async (req, res) => {
// 	try {
// 		const { username } = req.body;
// 		// Fetching the users from the GitHub API
// 		const usersData = await axios.get(`https://api.github.com/search/users?q=${username}`);

// 		// Extracting only required fields
// 		const filteredData = usersData.data.items.map((user) => ({
// 			id: user.id,
// 			login: user.login,
// 			html_url: user.html_url,
// 			avatar_url: user.avatar_url,
// 		}));

// 		if (filteredData.length > 0) {
// 			res.json({ success: true, message: "Users found", data: filteredData });
// 		} else {
// 			res.json({ success: false, message: "User not found" });
// 		}
// 	} catch (error) {
// 		// Handle any errors
// 		res.status(500).json({
// 			success: false,
// 			message: "Error fetching users",
// 			error: error.message,
// 		});
// 	}
// };

// const getUser = async (req, res) => {
// 	try {
// 		const { user_id } = req.body;
// 		const user = await axios.get(`https://api.github.com/users/${user_id}`);
// 		// console.log(user.data);
// 		res.json({ success: true, data: user.data });
// 	} catch (error) {
// 		// Send a JSON response with the error message
// 		res.json({ success: false, message: "Error", error: error.message });
// 	}
// };

// const getAllRepos = async (req, res) => {
// 	try {
// 		const { user_id } = req.body;
// 		let repos = [];
// 		let page = 1;
// 		const perPage = 100; // Max per page is 100

// 		while (true) {
// 			const response = await axios.get(`https://api.github.com/users/${user_id}/repos`, {
// 				params: {
// 					page,
// 					per_page: perPage,
// 				},
// 			});

// 			const data = response.data;
// 			if (data.length === 0) {
// 				break; // Exit loop if no more repositories are found
// 			}

// 			repos = repos.concat(data); // Append repositories from the current page
// 			page++; // Move to the next page
// 		}

// 		// Filter data
// 		const filteredData = repos.map((item) => ({
// 			id: item.id,
// 			name: item.name,
// 			// full_name: item.full_name,
// 			forks: item.forks_count,
// 			open_issues: item.open_issues_count,
// 			stargazers_count: item.stargazers_count,
// 			html_url: item.html_url,
// 			description: item.description
// 		}));

// 		console.log(filteredData);
// 		res.status(200).json({ success: true, data: filteredData });
// 	} catch (error) {
// 		// Detailed logging of the error object
// 		console.error("Error fetching repositories:", error);
// 		// Send a failure response with an error message
// 		res.status(500).json({
// 			success: false,
// 			message: "Error fetching repositories",
// 			error: error.message,
// 		});
// 	}
// };

// export { getAllUsers, getUser, getAllRepos };
