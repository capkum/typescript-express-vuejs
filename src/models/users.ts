import { Schema, model } from 'mongoose';
import { isEmail } from 'validator';

// let validateEmail = (email: String) => {
//   let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   return re.test(email);
// };

const userSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trime: true,
    index: true,
    validate: {
      validator: isEmail,
      message: 'Invalid email.'
    }
  },
  picture: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  createAt: {
    type: String,
    default: new Date().toLocaleString()
  }
});

export default model('Users', userSchema);
