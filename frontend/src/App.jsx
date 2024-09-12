import { useState } from "react";
import "./App.css";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import ListRepo from "./pages/ListRepo/ListRepo";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Repo from "./pages/Repo/Repo";
import Search from "./pages/Search/Search";
import Navbar from "./components/NavBar/Navbar";
import Commits from "./components/RepoNavbar/Commits/Commits";
import Issues from "./components/RepoNavbar/Issues/Issues";
import Contributions from "./components/RepoNavbar/Contributions/Contributions";
import ReadMe from "./components/RepoNavbar/ReadME/ReadME";
import CommitsActivity from "./components/RepoNavbar/CommitsActivity/CommitsActivity";

function App() {
	const [showLogin, setShowLogin] = useState(false);

	return (
		<>
			{showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
			<div className='app-navbar'></div>

			{/* <Navbar setShowLogin={setShowLogin} /> */}
			<Navbar setShowLogin={setShowLogin} />
			<div className='app'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/search' element={<Search />} />
					<Route path='/listrepo' element={<ListRepo />} />
					<Route path='/repo' element={<Repo />}>
						<Route index element={<Issues />} />
						<Route path='issues' element={<Issues />} />
						<Route path='contributions' element={<Contributions />} />
						<Route path='commits' element={<Commits />} />
						<Route path='commitsactivity' element={<CommitsActivity />} />
						<Route path='readME' element={<ReadMe />} />
					</Route>
				</Routes>
			</div>
		</>
	);
}

export default App;
