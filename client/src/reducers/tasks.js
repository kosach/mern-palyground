import { GET_TASKS, TASK_ERROR, ADD_TASK, DELETE_TASK, UPDATE_TASK_STATUS } from '../actions/types';
const initialState = {
    tasks: [],
    task: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action){
    const {type, payload} = action;
    switch (type) {
        case GET_TASKS:
            return {
                ...state,
                tasks: payload,
                loading: false
            }
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, ...[payload]],
                loading: false
            }
        case UPDATE_TASK_STATUS:
            return {
                ...state,
                tasks: state.tasks,
                loading: false
            }
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(el => el['_id'] !== payload),
                loading: false
            }
        case TASK_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
}