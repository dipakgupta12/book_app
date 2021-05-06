// Essential imports
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

import { deleteBook, loadAllBooks } from "../redux/action/bookAction";

const Dashboard = ({ history }) => {
    const { user } = useSelector((state) => state.users);
    const { loadAllBook } = useSelector((state) => state.loadBooks);
    const { isDeleted, error } = useSelector((state) => state.updateBook);

    const dispatch = useDispatch();
    const messageAlert = useAlert();
    const token = user?.access;

    useEffect(() => {

        if (isDeleted) { history.push("/user/dashboard"); }

        if (error) { return messageAlert.error(error); }

        dispatch(loadAllBooks(token));

    }, [dispatch, isDeleted, error, messageAlert]);

    const deletebook = (id) => { dispatch(deleteBook(token, id)); };

    return (
        <div>
            <section id="products" class="container mt-5">
                <div class="row">
                    {loadAllBook?.map((item, index) => {
                        return (
                            <div class="col-sm-12 col-md-6 col-lg-3">
                                <div className="row">
                                    <div key={index} class="card p-3 rounded">
                                        <img class="card-img-top mx-auto" src={item.poster_image} />
                                        <div class="card-body d-flex flex-column">
                                            <h5 class="card-title">{item.book_title}</h5>
                                            <div class="ratings mt-auto">
                                                <p className="content ">{item.content}</p>
                                            </div>
                                            <div>
                                                <div>
                                                    <i
                                                        class="fas fa-trash button-icon-delete"
                                                        onClick={() => deletebook(item.id)}
                                                    ></i>
                                                    <Link to={`/user/edit/${item.id}`}>
                                                        <i class="far fa-edit button-icon-edit"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
