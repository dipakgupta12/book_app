import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Errors, register } from "../redux/action/actions";
import { SIGNUP_RESET } from "../redux/constants/constant";


const SignUp = ({ history }) => {

    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        password2: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();
    const messageAlert = useAlert()
    const { isAuthenticated, loading, error } = useSelector(state => state.users)

    useEffect(() => {

        if (isAuthenticated) {
            messageAlert.success('Registration Successfully Done')
            dispatch({ type: SIGNUP_RESET })
            history.push('/signin')
        }
        if (error) {
            messageAlert.error(error)
            dispatch(Errors())
        }

    }, [dispatch, isAuthenticated, messageAlert, error, history])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((user) => ({ ...user, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setSubmitted(true);
        if (
            user.first_name &&
            user.last_name &&
            user.username &&
            user.email &&
            user.password &&
            user.password2
        ) {
            dispatch(register(user));
        }
    }
    return (
        <Fragment>
            <div class="row wrapper">
                <div class="col-10 col-lg-5">
                    <form class="shadow-lg" onSubmit={handleSubmit}>
                        <h1 class="mb-3">Register</h1>

                        <div class="form-group">
                            <label for="name_field">First Name</label>
                            <input
                                type="name"
                                id="name_field"
                                name="first_name"
                                value={user.first_name}
                                onChange={handleChange}
                                className={'form-control' + (submitted && !user.first_name ? ' is-invalid' : '')}
                            />
                            {submitted && !user.first_name &&
                                <div className="invalid-feedback">First Name is required</div>
                            }
                        </div>
                        <div class="form-group">
                            <label for="last_name">Last Name</label>
                            <input
                                type="name"
                                id="last_name"
                                className={'form-control' + (submitted && !user.last_name ? ' is-invalid' : '')}
                                name="last_name"
                                value={user.last_name}
                                onChange={handleChange}
                            />
                        </div>
                        {submitted && !user.last_name &&
                            <div className="invalid-feedback">Last Name is required</div>
                        }
                        <div class="form-group">
                            <label for="username">User Name</label>
                            <input
                                type="name"
                                id="username"
                                className={'form-control' + (submitted && !user.username ? ' is-invalid' : '')}
                                name="username"
                                value={user.username}
                                onChange={handleChange}
                            />
                            {submitted && !user.username &&
                                <div className="invalid-feedback">Username is required</div>
                            }
                        </div>

                        <div class="form-group">
                            <label for="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className={'form-control' + (submitted && !user.email ? ' is-invalid' : '')}
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                            />
                            {submitted && !user.email &&
                                <div className="invalid-feedback">email is required</div>
                            }
                        </div>

                        <div class="form-group">
                            <label for="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')}
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                            />
                            {submitted && !user.password &&
                                <div className="invalid-feedback">password is required</div>
                            }
                        </div>
                        <div class="form-group">
                            <label for="cnpassword_field">Confirm Password</label>
                            <input
                                type="password"
                                id="cnpassword_field"
                                className={'form-control' + (submitted && !user.password2 ? ' is-invalid' : '')}
                                name="password2"
                                value={user.password2}
                                onChange={handleChange}
                            />
                            {submitted && !user.password2 &&
                                <div className="invalid-feedback">Confirm password is required</div>
                            }
                        </div>

                        <button
                            id="register_button"
                            type="submit"
                            class="btn btn-block py-3"
                        >
                            REGISTER
            </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default SignUp;
