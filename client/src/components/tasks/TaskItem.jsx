import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col, Row } from 'react-bootstrap';
import { updateTaskStatus } from '../../actions/tasks'
import DeleteTaskBtn from './DeleteTaskBtn'
import { connect } from 'react-redux';

const TaskItem = ({ taskId, text, status, updateTaskStatus}) => {
    return (
        <Row>
            <Col md="6">
                <Form.Group controlId={taskId}>
                <Form.Check key={taskId}
                        defaultChecked={status}
                    onChange={(e) => 
                        updateTaskStatus(taskId, e.target.checked)
                    } 
                    type="checkbox" label={text}
                />
            </Form.Group>
            </Col>
            <Col md="6">
                <DeleteTaskBtn taskId={taskId} />
            </Col>
        </Row>
    )
}

TaskItem.propTypes = {
    text: PropTypes.string.isRequired,
}

export default connect(null, { updateTaskStatus })(TaskItem)
