// Essential imports
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Errors, updateBook } from '../redux/action/bookAction';
import { UPDATE_BOOK_RESET } from '../redux/constants/bookConstants';

const EditBook = ({ match, history }) => {

    const [book_title, setBookTitle] = useState('')
    const [content, setContent] = useState('')
    const [poster_image, setposter_image] = useState('')
    const [book_author, setBookAuthor] = useState('')

    const { user } = useSelector((state) => state.users);
    const { loadAllBook } = useSelector((state) => state.loadBooks)

    const token = user?.access
    var id = match.params.id

    const getBookData = () => {
        console.log(id)
        var singleBook = loadAllBook.find(function (item) {
            if (item.id == id)
                return true;
        });

        if (singleBook) {
            setBookTitle(singleBook.book_title)
            setContent(singleBook.content)
            setBookAuthor(singleBook.book_author)
            setposter_image(singleBook.poster_image[0])
        }
    }
    const dispatch = useDispatch();
    const { isUpdated, error, loading } = useSelector(state => state.updateBook)
    useEffect(() => {

        getBookData()

        if (error) {
            alert.error(error);
            dispatch(Errors());
        }

        if (isUpdated) {
            history.push('/user/dashboard')
            dispatch({
                type: UPDATE_BOOK_RESET
            })
        }

    }, [dispatch, alert, error, history, isUpdated])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        formData.append('book_title', book_title);
        formData.append('content', content);
        formData.append('poster_image', poster_image);
        formData.append('book_author', book_author);
        dispatch(updateBook(id, formData, token))
    };

    const onChangeImage = e => {
        if (e.target.name === 'poster_image') {
            setposter_image(e.target.files[0])
        }
    }
    return (
        <Fragment>
            <div class="row wrapper">
                <div class="col-10 col-lg-5">
                    <form
                        class="shadow-lg"
                        encType="multipart/form-data"
                        onSubmit={submitHandler}
                    >
                        <h1 class="mb-3">Update Book</h1>

                        <div class="form-group">
                            <label for="title_field">Title</label>
                            <input
                                type="text"
                                id="title_field"
                                class="form-control"
                                name='book_title'
                                value={book_title}
                                onChange={(e) => setBookTitle(e.target.value)}
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
                                onChange={(e) => setContent(e.target.value)}
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
                                        onChange={onChangeImage}
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
                            Update Book
                         </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default EditBook
