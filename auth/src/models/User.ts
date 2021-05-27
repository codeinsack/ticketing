import mongoose from 'mongoose';

interface UserAttributes {
  email: string;
  password: string;
}

interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDocument> {
  build: (attrs: UserAttributes) => UserDocument;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

userSchema.statics.build = (attrs: UserAttributes) => new User(attrs);

export { User };
