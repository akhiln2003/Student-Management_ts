// interfaces/student.interface.ts
import { Document } from 'mongoose';

export interface IStudent extends Document {
  studentName: string;
  age: string;
  gender: string;
  number: string;
}
