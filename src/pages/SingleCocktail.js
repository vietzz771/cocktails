import React, { useState, useEffect, useCallback } from 'react';
import Loading from '../components/Loading';
import { useParams, Link } from 'react-router-dom';
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const SingleCocktail = () => {
	const [loading, setLoading] = useState(true);
	const [cocktail, setCocktail] = useState(null);
	const { id } = useParams();
	const fetchDrink = useCallback(async () => {
		try {
			const reponse = await fetch(`${url}${id}`);
			const data = await reponse.json();
			if (data.drinks) {
				const {
					strDrink: name,
					strAlcoholic: info,
					strCategory: category,
					strDrinkThumb: image,
					strGlass: glass,
					strInstructions: instructions,
					strIngredient1,
					strIngredient2,
					strIngredient3,
					strIngredient4,
					strIngredient5,
				} = data.drinks[0];
				const ingredients = [
					strIngredient1,
					strIngredient2,
					strIngredient3,
					strIngredient4,
					strIngredient5,
				];
				const newCocktail = {
					name,
					info,
					category,
					ingredients,
					image,
					glass,
					instructions,
				};
				setCocktail(newCocktail);
			}
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}, [id]);

	useEffect(() => {
		fetchDrink();
	}, [id, fetchDrink]);

	if (loading) {
		return <Loading />;
	}
	if (!cocktail) {
		return <h2 className="section-title">no cocktail to display</h2>;
	}

	const { name, info, glass, category, ingredients, image, instructions } =
		cocktail;
	return (
		<section className="section cocktail-section">
			<Link to="/" className="btn btn-primary">
				back home
			</Link>
			<h2 className="section-title">{name}</h2>
			<div className="drink">
				<img src={image} alt={name}></img>
				<div className="drink-info">
					<p>
						<span className="drink-data">name :</span>
						{name}
					</p>
					<p>
						<span className="drink-data">category :</span>
						{category}
					</p>
					<p>
						<span className="drink-data">info :</span>
						{info}
					</p>
					<p>
						<span className="drink-data">glass :</span>
						{glass}
					</p>
					<p>
						<span className="drink-data">instructions :</span>
						{instructions}
					</p>
					<p>
						<span className="drink-data">ingredients :</span>
						{ingredients.map((item, index) => {
							return item ? <span key={index}>{item}</span> : null;
						})}
					</p>
				</div>
			</div>
		</section>
	);
};

export default SingleCocktail;
