const express = require("express")
const multer = require("multer")
const upload = multer({ dest: 'uploads/' })
const domain = require('express-domain-middleware');

const fs = require('fs')
const path = require('path')

const app = express()

const database = require('./database')

app.use(express.static('build'))
app.use(domain)

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

// app.delete('/posts', (req,res) => {
// })

app.post('/posts', upload.single("image"), (req, res) => {
  const { filename, path } = req.file
  const description = req.body.description

  // save these details to a database
  const image_url = `/images/${filename}`
  database.createPost(description, image_url,(err, insertId) => {
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


//if react reoter, then add this
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, 'build/index.html'))
// })


const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`localhost:${port}起動`)
})
