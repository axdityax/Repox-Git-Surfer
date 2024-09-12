
import React, { useState, useEffect } from "react";
import "./ListRepo.css";
import LeftContainer from "../../components/ListRepo/LeftContainer/LeftContainer";
import RightContainer from "../../components/ListRepo/RightContainer/RightContainer";

const ListRepo = () => {
	const [isLeftLoaded, setIsLeftLoaded] = useState(false);

	// Use useEffect to simulate loading of LeftContainer
	useEffect(() => {
		// Simulate async operation for LeftContainer loading
		const loadLeftContainer = async () => {
			// Assuming LeftContainer has some async operations, like data fetching
			await new Promise((resolve) => setTimeout(resolve, 50)); // Simulate delay
			setIsLeftLoaded(true);
		};

		loadLeftContainer();
	}, []);

	return (
		<div className='list-repo'>
			<LeftContainer onLoaded={() => setIsLeftLoaded(true)} />
			{isLeftLoaded && <RightContainer />}
		</div>
	);
};

export default ListRepo;
