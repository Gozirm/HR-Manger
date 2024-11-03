import USER from "../modals/userModals.js";
import { sendWelcomeEmail, sendForgotPasswordMail } from "../emails/emailHandlers.js";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import crypto from "crypto";
import DEPARTMENT from "../modals/departmentModal.js";

// sign-up
export const signup = async (req, res) => {
    if (req.user.role !== 'admin' && req.user.role !== 'super-admin') {
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
      profileImage,
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
      if (
        !firstName ||
        !lastName ||
        !mobileNumber ||
        !email ||
        !dateOfBirth ||
        !maritalStatus ||
        !gender ||
        !address ||
        !officeOfEmployment ||
        !jobTitle ||
        !department ||
        !employmentStatus ||
        !salary ||
        !startDate ||
        !password ||
        !confirmPassword
      ) {
        res.status(400).json({
          success: false,
          errMsg: "all fields are required to register...",
        });
        return;
      }
      if (password !== confirmPassword) {
        res.status(400).json({
          success: false,
          errMsg: "password and confirm password must match",
        });
        return;
      }
      const existingEmail = await USER.findOne({ email });
      if (existingEmail) {
        res.status(400).json({ success: false, errMsg: "Email already exists" });
        return;
      }
      const existingNumber = await USER.findOne({mobileNumber});
      if(existingNumber){
        res.status(400).json({ success: false, errMsg: "phone number already exists"});
        return;
      }
      //
      if (!req.files || !req.files.profileImage) {
        return res
          .status(400)
          .json({ success: false, errMsg: "Profile image is required" });
      }
  
      const result = await cloudinary.uploader.upload(
        req.files.profileImage.tempFilePath,
        {
          use_filename: true,
          folder: "hr_manager",
        }
      );
  
      req.body.profileImage = result.secure_url;
  
      fs.unlinkSync(req.files.profileImage.tempFilePath);
  
       const newUser = await USER.create({ ...req.body });
  
       // Find the department and add the new employee to the members array
       const dept = await DEPARTMENT.findById(department);
       if (!dept) {
         return res.status(404).json({ success: false, errMsg: "Department not found." });
       }
   
       dept.members.push(newUser._id); // Add new user's ID to the members array
       await dept.save(); // Save the department with the new member
   
       // Send a welcome email (optional)
       const clientUrl = process.env.CLIENT_URL;
   
       try {
         await sendWelcomeEmail({
           to: newUser.email,
           firstName: newUser.firstName,
           clientUrl,
         });
       } catch (emailError) {
         console.error("Error sending welcome email", emailError);
       }
   
       // Return the success response
       res.status(201).json({
         success: true,
         message: "Employee has been successfully added, and the department has been updated.",
         user: newUser,
       });
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  };
export const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      success: false,
      errMsg: "all field are required to sign in...",
    });
    return;
  }
  try {
    const user = await USER.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, errMsg: "user not found" });
    }
    //   comparing password and validation password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res
        .status(404)
        .json({ success: false, errMsg: "Email or Password is Incorrect" });
      return;
    }
    const token = await user.generateToken();
    if (token) {
      res.status(201).json({
        success: true,
        message: "logged in",
        user: {
          role: user.role,
          email: user.email,
          firstNameName: user.firstName,
          token,
        },
      });
      return;
    }
  } catch (error) {}
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
    return res.status(201).json({success:true, user:req.user})
}