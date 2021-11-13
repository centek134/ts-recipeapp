import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.main`
  width: 100%;
  background-color: #ebebeb;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  & > section {
    height: 100%;
    background-color: #ffffff;
    flex: 0.5;
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
    & > div.section_buttons {
      width: 100%;
      & > button {
        padding: 10px 15px;
        background-color: #ffffff;
        color: #000000;
        border: 2px solid #000000;
        font-size: 18px;
        cursor: pointer;
        &:active {
          color: #000000;
          background-color: #ffffff;
          border: 2px solid #ffffff;
        }
        &:hover{
            background-color: #000000;
            color: #ffffff;
            border:2px solid #000000;
        }
      }
    }
    & > div.info {
      width: 100%;
      font-size: 20px;
      background-color: #000000;
      color: #ffffff;
      & > .ingr_list {
        padding: 15px 0 0 30px;
        & > li {
          padding: 10px 0;
        }
      }
      & > .prepare_info{
          padding: 10px;
          & > ul {
              list-style: none;
              margin-bottom: 20px;
          }
      }
      & > table {
        margin: 0 auto;
        width: 90%;
        & > tbody > tr {
          &:hover {
            background-color: #ffffff;
            color: #000000;
          }
          & > td {
            padding: 5px 0;
          }
        }
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
  const [showIngredients, setShowIngredients] = useState<boolean>(true);
  const [prepareInfo, setPrepareInfo] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${window.location.search.slice(
        2
      )}/information?includeNutrition=true&apiKey=2f82075fb2ab456f8f690ee0710297d5`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("CZy to to danie?", data);
        setDishDetails(data);
      });
    console.log("fetched data", dishDetails);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const infoBtnHandler = (opt: string,e: React.MouseEvent<HTMLButtonElement>) => {
    switch (opt) {
      case "ingredients":
        setShowIngredients(true);
        setPrepareInfo(false);
        setShowInfo(false);
        break;
      case "preparing":
        setPrepareInfo(true);
        setShowInfo(false);
        setShowIngredients(false);
        break;
      case "info":
        setShowInfo(true);
        setPrepareInfo(false);
        setShowIngredients(false);
        break;
      default:
        return;
    };

    btnClassHandler(e)
  };

  const btnClassHandler = (e:React.MouseEvent<HTMLButtonElement>) => {
      console.log(e);
  }

  return (
    <Container>
      <section>
        <h1 className="title">{dishDetails?.title}</h1>
        <div className="section_tags">
          {dishDetails?.vegan ? (
            <p className="green">Vegan</p>
          ) : (
            <p className="red">Vegan</p>
          )}
          {dishDetails?.vegetarian ? (
            <p className="green">Vegetarian</p>
          ) : (
            <p className="red">Vegetarian</p>
          )}
          {dishDetails?.veryHealthy ? (
            <p className="green">Very Healthy</p>
          ) : (
            <p className="red">Very Healthy</p>
          )}
        </div>
        <img src={dishDetails?.image} alt={dishDetails?.title} />
        <div id="btn_cont" className="section_buttons">
          <button onClick={(e) => infoBtnHandler("ingredients",e)}>
            Ingredients
          </button>
          <button onClick={(e) => infoBtnHandler("preparing",e)}>
            Dish preparing
          </button>
          <button onClick={(e) => infoBtnHandler("info",e)}>
            Additional info
          </button>
        </div>
        <div className="info">
          {showIngredients ? (
            <ul className="ingr_list">
              {dishDetails?.extendedIngredients.map((ing, i) => {
                return (
                  <li key={i}>
                    {ing.measures.metric.amount} {ing.measures.metric.unitLong}{" "}
                    of {ing.name}{" "}
                  </li>
                );
              })}
            </ul>
          ) : null}
          {prepareInfo ? (
            <div className="prepare_info">
              <ul>
                <li>Servings: {dishDetails?.servings}</li>
                <li>Preparing time: {dishDetails?.readyInMinutes} min</li>
                <li>Suggested price: {dishDetails?.suggestedPrice}</li>
              </ul>
              <p>{dishDetails?.instructions}</p>
            </div>
          ) : null}

          {showInfo ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Daily Needs</th>
                </tr>
              </thead>
              <tbody>
                {dishDetails?.nutrition.nutrients.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{item.name}</td>
                      <td>
                        {item.amount} {item.unit}
                      </td>
                      <td>{item.percentOfDailyNeeds}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : null}
        </div>
      </section>
    </Container>
  );
};

export default FoodDetails;
