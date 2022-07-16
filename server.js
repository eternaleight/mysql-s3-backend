const express = require("express")
const multer = require("multer")
const upload = multer({ dest: 'uploads/' })

const app = express()

const database = require('./database')

app.get('/posts', (req, res) => {

})
app.get('/images/:filename', (req, res) => {

})

app.post('/posts', upload.single("image"), (req, res) => {
  console.log(req.file)
  const { filename, path } = req.file
  const description = req.body.description

  // save these details to a database
  const image_url = `/image/${filename}`
  database.createPost(description, `/images/${filename}`,(err, insertId) => {
    if (err) {
      res.send({err: err.message})
      return
    }
    res.send({
      id: insertId,
      description,
      image_url
    })
  })

  res.send("⚡️")
})


const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`localhost:${port}起動`)
})
