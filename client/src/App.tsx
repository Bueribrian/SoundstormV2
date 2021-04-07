import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ProtectedRoute from "./guard/ProtectedRoute";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import RoomPage from "./pages/Rooms";
import UnauthorizedPage from "./pages/Unauthorized";
import Auth from "./context/auth";
import Main from "./components/Main";
import Navbar from "./components/Navbar";

/*
TODO
Extraer logica del componente APP y crear rutas
Crear pages: Rooms, Login, Register, Home
*/

function App() {
  return (
    <Auth>
      <Router>
        <Route
          render={({ location }) => (
            <Main>
              <Navbar></Navbar>
              <AnimatePresence exitBeforeEnter initial={false}>
                <Switch location={location} key={location.pathname}>
                  <ProtectedRoute
                    isAuthenticated={false}
                    component={HomePage}
                    path={["/home", "/"]}
                    exact
                  />
                  <ProtectedRoute
                    path="/rooms"
                    component={RoomPage}
                    exact
                    isAuthenticated={false}
                  />
                  <Route path="/login" exact component={LoginPage} />
                  <Route path="/register" exact component={RegisterPage} />
                  <Route
                    path="/unauthorized"
                    exact
                    component={UnauthorizedPage}
                  />
                  {/* <Route path="/unauthorized"  component={UnauthorizedPage} /> */}
                </Switch>
              </AnimatePresence>
            </Main>
          )}
        ></Route>
      </Router>
    </Auth>
  );
}

export default App;
