import mongoose from 'mongoose';

const tasksSchema = mongoose.Schema(
    {
        taskName: {
            type: String,
            trim: true,
            required: true
        },
        taskDescription: {
            type: String,
            trim: true,
            required: true
        },
        taskStatus: {
            type: Boolean,
            default: false
        },
        deliveryDate: {
            type: Date,
            required: true,
            default: Date.now()
        },
        taskPriority: {
            type: String,
            required: true,
            enum: ['Low', 'Medium', 'High']
        },
        belongsToProject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'
        }
    },
    {
        timestamps: true
    }
);

const Task = mongoose.model('Task', tasksSchema);
export default Task;