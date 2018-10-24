import { Schema, model } from 'mongoose';
import moment = require('moment-timezone');
import mnt from 'moment';

moment.tz.setDefault('Asia/Seoul');
const bookSchema: Schema = new Schema({
  title: String,
  author: String,
  published_date: {
    type: String,
    default: new Date().toLocaleString()
  }
});
export default model('Book', bookSchema);
