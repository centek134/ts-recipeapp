import React from "react";
import styled from "styled-components";

const BtnContainer = styled.div`
  width: 100%;
  & > button.black {
    background-color: #000000;
    color: #ffffff;
  }
  & > button {
    padding: 10px 15px;
    background-color: #ffffff;
    color: #000000;
    border: 2px solid #000000;
    font-size: 18px;
    cursor: pointer;
    @media (max-width:750px){
      font-size: 14px;
      padding: 5px 10px;
    }
    &:active {
      color: #000000;
      background-color: #ffffff;
      border: 2px solid #ffffff;
    }
    &:hover {
      background-color: #000000;
      color: #ffffff;
      border: 2px solid #000000;
    }
  }
`;

interface Props {
  setShowIngredients: React.Dispatch<React.SetStateAction<boolean>>;
  setPrepareInfo: React.Dispatch<React.SetStateAction<boolean>>;
  setShowInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

const Buttons = ({
  setShowIngredients,
  setPrepareInfo,
  setShowInfo,
}: Props) => {
  const infoBtnHandler = (
    opt: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
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
    }
    btnClassHandler(e);
  };

  const btnClassHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    document
      .getElementById("btn_cont")
      ?.querySelectorAll("button")
      .forEach((btn) => {
        btn.classList.remove("black");
      });
    e.currentTarget.classList.add("black");
  };
  return (
    <BtnContainer id="btn_cont" className="section_buttons">
      <button onClick={(e) => infoBtnHandler("ingredients", e)}>
        Ingredients
      </button>
      <button onClick={(e) => infoBtnHandler("preparing", e)}>
        Dish preparing
      </button>
      <button onClick={(e) => infoBtnHandler("info", e)}>
        Additional info
      </button>
    </BtnContainer>
  );
};

export default Buttons;
