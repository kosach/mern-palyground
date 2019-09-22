import React, { useState } from 'react'
import { Row, Form, ButtonToolbar, Button, Col} from 'react-bootstrap';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';

import { addTasks } from '../../actions/tasks'

const TasksHeader = ({ addTasks }) => {
    const [formData, setFormData] = useState({
        text: '',
    });

    const { text } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onClick = (e) => {
        e.preventDefault();
        addTasks(formData)
        setFormData({text: ''})
    }

    return (
        <div className="container-fluid">
            <Row>
                <Col className="text-left">
                ToDo list: 
                </Col>
                <Col>
                    <Form.Control type="text" placeholder="Task text"
                        name="text"
                        value={text}
                        onChange={e => onChange(e)}
                    />
                </Col>
                <Col>
                    <ButtonToolbar>
                    <Button onClick={onClick}>
                            +
                    </Button>
                    </ButtonToolbar>
                </Col>

            </Row>
        </div>
    )
}

TasksHeader.propTypes = {
    addTasks: PropTypes.func.isRequired,
}

export default connect(null, { addTasks })(TasksHeader)
