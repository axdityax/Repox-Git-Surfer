import React, { useContext, useEffect, useState } from "react";
import "./Repo.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import BottomContainer from "../../components/Repo/BottomContainer/BottomContainer";
import TopContainer from "../../components/Repo/Top Container/TopContainer";

const Repo = () => {
	const { currRepo, currUser } = useContext(StoreContext);
	const [isLeftLoaded, setIsLeftLoaded] = useState(false);

	const getRepoData = async () => {};

	useEffect(() => {
		// Simulate async operation for LeftContainer loading
		const loadLeftContainer = async () => {
			// Simulate delay
			await new Promise((resolve) => setTimeout(resolve, 50));
			setIsLeftLoaded(true);
		};

		loadLeftContainer();
	}, [currRepo, currUser]);

	useEffect(() => {
		// Fetch repo data when currRepo or currUser changes
		getRepoData();
	}, [currRepo, currUser]);

	return (
		<div className='repo'>
			<TopContainer onLoaded={() => setIsLeftLoaded(true)} />
			{isLeftLoaded && <BottomContainer />}
		</div>
	);
};

export default Repo;
