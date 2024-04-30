import React,{Component} from 'react';
import { BrowserRouter as Router,Routes, Route,Navigate } from "react-router-dom";
import User from './User.js';
import './App.css';
import {isLoggedIn} from './auth.js';

const Home = () => {
    return <div>hi</div>;
  };


  const PrivateRoute = ({ children, isloggedin }) => {
    return isloggedin ? children : <Navigate to="/login" replace />;
  };
export default class App extends Component{
  render(){
    return(
      <Router>
        <Routes>
        <Route
    path="/"
    element={
      <PrivateRoute isloggedin={isLoggedIn()}>
        <Home />
      </PrivateRoute>
    }
  />
          <Route exact path="/login" element={<User/>} />
        </Routes>
    </Router>
      )
  }
}