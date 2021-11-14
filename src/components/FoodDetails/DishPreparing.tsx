import React from "react";
import styled from "styled-components";

const Info = styled.div`
  padding: 10px;
  & > ul {
    list-style: none;
    margin-bottom: 20px;
  }
`;

interface Props {
  servings: number;
  readyInMinutes: number;
  suggestedPrice: number;
  instructions: string;
}

const DishPreparing = ({
  servings,
  readyInMinutes,
  suggestedPrice,
  instructions,
}: Props) => {
  return (
    <Info>
      <ul>
        <li>Servings: {servings}</li>
        <li>Preparing time: {readyInMinutes} min</li>
        <li>Suggested price: {suggestedPrice}</li>
      </ul>
      <p>{instructions}</p>
    </Info>
  );
};

export default DishPreparing;
