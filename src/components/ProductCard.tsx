import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
    width: 400px;
    height: 450px;
    box-shadow: 0px 0px 24px 0px rgba(214, 215, 222, 1);
    color: #000000;
    display: flex;
    flex-direction: column;
    border-top-left-radius:20px;
    border-top-right-radius:20px;
    & > h2{
        padding: 5px 5px;
        font-size: 20px;
        height: 20%;
        text-align: center;
    }
    & > img {
        height: 70%;

    }
    & > button {
        cursor: pointer;
        height: 10%;
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
`;

interface Props {
    title:string;
    imgSrc:string;
    id:number;
    click: (id:number) => void;


}
const ProductCard: React.FC<Props> = ({title,imgSrc,id,click}) => {
    return (
        <Card>
            <h2>{title}</h2>
            <img src={imgSrc} alt={title}/>
            <button onClick={() => click(id)}>More info</button>
        </Card>
    )
}
export default ProductCard;
