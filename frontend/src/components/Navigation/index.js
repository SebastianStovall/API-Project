// frontend/src/components/Navigation/index.js
import React, { useState, useEffect, useRef } from "react";
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
    const [showMenu, setShowMenu] = useState(false); // dropdown initially set to false
    const ulRef = useRef(); // this hook is to capture user click on DOM

    const openMenu = () => { // open menu when clicked
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) { // close only if the user click was NOT inside of dropdown menu
                setShowMenu(false);
            }
        };
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

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
            <>
            <button onClick={openMenu} className="profile-button-icon">
                <div>
                    <div className="three-lines"></div>
                    <div className="three-lines"></div>
                    <div className="three-lines"></div>
                </div>
                <i className="fas fa-user-circle" />
            </button>
            <ul className={ulClassName} ref={ulRef}>
                <div id="login-Signup-button-container">
                    <OpenModalButton
                        buttonText="Log In"
                        modalComponent={<LoginFormModal />}
                    />
                    <OpenModalButton
                        buttonText="Sign Up"
                        modalComponent={<SignupFormModal />}
                    />
                </div>
            </ul>
            </>
        );
    }

    return (
    <div id="navigation-container">
        <div>
            <NavLink exact to="/" className="remove-underline">
                <span className="main-logo-text">A</span>
                <FontAwesomeIcon icon={faCloud} className="cloud-icon" />
                <span className="rest-of-logo-text">ir Stay</span>
            </NavLink>
        </div>
        <ul>
        {isLoaded && sessionLinks}
        </ul>
    </div>
    );
}

export default Navigation;
