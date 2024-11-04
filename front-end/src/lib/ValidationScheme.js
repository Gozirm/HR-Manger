import * as yup from "yup";

export const logInSchema = yup
  .object({
    email: yup.string().required().email("Invalid email format"),
    password: yup
      .string()
      .required("password cannot be empty")
      .min(8, "min lenght of password should be atleast 8 chrs"),
    })
    .required();
    
export const forgotPwdSchema = yup
  .object({
    email: yup.string().required().email("Invalid email format"),
    })
    .required();


export const signinSchema = yup
  .object({
    // email: yup.string().required().email("Invalid email format"),
    password: yup
      .string()
      .required("password cannot be empty")
      .min(8, "min lenght of password should be atleast 8 chrs"),
      confirmPwd: yup
      .string()
      .required("confirm password cannot be empty")
      .min(8, "min lenght of password should be atleast 8 chrs")
      .oneOf([yup.ref("password")], "password do not match"),
    })
    .required();
    
    export const formSchema = yup
    .object({
      email: yup
      .string()
      .required("Email Cannot Be Empty")
      .email("Invalid email format"),
      password: yup
        .string()
        .required("password cannot be empty")
        .min(8, "min lenght of password should be atleast 8 chrs"),
      confirmPwd: yup
        .string()
        .required("confirm password cannot be empty")
        .min(8, "min lenght of password should be atleast 8 chrs")
        .oneOf([yup.ref("password")], "password do not match"),
    lastName: yup.string().required("Last Name Cannot Be Empty"),
    phoneNum: yup.string().required("Please Enter Your Number"),
    general: yup.string().required("Cannot be Empty"),
    generalFirst: yup.string().required("Cannot be Empty"),
    generalSecond: yup.string().required("Cannot be Empty"),
    firstName: yup.string().required("First Name Cannot Be Empty"),
  })
  .required();

  // for personal info

  export const personalInformation = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    mobileNumber: yup.string().required("Mobile Number is required").max(11, "max lenght of phone number should be at least 10")
    ,
    email: yup.string().email("Invalid email").required("Email is required"),
    dateOfBirth: yup.date().nullable() 
    .required("Date of Birth is required")
    .typeError("Date of Birth must be a valid date"),
    maritalStatus: yup.string().oneOf(["married", "single"], "Marital Status is required")
    .required("Marital Status is required"),
    gender: yup.string().oneOf(["male", "female"], "Gender is required")
    .required("Gender is required"),
    address: yup.string().required("Address is required"),
    profileImage: yup.mixed().required("Profile Image is required").nullable(),
  });

  export const professional = yup.object().shape({
    professionalInfo: yup.string().required("Office of Employment is required"),
    jobTitle: yup.string().required("Job Title is required"),
    department: yup.string().required("Department is required"),
    employmentStatus: yup.string().oneOf(["on-site",  "remote","hybrid"], "Employment Status is required"),
  });

  export const salary = yup.object().shape({
    salary: yup.number().required("Amount is required").positive("Amount must be positive").nullable() 
    .typeError("Amount must be positive"),
    startDate: yup.string().required("Start date is required"),
  });

 export const userAccount = yup.object().shape({
    password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords must match").required("Confirm Password is required"),
  });