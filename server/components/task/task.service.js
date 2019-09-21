const Task = require('./Task.model');
const { getUserById } = require('../user/user.service');

const saveTask = async (userId, text) => {
    const user = await getUserById(userId)
    const task = new Task({
        user: userId,
        text
    })
    task.save()
    return task;
}
const getAllTasks = async (userId) => {
    const tasks = Task.find({user: userId})
    return tasks;
}
const updateTaskStatus = async (userId, taskId, completed) => {
    await Task.updateOne({ user: userId, "_id": taskId }, { completed});
};
const updateTask = async (userId, taskId, taskData) => {
    await Task.updateOne({ user: userId, "_id": taskId }, taskData);
};
const deleteTask = async (userId, taskId) => {
    await Task.deleteOne({ user: userId, "_id": taskId });
}

module.exports = {
    saveTask,
    getAllTasks,
    updateTaskStatus,
    deleteTask,
    updateTask
};