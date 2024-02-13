import { model, Schema } from 'mongoose';
import handleMongooseError from '../helpers/handleMongooseError.js';
import { User } from './userModel.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

contactSchema.post('save', handleMongooseError);
const Contact = model('Contact', contactSchema);

export { Contact };
