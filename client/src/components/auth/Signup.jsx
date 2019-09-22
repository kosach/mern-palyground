import React, { useState } from 'react';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Signup = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] =  useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const {name, email, password, password2 } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value});
    const onSubmit = (e) => {
        e.preventDefault();
        if(password !== password2){
            setAlert('Passwords do not match', 'danger')
            console.log('Passwords do not match')
        } else {
            register({ name, email, password})
        }
    }
    if (isAuthenticated) {
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
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control size="lg" 
                            value={name}
                            onChange={e => onChange(e)}
                            type="string"
                            name="name"
                            placeholder="Enter your name" 
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
                    <Form.Group controlId="formBasicPassword2">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control size="lg" type="password" placeholder="Password" 
                            name="password2"
                            value={password2}
                            onChange={e => onChange(e)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
        </Button>
                </Form>
            </Col>
        </Row>
    </Container>
    )}

Signup.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})
export default connect(mapStateToProps, {
    setAlert,
    register
})(Signup);
