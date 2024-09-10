import React, { useContext, useEffect } from "react";
import "./Search.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import useDebounce from "../../hooks/useDebounce"; // Import the debounce hook
import SearchCard from "../../components/SearchCard/SearchCard";

const Search = () => {
	const { searchQuery, userList, setUserList, url } = useContext(StoreContext); // Accessing context

	// Use the debounce hook to prevent rapid API calls
	const debouncedSearchQuery = useDebounce(searchQuery, 500);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				if (debouncedSearchQuery) {
					const response = await axios.post(`${url}/api/git/search`, {
						username: debouncedSearchQuery,
					});

					if (response.data.success) {
						// Update userList if users are found
						setUserList(response.data.data);
					} else {
						// Handle if no users are found (clear userList or show a message)
						setUserList([]);
					}
				}
			} catch (error) {
				console.error("Error fetching users: ", error);
			}
		};

		fetchUsers();
	}, [debouncedSearchQuery, setUserList]);

	return (
		<div className='search-results'>
			{userList.length > 0 ? (
				userList.map((user) => <SearchCard key={user.id} user={user} />)
			) : (
				<p>No users found. Try another search.</p>
			)}
		</div>
	);
};

export default Search;
