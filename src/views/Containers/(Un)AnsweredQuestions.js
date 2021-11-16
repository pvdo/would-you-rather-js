import { connect } from "react-redux";
import React, { useEffect } from "react";
import styled from "styled-components";
import QuestionTab from "../Components/QuestionTab";
import { useHistory } from "react-router";

const QuestionDiv = styled.div`
    background: #dce7eb;
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue",
        Helvetica, Arial, "Lucida Grande", sans-serif;
    line-height: 1.5;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Tabs = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 300px;
    width: 800px;
`;

const QuestionsPage = (props) => {
    const history = useHistory();
    const { answeredQuestions, unansweredQuestions, users, authedUser } = props;
    useEffect(() => {
        if (authedUser === null) {
            history.push({
                pathname: `/login`,
                state: { from: props.location.pathname },
            });
        }
    }, [history, props.location.pathname, authedUser]);
    return (
        <>
            <QuestionDiv>
                <Tabs>
                    <QuestionTab
                        inputId="tab2"
                        checked={true}
                        label="Answered Questions"
                        questions={answeredQuestions}
                        users={users}
                        authedUser={authedUser}
                        buttonLabel="check result"
                    />
                    <QuestionTab
                        inputId="tab1"
                        checked={true}
                        label="Unanswered Questions"
                        questions={unansweredQuestions}
                        users={users}
                        authedUser={authedUser}
                        buttonLabel="answer"
                    />
                </Tabs>
            </QuestionDiv>
        </>
    );
};

function mapStateToProps({ questions, authedUser, users }) {
    const answeredQuestions = [];
    const unansweredQuestions = [];
    Object.values(questions).map((question) => {
        return question.optionOne.votes.includes(authedUser) ||
            question.optionTwo.votes.includes(authedUser)
            ? answeredQuestions.push(question)
            : unansweredQuestions.push(question);
    });

    return {
        answeredQuestions: answeredQuestions.sort((a, b) => {
            return b.timestamp - a.timestamp;
        }),
        unansweredQuestions: unansweredQuestions.sort((a, b) => {
            return b.timestamp - a.timestamp;
        }),
        users: Object.keys(users).map((user) => users[user]),
        authedUser,
    };
}

export default connect(mapStateToProps)(QuestionsPage);
