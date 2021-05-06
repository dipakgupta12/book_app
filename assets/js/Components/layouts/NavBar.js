// Essential imports
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logout } from '../../redux/action/actions'

const NavBar = () => {
    const { user } = useSelector(state => state.users)
    const { userDetails, loading } = useSelector(state => state.getLoginUser)

    const dispatch = useDispatch();

    const token = user?.access
    const refresh_token = user?.refresh

    const logoutHandler = () => {
        dispatch(logout(refresh_token, token));

    }

    return (
        <div>
            <nav class="navbar row">
                <div class="col-12 col-md-3">
                    <div class="ml-3 navbar-brand-text navbar-brand ">
                        Book Library
                    </div>
                </div>

                <div class="col-12 col-md-5 mt-2 mt-md-0">
                    <div class="input-group ml-5">
                        <input
                            type="text"
                            id="search_field"
                            class="form-control"
                            placeholder="Enter Book Name ..."
                        />
                        <div class="input-group-append">
                            <button id="search_btn" class="btn">
                                <i class="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-4 mt-4 mt-md-0 text-center">

                    {user?.access && userDetails ? (
                        <Fragment>
                            <Link className="text-white mr-3 letter" to="/user/dashboard">Dashboard</Link>
                            <Link className="text-white mr-3 letter" to="/user/add-book">Add Books</Link>
                            <Link className="text-white mr-3 letter" to="/" onClick={logoutHandler}>
                                Logout
                                </Link>
                            <Link to="#!"><span className="text-white letter mr-3">{userDetails && userDetails.username}</span></Link>
                        </Fragment>


                    ) : !loading && <Link class="btn" to="/signin" id="login_btn">Login</Link>}


                </div>
            </nav>
        </div>
    )
}

export default NavBar
