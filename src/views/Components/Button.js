import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.input`
    background-color: #7cdedc;
    display: block;
    width: auto;
    min-width: 10vw;
    padding: 10px;
    border: none;
    border-radius: 20px;
    font-size: 0.8em;
    margin: 10px auto;
    cursor: pointer;
    &:hover {
        background-color: #47d1cf;
    }
`;

const Button = ({ label, type }) => {
    return <ButtonContainer value={label} type={type} />;
};

export default Button;
