import {useState,useEffect} from "react";
import axios from "axios";

const UpdateBook = () => {

    const [formData,setFormData] = useState();

    useEffect(() => {
        axios.get()
    })

    function handleChange(e){
        const{name,value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:value
        }))
    }

    return(
        <div className="flex justify-center items-center h-screen">
        <form className="flex flex-col gap-3 max-w-md mx-auto p-4 w-2/4 bg-gray-200 rounded-md">
            <h1 className="text-xl font-bold text-center p-2">Update book</h1>

            <input className="border p-2 rounded" placeholder="Book Name" />
            <input className="border p-2 rounded" placeholder="Author" />
            <input className="border p-2 rounded" placeholder="Rating" />
            <input className="border p-2 rounded" placeholder="Description" />

            <button className="bg-blue-500 text-white py-2 mb-3 rounded hover:bg-blue-600">
                Update details
            </button>
        </form>
        </div>

    )
}

export default UpdateBook;