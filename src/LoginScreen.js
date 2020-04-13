import React from 'react';
import { Container, Form, Row, Col, Button } from "react-bootstrap";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            site: "localhost:7777",
            name: "ken",
            password: "8888"
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
        console.log("Login handleSubmit");
        event.preventDefault();
        this.props.updateCredentials(this.state.site, this.state.name, this.state.password);
        this.props.history.push(this.props.publicUrlPrefix + '/viewer'); // <Route path={process.env.PUBLIC_URL + "/viewer"} 
    }

    render() {
        return (
            <div>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col xs lg="4" />
                        <Col md="auto"><h1>Khoto</h1></Col>
                        <Col xs lg="4" />
                    </Row>
                </Container>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group as={Row} controlId="siteForm" >
                        <Form.Label column sm={{ span: 2, offset: 1 }}>
                            Site:
                        </Form.Label>
                        <Col sm={5}>
                            <Form.Control type="text" placeholder="host.com:12345" value={this.state.site} onChange={this.setSite} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="nameForm">
                        <Form.Label column sm={{ span: 2, offset: 1 }}>
                            Name:
                        </Form.Label>
                        <Col sm={5}>
                            <Form.Control type="text" value={this.state.name} onChange={this.setName} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="passwordForm">
                        <Form.Label column sm={{ span: 2, offset: 1 }}>
                            Password:
                        </Form.Label>
                        <Col sm={5}>
                            <Form.Control type="password" value={this.state.password} onChange={this.setPassword} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Col sm={{ span: 3, offset: 3 }}>
                            <Button type="submit">Submit</Button>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={{ span: 2, offset: 1 }}>
                            {this.props.message}
                        </Form.Label>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default Login;