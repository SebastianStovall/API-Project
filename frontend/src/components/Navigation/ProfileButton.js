// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './ProfileButton.css'

function ProfileButton({ user }) {
    const history = useHistory()
    const dispatch = useDispatch();
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


    const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    return history.push("/") // force user to home page on logout
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
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
                <div className="center-dropdown">
                    <li className="dropdown-menu-li-component">Hello, {user.username}</li>
                </div>
                {/* <li className="dropdown-menu-li-component">{user.firstName} {user.lastName}</li> */}
                <div className="center-dropdown">
                    <li className="dropdown-menu-li-component">{user.email}</li>
                </div>
                <div className="center-dropdown manage">
                    <li className="dropdown-menu-li-component"> <NavLink exact to="/spots/current" className="manage-spot-navLink">Manage Spots</NavLink> </li>
                    <li className="dropdown-menu-li-component"> <NavLink exact to="/reviews/current" className="manage-spot-navLink">Manage Reviews</NavLink> </li>
                    <li className="dropdown-menu-li-component"> <NavLink exact to="/bookings/current" className="manage-spot-navLink">My Trips</NavLink> </li>
                </div>
                <div className="center-dropdown">
                    <li className="dropdown-menu-li-component"> <button onClick={logout} className="logout-button-dropdown">Log Out</button> </li>
                </div>
            </ul>
        </>
    );
}

export default ProfileButton;
