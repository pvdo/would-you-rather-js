import React, { useEffect } from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";
import styled from "styled-components";
import { useState } from "react";
import { handleCreateQuestion } from "../../state/ducks/shared";
import { connect } from "react-redux";
import { useHistory } from "react-router";

const CreateQuestionContainer = styled.div`
    & h1 {
        margin-bottom: 50px;
    }
`;

const CreateQuestion = (props) => {
    const [optionOneText, setoptionOneText] = useState("");
    const [optionTwoText, setoptionTwoText] = useState("");
    const history = useHistory();
    const { dispatch, authedUser } = props;

    useEffect(() => {
        if (authedUser === null) {
            history.push({
                pathname: `/login`,
                state: { from: props.location.pathname },
            });
        }
    }, [history, props.location.pathname, authedUser]);

    const handleChange = (e, option) => {
        option(e.target.value);
    };

    const handleSubmit = (e) => {
        dispatch(
            handleCreateQuestion({ optionOneText, optionTwoText, authedUser })
        );
        history.push("/questions/");
    };

    return (
        <>
            <CreateQuestionContainer>
                <h1>Would you Rather</h1>
                <form onSubmit={handleSubmit}>
                    <Input
                        name={"option1"}
                        placeholder={"Option 1"}
                        value={optionOneText}
                        onChange={(e) => handleChange(e, setoptionOneText)}
                        color={"primary"}
                    />
                    <h2>OR</h2>
                    <Input
                        name={"option2"}
                        placeholder={"Option 2"}
                        value={optionTwoText}
                        color={"secondary"}
                        onChange={(e) => handleChange(e, setoptionTwoText)}
                    />
                    <Button
                        label={"Create Would You Rather Question"}
                        type="submit"
                    />
                </form>
            </CreateQuestionContainer>
        </>
    );
};

const mapStateToProps = ({ authedUser }) => {
    return {
        authedUser,
    };
};
export default connect(mapStateToProps)(CreateQuestion);
