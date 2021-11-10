import React , { useEffect, useState }from 'react';

const FoodDetails = () => {

    const [dishDetails, setDishDetails] = useState<string>("");
    
    useEffect( () => {
        fetch(
            `https://api.spoonacular.com/recipes/${window.location.search.slice(2,)}/card?&apiKey=2f82075fb2ab456f8f690ee0710297d5`,
            {
              method: "GET",
            }
          )
            .then((response) => response.json())
            .then((data) => {console.log("CZy to to danie?" ,data)
            setDishDetails(data.url);
        });
    },[])

    return (
        <div>
            <img src={dishDetails} alt='dish'/>
        </div>
    )
}

export default FoodDetails;