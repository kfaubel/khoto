import React from 'react';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            site: "",
            name: "",
            password: ""
        };
    }

    setSite = (event) => {
        this.setState({ site: event.target.value });
    }

    setName = (event) => {
        this.setState({ name: event.target.value });
    }

    setPassword = (event) => {
        this.setState({ password: event.target.value });
    }

    validateForm = () => {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleSubmit = (event) => {
        //console.log("Login handleSubmit");
        event.preventDefault();
        this.props.updateCredentials(this.state.site, this.state.name, this.state.password);
        this.props.history.push('/viewer');
    }

    render() {
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label className="control-label col-sm-2" >Site:</label>
                    <div className="col-sm-10">
                        <input className="form-control" id="site"
                            value={this.state.site} onChange={this.setSite} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" >Name:</label>
                    <div className="col-sm-10">
                        <input className="form-control" id="name"
                            value={this.state.name} onChange={this.setName} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2">Password:</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="pwd"
                            value={this.state.password} onChange={this.setPassword} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>


        );
    }
}

export default Login;