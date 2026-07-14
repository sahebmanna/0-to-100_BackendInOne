import mongoose from "mongoose";

import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    UserName: {
      type: String,
      required: true,
      index: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    Avatar: {
      type: String, //cloudenary url
      required: true,
    },
    CoverImage: {
      type: String, //cloudenary url
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password Required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

//it's a pre hook middleware bifore saving data in mongodb, it is used for hashing password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// this function for comparing the hashed password with user given poassword
userSchema.methods.isPassword = async function (password) {
  return await bcript.compare(password, this.password);
};

//generate access token

userSchema.methods.generateAccewssToken = async function () {
  return await jwt.sign(
    {
      _id: this._id,
      UserName: this.UserName,
      email: this.email,
      fullname: this.fullname,
    },
    ACCESS_TOKEN_SECRET,
    {
      expireIn: ACCES_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = async function () {
  return await jwt.sign(
    {
      _id: this._id,
    },
    REFRESH_TOKEN_SECRET,
    {
      expireIn: REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
