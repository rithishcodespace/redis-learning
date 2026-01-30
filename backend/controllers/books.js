const createError = require("http-errors");
const redis = require("../config/db");

    exports.getBooks = async (req,res,next) => {
        try{
            const {id} = req.params;
            let books = await redis.hGetAll(`book:${id}`);
            if(Object.keys(books).length == 0)return res.send('No books available!');
            res.send(books);
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
        const id = Math.random()*1000;
        await redis.hSet(`book:${id}`, {
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