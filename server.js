const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const domain = require('express-domain-middleware');

//const fs = require('fs')
//const path = require('path')

const app = express()

const database = require('./database')

const s3 = require('./s3')

app.use(express.static('build'))
app.use(domain)

app.get('/images/:filename', (req, res) => {
  const filename = req.params.filename
  //const readstream = fs.createReadStream(path.join(__dirname, 'uploads', filename))
  const readStream = s3.getFileStream(filename)
  readStream.pipe(res)
})

app.get('/posts', (req, res) => {
  database.getPosts((err, posts) => {
    if (err) {
      res.send({error: err.message})
      return
    }
    res.send({posts})
  })

})

app.post('/posts', upload.single('image'), async (req, res) => {
  const { filename } = req.file
  const description = req.body.description

  await s3.uploadFile(req.file)

  // save these details to a database
  const image_url = `/images/${filename}`
  database.createPost(description, image_url, (err, insertId) => {
    if (err) {
      res.send({error: err.message})
      return
    }
    res.send({
      id: insertId,
      description,
      image_url
    })
  })
})

// if react router, then add this
// app.get('*', (req,res) =>{
//   res.sendFile(path.join(__dirname, 'build/index.html'))
// })

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`localhost:${port}を起動`)
})
