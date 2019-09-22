import React from 'react';
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

import { deleteTasks } from '../../actions/tasks'
const DeleteTaskBtn = ({ taskId, deleteTasks }) => {
    return (
        <div>
            <Button onClick={() => deleteTasks(taskId)} variant="light"><FontAwesomeIcon icon={faTrash} /></Button>
        </div>
    )
}

DeleteTaskBtn.propTypes = {

}

export default connect(null, {deleteTasks})(DeleteTaskBtn)
