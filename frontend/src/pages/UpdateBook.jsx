import {useState,useEffect} from "react";
import axios from "axios";

const UpdateBook = () => {

    const [formData,setFormData] = useState({
        name:"",
        author:"",
        rating:"",
        description:""
    });

    useEffect(() => {
        try{
            let response = axios.get("http://localhost:4000/api/getBooks");
            if(response.data.length === 0){
                return window.alert("book not found!");
            }
            else{
                setFormData(response.data);
            }
        }
        catch(error){
            console.log(error);
        }
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

            <input className="border p-2 rounded" placeholder="Book Name" value={formData.name} />
            <input className="border p-2 rounded" placeholder="Author" value={formData.author}/>
            <input className="border p-2 rounded" placeholder="Rating" value={formData.rating}/>
            <input className="border p-2 rounded" placeholder="Description" value={formData.description}/>

            <button className="bg-blue-500 text-white py-2 mb-3 rounded hover:bg-blue-600">
                Update details
            </button>
        </form>
        </div>

    )
}

export default UpdateBook;