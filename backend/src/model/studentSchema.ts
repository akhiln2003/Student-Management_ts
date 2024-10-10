// models/student.model.ts
import { Schema, model } from 'mongoose';
import { IStudent } from '../interfaces/IstudentSchema'; // Adjust the path as needed

const studentSchema: Schema<IStudent> = new Schema({
  studentName: { 
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  }
});

const StudentModel = model<IStudent>('Student', studentSchema);

export default StudentModel;
