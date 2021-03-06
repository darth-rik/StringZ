import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import {
	BrowserRouter as Router,
	Route,
	Switch,
	useLocation,
	withRouter,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Info from "./pages/Info";
import Alerts from "./components/layouts/Alerts";
import React, { Fragment, useEffect } from "react";

import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import { getCurrentProfile } from "./actions/profile";
import { LOGOUT } from "./actions/types";

import PrivateRoute from "./components/routing/PrivateRoute";
import Navbar from "./components/Navbar";

const theme = createMuiTheme({
	typography: {
		fontFamily: ["Montserrat", "sans serif"].join(","),
	},
});

const App = () => {
	useEffect(() => {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}
		store.dispatch(loadUser());
		console.log("OK");
		// log user out from all tabs if they log out in one tab
		window.addEventListener("storage", () => {
			if (!localStorage.token) store.dispatch({ type: LOGOUT });
		});
	}, []);
	return (
		<Provider store={store}>
			<Router>
				<ThemeProvider theme={theme}>
					<Alerts />

					<Route exact path='/register' component={Register} />
					<Route exact path='/login' component={SignIn} />
					<Route exact path='/' component={Home} />
					<Switch>
						<PrivateRoute exact path='/profile' component={Profile} />
						<PrivateRoute exact path='/dashboard' component={Dashboard} />

						<PrivateRoute exact path='/profile/:id' component={UserProfile} />
					</Switch>
				</ThemeProvider>
			</Router>
		</Provider>
	);
};

export default App;
