import React from "react";
import Cocktail from "./Cocktail";
import Loading from "./Loading";
import { useGlobalContext } from "../context";

const CocktailList = () => {
  const { cocktailList, loading } = useGlobalContext();
  if (loading) {
    return <Loading />;
  } else if (cocktailList.length < 1) {
    return <h2 className="section-title">no cocktail found</h2>;
  } else {
    return (
      <section className="section">
        <h2 className="section-title">cocktails</h2>
        <div className="cocktails-center">
          {cocktailList.map((item) => {
            return <Cocktail key={item.id} {...item} />;
          })}
        </div>
      </section>
    );
  }
};

export default CocktailList;
