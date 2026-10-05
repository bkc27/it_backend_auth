const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth",userRoutes);
const PORT = process.env.PORT || 5001;
app.listen(PORT, ()=>{
    console.log(`Server started at http://localhost:${PORT}`);
})