import React from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";

const Card = styled.div`
    width: 400px;
    height: 450px;
    box-shadow: 0px 0px 24px 0px rgba(214, 215, 222, 1);
    color: #000000;
    display: flex;
    flex-direction: column;
    border-top-left-radius:20px;
    border-top-right-radius:20px;
    @media only screen and (max-width:450px){
        width: 350px;
        height: 400px;
    }
    @media only screen and (max-width:350px){
        width: 270px;
        height: 350px;
    }
    & > h2{
        padding: 5px 5px;
        font-size: 20px;
        height: 20%;
        text-align: center;
        @media only screen and (max-width:400px){
        font-size: 15px;
    }
    }
    & > img {
        height: 70%;
    }
    & > a{
        height: 10%;
        width: 100%;
        & > button {
            cursor: pointer;
            height: 100%;
            width: 100%;
            background-color: #ffffff;
            color: #000000;
            font-size: 20px;
            border: none;
            transition: 0.5s;
        }
        & > button:hover{
            background-color: #000000;
            color: #ffffff;
        }
    }
`;
interface Props {
    title:string;
    imgSrc:string;
    id:number;
}
const ProductCard: React.FC<Props> = ({title,imgSrc,id}) => {
    return (
        <Card>
            <h2>{title}</h2>
            <img src={imgSrc} alt={title}/>
            <Link to={`id?=${id.toString()}`}>
            <button className='btn'>More info</button>
            </Link>
        </Card>
    )
}
export default ProductCard;
