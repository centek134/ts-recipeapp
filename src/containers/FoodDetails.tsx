import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdditionalInfo from "../components/FoodDetails/AdditionalInfo";
import DishPreparing from "../components/FoodDetails/DishPreparing";
import IngredientsList from "../components/FoodDetails/IngredientsList";
import Buttons from "../components/FoodDetails/Buttons";
const Container = styled.main`
  width: 100%;
  background-color: #ebebeb;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  & > section {
    height: 100%;
    background-color: #ffffff;
    flex: 0.6;
    display: flex;
    flex-direction: column;
    align-items: center;
    & > img {
      width: 100%;
      padding: 20px;
    }
    & > h1.title {
      padding: 5px 0 0 10px;
      font-size: 36px;
      font-family: "Mochiy Pop P One", sans-serif;
    }
    & > .section_tags {
      width: 100%;
      margin: 10px 0;
      display: flex;
      justify-content: flex-start;
      & > p {
        margin: 0 10px;
        width: 110px;
        padding: 10px 0;
        font-size: 16px;
        text-align: center;
        border-radius: 20px;
      }
      & > p.green {
        color: #9cdb49;
        border: 2px solid #9cdb49;
      }
      & > p.red {
        color: #ff0000;
        border: 2px solid #ff0000;
      }
    }
    & > div.info {
      width: 100%;
      font-size: 20px;
      background-color: #000000;
      color: #ffffff;
      min-height: 350px;
      padding: 10px; 
      @media (max-width:750px){
        font-size: 14px;
      }

    }
  }
`;

interface Dish {
  data: {
    title: string;
    image: string;
    diet: string[];
    extendedIngredients: {
      name: string;
      image: string;
      measures: {
        metric: {
          amount: number;
          unitLong: string;
        };
        us: {
          amount: number;
          unitLong: string;
        };
      };
    }[];
    suggestedPrice: number;
    readyInMinutes: number;
    servings: number;
    vegan: boolean;
    vegetarian: boolean;
    veryHealthy: boolean;
    instructions: string;
    nutrition: {
      nutrients: {
        name: string;
        amount: number;
        unit: string;
        percentOfDailyNeeds: number;
      }[];
    };
  };
}

const FoodDetails = () => {

  const [dishDetails, setDishDetails] = useState<Dish["data"]>();
  const [showIngredients, setShowIngredients] = useState<boolean>(false);
  const [prepareInfo, setPrepareInfo] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  
  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${window.location.search.slice(
        2
        )}/information?includeNutrition=true&apiKey=2f82075fb2ab456f8f690ee0710297d5`,
        {
          method: "GET",
          credentials: "same-origin"
        }
        )
        .then((response) => response.json())
        .then((data) => {
          console.log("CZy to to danie?", data);
          setDishDetails(data);
        });
        console.log("fetched data", dishDetails);
        setTimeout(() => {
            console.log("mam dane");
        }, 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      
  return (
    <Container>
      <section>
        <h1 className="title">{dishDetails?.title}</h1>
        <div className="section_tags">
          {dishDetails?.vegan ? <p className="green">Vegan</p> : <p className="red">Vegan</p>}
          {dishDetails?.vegetarian ? <p className="green">Vegetarian</p> : <p className="red">Vegetarian</p>}
          {dishDetails?.veryHealthy ? <p className="green">Very Healthy</p>: <p className="red">Very Healthy</p>}
        </div>
        <img src={dishDetails?.image} alt={dishDetails?.title} />
        <Buttons setShowIngredients={setShowIngredients} setPrepareInfo={setPrepareInfo} setShowInfo={setShowInfo}/>
        <div className="info">    
          {prepareInfo ?  <DishPreparing servings={dishDetails!.servings} readyInMinutes={dishDetails!.readyInMinutes} suggestedPrice={dishDetails!.suggestedPrice} instructions={dishDetails!.instructions} />
           : null}
           {showIngredients ? <IngredientsList extendedIngredients={dishDetails!.extendedIngredients} />
           : null}
          {showInfo ? <AdditionalInfo nutrients={dishDetails!.nutrition.nutrients}/>
           : null}
        </div>
      </section>
    </Container>
  );
};

export default FoodDetails;
