import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./containers/MainPage";
import FoodDetails from "./containers/FoodDetails";
import "./App.css";


const App = () => {

  return (
    <Routes>
      <Route path="/" element = {<MainPage/>}/>
      <Route path="/:id" element = {<FoodDetails/>}/>
    </Routes>
  );
};

export default App;
