// Essential imports
import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

//Imports actions 
import { addBook, Errors } from "../redux/action/bookAction";
import { ADDBOOK_RESET } from "../redux/constants/bookConstants";

const AddBook = ({ history }) => {

    const { userDetails, error } = useSelector((state) => state.getLoginUser);
    const { user } = useSelector((state) => state.users);
    const { isSuccess, loading } = useSelector((state) => state.addedBook)

    const token = user?.access;

    const [book, setBook] = useState({
        book_title: "",
        content: "",
        book_author: userDetails.id,
    });

    const [poster_image, setposter_image] = useState("");
    const { book_title, content, book_author } = book;

    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {

            alert.error(error);
            dispatch(Errors());
        }

        if (isSuccess) {
            history.push('/user/dashboard')
            dispatch({ type: ADDBOOK_RESET })
        }

    }, [dispatch, alert, isSuccess, error, history]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        formData.append("book_title", book_title);
        formData.append("content", content);
        formData.append("book_author", book_author);
        formData.append("poster_image", poster_image);

        dispatch(addBook(formData, token));
    };

    const onChange = (e) => {
        if (e.target.name === "poster_image") {
            setposter_image(e.target.files[0]);
        } else {
            setBook({ ...book, [e.target.name]: e.target.value });
        }
    };

    return (
        <Fragment>
            <div class="row wrapper">
                <div class="col-10 col-lg-5">
                    <form
                        class="shadow-lg"
                        encType="multipart/form-data"
                        onSubmit={submitHandler}
                    >
                        <h1 class="mb-3">Add Book</h1>

                        <div class="form-group">
                            <label for="title_field">Title</label>
                            <input
                                type="text"
                                id="title_field"
                                class="form-control"
                                name='book_title'
                                value={book_title}
                                onChange={onChange}
                                placeholder="Book title"
                            />
                        </div>

                        <div class="form-group">
                            <label for="content">Content</label>
                            <input type="text"
                                id="content"
                                class="form-control"
                                name='content'
                                value={content}
                                onChange={onChange}
                                placeholder="Book title" />
                        </div>

                        <div class="form-group">
                            <label for="avatar_upload">Book Image</label>
                            <div class="d-flex align-items-center">
                                <div class="custom-file">
                                    <input
                                        type="file"
                                        name="poster_image"
                                        class="custom-file-input"
                                        id="customFile"
                                        onChange={onChange}
                                    />
                                    <label class="custom-file-label" for="customFile">
                                        Choose Book Image
                                     </label>
                                </div>
                            </div>
                        </div>

                        <button
                            id="register_button"
                            type="submit"
                            class="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            Add Book
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default AddBook;
