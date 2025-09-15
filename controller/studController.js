import student from '../model/studModel.js';

class StudentController {
    // CREATE A NEW STUDENT OR MULTIPLE STUDENTS
    async create(req, res) {
        try {
            if (Array.isArray(req.body)) {
                // Handle multiple students
                const insertedStudents = await student.insertMany(req.body);
                res.status(200).json(insertedStudents);
            } else {
                // Handle single student
                const newStudent = new student(req.body);

                // Check if student with same id already exists (only if id is provided)
                if (req.body._id) {
                    const studentExist = await student.findOne({ id: req.body._id });
                    if (studentExist) {
                        return res.status(400).json({ message: "Student already exists." });
                    }
                }

                const savedData = await newStudent.save();
                res.status(200).json({ message: "User created successfully" });
            }
        } catch (error) {
            res.status(500).json({ errorMessage: error.message });
        }
    }

    async getStudents(req, res) {
        try {
            const students = await student.find();
            if(!students  || students.length === 0){
                return res.status(404).json({message:"No students found"});
            }
            res.status(200).json(students);
        } catch (error) {
            res.status(500).json({ errorMessage: error.message });
        }
    }

    async getStudentById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const foundStudent = await student.findOne({ id: id });
            if (!foundStudent) {
                return res.status(404).json({ message: "Student not found" });
            }
            res.status(200).json(foundStudent);
        } catch (error) {
            res.status(500).json({ errorMessage: error.message });
        }
    }

    async updateStudent(req, res) {
        try {
            const id = parseInt(req.params.id);
            const foundStudent = await student.findOne({ id: id });
            if (!foundStudent) {
                return res.status(404).json({ message: "Student not found" });
            }
            const updatedStudent = await student.findOneAndUpdate({ id: id }, req.body, { new: true });
            // res.status(200).json(updatedStudent);
            res.status(200).json({ message: "User updated successfully" });

        } catch (error) {
            res.status(500).json({ errorMessage: error.message });
        }
    }
    async deleteStudent(req, res) {
        try{
            const id = parseInt(req.params.id);
            const foundStudent = await student.findOne({ id: id });
            if (!foundStudent) {
                return res.status(404).json({ message: "Student not found" });
            }
            await student.findOneAndDelete({ id: id });
            res.status(200).json({ message: "Student deleted successfully" });
        }catch (error) {
            res.status(500).json({ errorMessage: error.message });
        }
    }

};

export default StudentController;
