import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";

const theme = createMuiTheme({
	typography: {
		fontFamily: ["Montserrat", "sans serif"].join(","),
	},
});
function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className=''>
				{/* <Dashboard /> */}
				{/* <Profile /> */}
				{/* <SignIn /> */}
				{/* <Register /> */}
				{/* <Home /> */}
			</div>
		</ThemeProvider>
	);
}

export default App;
