import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Filters from './components/Filters';
import './App.css';

const Container = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

interface Recipe{
  recipe:{
    id:number,
    title:string,
    image:string
  }[]
}

const App = () => {

    const [recipes,setRecipes] = useState<Recipe["recipe"]>([])
  
  useEffect(() => {
    fetch("https://api.spoonacular.com/recipes/complexSearch?&cuisine=Italian,American&number=20&apiKey=2f82075fb2ab456f8f690ee0710297d5",{
      method:"GET"
    }).then( response => response.json())
    .then(data => {
      console.log("Data", data);
      setRecipes(data.results);
      console.log("myrecipes list",recipes)
    }).catch(err => console.log(err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <Container>
      <Filters/>
      <div>

      {recipes.map(rec => {
        return(
          <React.Fragment>
          <p>{rec.title}</p>
          <img src={rec.image} width={50} height={50} alt=''/>
          <p>{rec.id}</p>
          </React.Fragment>
        )
      })}
      </div>
    </Container>
  );
}

export default App;
