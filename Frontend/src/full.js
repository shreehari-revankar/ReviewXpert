import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Dropdown from "./sendreq";
import Home from "./Home";
import Workspace from "./workspace.js";
import Analysis from "./analysis";
import User from "./Au/User.js"

import {isLoggedIn} from './Au/auth.js';
 
function Full() {


      
    const PrivateRoute = ({ children, isloggedin }) => {
        return isloggedin ? children : <Navigate to="/login" replace />;
      };
    return (
        <div>

            {/* This is the alias of BrowserRouter i.e. Router */}
            <Router>
                <Routes>
                    {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
                    <Route
                        exact
                        path="/"
                        element={<Home />}
                    />
 
                    {/* This route is for about component 
          with exact path "/about", in component 
          props we passes the imported component*/}
                    <Route
            path="/Workspace"
            element={
                <PrivateRoute isloggedin={isLoggedIn()}>
                <Workspace />
                </PrivateRoute>
            }
            />
            <Route
            path="/AddWorkspace"
            element={
                <PrivateRoute isloggedin={isLoggedIn()}>
                <Dropdown />
                </PrivateRoute>
            }
            />
          <Route exact path="/login" element={<User/>} />
                    <Route
                        path="/Analysis"
                        element={<Analysis />}
                    />
                </Routes>
            </Router>

        </div>
    );
}
 
export default Full;