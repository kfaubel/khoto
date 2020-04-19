import React from 'react';
import { Container, Form, Row, Col, Button } from "react-bootstrap";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            site: "localhost:7004",
            name: "ken",
            password: "8888"
        };
        //console.log(`Login: message=${this.props.loginMessage}`)
    }

    setValue = (event) => {
        switch (event.target.id) {
            case "siteForm":
                this.setState({ site: event.target.value });
                break;
            case "nameForm":
                this.setState({ name: event.target.value });
                break;
            case "passwordForm":
                this.setState({ password: event.target.value });
                break;
            default:
                console.warn(`Login::setValue unexpected id: ${event.target.id}`);
                break;
        }
    }

    validateForm = () => {
        return this.state.name.length > 0 && this.state.password.length > 0;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.updateCredentials(this.state.site, this.state.name, this.state.password);
    }

    render() {
        return (
            <div className="Login">
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
                            <Form.Control type="text" placeholder="host.com:12345" value={this.state.site} onChange={this.setValue} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="nameForm">
                        <Form.Label column sm={{ span: 2, offset: 1 }}>
                            Name:
                        </Form.Label>
                        <Col sm={5}>
                            <Form.Control type="text" value={this.state.name} onChange={this.setValue} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="passwordForm">
                        <Form.Label column sm={{ span: 2, offset: 1 }}>
                            Password:
                        </Form.Label>
                        <Col sm={5}>
                            <Form.Control type="password" value={this.state.password} onChange={this.setValue} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="MessageFormLabel">
                        <Form.Label column sm={{ span: 5, offset: 3 }}>
                            {this.props.loginMessage}
                        </Form.Label>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Col sm={{ span: 3, offset: 3 }}>
                            <Button type="submit" disabled={!this.validateForm()} >Submit</Button>
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