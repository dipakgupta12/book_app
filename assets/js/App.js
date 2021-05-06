// Import essentials
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/layouts/NavBar'
import './Styles.css'

// Import Components
import Home from './Components/Home';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Dashboard from './Components/Dashboard';
import AddBook from './Components/AddBook';
import EditBook from './Components/EditBook';
import ProtectedRoute from './Components/ProtectedRoute'

const App = () => {
    return (
        <Router>
            <div className="App">
                <NavBar />
                <div className="container container-fluid">
                    <Route path="/" component={Home} exact />
                    <Route path="/signin" component={SignIn} exact />
                    <Route path="/singup" component={SignUp} exact />
                    <ProtectedRoute path="/user/dashboard" component={Dashboard} exact />
                    <ProtectedRoute path="/user/add-book" component={AddBook} exact />
                    <ProtectedRoute path="/user/edit/:id" component={EditBook} exact />
                </div>
            </div>
        </Router>
    )
}

export default App
