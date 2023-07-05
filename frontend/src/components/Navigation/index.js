// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud } from "@fortawesome/free-solid-svg-icons";

function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
        <li className="active-session-links-list">
            <NavLink exact to="/spots/new" className="create-a-spot-navLink-text">Create a New Spot</NavLink>
            <ProfileButton user={sessionUser} />
        </li>
        );
    } else {
        sessionLinks = (
        <li>
            <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
        />
        </li>
        );
    }

    return (
    <div id="navigation-container">
        <div>
            <NavLink exact to="/" className="remove-underline">
                <span className="main-logo-text">A</span>
                <FontAwesomeIcon icon={faCloud} className="cloud-icon" />
            </NavLink>
        </div>
        <ul>
        {isLoaded && sessionLinks}
        </ul>
    </div>
    );
}

export default Navigation;
