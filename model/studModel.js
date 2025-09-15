import mongoose from 'mongoose';

const studentschema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
     },
    first_name: {
        type: String,
     },
     last_name: {
        type: String,
     },
    email: {
        type: String,
    },
    gender: {
        type: String,
    },
    job_title: {
        type: String,
    }
});

// Auto-increment id before saving
studentschema.pre('save', async function(next) {
    if (!this.id) {
        const lastStudent = await this.constructor.findOne({}, {}, { sort: { 'id': -1 } });
        this.id = lastStudent ? lastStudent.id + 1 : 1;
    }
    next();
});

export default mongoose.model('Student', studentschema);
