const createError = require("http-errors");
const redis = require("../config/db");

    exports.getBooks = async (req,res,next) => {
        try{
            const bookIds = await redis.lRange("books",0,-1);
            const books = [];
            for(let id of bookIds){
                const book = await redis.hGetAll(`book:${id}`);
                books.push({
                    ...book,
                    rating:Number(book.rating)
                })
            }
            res.status(200).send(books);
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
        const id = redis.incr("book:id");
        await redis.hSet(`book:${id}`, {
            "name":name,
            "author":author,
            "rating":rating,
            "description":description
        })
        await redis.rPush("books",id.toString());
        res.send(`book:${id} has been added successfully!`);
    }
    catch(error){
        next(error);
    }
}