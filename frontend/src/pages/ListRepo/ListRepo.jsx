// import React, { useState } from "react";
// import "./ListRepo.css";
// import { user_data, repos } from "../../assets/assets";
// import LeftContainer from "../../components/ListRepo/LeftContainer/LeftContainer";
// import RightContainer from "../../components/ListRepo/RightContainer/RightContainer";

// const ListRepo = () => {
// 	return (
// 		<div className='list-repo'>
// 			<div className='left-container'>
// 				<LeftContainer />
// 			</div>
// 			<div className='right-container'>
// 				<RightContainer />
// 			</div>
// 		</div>
// 	);
// };

// export default ListRepo;

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
			await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate delay
			setIsLeftLoaded(true);
		};

		loadLeftContainer();
	}, []);

	return (
		<div className='list-repo'>
			<div className='left-container'>
				<LeftContainer onLoaded={() => setIsLeftLoaded(true)} />
			</div>
			{isLeftLoaded && (
				<div className='right-container'>
					<RightContainer />
				</div>
			)}
		</div>
	);
};

export default ListRepo;
