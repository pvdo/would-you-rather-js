import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Tab = styled.div`
    order: 9;
    flex-grow: 1;
    width: 100%;
    height: 100%;
    display: none;
    overflow: auto;
    padding: 1rem;
    background: #fff;
    padding: 20px;
    box-shadow: -10px 10px 0px 0px black;

    ::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #fff;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #7cdedc;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;

const LabelTab = styled.label`
    order: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 2rem;
    margin-right: 0.2rem;
    cursor: pointer;
    background-color: #dce7eb;
    font-weight: bold;
    transition: ease 0.3s;
`;

const InputTab = styled.input`
    display: none;

    &:checked + ${LabelTab} {
        background: #fff;
    }

    &:checked + ${LabelTab} + ${Tab} {
        display: block;
    }
`;

const TabItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 100%;
`;

const AvatarContainer = styled.div`
    text-align: center;
`;
const Avatar = styled.img`
    border-radius: 100px;
    height: 150px;
    width: 150px;
`;

const QuestionTab = (props) => {
    const {
        inputId,
        checked,
        label,
        questions,
        users,
        authedUser,
        buttonLabel,
    } = props;

    let [tabSelected, setTabSelected] = useState(checked);

    return (
        <>
            <InputTab
                type="radio"
                name="tabs"
                id={inputId}
                checked={tabSelected}
                onChange={() => setTabSelected(!tabSelected)}
            />
            <LabelTab htmlFor={inputId}>{label}</LabelTab>
            <Tab>
                {questions.length !== 0 ? (
                    questions.map((question) => {
                        return users.map((user) => {
                            return user.id === question.author ? (
                                <TabItem key={user.id}>
                                    <AvatarContainer>
                                        <Avatar src={user.avatarURL}></Avatar>
                                        <p>{user.name}</p>
                                    </AvatarContainer>
                                    <div>
                                        <p>
                                            Hey <b>{authedUser}</b>, would you
                                            rather
                                        </p>
                                        <p>{question.optionOne.text} or...</p>
                                        <Link
                                            style={{
                                                textDecoration: "none",
                                            }}
                                            to={{
                                                pathname: `/questions/${question.id}`,
                                                id: question.id,
                                            }}
                                        >
                                            <Button
                                                label={buttonLabel}
                                                type="button"
                                            />
                                        </Link>
                                    </div>
                                </TabItem>
                            ) : null;
                        });
                    })
                ) : (
                    <p>There is no {label.toLowerCase()}</p>
                )}
            </Tab>
        </>
    );
};

QuestionTab.propTypes = {
    inputId: PropTypes.string,
    checked: PropTypes.bool,
    label: PropTypes.string,
    questions: PropTypes.array,
    users: PropTypes.array,
    authedUser: PropTypes.string,
    buttonLabel: PropTypes.string,
};

export default QuestionTab;
