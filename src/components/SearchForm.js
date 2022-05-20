import React, { useRef, useEffect } from 'react';
import { useGlobalContext } from '../context';

const SearchForm = () => {
	const { setSearchTerm } = useGlobalContext();
	const searchValue = useRef('');

	const searchCocktail = () => {
		setSearchTerm(searchValue.current.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
	};
	// Dùng useRef để focus ô input
	useEffect(() => {
		searchValue.current.focus();
	}, []);

	return (
		<section className="section search">
			<form className="search-form" onSubmit={handleSubmit}>
				<div className="form-control">
					<label htmlFor="name">search your favorite cocktail</label>
					<input
						type="text"
						name="name"
						id="name"
						ref={searchValue}
						onChange={searchCocktail}
					/>
				</div>
			</form>
		</section>
	);
};

export default SearchForm;
