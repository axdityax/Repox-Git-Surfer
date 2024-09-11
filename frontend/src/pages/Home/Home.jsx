import React, { useState, useEffect } from "react";
import "./Home.css";

const bulletPoints = [
	"Search GitHub users with ease! 👍",
	"Explore user repositories effortlessly! ⭐",
	"Sort repos by stars, forks, or issues! ✌️",
	"Filter repos to find what you need! 🔍",
	"Visualize commit activity instantly! 🥰",
	"See top contributors in action! 😇",
	"Dive deep into repository details! 🤍",
];

const Home = () => {
	const [currentBullet, setCurrentBullet] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentBullet((prev) => (prev + 1) % bulletPoints.length);
		}, 2200); // Change bullet every 4 seconds

		return () => clearInterval(interval);
	}, []);

	return (
		<div className='home'>
			<div className='home-page'>
				<div className='heading'>
					Welcome to <span>RepoX</span> <br></br> Your GitHub Insights Unleashed!
				</div>
			</div>
			<div className='description'>
				<div className='bullet-points'>{bulletPoints[currentBullet]}</div>
				<div className='footer'>
					Enter a GitHub username to begin your deep dive into insights!
				</div>
			</div>
		</div>
	);
};

export default Home;
