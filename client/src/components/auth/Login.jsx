import React, {  useState } from 'react'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {logIn} from '../../actions/auth'

const Login = ({logIn, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = (e) => {
        e.preventDefault();
        logIn({email, password})
        console.log('TCL: onSubmit -> {email, password}', {email, password})
    }


    if(isAuthenticated) {
        return <Redirect to="/" />
    }
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="8">
                    <Form onSubmit={e => onSubmit(e)}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control size="lg" type="email" placeholder="Enter email"
                                name="email"
                                value={email}
                                onChange={e => onChange(e)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control size="lg" type="password" placeholder="Password"
                                name="password"
                                value={password}
                                onChange={e => onChange(e)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
                <Col md="8">
                    <p>
                        Don't have an account?
                        <Link to="/signup">Sign up</Link>
                    </p>
                </Col>
            </Row>
        </Container>
    )
}

Login.prpTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})
export default connect(mapStateToProps, {logIn})(Login)
