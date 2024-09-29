import mongoose, { Schema } from "mongoose";

const jobSchema = new mongoose.Schema({
    company : {
        type: String,
        required: [true, 'company name cannot be blank'],
        maxlength: 20
    },

    position: {
        type: String,
        required: [true, 'position cannot be blank'],
        maxlength: 20
    },

    status: {
        type: String,
        enum: ['interview', 'pending', 'declined'],
        default: 'pending'
    },
    createdBy: {
        // change 1
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }

}, {timestamps: true})

const Jobs = mongoose.model('jobs', jobSchema)

export default Jobs