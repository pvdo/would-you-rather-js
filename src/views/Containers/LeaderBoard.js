import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useHistory } from "react-router";

const primary = "#247ba0";
const secondary = "#7cdedc";

const LeaderboardContainer = styled.div``;

const UserItemContainer = styled.div`
    margin: auto;
    width: 75%;
    height: 100px;
    border-radius: 50px;
    background-color: ${(props) => (props.isColor ? primary : secondary)};
    color: ${(props) => (props.isColor ? secondary : primary)};
    display: grid;
    grid-template-columns: [avatar] 1fr [name] 1fr [p1] 1fr [p2] 1fr [p3] 1fr;
    align-items: center;
    justify-items: center;
    & h3 {
        font-size: 1.4em;
    }
    & p {
        font-size: 1em;
    }
`;

const Avatar = styled.img`
    height: 75px;
    width: 75px;
    border-radius: 50px;
    background-color: #fff;
`;

const Leaderboard = (props) => {
    const history = useHistory();
    let isColorPrimary = true;
    const toggleColor = () => {
        isColorPrimary = !isColorPrimary;
    };
    useEffect(() => {
        if (props.authedUser === null) {
            history.push({
                pathname: "/login",
                state: { from: props.location.pathname },
            });
        }
    }, [history, props.location.pathname, props.authedUser]);
    return (
        <>
            <LeaderboardContainer>
                {console.log("History:", history)}
                <h1>Leaderboard</h1>
                {props.users.map((user) => {
                    toggleColor();
                    return (
                        <UserItemContainer
                            key={user.id}
                            isColor={isColorPrimary}
                        >
                            <Avatar src={user.avatarURL} />
                            <h3>{user.name}</h3>

                            <div>
                                <p>Questions Created</p>
                                <p>{user.questions.length}</p>
                            </div>
                            <div>
                                <p>Questions Answered </p>
                                <p>{Object.keys(user.answers).length}</p>
                            </div>
                            <div>
                                <p>Total</p>
                                <p>
                                    {user.questions.length +
                                        Object.keys(user.answers).length}
                                </p>
                            </div>
                        </UserItemContainer>
                    );
                })}
            </LeaderboardContainer>
        </>
    );
};

const mapStateToProps = ({ users, authedUser }) => {
    let unsortedUsers = Object.keys(users).map((user) => users[user]);

    return {
        users: unsortedUsers.sort((a, b) => {
            return (
                Object.keys(b.answers).length +
                b.questions.length -
                (Object.keys(a.answers).length + a.questions.length)
            );
        }),
        authedUser,
    };
};
export default connect(mapStateToProps)(Leaderboard);
