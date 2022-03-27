import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

// the email will be unique in the db
export const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// this function will be exe before the user will be entered to the db
// TODO: problem
UserSchema.pre('save', async function (next/*: mongoose.HookNextFunction*/) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
