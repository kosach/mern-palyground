import axios from 'axios';
import { setAlert} from './alert';
import { GET_TASKS, TASK_ERROR, ADD_TASK, DELETE_TASK, UPDATE_TASK_STATUS } from './types';


export const getTasks = () => async dispatch => {
    try {
        const res = await axios.get('/api/tasks');
        dispatch({
            type: GET_TASKS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: TASK_ERROR,
            payload: { msg: error.response.status.text, status: error.response.status}
        })
    }
}
export const deleteTasks = (taskId) => async dispatch => {
    try {
        await axios.delete(`/api/tasks/${taskId}`);
        dispatch({
            type: DELETE_TASK,
            payload: taskId
        })
    } catch (error) {
        dispatch({
            type: TASK_ERROR,
            payload: { msg: error.response.status.text, status: error.response.status }
        })
    }
}

export const addTasks = ({ text }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ text });
    try {
        const res = await axios.post('/api/tasks', body, config);
        dispatch({
            type: ADD_TASK,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: TASK_ERROR,
        })
    }
}
export const updateTaskStatus = (taskId, completed) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ completed });
    try {
        const res = await axios.patch(`/api/tasks/${taskId}/completed`, body, config);
        dispatch({
            type: UPDATE_TASK_STATUS,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: TASK_ERROR,
        })
    }
}