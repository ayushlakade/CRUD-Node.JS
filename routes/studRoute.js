import express from "express";

import StudentController from '../controller/studController.js';

const studentController = new StudentController();


//router object
const route = express.Router();

// //routes


//GET ALL STUDENTS LIST ||GET
route.get('/getall',studentController.getStudents)

//GET STUDENT BY ID
route.get('/get/:id',studentController.getStudentById)

//INSERT STUDENT ||POST
route.post('/create', studentController.create)

//UPDATE STUDENT ||PATCH
route.put('/update/:id',studentController.updateStudent)

//DELETE STUDENT ||DELETE
route.delete('/delete/:id',studentController.deleteStudent)

export default route;
