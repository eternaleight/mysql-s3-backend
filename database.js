const mysql = require('mysql')
require("dotenv").config()


const connection = mysql.createConnection({
  host: process.env.mysql_host,
  user: process.env.mysql_user,
  password: process.env.mysql_password,
  database: process.env.mysql_database,
})

connection.connect()

const createPost = (description, image_url, callback) => {

  const query = `
  INSERT INTO posts (description, image_url)
  VALUES (?, ?)
  `
  const params = [description, image_url]

  connection.query(query, params, (err, result) => {
    if(err) {
      callback(err)
      return
    }
    callback(null, result.insertId)
  })
}

exports.createPost = createPost

const createTable = () => {
}

