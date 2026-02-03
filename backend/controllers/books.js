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
                    rating:Number(book.rating),
                    id:id.toString()
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
        const id = await redis.incr("book:id");
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

    const bookIds = await redis.lRange("books", 0, -1);
    let updated = false;

    for (const bk_id of bookIds) {
      if (bk_id == id) {
        updated = true;

        await redis.hSet(`book:${bk_id}`, {
          id,
          name,
          author,
          rating,
          description
        });

        break;
      }
    }

    if (!updated) {
      return next(createError.NotFound("Book not found"));
    }

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
        
        let removed = await redis.lRem("books",0,id)

        if(removed == 0){
            return res.status(200).json({
                message: "book not found"
            });
        }

        await redis.hDel(`books:${id}`)
        
        res.status(200).send('book deleted successfully!')
    }
    catch(error){
        next(error);
    }
}