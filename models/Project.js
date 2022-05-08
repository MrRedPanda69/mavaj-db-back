import mongoose from 'mongoose';

const projectsSchema = mongoose.Schema(
    {
        projectName: {
            type: String,
            trim: true,
            required: true
        },
        projectDescription: {
            type: String,
            trim: true,
            required: true
        },
        deliveryDate: {
            type: Date,
            default: Date.now()
        },
        projectClient: {
            type: String,
            trim: true,
            required: true
        },
        projectCreator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        projectTasks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Task'
            }
        ],
        collaborators: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        timestamps: true
    }
);

const Project = mongoose.model('Project', projectsSchema);
export default Project;