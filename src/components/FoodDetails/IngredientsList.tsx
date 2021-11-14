import React from 'react'
import styled from "styled-components";

const IngList = styled.ul`
        padding: 15px 0 0 30px;
        & > li {
          padding: 10px 0;
        }
`;
interface Props{
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
}

const IngredientsList = ({extendedIngredients}:Props) => {
    return (
        <IngList>
        {extendedIngredients.map((ing, i) => {
          return (
            <li key={i}>
              {ing.measures.metric.amount} {ing.measures.metric.unitLong}{" "}
              of {ing.name}{" "}
            </li>
          );
        })}
      </IngList>
    )
}
export default IngredientsList;