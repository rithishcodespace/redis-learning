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

exports.update_book = async (req, res, next) => {
  try {
    const { id, name, author, rating, description } = req.body;

    if (!id) {
      return next(createError.NotFound("id not found!"));
    }

    if (!name?.trim() || !author?.trim() || !rating || !description?.trim()) {
      return next(createError.BadRequest("Invalid payload!"));
    }

    let books = await redis.lRange("books", 0, -1);

    let updated = false;

    books = books.map((bookStr) => {
      const book = JSON.parse(bookStr);

      if (book.id === id) {
        updated = true;
        return JSON.stringify({
          ...book,
          name,
          author,
          rating,
          description
        });
      }

      return bookStr;
    });

    if (!updated) {
      return next(createError.NotFound("Book not found"));
    }

    await redis.del("books");
    await redis.rPush("books", books);

    res.status(200).json({
      message: "Book updated successfully"
    });

  } catch (error) {
    next(error);
  }
};

exports.delete_book = async(req,res,next) => {
    try{
        const{id} = req.body;
        if(!id){
            return next(createError.NotFound("id not found!"));
        }
        let books = await redis.lRange("books",0,-1);
        let updated = false;
        books = books.filter((book) => {
            book = json.parse();
            if(book.id === id){
                updated = true;
                return false;
            }
            return true;
        })
        if(!updated){
            return res.status(200).json({
                "message":"book not found"
            })
        }
        await redis.del("books");
        if (books.length > 0) {
            await redis.rPush("books", books);
        }
    }
    catch(error){
        next(error);
    }
}