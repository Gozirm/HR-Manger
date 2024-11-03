import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    mobileNumber: {
      type: String,
      trim: true,
      required: [true, "Please enter a phone number"],
      unique: [11, "Maximum length must be 10"],
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: [true, "Email already is in use"],
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is Invalid");
        }
      },
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    maritalStatus: {
      type: String,
      enum: ["single", "married", "complicated", "in a relationship"],
      required: [true, "Marital status is required"],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "plase select a gender"],
    },
    address: {
      type: String,
      trim: true,
      required: [true, "address is required"],
    },
    profileImage: {
      type: String,
    },
    role: {
      type: String,
      enum: ["employee", "admin", "super-admin"],
      default: "employee",
    },
    officeOfEmployment: {
      type: String,
      trim: true,
      required: [true, "Offic of employment is required"],
    },
    jobTitle: {
      type: String,
      trim: true,
      required: [true, "Job title is required"],
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "department",
      required: true,
    },
    employmentStatus: {
      type: String,
      enum: ["on-site", "remote", "hybrid"],
      required: [true, "please select employment status"],
    },
    salary: {
      type: Number,
      trim: true,
      required: [true, "start date is required"],
    },
    startDate: {
      type: String,
      trim: true,
      required: [true, "start date is reqiured"],
    },
    password: {
      type: String,
      trime: true,
      required: [true, "Please enter a valid password"],
      minlength: [8, "Mininum password lenght must be 8 character"],
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("password mus't contain password");
        }
      },
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },

  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// password comparison
userSchema.methods.comparePassword = async function (userPassword) {
  const isCorrect = await bcrypt.compare(userPassword, this.password);
  return isCorrect;
};
// generate jwt token
userSchema.methods.generateToken = async function (params) {
  let token = jwt.sign(
    {
      userId: this._id,
      role: this.role,
      firstName: this.firstName,
      email: this.email,
      lastName: this.lastName,
    },
    process.env.JWT_SECRETE,
    {
      expiresIn: "24h",
    }
  );

  return token;
};
//   Generating reset password token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * (60 * 100);
  return resetToken;
};
const USER = mongoose.model("user", userSchema);
export default USER;
