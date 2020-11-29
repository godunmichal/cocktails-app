import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";
import axios from "axios";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [cocktailList, setCocktailList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = useCallback(async () => {
    const response = await axios
      .get(`${url}${searchTerm}`)
      .catch((err) => console.log(err));
    const { drinks } = response.data;
    if (drinks) {
      const newCocktails = drinks.map((item) => {
        const {
          idDrink,
          strDrink,
          strDrinkThumb,
          strAlcoholic,
          strGlass,
        } = item;
        return {
          id: idDrink,
          name: strDrink,
          image: strDrinkThumb,
          info: strAlcoholic,
          glass: strGlass,
        };
      });
      setCocktailList(newCocktails);
    } else {
      setCocktailList([]);
    }
    setLoading(false);
  }, [searchTerm]);

  useEffect(() => {
    fetchData();
  }, [searchTerm, fetchData]);

  return (
    <AppContext.Provider value={{ loading, cocktailList, setSearchTerm }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
