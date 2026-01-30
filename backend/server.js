require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const redis = require("./config/db");
const morgan = require("morgan");
const createError = require("http-errors");

const bookRoute = require("./routes/books");

app.use('/',bookRoute);

app.use('/',express.json());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(morgan('dev'));

// 404 handler
app.use((req, res, next) => {
    next(createError.NotFound("api not found"));
});

// Error handler
app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(error.status || 500);
    res.send({
        error: {
            status: error.status || 500,
            message: error.message
        }
    });
});

app.listen(process.env.PORT,() => console.log(`server successfully running on http://localhost:${process.env.PORT}`))