import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { handleLogOut } from "../../state/ducks/shared";

import logo from "../../images/logo.png";

const HeaderStyle = styled.header`
    width: 100vw;
    overflow: hidden;
    padding: 25px 15px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    padding-bottom: 10vh;
`;
const LoginStyle2 = styled.img`
    width: 10%;
`;

const MenuMiddle = styled.div`
    width: 40%;
    color: black;
    text-align: center;
    font-size: 1.4vw;
    line-height: 100%;
    border-radius: 4px;
    & a {
        padding: 10px 20px;
        text-decoration: none;
        &:visited {
            color: #000;
        }
        &:hover {
            background-color: #247ba0;
            color: #7cdedc;
            border-radius: 30px;
        }
        &:active {
            color: #000;
        }
    }
`;

const MenuRightItem = styled.div`
    padding: 12px;
    text-decoration: none;
    font-size: 1vw;

    & a {
        text-decoration: none;
    }
    &:hover {
        color: #707070;
    }
    &:active {
        color: #707070;
    }
    &:visited {
        color: #707070;
    }
`;

const AvatarStyle = styled.div`
    display: flex;
    align-items: center;
`;

const Avatar = styled.img`
    border-radius: 100px;
    height: 50px;
    width: 50px;
`;

const Menu = (props) => {
    let { authedUser, user, location, dispatch } = props;

    const logOut = () => {
        dispatch(handleLogOut());
    };
    return (
        <HeaderStyle>
            <LoginStyle2 src={logo} alt="logo" />
            <MenuMiddle>
                {location === "/questions" ? (
                    <Link
                        style={{
                            color: "#247ba0",
                            fontWeight: "bold",
                            pointerEvents: "none",
                        }}
                        to="/questions"
                    >
                        Questions
                    </Link>
                ) : (
                    <Link to="/questions">Questions</Link>
                )}
                {location === "/add" ? (
                    <Link
                        style={{
                            color: "#247ba0",
                            fontWeight: "bold",
                            pointerEvents: "none",
                        }}
                        to="/add"
                    >
                        Create Question
                    </Link>
                ) : (
                    <Link to="/add">Create Question</Link>
                )}
                {location === "/leaderboard" ? (
                    <Link
                        style={{
                            color: "#247ba0",
                            fontWeight: "bold",
                            pointerEvents: "none",
                        }}
                        to="/leaderboard"
                    >
                        Leaderboard
                    </Link>
                ) : (
                    <Link to="/leaderboard"> Leaderboard</Link>
                )}
            </MenuMiddle>
            <AvatarStyle>
                <MenuRightItem>{authedUser}</MenuRightItem>
                <MenuRightItem>
                    <Avatar
                        src={user !== undefined ? user.avatarURL : null}
                    ></Avatar>
                </MenuRightItem>
                <MenuRightItem>
                    <Link
                        to="/login"
                        onClick={logOut}
                        style={{ fontSize: "1vw" }}
                    >
                        {" "}
                        Log Out
                    </Link>
                </MenuRightItem>
            </AvatarStyle>
        </HeaderStyle>
    );
};

const mapStateToProps = ({ users, authedUser }, { location }) => {
    console.log("location:", location);
    return {
        user: users[authedUser],
        authedUser,
        location: location.pathname,
    };
};
export default withRouter(connect(mapStateToProps)(Menu));
