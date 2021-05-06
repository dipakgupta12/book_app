import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Errors, getUserDetails, login } from "../redux/action/actions";

const SignIn = ({ history }) => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;

    const dispatch = useDispatch();
    const messageAlert = useAlert()
    const { isAuthenticated, error, user } = useSelector(state => state.users)
    const token = user?.access

    useEffect(() => {

        if (isAuthenticated) {
            messageAlert.success('Login Successfully')
            history.push('/user/dashboard')
        }

        if (error) {
            messageAlert.error(error)
            dispatch(Errors())
        }
        if (token) {
            dispatch(getUserDetails(token))
        }
    }, [dispatch, isAuthenticated, messageAlert, error, history])

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    }
    const credentials = { username, password }
    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (username && password) {
            dispatch(login(credentials));
        }
    }

    return (
        <Fragment>
            <div class="row wrapper">
                <div class="col-10 col-lg-5">
                    <form class="shadow-lg" onSubmit={handleSubmit}>
                        <h1 class="mb-3">Sign In</h1>

                        <div class="form-group">
                            <label for="username">username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={handleChange}
                                className={
                                    "form-control" + (submitted && !username ? " is-invalid" : "")
                                }
                            />
                            {submitted && !username && (
                                <div className="invalid-feedback">username is required</div>
                            )}
                        </div>

                        <div class="form-group">
                            <label for="password_field">password</label>
                            <input
                                type="password"
                                id="password_field"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                className={
                                    "form-control" + (submitted && !password ? " is-invalid" : "")
                                }
                            />
                            {submitted && !password && (
                                <div className="invalid-feedback">password is required</div>
                            )}
                        </div>

                        <button id="login_button" type="submit" class="btn btn-block py-3">
                            LOGIN
                        </button>

                        <Link to="/singup" class="float-right mt-3">
                            New User?
            </Link>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default SignIn;
