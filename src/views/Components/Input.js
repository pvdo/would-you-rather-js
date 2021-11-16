import React from "react";
import styled from "styled-components";

const InputStyle = styled.input`
    width: 40%;
    background-color: ghostwhite;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;

    &:focus {
        outline-color: #${(props) => (props.color === "primary" ? "7cdedc" : "247ba0")};
    }
    &::placeholder {
        color: #${(props) => (props.color === "primary" ? "7cdedc" : "247ba0")};
        font-size: 1.3em;
    }
`;

const Input = ({ value, name, placeholder, color, onChange }) => {
    return (
        <InputStyle
            onChange={onChange}
            value={value}
            type="text"
            name={name}
            placeholder={placeholder}
            color={color}
            autoComplete="off"
        />
    );
};

export default Input;
