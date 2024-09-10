import { useState } from "react";
import "./App.css";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import ListRepo from "./pages/ListRepo/ListRepo";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Repo from "./pages/Repo/Repo";
import Search from "./pages/Search/Search";
import Navbar from "./components/NavBar/Navbar";

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
					<Route path='/repo' element={<Repo />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
