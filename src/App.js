import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import LoginScreen from "./LoginScreen"
import ViewerScreen from "./ViewerScreen"

import config from "./config.json";

// class Viewer extends React.Component {
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            site: "",
            username: "",
            password: "",
            publicUrlPrefix: config.publicUrlPrefix
        };
    }

    updateCredentials = (site, username, password) => {
        console.log(`App::updateCredentials: site = ${site}, username = ${username}, password = ${password}`);
        this.setState({site: site, username: username, password: password});
    }

    // The real workhorse of React Router is the History library. Under the hood, it’s what’s keeping track 
    // of session history for React Router. When a component is rendered by React Router, 
    // that component is passed three different props: location, match, and history. This history prop comes 
    // from the History library and has a ton of fancy properties on it related to routing. In this case, 
    // the one we’re interested in is history.push. What it does is it pushes a new entry into the history stack 
    // - aka redirecting the user to another route.
    // The {...props} below pushs all the props down to the subordinate screens including 'history' OR NOT
    render() {
        console.log(`App::render - PUBLIC_URL=${this.state.publicUrlPrefix}`)
        return(
            <Router>
                <div>
                    {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path={this.state.publicUrlPrefix + "/viewer"} 
                            render={(props) =>
                                <ViewerScreen {...props}
                                site={this.state.site}
                                username={this.state.username} 
                                password={this.state.password} 
                                component={ViewerScreen} />
                            }
                        />
                        <Route path={this.state.publicUrlPrefix + "/"}
                        
                            render={(props) => 
                                <LoginScreen {...props} 
                                publicUrlPrefix={this.state.publicUrlPrefix}
                                updateCredentials={this.updateCredentials} />
                            }                         
                        />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;
