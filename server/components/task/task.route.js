const express = require('express');
const { check, validationResult } = require('express-validator');
const { auth } = require('../../middleware');
const { saveTask, getAllTasks, updateTaskStatus, deleteTask, updateTask} = require('./task.service')

const router = express.Router();

// @route PATCH api/tasks/;taskId/completed
// @desc Update task status
// @access Private

router.patch('/:taskId/completed',
    check('completed', 'Completed is required').not().isEmpty().isBoolean(),
    auth,
    async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try{
        await updateTaskStatus(req.user.id, req.params.taskId, req.body.completed);
        res.status(201).send();
    }catch(err){
        res.status(500).send('Server Error!')
    }
})

// @route PUT api/tasks/:taskId
// @desc Update task
// @access Private

router.put('/:taskId',
    check('text', 'Completed is required').isString(),
    auth, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
        await updateTask(req.user.id, req.params.taskId, req.body);
        res.status(201).send();
    } catch (err) {
        console.log('TCL: err', err)
        res.status(500).send('Server Error!')
    }
})

// @route PUT api/tasks/:taskId
// @desc Delete task
// @access Private

router.delete('/:taskId', auth, async (req, res) => {
    try {
        await deleteTask(req.user.id, req.params.taskId);
        res.status(201).send();
    } catch (err) {
        res.status(500).send('Server Error!')
    }
})

// @route GET api/tasks
// @desc Get all tasks by user
// @access Private

router.get('/', auth, async (req, res) => {
    const tasks = await getAllTasks(req.user.id);
    res.json(tasks);
})

// @route POST api/tasks
// @desc Create a task
// @access Private

router.post('/',
    check('text', 'Text is required').not().isEmpty(),
    auth,
 async (req, res)=> {
     const errors = validationResult(req)
     if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
     try{
         const task = await saveTask(req.user.id, req.body.text);
         res.json(task);
     }catch(err){
        console.log('TCL: err', err)
        res.status(500).send('Server Error!')
     }
    });

module.exports = router;