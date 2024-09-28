import * as yup from "yup";

export const logInSchema = yup
  .object({
    email: yup.string().required().email("Invalid email format"),
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
