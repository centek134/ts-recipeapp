import React, { useState } from "react";
import styled from "styled-components";
import Filters from "./components/Filters";
import ProductCard from "./components/ProductCard";
import "./App.css";

const Container = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
const DishSection = styled.section`
  width: 100%;
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  grid-row-gap: 20px;
  justify-items: center;
`;
interface Recipe {
  recipe: {
    id: number;
    title: string;
    image: string;
  }[];
}

const App = () => {
  const [recipes, setRecipes] = useState<Recipe["recipe"]>([]);
  const [queryString, setQueryString] = useState<string>("");

  const foodSearch = () => {
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?&cuisine=${queryString}&number=20&apiKey=2f82075fb2ab456f8f690ee0710297d5`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Data", data);
        setRecipes(data.results);
        console.log("myrecipes list", recipes);
      })
      .catch((err) => console.log(err));
  };

  const setFilters = (opt:string) => {
    let str:string = queryString;
    if(str.search(opt) === -1){
      str+=opt  + ",";
      setQueryString(str);
    }
    else{
      str =str.replace(`${opt},`,"");
      setQueryString(str);
      console.log(queryString);
    }
  };

  
  const dishInfo = (id:number) => {
    fetch(`https://api.spoonacular.com/recipes/${id}/card?&apiKey=2f82075fb2ab456f8f690ee0710297d5`, {
      method:"GET"
    }).then(response => response.json())
    .then(data => console.log(data));
    console.log("test");
  };

  return (
    <Container>
      <Filters btnClick={foodSearch}  filter = {setFilters}/>
      <DishSection>
        {recipes
          ? recipes.map((rec,i) => {
              return (
                <ProductCard click={dishInfo} key={i} title={rec.title} imgSrc={rec.image} id={rec.id}/>
              );
            })
          : null}
      </DishSection>
    </Container>
  );
};

export default App;
