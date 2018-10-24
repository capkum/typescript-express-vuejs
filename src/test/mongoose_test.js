// import mongoose = require("mongoose"); only typescript
const mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');
mongoose.Promise = global.Promise;

const dbUri = 'mongodb://test:test@localhost:27017/test';
const options = {
  useNewUrlParser: true
};
mongoose.connect(dbUri, options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.info("Connected to mongod server");
})

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: String,
  author: String,
  published_date: {
    type: Date,
    default: Date.now
  }
});

const Book = mongoose.model('book', bookSchema);

let book = new Book();
book.title = 'Nodjs & mongodb';
book.author = 'capkuma';

let promise = book.save();
promise.then((data) => {
  console.log('run 1');
  console.log("save data: " + data);
  Book.find((err, data) => {
    return data;
  })
});
// promise.then((data) => {
//   console.log('run 2');
//   console.log("find data: " + data);
//   Book.deleteMany((err, data) => {
//     console.log(data);
//   })
// });
