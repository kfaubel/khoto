import React from "react";
import {
    Switch,
    withRouter,
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
            site:     config.defaultSite,
            name:     config.defaultName,
            password: config.defaultPassword,
            publicUrlPrefix: config.publicUrlPrefix,
            toViewer: false,
            toLogin: false,
            loginMessage: "Let's get started"
        };
    }

    updateCredentials = (site, name, password) => {
        //console.log(`App::updateCredentials: site = ${site}, name = ${name}, password = ${password}`);
        this.setState({ site: site, name: name, password: password, toViewer: true });
        this.props.history.push(this.state.publicUrlPrefix + '/viewer');
    }

    exitViewer = (message) => {
        console.log(`App::exitViewer: message=${message}`);
        this.setState({ loginMessage: message, toLogin: true });
        this.props.history.push(this.state.publicUrlPrefix + '/');
    }

    // The real workhorse of React Router is the History library. Under the hood, it’s what’s keeping track 
    // of session history for React Router. When a component is rendered by React Router, 
    // that component is passed three different props: location, match, and history. This history prop comes 
    // from the History library and has a ton of fancy properties on it related to routing. In this case, 
    // the one we’re interested in is history.push. What it does is it pushes a new entry into the history stack 
    // - aka redirecting the user to another route.
    // The {...props} below pushs all the props down to the subordinate screens including 'history' OR NOT
    render() {
        // console.log(`App::render - PUBLIC_URL=${this.state.publicUrlPrefix}`)

        // Total fail.  This seems like the most straight forward way to do this
        // if (this.state.toViewer) {
        //     console.log("App:render - Redirect to viewer")
        //     return <Redirect to="/viewer" />
        // }

        return (
            <div>
                {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
                <Switch>
                    <Route path={this.state.publicUrlPrefix + "/viewer"}
                        render={(props) =>
                            <ViewerScreen {...props}
                                site={this.state.site}
                                name={this.state.name}
                                password={this.state.password}
                                exitViewer={this.exitViewer}
                                component={ViewerScreen} />
                        }
                    />
                    <Route path={this.state.publicUrlPrefix + "/"}
                        render={(props) =>
                            <LoginScreen {...props}
                                site={this.state.site}
                                name={this.state.name}
                                password={this.state.password}
                                publicUrlPrefix={this.state.publicUrlPrefix}
                                loginMessage={this.state.loginMessage}
                                updateCredentials={this.updateCredentials} />
                        }
                    />
                </Switch>
            </div>
        )
    }
}

// The "withRouter" here makes it so that history is added to our props for the push redirect call
export default withRouter(App);
