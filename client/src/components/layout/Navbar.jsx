import React, {Fragment} from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { logOut } from '../../actions/auth'
const MainNavBar = ({ auth: {isAuthenticated, loading, user}, logOut}) => {

    const authLinks = (
        <Nav.Link onClick={logOut}><FontAwesomeIcon icon={faSignOutAlt} /> Log out</Nav.Link>
    )
    const guestLinks =  (
        <Fragment>
            <LinkContainer to="login">
                <Nav.Link>Log in</Nav.Link>
            </LinkContainer>
            <LinkContainer to="signup">
                <Nav.Link>Sign up</Nav.Link>
            </LinkContainer>
        </Fragment>
    )
    return (   
        <Navbar bg="light" expand="lg">
           { user && (<Navbar.Brand>Hello {user.name}!</Navbar.Brand>)}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

MainNavBar.propTypes = {
    logOut: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    user: PropTypes.object,
};

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, 
    { logOut })(MainNavBar)
