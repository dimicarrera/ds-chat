import { useEffect } from "react";
import { Switch, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import { PrivateRoute } from "./routes/PrivateRoute";
import { PublicRoute } from "./routes/PublicRoute";

import { Login } from "./pages/Login";
import { Chat } from "./pages/Chat";

import { login } from "./store/slices/auth.slice";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
      dispatch(login(JSON.parse(loggedInUser)));
    }
  }, [dispatch]);

  return (
    <Switch>
      <PublicRoute component={Login} exact path="/" />
      <PrivateRoute component={Chat} exact path="/chat" />
      <Redirect to="/" />
    </Switch>
  );
};
