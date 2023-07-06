// frontend/src/components/LoginFormPage/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { Link } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    };

    const demoLogin = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    };

    return (
        <div id="login-modal-main-container">
            <form onSubmit={handleSubmit}>
                <h1 className="login-text-header">Log In</h1>
                    {errors.credential && (
                        <span className="errors-login">{errors.credential}</span>
                    )}
                <div className="login-form-element-container">
                    <input
                        className="login-input-fields"
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                        placeholder="Username or Email"
                    />
                </div>
                <div className="login-form-element-container">
                    <input
                        className="login-input-fields"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Password"
                    />
                </div>
                <div className="login-form-element-container">
                    <button type="submit" className="login-button-submit" disabled={credential.length < 4 || password.length < 6}>Log In</button>
                </div>
                <div className="demo-user-fetch-container">
                    <Link to="/" onClick={demoLogin} exact="true" className="demo-user-text" >Demo User</Link>
                </div>
            </form>
        </div>
    );
}

export default LoginFormModal;
