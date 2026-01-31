const express = require("express");
const router = express.Router();
const books = require("../controllers/books");

router.get("/api/getBooks",books.getBooks);
router.post("/api/createBook",books.create_book);

module.exports = router;