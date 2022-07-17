const express = require("express")
const multer = require("multer")
const upload = multer({ dest: 'uploads/' })

const fs = require('fs')
const path = require('path')

const app = express()

const database = require('./database')

app.get('/images/:filename', (req, res) => {
  const filename = req.params.filename
 const readstream = fs.createReadStream(path.join(__dirname, 'uploads', filename))
  readstream.pipe(res)
})

app.get('/posts', (req, res) => {
  database.getPosts((err, posts) => {
    if (err) {
      res.send({err: err.message})
      return
    }
    res.send({posts})
  })
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
