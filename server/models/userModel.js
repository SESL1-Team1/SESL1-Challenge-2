const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
    },
    tasks: [
        {
            title: {
                type: String,
                required: [true, "Please add a title"],
            },
            description: {
                type: String,
            },
            status: {
                type: String,
                enum: ["not started", "in progress", "completed"],
                default: "in progress",
            },
            dueDate: {
                type: Date,
            },
        },
    ],
},
{
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);