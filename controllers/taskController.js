import Project from '../models/Project.js';
import Task from '../models/Task.js';

const addTask = async (req, res) => {
    const { belongsToProject } = req.body;
    const projectExists = await Project.findById(belongsToProject);

    if(!projectExists) {
        const error = new Error('Project does not exist');
        return res.status(404).json({msg: error.message});
    }

    if(projectExists.projectCreator.toString() !== req.user._id.toString()) {
        const error = new Error('You do not have permisson to add tasks');
        return res.status(403).json({msg: error.message});
    }

    try {
        const savedTask = await Task.create(req.body);
        
        // Save id into the project
        projectExists.projectTasks.push(savedTask._id);
        await projectExists.save();
        res.json(savedTask);
        
    } catch (error) {
        console.log(error);
    }
}

const getTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id).populate('belongsToProject');

    if(!task) {
        const error = new Error('Task does not exist');
        return res.status(404).json({msg: error.message});
    }

    if(task.belongsToProject.projectCreator.toString() !== req.user._id.toString()) {
        const error = new Error('Invalid action');
        return res.status(403).json({msg: error.message});
    }

    res.json(task);
}

const updateTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id).populate('belongsToProject');

    if(!task) {
        const error = new Error('Task does not exist');
        return res.status(404).json({msg: error.message});
    }

    if(task.belongsToProject.projectCreator.toString() !== req.user._id.toString()) {
        const error = new Error('Invalid action');
        return res.status(403).json({msg: error.message});
    }

    task.taskName = req.body.taskName || task.taskName;
    task.taskDescription = req.body.taskDescription || task.taskDescription;
    task.taskPriority = req.body.taskPriority || task.taskPriority;
    task.deliveryDate = req.body.deliveryDate || task.deliveryDate;

    try {
        const savedTask = await task.save();
        res.json(savedTask);
        
    } catch (error) {
        console.log(error);
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id).populate('belongsToProject');

    if(!task) {
        const error = new Error('Task does not exist');
        return res.status(404).json({msg: error.message});
    }

    if(task.belongsToProject.projectCreator.toString() !== req.user._id.toString()) {
        const error = new Error('Invalid action');
        return res.status(403).json({msg: error.message});
    }

    try {
        await task.deleteOne();
        res.json({msg: 'This task has been succesfully deleted'});
        
    } catch (error) {
        console.log(error);
    }
}

const changeTaskStatus = async (req, res) => {
    
}

export {
    addTask,
    changeTaskStatus,
    deleteTask,
    getTask,
    updateTask
}