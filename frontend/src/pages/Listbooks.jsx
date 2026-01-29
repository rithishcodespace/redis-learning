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
            "description": "A practical guide on building good habits, breaking bad ones, and mastering tiny behaviors that lead to remarkable results."
        },
        {
            "name": "Deep Work",
            "author": "Cal Newport",
            "rating": 4.5,
            "description": "Explores the importance of focused, distraction-free work and how it leads to success in a distracted world."
        },
        {
            "name": "Clean Code",
            "author": "Robert C. Martin",
            "rating": 4.7,
            "description": "A handbook of agile software craftsmanship that teaches how to write readable, maintainable, and efficient code."
        },
        {
            "name": "The Alchemist",
            "author": "Paulo Coelho",
            "rating": 4.3,
            "description": "A philosophical novel about following your dreams and listening to your heart."
        },
        {
            "name": "Rich Dad Poor Dad",
            "author": "Robert Kiyosaki",
            "rating": 4.4,
            "description": "Focuses on financial literacy, money mindset, and the difference between working for money and making money work for you."
        }
    ]);


    // useEffect(() => {
    //     fetchBooks();
    // },[])    

    // const fetchBooks = async () => {
    //     let response = await axios()
    // }    

    return(
        <div className="flex flex-col gap-4 align-middle m-16 items-center">
            <div>
                <Link to="/create_book"><button className="bg-amber-700 p-1.5 rounded-md text-white cursor-pointer">Create Book</button></Link>
            </div>
            <div className="h-142 w-2/4 bg-gray-300 overflow-scroll p-2.5 flex flex-col rounded-sm">
                {books.length > 0 && books.map((book) => {
                    return(
                        <div className="bg-amber-300 m-2.5 rounded-2xl p-2.5">
                            <p className="font-bold">{book.name}</p>
                            <p className="font-serif">{book.author}</p>
                            <p>⭐{book.rating}</p>
                            <p>{book.description}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Listbook;