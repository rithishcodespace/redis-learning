const createError = require("http-errors");
const redis = require("../config/db");

exports.getBooks = (req,res,next) => {
    try{

    }
    catch(error){
        next(createError);
    }
}