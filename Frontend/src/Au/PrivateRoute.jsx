import React from 'react';
import {Route,Navigate } from "react-router-dom";
import {isLoggedIn} from './auth.js';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
          isLoggedIn() ? (
          <Component {...props} />
        ) : (
          <Navigate
            to="/login" replace = {true}
          />
        )
      }
    />
  );
