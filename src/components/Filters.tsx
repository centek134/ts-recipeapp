import React from "react";
import styled from "styled-components";

const FilterSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 450px;
  background-color: #ffffff;
  border-bottom: 3px solid black;
  @media only screen and (max-width:500px){
        justify-content: space-evenly;
      }
  & > h1 {
    font-family: "Mochiy Pop P One", sans-serif;
    text-align: center;
    font-size: 30px;
    letter-spacing: 1px;
    @media only screen and (max-width:900px){
        font-size: 25px;
      }
      @media only screen and (max-width:700px){
        font-size: 20px;
      }
      @media only screen and (max-width:500px){
        font-size: 15px;
      }
  }
  & > .input_div {
    padding: 0 10px;
    width: 100%;
    min-height: 200px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(7, 1fr);
    @media only screen and (max-width:600px){
        grid-template-columns: repeat(2,1fr);
        grid-template-rows: repeat(14,1fr);
      }
    & > .wrapper > input {
      width: 30px;
    }
    & > .wrapper label {
      cursor: pointer;
      font-size: 25px;
      font-weight: 500;
      @media only screen and (max-width:900px){
        font-size: 20px;
      }
      @media only screen and (max-width:700px){
        font-size: 15px;
      }
    }
  }
  & > button {
    border: 2px solid black;
    cursor: pointer;
    padding: 10px 70px;
    font-size: 20px;
    background-color: #ffffff;
    position: relative;
    transition: 0.5s;
    @media only screen and (max-width:500px){
        font-size: 15px;
        padding: 5px 50px;
      }
  }
  & > button:hover {
    background-color: #000000;
    color: #ffffff;
    border: 2px solid #000000;
  }
`;

interface Props  {
  btnClick: React.MouseEventHandler<HTMLButtonElement>;
  filter: (opt:string) => void;
}


const Filters: React.FC<Props> = ( {btnClick, filter}) => {
  const cousines: string[] = [
    "African",
    "American",
    "British",
    "Cajun",
    "Caribbean",
    "Chinese",
    "Eastern European",
    "European",
    "French",
    "German",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Jewish",
    "Korean",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "Southern",
    "Spanish",
    "Thai",
    "Vietnamese",
  ];

  return (
    <FilterSection>
      <h1>Search for recipes by cousines origin!</h1>
      <div className="input_div">
        {cousines.map((origin) => {
          return (
            <div className="wrapper" key={origin}>
              <input
                type="checkbox"
                value={origin}
                id={origin}
                name="mycheckboxes"
                onClick={()=>filter(origin)}
                />
              <label htmlFor={origin}>{origin}</label>
            </div>
          );
        })}
      </div>
      <button onClick={btnClick}>Search</button>
    </FilterSection>
  );
};
export default Filters;
