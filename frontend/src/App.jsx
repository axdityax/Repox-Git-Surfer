import { useState } from "react";
import "./App.css";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Navbar from "./components/Navbar/Navbar";

function App() {
	const [showLogin, setShowLogin] = useState(true);
	return (
		<>
			{showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
			<div className='app-navbar'>
				<Navbar setShowLogin={setShowLogin} />
			</div>
			<hr />
		</>
	);
}

export default App;
