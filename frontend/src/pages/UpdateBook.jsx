import {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBook = () => {

    const navigate = useNavigate();
    const {edit_id} = useParams();
    const [formData,setFormData] = useState({
        name:"",
        author:"",
        rating:"",
        description:"",
        id:""
    });

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:4000/api/getBooks"
                );

                if (response.data.length === 0) {
                    window.alert("book not found!");
                } else {
                    let id = 
                    response.data.filter((book) => book.id === edit_id)
                    setFormData(response.data[0]);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchBook();
    }, []);


    function handleChange(e){
        const{name,value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:value
        }))
    }

    async function handleUpdate(e){
        e.preventDefault();
        const{name, author, rating, description} = formData;
        let response = await axios.patch("http://localhost:4000/api/update_book",{
            "name":name,
            "author":author,
            "rating":rating,
            "description":description,
            "id":formData.id
        });
        if(response.status == 200){
            window.alert("book updated successfully!");
            navigate("/");
        }
        else window.alert("book update failure!");
    }

    return(
        <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleUpdate} className="flex flex-col gap-3 max-w-md mx-auto p-4 w-2/4 bg-gray-200 rounded-md">
            <h1 className="text-xl font-bold text-center p-2">Update book</h1>

            <input className="border p-2 rounded" placeholder="Book Name" name="name" value={formData.name} onChange={handleChange} />
            <input className="border p-2 rounded" placeholder="Author" name="author" value={formData.author} onChange={handleChange}/>
            <input className="border p-2 rounded" placeholder="Rating" name="rating" value={formData.rating} onChange={handleChange}/>
            <input className="border p-2 rounded" placeholder="Description" name="description" value={formData.description} onChange={handleChange}/>

            <button type="submit" className="bg-blue-500 text-white py-2 mb-3 rounded hover:bg-blue-600">
                Update details
            </button>
        </form>
        </div>

    )
}

export default UpdateBook;