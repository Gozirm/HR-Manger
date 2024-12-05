import USER from "../modals/userModals.js";
import { sendWelcomeEmail, sendForgotPasswordMail } from "../emails/emailHandlers.js";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import crypto from "crypto";
import DEPARTMENT from "../modals/departmentModal.js";

export const signup = async (req, res) => {
  // Ensure req.user is available and has a role
  if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'super-admin')) {
    return res.status(403).json({ success: false, errMsg: "Access denied. Admins only." });
  }

  const {
    firstName,
    lastName,
    mobileNumber,
    email,
    dateOfBirth,
    maritalStatus,
    gender,
    address,
    officeOfEmployment,
    jobTitle,
    department,
    employmentStatus,
    salary,
    startDate,
    password,
    confirmPassword,
  } = req.body;

  try {
    // Create an array to hold the names of missing fields
    const missingFields = [];

    // Check for required fields and push missing ones to the array
    const requiredFields = [
      "firstName", "lastName", "mobileNumber", "email", "dateOfBirth",
      "maritalStatus", "gender", "address", "officeOfEmployment",
      "jobTitle", "department", "employmentStatus", "salary", "startDate",
      "password", "confirmPassword"
    ];

    requiredFields.forEach(field => {
      if (!req.body[field]) missingFields.push(field);
    });

    // If there are missing fields, log them and return an error response
    if (missingFields.length > 0) {
      console.log("Missing fields:", missingFields);
      return res.status(400).json({
        success: false,
        errMsg: `The following fields are required: ${missingFields.join(", ")}`,
      });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        errMsg: "Password and confirm password must match",
      });
    }

    // Check for existing email
    const existingEmail = await USER.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ success: false, errMsg: "Email already exists" });
    }

    // Check for existing mobile number
    const existingNumber = await USER.findOne({ mobileNumber });
    if (existingNumber) {
      return res.status(400).json({ success: false, errMsg: "Phone number already exists" });
    }

    // Check for profile image
    const imageToBeUploaded = req.files?.profileImage?.tempFilePath || req.body.profileImage;
    if (!imageToBeUploaded) {
      return res.status(400).json({ success: false, errMsg: 'Image has to be uploaded' });
    }

    // Upload image to Cloudinary
    let profileImageUrl;
    try {
      const result = await cloudinary.uploader.upload(imageToBeUploaded, {
        use_filename: true,
        folder: "hr_manager",
      });
      profileImageUrl = result.secure_url;
    } catch (uploadError) {
      console.error("Error uploading image to Cloudinary", uploadError);
      return res.status(500).json({ success: false, errMsg: "Image upload failed" });
    }

    // Check if department exists
    const dept = await DEPARTMENT.findOne({ name: department });
    if (!dept) {
      return res.status(404).json({ success: false, errMsg: "Department not found." });
    }

    // Create new user
    const newUser  = await USER.create({ ...req.body, profileImage: profileImageUrl, department: dept._id });
    dept.members.push(newUser ._id);
    await dept.save();

    // Send a welcome email (optional)
    const clientUrl = process.env.CLIENT_URL;
    try {
      await sendWelcomeEmail({
        to: newUser .email,
        firstName: newUser .firstName,
        clientUrl,
      });
    } catch (emailError ) {
      console.error("Error sending welcome email", emailError);
    }

    // Return the success response
    res.status(201).json({
      success: true,
      message: "Employee has been successfully added, and the department has been updated.",
      user: newUser ,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ success: false, errMsg: "Internal Server Error" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  // Check for required fields
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      errMsg: "All fields are required to sign in...",
    });
  }

  try {
    // Find user by email
    const user = await USER.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, errMsg: "User  not found" });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(404).json({ success: false, errMsg: "Email or Password is Incorrect" });
    }

    // Check if profileImage exists
    if (!user.profileImage) {
      return res.status(404).json({ success: false, errMsg: "No Profile Image Found" });
    }

    // Generate token
    const token = await user.generateToken();
    if (token) {
      return res.status(201).json({
        success: true,
        message: "Logged in",
        user: {
          role: user.role,
          email: user.email,
          firstName: user.firstName,
          profileImageOf:user.profileImage,
          token,
        },
      });
    }
  } catch (error) {
    console.error("Error during sign in:", error);
    return res.status(500).json({ success: false, errMsg: "Internal Server Error" });
  }
};
export const forgotPassword = async (req,res)=>{
    const {email} =req.body;
    try {
      if (!email){
        res.status(400).json({success:false, errMsg: "input field can not be empty"})
        return;
      }
      const user = await USER.findOne({email});
      if(!user){
        res.status(404).json({success:false, errMsg:"email not found"})
        return
      }
      const resetToken = user.getResetPasswordToken()
      await user.save();
      res.status(201).json({
        success: true,
        message: "mail sent"
      });
      
      const resetUrl = process.env.CLIENT_URL_RESET + resetToken;
      
      try {
        await sendForgotPasswordMail({
          to: user.email,
          firstName: user.firstName,
          resetUrl,
        })
  
        
      } catch (error) {
        user.getResetPasswordToken = undefined;
        user.getResetPasswordExpire = undefined;
        await user.save();
        return res.status(500).json({errMsg: "Email couldn't be sent", error})
        
      }
    } catch (error) {
      res.json(error.message)
    }
  }

 export const resetPassword = async (req,res)=>{
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
    try {
      const user = await USER.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
        // resetPasswordExpire:{$gt:Date('2024-12-20')}
  
      })
      if(!user){
        return res.status(400).json({status:false,message:"invalid Reset Token"})
      }
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save();
      res.status(201).json({success:true,message:"Password Reset Successfull"})
      
    } catch (error) {
      res.status(500).json(error.message)
      
    }
  }

export const verify = async (req,res) =>{
    return res.status(201).json({success:true, message: "Here is the user details", user:req.user})
}