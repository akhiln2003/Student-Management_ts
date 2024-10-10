import express, { Router } from 'express'
import { 
    addStudent ,
    listAllStudents ,
    deleteStudent , 
    updateStudent
  } from '../controller/controller'

const routes : Router = express.Router();


routes.get('/' , listAllStudents);
routes.post('/newStudent',addStudent);
routes.put('/:id/updateStudent' , updateStudent );
routes.delete('/:id/deleteData' , deleteStudent);




export default routes