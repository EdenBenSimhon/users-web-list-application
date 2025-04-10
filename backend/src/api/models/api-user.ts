import mongoose from 'mongoose';

interface IApiUser extends Document {
  id: String;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  page: Number;
}

const apoiUserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  page: {
    type: Number,
    required: true,
  },
});

const ApiUserModel = mongoose.model<IApiUser>('ApiUser', apoiUserSchema);

export { ApiUserModel };
