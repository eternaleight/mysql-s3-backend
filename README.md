# mysql-s3-backend
Mysql aws s3 connect
画像アップローダー

<img width="1280" alt="mysql-s3-1280-720" src="https://user-images.githubusercontent.com/96198088/191134989-f3ff5b6f-0c86-40da-9b71-d72b884ab01f.png">

## Stack

- [Mysql](https://www.mysql.com/jp/) - MySQL is an open-source relational database management system
- [Nodejs](https://nodejs.org/ja/) - Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [AmazonS3](https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/Welcome.html) - Amazon S3 or Amazon Simple Storage Service is a service offered by Amazon Web Services that provides object storage through a web service interface.


## Project structure
```
PROJECT_ROOT
├── README.md
├── build       # Static files
├── uploads     # Image files
├── database.js # Mysql configure
├── package-lock.json
├── package.json
├── s3.js       # AWS s3 configure
├── schema.sql  # Mysql shcema
└── server.js   # Main file
```
