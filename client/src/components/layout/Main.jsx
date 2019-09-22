import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col} from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

import Tasks from '../tasks/Tasks'
const Main = ({ isAuthenticated, user }) => {
    if (!isAuthenticated) {
        return <Redirect to="/login" />
    }
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col><Tasks /></Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
})
export default connect(mapStateToProps, {})(Main);

