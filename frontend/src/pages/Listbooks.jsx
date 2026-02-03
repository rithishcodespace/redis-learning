import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Listbook = () => {

    const[books, setBooks] = useState(
    [
        {
            "name": "Atomic Habits",
            "author": "James Clear",
            "rating": 4.8,
            "description": "A practical guide on building good habits, breaking bad ones, and mastering tiny behaviors that lead to remarkable results.",
            "id":1
        },
        {
            "name": "Deep Work",
            "author": "Cal Newport",
            "rating": 4.5,
            "description": "Explores the importance of focused, distraction-free work and how it leads to success in a distracted world.",
            "id":2
        },
        {
            "name": "Clean Code",
            "author": "Robert C. Martin",
            "rating": 4.7,
            "description": "A handbook of agile software craftsmanship that teaches how to write readable, maintainable, and efficient code.",
            "id":3
        },
        {
            "name": "The Alchemist",
            "author": "Paulo Coelho",
            "rating": 4.3,
            "description": "A philosophical novel about following your dreams and listening to your heart.",
            "id":4
        },
        {
            "name": "Rich Dad Poor Dad",
            "author": "Robert Kiyosaki",
            "rating": 4.4,
            "description": "Focuses on financial literacy, money mindset, and the difference between working for money and making money work for you.",
            "id":5
        }
    ]);


    useEffect(() => {
        fetchBooks();
    },[])    

    const fetchBooks = async () => {
        try{
            let response = await axios.get("http://localhost:4000/api/getBooks");
            if(response.status == 200){
                setBooks(response.data);
            }
            else window.alert("failed to fetch book!");
        }
        catch(error){
            console.log(error);
        }
    }    

    const handleDelete = async (key) => {
        let response = await axios.delete("http://localhost:4000/api/delete_book",{
            data:{id:key}
        })
        if(response.status == 200){
            let afterDeletion = books.filter((book) => book.id != key);
            setBooks(afterDeletion);
        }
    }

    return(
        <div className="flex flex-col gap-4 align-middle m-16 items-center">
            <div>
                <Link to="/create_book"><button className="bg-amber-700 p-1.5 rounded-md text-white cursor-pointer">Create Book</button></Link>
            </div>
            <div className="h-142 w-2/4 bg-gray-300 overflow-scroll p-2.5 flex flex-col rounded-sm">
                {books.length > 0 && books.map((book) => {
                    return(
                        <div key={book.id} className="flex items-start gap-4 p-4">
                            {/* Book Info */}
                            <div className="bg-amber-300 rounded-2xl p-4 flex-1 shadow-sm">
                                <p className="font-bold text-lg">{book.name}</p>
                                <p className="font-serif text-gray-700">{book.author}</p>

                                <div className="flex items-center gap-2 mt-1">
                                <span>⭐ {book.rating}</span>
                                </div>

                                <p className="mt-2 text-sm text-gray-800 leading-relaxed">
                                {book.description}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2 shrink-0">
                                <button className="bg-blue-500 hover:bg-blue-600 transition px-4 py-2 rounded-md text-white text-sm">
                                <Link to={`/update_book/${book.id}`}>Edit</Link>
                                </button>
                                <button className="bg-red-400 hover:bg-red-500 transition px-4 py-2 rounded-md text-white text-sm" onClick={() => handleDelete(book.id)}>
                                Delete
                                </button>
                            </div>
                        </div>
                        )
                        })}
                        </div>
                    </div>
                )
            }

export default Listbook;