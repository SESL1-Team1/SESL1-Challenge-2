const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const getAllTasks = asyncHandler(async (req, res) => {
    const tasks = await User.findOne({ _id: req.user._id }, { tasks: 1, _id: 0 })
    res.status(200).json(tasks);
})

const createTask = asyncHandler(async (req, res) => {
    if (!req.body.title) {
        res.status(400);
        throw new Error('Please add a title');
    }
    const task = await User.findByIdAndUpdate(
        { _id: req.user._id }, 
        { $push: { tasks: req.body }},
        { new: true })
        
    res.status(200).json(task.tasks);
})

const updateTask = asyncHandler(async (req, res) => {
    const task = await User.findOne(
        { _id: req.user._id, 'tasks._id': req.params.id }, 
        { tasks: { $elemMatch: { _id: req.params.id } }, _id: 0 })

    if (!task) {
        res.status(400);
        throw new Error('Task not found');
    }

    const updatedTask = await User.findOneAndUpdate(
        { _id: req.user._id, 'tasks._id': req.params.id },
        { $set: { 'tasks.$.status': req.body.status } },
        { new: true }
    )

    res.status(200).json(updatedTask);
})

const deleteTask = asyncHandler(async (req, res) => {
    const task = await User.findOne(
        { _id: req.user._id, 'tasks._id': req.params.id }, 
        { tasks: { $elemMatch: { _id: req.params.id } }, _id: 0 })
    
    if (!task) {
        res.status(400);
        throw new Error('Task not found');
    }

    const deletedTask = await User.findOneAndUpdate(
        { _id: req.user._id, 'tasks._id': req.params.id },
        { $pull: { tasks: { _id: req.params.id } } },
        { new: true })
    
    res.status(200).json(deletedTask);
})

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
}
