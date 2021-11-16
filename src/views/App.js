//-----DEPENDECIES-----//
import React, { useEffect } from "react";
import { handleInitialData } from "../state/ducks/shared";
import { connect } from "react-redux";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//-----COMPONENTS------//
import Questions from "./Containers/(Un)AnsweredQuestions";
import LogIn from "./Containers/LogIn";
import CreateAccount from "./Containers/inProgress/CreateAccount";
import Menu from "./Components/Menu";
import WouldYouRather from "./Containers/WouldYouRather";
import CreateQuestion from "./Containers/CreateQuestion";
import Leaderboard from "./Containers/LeaderBoard";
import Error404 from "./Containers/404";

const AppContainer = styled.div`
    margin: 0;
    width: 100vw;
    height: 100vh;
    padding: 10px;
    background-color: #dce7eb;
    font-family: Helvetica, Arial, sans-serif;
    color: #707070;
    text-align: center;
`;
const App = (props) => {
    useEffect(() => {
        props.dispatch(handleInitialData());
    });

    return (
        <AppContainer>
            <Router>
                {props.authedUser !== null ? <Menu /> : null}
                <Switch>
                    <Route exact path="/" component={Questions} />
                    <Route path="/login" component={LogIn} />
                    <Route path="/createAccount" component={CreateAccount} />
                    <Route path="/leaderboard" component={Leaderboard} />
                    <Route exact path="/questions" component={Questions} />
                    <Route path="/questions/:id" component={WouldYouRather} />
                    <Route path="/add" component={CreateQuestion} />
                    <Route component={Error404} />
                </Switch>
            </Router>
        </AppContainer>
    );
};

const mapStateToProps = ({ authedUser }) => {
    return {
        authedUser,
    };
};

export default connect(mapStateToProps)(App);
