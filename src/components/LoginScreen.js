import { useState } from 'react';
import { Container, Form, Row, Col, Button } from "react-bootstrap";

const LoginScreen = ({credentials, loginMessage, login}) => {
    console.log(`LoginScreen: ${credentials.site} ${credentials.name} ${credentials.password}`);
    const [site, setSite] = useState(credentials.site);
    const [name, setName] = useState(credentials.name);
    const [password, setPassword] = useState(credentials.password);

    const setValue = (event) => {
        switch (event.target.id) {
            case "siteForm":
                setSite(event.target.value );
                break;
            case "nameForm":
                setName(event.target.value );
                break;
            case "passwordForm":
                setPassword(event.target.value );
                break;
            default:
                console.warn(`Login::setValue unexpected id: ${event.target.id}`);
                break;
        }
    }

    const validateForm = () => {
        return name.length > 0 && password.length > 0;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        login({site: site, name: name, password: password});
    }

    return (
        <div className="Login">
            <Container>
                <Row>
                    <Col sm="4" />
                    <Col sm="auto"><h1>Khoto</h1></Col>
                    <Col xs lg="4" />
                </Row>
            </Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} controlId="siteForm" >
                    <Form.Label column sm={{ span: 2, offset: 1 }}>
                        Site:
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Control type="text" value={site} onChange={setValue} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="nameForm">
                    <Form.Label column sm={{ span: 2, offset: 1 }}>
                        Name:
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Control type="text" value={name} onChange={setValue} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="passwordForm">
                    <Form.Label column sm={{ span: 2, offset: 1 }}>
                        Password:
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Control type="password" value={password} onChange={setValue} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="MessageFormLabel">
                    <Form.Label column sm={{ span: 5, offset: 3 }}>
                        {loginMessage}
                    </Form.Label>
                </Form.Group>

                <Form.Group as={Row}>
                    <Col sm={{ span: 3, offset: 3 }}>
                        <Button type="submit" disabled={!validateForm()} >Submit</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    );
}

export default LoginScreen;