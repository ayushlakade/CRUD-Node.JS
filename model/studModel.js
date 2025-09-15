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
// studentschema.pre('save', async function(next) {
//     if (!this.id) {
//         const lastStudent = await this.constructor.findOne({}, {}, { sort: { 'id': -1 } });
//         this.id = lastStudent ? lastStudent.id + 1 : 1;
//     }
//     next();
// });

const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});
const Counter = mongoose.model('Counter', CounterSchema);

studentschema.pre('save', async function(next) {
  if (!this.id) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'studentId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.seq;
  }
  next();
});


export default mongoose.model('Student', studentschema);
