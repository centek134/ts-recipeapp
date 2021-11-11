import React , { useEffect, useState }from 'react';
import styled from "styled-components";


const Container = styled.main`
    width: 100%;
    background-color: #ebebeb;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    & > section {
        height: 100%;
        background-color: #ffffff ;
        flex: 0.5;
        display: flex;
        flex-direction: column;
        align-items: center;
        & > img {
            width: 100%;
            padding: 20px;
        }
        & > h1.title{
            font-size: 36px;
            font-family: "Mochiy Pop P One", sans-serif;;
        }
        & > .section_tags{
            width: 100%;
            margin: 10px 0;
            display: flex;
            justify-content: flex-start;
            & > p{
                margin: 0 10px;
                width: 110px;
                padding: 10px 0;
                font-size: 16px;
                text-align: center;
                border-radius: 20px;
            }
            & > p.green{
                color: #9cdb49;
                border: 2px solid #9cdb49;
            }
            & > p.red{
                color: #ff0000;
                border: 2px solid #ff0000;
            }
        }
        & > div.section_buttons{
            width: 100%;

            & > button{
                padding: 10px 15px;
                background-color: #86c53f;
                color: #ffffff;
                border: 2px solid #86c53f;
                font-size: 18px;
                cursor: pointer;
                &:active{
                    background-color: #008000;
                    border: 2px solid #008000;

                }
            }
        }
    }
`;

interface Dish {
    data:{
        title:string;
        image:string;
        diet:string[];
        ingredients:object[];
        suggestedPrice:number;
        preparingTime:number;
        servings:number;
        vegan:boolean;
        vegetarian:boolean;
        veryHealthy:boolean;
        instructions:string;
    }
};

const FoodDetails = () => {

    const [dishDetails, setDishDetails] = useState<Dish["data"]>();
    
    useEffect( () => {
        fetch(
            `https://api.spoonacular.com/recipes/${window.location.search.slice(2,)}/information?includeNutrition=true&apiKey=2f82075fb2ab456f8f690ee0710297d5`,
            {
              method: "GET",
            }
          )
            .then((response) => response.json())
            .then((data) => {console.log("CZy to to danie?", data)
            setDishDetails(data);

        });
        console.log("fetched data",dishDetails)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <Container>
            <section>
                <h1 className='title'>{dishDetails?.title}</h1>
                <div className='section_tags'>
                    {dishDetails?.vegan? <p className='green'>Vegan</p>: <p className='red'>Vegan</p>}
                    {dishDetails?.vegetarian? <p className='green'>Vegetarian</p>: <p className='red'>Vegetarian</p>}
                    {dishDetails?.veryHealthy? <p className='green'>Very Healthy</p>: <p className='red'>Very Healthy</p>}
                </div>
                <img src={dishDetails?.image} alt={dishDetails?.title} />
                <div className='section_buttons'>
                    <button>Ingredients</button>
                    <button>Dish preparing</button>
                    <button>Additional info</button>
                </div>
            </section>
            
        </Container>
    )
}

export default FoodDetails;