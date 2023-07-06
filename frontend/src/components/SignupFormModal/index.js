// frontend/src/components/SignupFormModal/index.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors({});
            return dispatch(
            sessionActions.signup({
                email,
                username,
                firstName,
                lastName,
                password,
            })
        )
        .then(closeModal)
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        });
    }
    return setErrors({
        confirmPassword: "Confirm Password field must be the same as the Password field"
    });
};

return (
    <div id="signup-modal-main-container">
            <form onSubmit={handleSubmit}>
                <h1 className="sign-up-header-text">Sign Up</h1>
                {errors.email && <p className="errors">{errors.email}</p>}
                {errors.username && <p className="errors">{errors.username}</p>}
                {errors.firstName && <p className="errors">{errors.firstName}</p>}
                {errors.lastName && <p className="errors">{errors.lastName}</p>}
                {errors.password && <p className="errors">{errors.password}</p>}
                {errors.confirmPassword && <p className="errors">{errors.confirmPassword}</p>}
                <div className="signup-form-element-container">
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email"
                        className="signup-form-input"
                        />
                </div>
                <div className="signup-form-element-container">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Username"
                        className="signup-form-input"
                    />
                </div>
                <div className="signup-form-element-container">
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        placeholder="First Name"
                        className="signup-form-input"
                    />
                </div>
                <div className="signup-form-element-container">
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        placeholder="Last Name"
                        className="signup-form-input"
                    />
                </div>
                <div className="signup-form-element-container">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Password"
                        className="signup-form-input"
                    />
                </div>
                <div className="signup-form-element-container">
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Confirm Password"
                        className="signup-form-input"
                    />
                </div>
            <div className="signup-form-element-container-button">
                <button type="submit" className="signup-modal-button" disabled={email.length === 0 || username.length < 4 || firstName.length === 0 || lastName.length === 0
                || password.length < 6 || confirmPassword.length < 6}>Sign Up</button>
            </div>
            </form>
        </div>
    );
}

export default SignupFormModal;
