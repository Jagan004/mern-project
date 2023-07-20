const express = require("express");
const DbConnect = require("./config/DbConnection");
const dotenv = require("dotenv").config()
const cors = require("cors")
const app = express()
const Storage = require("./middelWare/upload")
const multer = require('multer');
const path = require("path")
const fs = require("fs");

const port = process.env.PORT || 5000

DbConnect();


app.use(cors())
app.use(express.json())
app.use("/api/contact",require("./routes/contact-route"));
app.use("/api/user",require("./routes/userRoute"));
app.use(express.static('image'))

// const Storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, './image');
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
//   });

  const upload = multer({ storage:Storage });
  app.post('/api/upload', upload.single('image'), (req, res) => {

    console.log(req.file)
    if (!req.file) {
        return res.status(400).json({ error: 'No image provided.' });
      }
    
      // Here, you can save the image details to your database, if needed.
      // For simplicity, let's just send a response with the image URL.
      const imageUrl = req.file.filename
      return res.json({ imageUrl });
  });

  app.get('/api/images', (req, res) => {
    const imageFolderPath = path.join(__dirname, "image");
  
    // Read the contents of the "image" folder
    fs.readdir(imageFolderPath, (err, files) => {
      if (err) {
        console.error("Error reading image folder:", err);
        return res.status(500).json({ error: "Server error." });
      }
  
      // Filter out non-image files (if needed)
      const imageFiles = files.filter(file => {
        const fileExtension = path.extname(file).toLowerCase();
        return [".jpg", ".jpeg", ".png", ".gif", ".bmp"].includes(fileExtension);
      });
  
      // Send the array of image filenames in the response
      return res.json({ images: imageFiles });
    });
  });
app.listen(port,()=>{
console.log("listening port" + port)
})

