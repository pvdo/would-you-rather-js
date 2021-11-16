//-----DEPENDENCIES-----//
import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

//------COMPONENTS-----//
import Button from "../Components/Button";

//------REDUX------//
import { handleLogin } from "../../state/ducks/shared";

//------ASSETS------//
import logo from "../../images/logo.png";

const LoginComponent = styled.div`
    margin: 0 auto;
    padding-top: 10%;
    width: 75vw;
    height: 30vh;
    border-radius: 25px;
    font-size: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;
const LoginStyle2 = styled.img`
    width: auto;
    height: 40%;
`;

const SelectUserStyle = styled.select`
    width: 100%;
    font-size: 1em;
    background-color: #247ba0;
    color: #fff;
`;

const Login = (props) => {
    const [user, setUser] = useState("");
    const { dispatch } = props;
    const history = useHistory();
    const handleChange = (e) => {
        setUser(e.target.value);
    };

    const handleSubmit = (e) => {
        if (user !== "") {
            dispatch(handleLogin(user));
            history.location.state
                ? history.push(history.location.state.from)
                : history.push("/");
        } else {
            e.preventDefault();
        }
    };

    return (
        <LoginComponent>
            {console.log("LOGINHISTORY:", history)}
            <LoginStyle2 src={logo} alt="logo" />
            <form onSubmit={handleSubmit}>
                <SelectUserStyle onChange={handleChange} value={user}>
                    <option value="">-- Select User --</option>
                    {props.users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.id}
                        </option>
                    ))}
                </SelectUserStyle>
                <Button label="Log in" type="submit"></Button>
            </form>
        </LoginComponent>
    );
};

const mapStateToProps = ({ users }) => {
    return {
        users: Object.keys(users).map((user) => users[user]),
    };
};
export default connect(mapStateToProps)(Login);
