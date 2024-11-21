const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const Image = require("./models/Image");
const path = require("path");
require("dotenv").config()


const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Save file with timestamp
  },
});

const upload = multer({ storage: storage });

// Post route for adding image data
app.post("/api/images", upload.single("imageFile"), async (req, res) => {
  try {
    const { name, rating } = req.body;
    const imageFilePath = req.file.path;

    const newImage = new Image({
      name,
      rating,
      imageUrl: imageFilePath,
    });

    await newImage.save();
    res.json(newImage);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/hi",(req,res)=>{
  res.send("hello")
})

// Get route for retrieving all images
app.get("/api/images", async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port 5000");
});
