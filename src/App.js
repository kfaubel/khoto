import { useState } from "react";
  
import LoginScreen from "./components/LoginScreen"
import ViewerScreen from "./components/ViewerScreen"
import config from "./config.json";

const App = () => {
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ credentials, setCredentials ] = useState({ site: config.defaultSite, name: config.defaultName, password: config.defaultPassword });
    const [ loginMessage, setLoginMessage ] = useState("Please login");

    console.log(`App: ${loggedIn} ${credentials.site} ${credentials.name} ${credentials.password}`);

    /**
     * Logout the user\
     * @param {*} message - The message to display
     * @returns - Nothing
     * @sideeffects - Sets loggedIn to false and clears credentials
     */
    const logout = (message) => {
        //setCredentials({ site: "", name: "", password: "" });
        setLoginMessage(message);
        setLoggedIn(false);
    }   

    /**
     * Login the user
     * @param {*} credentials - The site, name & password to use
     * @returns - Nothing
     * @sideeffects - Sets loggedIn to true and sets credentials
     */
    const login = (credentials) => {
        setCredentials(credentials);
        setLoggedIn(true);
    }

    console.log(`App: ${loggedIn} ${credentials.site} ${credentials.name} ${credentials.password}`);

    if (loggedIn) {
        return (
            <ViewerScreen 
                credentials={credentials}
                logout={logout} />
        )
    } else {
        return (
            <LoginScreen 
                loginMessage={loginMessage}
                credentials={credentials}
                login={login} />
        )
    }
}

export default App;