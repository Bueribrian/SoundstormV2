import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const Auth = useContext(AuthContext).user
  console.log(Auth)
  return (
    <Route
      {...rest}
      render={(props) =>
        Boolean(Auth) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
export default ProtectedRoute;
