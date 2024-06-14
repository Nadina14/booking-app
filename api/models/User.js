import mongoose from "mongoose";
const { Schema, model } = mongoose;
import validator from "validator";
import { comparePassword, hiddenPassword } from "../library/cryptingPass.js";
const { isStrongPassword, isEmail } = validator;


const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

UserSchema.statics.signUp = async function (username, email, password) {
  if (!isEmail(email)) {
    const error = new Error("You not send a real email.");
    error.statusCode = 400;
    throw error;
  }
  if (!isStrongPassword(password, strongPasswordOptions)) {
    const error = new Error("Password not strong.");
    error.statusCode = 400;
    throw error;
  }

  const emailEx = await this.exists({ email });
  if (emailEx) {
    const error = new Error("Account already exists.");
    error.statusCode = 400;
    throw error;
  }
  const hashedPassword = await hiddenPassword(password);

  const user = await this.create({ username, email, password: hashedPassword });
  return user;
};

UserSchema.statics.logIn = async function (email, password) {
  const user = await this.findByEmail(email);
  const failError = () => {
    const error = new Error("Email or Password not valid.");
    error.statusCode = 401;
    throw error;
  };

  if (!user) {
    failError();
  }

  const passwordMatch = await comparePassword(password, user.password);
  if (!passwordMatch) {
    failError();
  }

  return user;
};

UserSchema.methods.clean = function () {
  const user = this.toObject();
  delete user.password;
  delete user.__v;
  delete user._id;
  return user;
};

export default mongoose.model("User", UserSchema);