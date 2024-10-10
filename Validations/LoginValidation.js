const yup = require("yup");

// const emailRegExp =
//   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// const passwordRegExp =
//   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;

const loginValidation = yup.object({
  email: yup
    .string()
    .email("Invalid email")
    .required("Please enter a valid email"),
    // .matches(emailRegExp, "Please enter a valid email"),

  password: yup
    .string()
    .required("password is required")
    .min(8, "Minimum Required length is 8")
    .max(20, "Maximum Required length 20")
    // .matches(
    //   passwordRegExp,
    //   "password must be at least one uppercase letter, one lowercase letter, one number and one special character 8."
    // ),
});

module.exports = loginValidation;
