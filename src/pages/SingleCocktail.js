import React, { useCallback, useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const [loading, setLoading] = useState(true);
  const [cocktail, setCocktail] = useState(null);
  const { id } = useParams();

  const fetchData = useCallback(async () => {
    const response = await axios
      .get(`${url}${id}`)
      .catch((err) => console.log(err));
    const { drinks } = response.data;
    if (drinks) {
      const {
        strDrink: name,
        strDrinkThumb: image,
        strAlcoholic: info,
        strCategory: category,
        strGlass: glass,
        strInstructions: instructions,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
      } = drinks[0];
      const ingredients = [
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
      ];
      const newCocktail = {
        name,
        image,
        info,
        category,
        glass,
        instructions,
        ingredients,
      };
      setCocktail(newCocktail);
    } else {
      setCocktail(null);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [id, fetchData]);

  if (loading) {
    return <Loading />;
  } else if (!cocktail) {
    return <h2 className="section-title">No cocktail details</h2>;
  } else {
    const {
      name,
      image,
      info,
      category,
      glass,
      instructions,
      ingredients,
    } = cocktail;
    return (
      <section className="section cocktail-section">
        <Link to="/" className="btn btn-primary">
          back home
        </Link>
        <h2 className="section-title">{name}</h2>
        <div className="drink">
          <img src={image} alt={name} />
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
              {ingredients.map((ing, index) => {
                return ing ? <span key={index}>{ing}</span> : null;
              })}
            </p>
          </div>
        </div>
      </section>
    );
  }
};

export default SingleCocktail;
