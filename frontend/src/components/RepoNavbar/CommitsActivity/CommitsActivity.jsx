import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../../context/StoreContext";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "./CommitsActivity.css";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const CommitsActivity = () => {
	const { currRepoName, currUser, setCurrRepoName, setCurrUser, url } = useContext(StoreContext);
	const [commitActivityData, setCommitActivityData] = useState([]);
	const [loading, setLoading] = useState(true);

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
		const fetchData = async () => {
			try {
				setLoading(true);
				const cacheKey = `${currUser}_${currRepoName}_commitactivity`;
				const storedData = localStorage.getItem(cacheKey);
				const storedTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
				const now = Date.now();

				if (
					storedData &&
					storedTimestamp &&
					now - parseInt(storedTimestamp, 10) < CACHE_EXPIRATION
				) {
					// Use cached data if it's not expired
					setCommitActivityData(JSON.parse(storedData));
					setLoading(false);
					return;
				}

				const response = await axios.post(`${url}/api/git/repo/commitsactivity`, {
					user_id: currUser,
					repo_name: currRepoName,
				});
				console.log(response);
				// Ensure the response data is an array
				if (Array.isArray(response.data.data)) {
					const monthlyData = aggregateCommitsByMonth(response.data.data);
					setCommitActivityData(monthlyData);

					// Cache the data
					localStorage.setItem(cacheKey, JSON.stringify(monthlyData));
					localStorage.setItem(`${cacheKey}_timestamp`, now.toString());
				} else {
					setCommitActivityData([]);
				}
			} catch (error) {
				console.error("Error fetching commit data:", error);
				setCommitActivityData([]);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [currRepoName, currUser, url]);

	const aggregateCommitsByMonth = (data) => {
		const monthlyCommits = {};

		data.forEach((week) => {
			const date = new Date(week.week * 1000);
			const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`; // e.g., "2024-9"

			if (!monthlyCommits[monthYear]) {
				monthlyCommits[monthYear] = 0;
			}
			monthlyCommits[monthYear] += week.total;
		});

		return Object.entries(monthlyCommits).map(([monthYear, total]) => ({
			monthYear,
			total,
		}));
	};

	// Prepare data for the chart
	const chartData = {
		labels: commitActivityData.map(({ monthYear }) =>
			new Date(`${monthYear}-01`).toLocaleString("default", {
				month: "short",
				year: "numeric",
			})
		),
		datasets: [
			{
				label: "Total Commits per Month",
				data: commitActivityData.map(({ total }) => total),
				fill: false,
				backgroundColor: "rgba(75,192,192,0.4)",
				borderColor: "rgba(75,192,192,1)",
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "Commits Activity Over Time",
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text: "Month",
				},
				ticks: {
					autoSkip: true,
					maxTicksLimit: 12,
				},
			},
			y: {
				title: {
					display: true,
					text: "Number of Commits",
				},
				beginAtZero: true,
			},
		},
	};

	return (
		<div className='commits-activity-container'>
			<h2>Commits Activity</h2>
			{loading ? (
				<div className='loading-spinner'>
					{/* Add a spinner or loading indicator */}
					Loading commit activity...
				</div>
			) : (
				<div className='chart-container'>
					{commitActivityData.length > 0 ? (
						<Line data={chartData} options={options} />
					) : (
						<p>No commit activity available.</p>
					)}
				</div>
			)}
		</div>
	);
};

export default CommitsActivity;
