import React, { useContext } from "react";
import "./SearchCard.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const SearchCard = ({ user }) => {
	const { currUser, setCurrUser } = useContext(StoreContext);

	const navigate = useNavigate();
	// Handle the avatar click
	const handleAvatarClick = () => {
		setCurrUser(user.login);
		navigate("/listrepo");
	};

	return (
		<div>
			<div className='card'>
				<img
					src={user.avatar_url}
					alt={user.login}
					className='avatar'
					onClick={handleAvatarClick} // Added onClick handler
				/>
				<div className='card-details'>
					<h3 className='name'>{user.login}</h3>
					<p className='username'>
						<a href={user.html_url} target='_blank' rel='noopener noreferrer'>
							GitHub
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default SearchCard;
