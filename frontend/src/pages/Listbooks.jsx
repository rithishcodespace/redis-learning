import { useState, useEffect } from "react";
import axios from "axios";

useEffect(() => {
    fetchBooks();
},[])

const fetchBooks = async () => {
    let response = await fetch()
}

const Listbook = () => {
    return(
        <div className="flex justify-center align-middle m-40">
            <div className="h-125 w-2/4 bg-amber-300">
               
            </div>
        </div>
    )
}

export default Listbook;