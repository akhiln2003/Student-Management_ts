import {RequestHandler} from 'express'
import student from '../model/studentSchema'


export const addStudent : RequestHandler = async ( req , res , next )=>{
    try {
        const { studentName , age , gender , number } = req.body;

        const newStudent = new student( { studentName , age , gender , number } );
        await newStudent.save();
        if( newStudent ) return res.status(201).json({ message : "Succesfully created " , data : newStudent });
        return res.status(500).json({ message : 'Student Creation Failed'})
    } catch (error) {
        next(error)
        
    }
}


export const listAllStudents : RequestHandler = async(req,res ,next )=>{
    try {

        const students = await student.find();
        if( student ){
            return res.status(200).json({ message:'Data Successfully Retrieved', data:students })
        }
        return res.status(500).json({ message:'Data Retrieval Failed' })
        
    } catch (error) {
        next(error)
    }
}



export const updateStudent : RequestHandler = async ( req , res , next ) =>{
    try {
        const { id } = req.params;
        const { studentName , number  } = req.body;
        
        const existingStudent = await student.findById(id);
        if( ! existingStudent ) return res.status(400).json({ message : "Student Not Exist"});

        const updateStudent = await student.findByIdAndUpdate(id , {studentName , number } , { new:true });

        if(updateStudent){
            return res.status(200).json({ message:'Successfully Updated', data:updateStudent })
        }
        return res.status(500).json({ message:'Student Updation Failed' })
        
    } catch (error) {
        next(error)
    }
    
}



export const deleteStudent : RequestHandler = async ( req , res , next ) =>{
    try {
        const { id } = req.params;
        const existingStudent = await student.findById(id);
        if( !existingStudent) return res.status(400).json({message:" Student not exist"});
        const deletData = await student.findByIdAndDelete(id);
        if( deletData ) return res.status(200).json({ message : "Successfully Deleted" , data : deletData});
        return res.status(500).json({ message:'StudentData Dletion Failed' })
    } catch (error) {
        next(error)
    }
}