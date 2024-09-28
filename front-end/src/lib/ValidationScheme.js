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
  firstName: yup.string().required("First Name Cannot Be Empty"),
  lastName: yup.string().required("Last Name Cannot Be Empty"),
  phoneNum: yup.number().positive().integer("hi").required("Please Enter Your Number"),
})
.required()
