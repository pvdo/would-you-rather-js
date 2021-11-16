//-----DEPENDENCIES-----//
import React, { useState } from "react";
import styled from "styled-components";

//------COMPONENTS-----//
import Input from "../../Components/Input";
import Button from "../../Components/Button";

//------REDUX------//
import { handleCreateUser } from "../../../state/ducks/shared";

const LoginComponent = styled.div`
    margin: 0 auto;
    width: 75vw;
    height: 60vh;
    border-radius: 25px;
    font-size: 1em;
    /* display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; */
`;
const LoginStyle2 = styled.div`
    width: 50px;
    height: 50px;
    background-color: yellow;
`;

const CreateAccount = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { dispatch } = props;

    const handleChange = (e, option) => {
        option(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(handleCreateUser(username, password));
    };
    return (
        <LoginComponent>
            <LoginStyle2></LoginStyle2>
            <h1>aaaa</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    name={"username"}
                    placeholder={"Username"}
                    value={username}
                    onChange={(e) => handleChange(e, setUsername)}
                />
                <Input
                    name={"password"}
                    placeholder={"Password"}
                    value={password}
                    onChange={(e) => handleChange(e, setPassword)}
                />
                <Button label="Log in" type="submit"></Button>
            </form>
            <a href="pedrodocarmo.com">Create Account</a>
        </LoginComponent>
    );
};

export default CreateAccount;
