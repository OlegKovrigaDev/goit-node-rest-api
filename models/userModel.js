import { model, Schema } from 'mongoose';
import handleMongooseError from '../helpers/handleMongooseError.js';

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: String,
    avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.post('save', handleMongooseError);
const User = model('User', userSchema);

export { User };
