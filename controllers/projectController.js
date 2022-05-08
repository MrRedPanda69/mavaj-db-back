import Project from '../models/Project.js';
import Task from '../models/Task.js';

const getProjects = async (req, res) => {
    const projects = await Project.find().where('projectCreator').equals(req.user).select('-projectTasks');
    res.json(projects);
}

const newProject = async (req, res) => {
    const project = new Project(req.body);
    project.projectCreator = req.user._id;

    try {
        const savedProject = await project.save();
        res.json(savedProject);
        
    } catch (error) {
        console.log(error);
    }
}

const getProject = async (req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id).populate('projectTasks');
    
    if(!project) {
        const error = new Error('Project not found');
        return res.status(404).json({msg: error.message});
    }
    if(project.projectCreator.toString() !== req.user._id.toString()) {
        const error = new Error('Project does not belong to this user');
        return res.status(401).json({msg: error.message});
    }

    res.json(project);
}

const editProject = async (req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id);
    
    if(!project) {
        const error = new Error('Project not found');
        return res.status(404).json({msg: error.message});
    }
    if(project.projectCreator.toString() !== req.user._id.toString()) {
        const error = new Error('Project does not belong to this user');
        return res.status(401).json({msg: error.message});
    }

    project.projectName = req.body.projectName || project.projectName;
    project.projectDescription = req.body.projectDescription || project.projectDescription;
    project.deliveryDate = req.body.deliveryDate || project.deliveryDate;
    project.projectClient = req.body.projectClient || project.projectClient;

    try {
        const savedProject = await project.save();
        res.json(savedProject);

    } catch (error) {
        console.log(error);
    }
}

const deleteProject = async (req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id);
    
    if(!project) {
        const error = new Error('Project not found');
        return res.status(404).json({msg: error.message});
    }
    if(project.projectCreator.toString() !== req.user._id.toString()) {
        const error = new Error('Project does not belong to this user');
        return res.status(401).json({msg: error.message});
    }

    try {
        await project.deleteOne();
        res.json({msg: 'Project deleted'});
        
    } catch (error) {
        console.log(error);
    }
}

const newCollaborator = async (req, res) => {

}

const deleteCollaborator = async (req, res) => {

}

export {
    newCollaborator,
    deleteCollaborator,
    deleteProject, 
    editProject,
    getProject,
    getProjects, 
    newProject,
}