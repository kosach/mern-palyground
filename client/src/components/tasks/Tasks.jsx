import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { getTasks } from '../../actions/tasks';
import TaskItem from './TaskItem'
import TasksHeader from './TasksHeader'

const Tasks = ({getTasks, task: {tasks, loading}}) => {
    useEffect(() => {
        getTasks();
    }, [getTasks])
    return (
        <Fragment>
            <Row>
                <TasksHeader />
            </Row>
            <Row>
                <Col md="6">
                    <ul className="text-left">
                        {tasks.map(el => (
                            <TaskItem key={el['_id']} taskId={el['_id']} status={el.completed} text={el.text}/>
                        ))}
                    </ul>
                </Col>
            </Row>
        </Fragment>
    )
}

Tasks.propTypes = {
    getTasks: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired,
}

const mapStateProps = state => ({
    task: state.tasks
})
export default connect(mapStateProps, { getTasks })(Tasks)

