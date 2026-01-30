const createError = require("http-errors");
const redis = require("../config/db");

exports.getBooks = async (req,res,next) => {
    try{
        const {id} = req.params;
        let books = redis.hget(`book:${id}`);
        return books;
    }
    catch(error){
        next(error);
    }
}

exports.create_book = async(req,res,next) => {
    try{
        const {name, author, rating, description} = req.body;
        if(name.trim() == "" || author.trim() == "" || !rating || description.trim() == ""){
            return next(createError.BadRequest('Invalid payload!'));
        }
        const id = Math.random()*100000;
        await redis.hset(`book:${id}`, {
            "name":name,
            "author":author,
            "rating":rating,
            "description":description
        })
        res.send(`book:${id} has been added successfully!`);
    }
    catch(error){
        next(error);
    }
}