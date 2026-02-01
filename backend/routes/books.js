const express = require("express");
const router = express.Router();
const books = require("../controllers/books");

router.get("/api/getBooks",books.getBooks);
router.post("/api/createBook",books.create_book);
router.delete("/api/delete_book",books.delete_book);
router.patch("/api/update_book",books.update_book);

module.exports = router;