const yup = require("yup");


const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRegExp =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
  
const userValidation = yup.object({

firstname: yup.string()
    .required("First name is required")
    .min(3, "Minimum Required length is 3")
    .max(10, "Maximum Required length 10"),
  lastname: yup.string()
    .required("Last name is required")
    .min(3, "Minimum Required length is 3")
    .max(10, "Maximum Required length 10"),
  role: yup.string().required("role name is required"),
  email: yup.string()
    .email("Invalid email")
    .required("Please enter a valid email")
    .matches(emailRegExp, "Please enter a valid email"),

  password: yup.string()
    .required("password is required")
    .min(8, "Minimum Required length is 8")
    .max(20, "Maximum Required length 20")
    .matches(
      passwordRegExp,
      "password must be at least one uppercase letter, one lowercase letter, one number and one special character 8."
    ),
  confirmPassword: yup.string()
    .required("confirm Password required")
    .oneOf(
      [yup.ref("password"), null],
      " Must match the the first password input"
    ),
});

module.exports = userValidation;