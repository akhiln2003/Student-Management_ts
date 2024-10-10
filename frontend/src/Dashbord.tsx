import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-modal";


interface IStudent {
  _id : string;
  studentName: string;
  age: number;
  gender: string;
  number: string;
}




Modal.setAppElement("#root");

function Dashboard() {
  const [student, setStudent] = useState<IStudent[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [ editModal , setEditModal ] = useState<boolean>(false)
  const [state,setState] = useState<IStudent | null>(null);
  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/");
      setStudent(response.data.data);
    } catch (error) {
      // alert("Error fetching students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddClick = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };



  const closeEditModal = () => {
    setEditModal(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const studentName = formData.get("name") as string;
    const age = formData.get("age") as string;
    const number = formData.get("number") as string;
    const gender = formData.get("gender") as string;

    const response = await axios.post('http://localhost:3000/api/newStudent',{studentName,age,number,gender})
    setStudent((data)=> [...data, response.data.data])
    
    closeModal();
  };


  const handilDelet = async ( id: string )=>{
     await axios.delete(`http://localhost:3000/api/${id}/deleteData`)
     const students = student.filter((data : IStudent) => data._id!=id);
     setStudent(students)
  }

  const handilEdit = async (id:string)=>{
        
      let editStudent = student.filter( data => data._id == id);
      if(editStudent[0]){        
        setState(editStudent[0])
      }
     
      

  }

 const handilUpdat = async(event: React.FormEvent<HTMLFormElement>)=>{
              event.preventDefault()
              const id = state?._id;
              const studentName = state?.studentName;
              const number = state?.number;
    const response = await axios.put(`http://localhost:3000/api/${id}/updateStudent`,{studentName,number})
    setEditModal(false)
    

    if( response.data.message == "Successfully Updated" )   {
      fetchStudents();
    }
 }

 const handilEditChange = async (event: React.FormEvent<HTMLFormElement>) => {
  // Cast event.target to HTMLInputElement
  const target = event.target as HTMLInputElement;
  const inputName: string = target.name;
  const value: string = target.value;

  
  setState((prev) => prev ? { ...prev, [inputName]: value } : prev);

};


  return (
    <div className="w-full h-fit bg-slate-300 flex justify-center">
      <div className="w-full px-3 h-fit min-h-[97vh] flex flex-col items-center mt-5">
        <div className="w-full h-20 bg-white flex items-center justify-between rounded-md">
          <strong className="font-mono text-lg ml-5">Student Management</strong>
          <button
            className="bg-blue-600 text-white rounded-md w-36 h-10 font-serif mr-5"
            onClick={handleAddClick}
          >
            ADD
          </button>
        </div>

        {/* Modal Component */}
        <Modal
          isOpen={editModal}
          onRequestClose={closeEditModal}
          contentLabel="Edit Student Details"
          className="bg-white w-11/12 md:w-1/3 mx-auto mt-10 p-6 rounded-lg shadow-lg"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <h2 className="text-xl font-bold mb-4">Edit Details</h2>
          <form onSubmit={handilUpdat}>
            <label
              className="block text-gray-700 text-sm font-bold mb-2 mt-4"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="studentName"
              value={state?.studentName}
              onChange={handilEditChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <label
              className="block text-gray-700 text-sm font-bold mb-2 mt-4"
              htmlFor="number"
            >
              Number
            </label>
            <input
              type="text"
              id="number"
              name="number"
              required
              value={state?.number}
              onChange={handilEditChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />

            <div className="flex justify-end mt-5">
              <button
                type="button"
                onClick={closeEditModal}
                className="bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </form>
        </Modal>




        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Edit Student Details"
          className="bg-white w-11/12 md:w-1/3 mx-auto mt-10 p-6 rounded-lg shadow-lg"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <h2 className="text-xl font-bold mb-4">Edit Details</h2>
          <form onSubmit={handleSubmit}>
            <label
              className="block text-gray-700 text-sm font-bold mb-2 mt-4"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />

            <label
              className="block text-gray-700 text-sm font-bold mb-2 mt-4"
              htmlFor="age"
            >
              Age
            </label>
            <input
              type="text"
              id="age"
              name="age"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />

            <label
              className="block text-gray-700 text-sm font-bold mb-2 mt-4"
              htmlFor="gender"
            >
              Gender
            </label>
            <input
              type="text"
              id="gender"
              name="gender"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />

            <label
              className="block text-gray-700 text-sm font-bold mb-2 mt-4"
              htmlFor="number"
            >
              Number
            </label>
            <input
              type="text"
              id="number"
              name="number"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />

            <div className="flex justify-end mt-5">
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </form>
        </Modal>

        <div className="w-4/5 h-fit mt-10 mb-10 min-h-[70vh] pt-5 rounded-md bg-white flex flex-col justify-center items-center">
        <div className=" w-full h-5 flex mb-5 font-serif">
          <h1 className=" font-extrabold text-lg ml-28" >NAME</h1>
          <h1 className=" font-extrabold text-lg ml-44">AGE</h1>
          <h1 className=" font-extrabold text-lg ml-36">GENDER</h1>
          <h1 className=" font-extrabold text-lg ml-28">NUMBET</h1>
          <h1 className=" font-extrabold text-lg ml-24">ACTION</h1>


        </div>
          {
            student.map((data: IStudent)=>(
              <>
                <div className="w-11/12 h-40 rounded-lg bg-slate-200 flex  items-center justify-between my-2"  key={data._id}>
                  <div className="w-fit h-3/4 min-w-40  ml-5 flex justify-center items-center">
                  <h1 className="font-extrabold text-xl" >{data.studentName}</h1>
                  </div>
                  <div className="w-fit min-w-40 h-3/4 flex justify-center items-center ">
                  <h1 className="font-extrabold text-xl" >{data.age}</h1>
                  </div>
                  <div className="w-fit min-w-32 h-3/4 flex justify-center items-center ">
                  <h1 className="font-extrabold text-xl" >{data.gender}</h1>
                  </div>
                  <div className="w-fit min-w-32 h-3/4  flex justify-center items-center ">
                  <h1 className="font-extrabold text-xl" >{data.number}</h1>
                  </div>
                  <div className="w-fit min-w-32 h-3/4  mr-5 flex justify-center items-center ">
                      <button className=" bg-blue-900 w-10 h-8 rounded-md mr-5" onClick={()=> {
                        setEditModal(true)
                        handilEdit(data._id)
                      }} >✏️</button>
                      <button className=" bg-blue-900 w-10 h-8 rounded-md" onClick={()=> handilDelet(data._id)}>🗑️</button>
                  </div>
                </div>
              </>
            ))
          }
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
