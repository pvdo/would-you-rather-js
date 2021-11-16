import React, { useEffect } from "react";
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { handleVoteQuestion } from "../../state/ducks/shared";
import { useHistory } from "react-router";
import Error404 from "./404";

const WouldYouRatherContainer = styled.div`
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const OptionsContainers = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    position: relative;
`;
const Option = styled.button`
    width: 330px;
    height: 350px;
    background-color: #${(props) => (props.option1 ? "247ba0" : "7cdedc")};
    color: #${(props) => (props.option1 ? "7cdedc" : "247ba0")};
    border-style: none;
    border-radius: ${(props) =>
        props.option1 ? "20px 0px 0px 20px" : "0px 20px 20px 0px"};

    padding: 50px;
    font-size: 1.3em;
    font-weight: bolder;
    position: relative;
`;

const Or = styled.p`
    color: #fff;
    font-weight: bold;
    font-size: 1.2em;
    position: absolute;
    left: 50%;
    margin-left: -15px;
    top: 50%;
    margin-top: -10px;
    z-index: 1;
`;
const Author = styled.div`
    width: 10%;
    color: #247ba0;
    font-size: 1em;
    font-weight: bold;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

const Pick = styled.div`
    border-radius: 50px;
    height: 60px;
    width: 60px;
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 0.4em;
    color: #fff;
`;

const VoteContainer = styled.div`
    position: absolute;
    bottom: 25%;
    left: 0;
    right: 0;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.6em;
    color: #fff;
    /* text-shadow: 0 0px 2px #000; */
`;
const VoteBar = styled.div`
    background-color: #fff;
    width: 75%;
    height: 15px;
    border-radius: 30px;
`;
const InnerVoteBar = styled.div`
    background-color: #${(props) => (props.option1 ? "7cdedc" : "247ba0")};
    height: 15px;
    width: ${(props) => props.optionPercentage};
    border-radius: 30px;

    font-size: 0.7em;
    color: #${(props) => (props.option1 ? "247ba0" : "7cdedc")};
    text-shadow: none;
`;
const Avatar = styled.img`
    border-radius: 100px;
    height: 50px;
    width: 50px;
`;

const WouldYouRather = (props) => {
    const history = useHistory();
    const { question, authedUser, dispatch, authorAvatar, authorName } = props;

    useEffect(() => {
        if (authedUser === null) {
            history.push({
                pathname: `/login`,
                state: { from: props.location.pathname },
            });
        }
    }, [history, props.location.pathname, authedUser]);

    let totalVotes = 0;
    let optionOnePercentage = 0;
    let optionTwoPercentage = 0;
    if (question) {
        totalVotes =
            question.optionOne.votes.length + question.optionTwo.votes.length;
        optionOnePercentage = (
            (question.optionOne.votes.length * 100) /
            totalVotes
        ).toFixed(2);
        optionTwoPercentage = (
            (question.optionTwo.votes.length * 100) /
            totalVotes
        ).toFixed(2);
    }

    const vote = (e, answer) => {
        e.preventDefault();
        dispatch(
            handleVoteQuestion({
                qid: question.id,
                answer,
                authedUser,
            })
        );
    };

    return (
        <>
            {question === "" ? (
                <Error404 />
            ) : (
                <WouldYouRatherContainer>
                    <h2>Would You Rather</h2>
                    {question ? (
                        <OptionsContainers>
                            {question.optionOne.votes.includes(authedUser) ||
                            question.optionTwo.votes.includes(authedUser) ? (
                                <>
                                    <Option voted={true} option1={true}>
                                        {question.optionOne.votes.includes(
                                            authedUser
                                        ) ? (
                                            <Pick>
                                                Your Pick
                                                <FaCheckCircle size={56} />
                                            </Pick>
                                        ) : null}

                                        {question.optionOne.text}
                                        <VoteContainer>
                                            {question.optionOne.votes.length} /{" "}
                                            {totalVotes}
                                            <VoteBar>
                                                <InnerVoteBar
                                                    option1={true}
                                                    optionPercentage={
                                                        optionOnePercentage
                                                    }
                                                >
                                                    {optionOnePercentage}%
                                                </InnerVoteBar>
                                            </VoteBar>
                                        </VoteContainer>
                                    </Option>
                                    <Or>OR</Or>
                                    <Option voted={true}>
                                        {question.optionTwo.votes.includes(
                                            authedUser
                                        ) ? (
                                            <Pick>
                                                Your Pick
                                                <FaCheckCircle size={56} />
                                            </Pick>
                                        ) : null}
                                        {question.optionTwo.text}
                                        <VoteContainer>
                                            {question.optionTwo.votes.length} /{" "}
                                            {totalVotes}
                                            <VoteBar>
                                                <InnerVoteBar
                                                    optionPercentage={
                                                        optionTwoPercentage
                                                    }
                                                >
                                                    {optionTwoPercentage}%
                                                </InnerVoteBar>
                                            </VoteBar>
                                        </VoteContainer>
                                    </Option>
                                </>
                            ) : (
                                <>
                                    <Option
                                        onClick={(e) => vote(e, "optionOne")}
                                        option1={true}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {question.optionOne.text}
                                    </Option>
                                    <Or>OR</Or>
                                    <Option
                                        style={{ cursor: "pointer" }}
                                        onClick={(e) => vote(e, "optionTwo")}
                                    >
                                        {question.optionTwo.text}
                                    </Option>
                                </>
                            )}
                        </OptionsContainers>
                    ) : (
                        <OptionsContainers>
                            <Option option1={true}>
                                <VoteContainer></VoteContainer>
                            </Option>
                            <Option option1={true}></Option>
                        </OptionsContainers>
                    )}
                    Question Created by:
                    <Author>
                        <Avatar src={authorAvatar}></Avatar>
                        {authorName}
                    </Author>
                </WouldYouRatherContainer>
            )}
        </>
    );
};

const mapsStateToProps = ({ questions, authedUser, users }, { match }) => {
    let question = {};

    if (questions.hasOwnProperty(match.params.id)) {
        question = questions[match.params.id];
    } else {
        question = "";
    }

    let authorAvatar = "";
    let authorName = "";

    Object.values(users).map((user) => {
        if (user.id === question.author) {
            authorAvatar = user.avatarURL;
            authorName = user.name;
        }
        return null;
    });
    Object.values(users).map((user) =>
        user.id === question.author ? (authorAvatar = user.avatarURL) : ""
    );
    return {
        question,
        authedUser,
        authorAvatar,
        authorName,
    };
};
export default withRouter(connect(mapsStateToProps)(WouldYouRather));
