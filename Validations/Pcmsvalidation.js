const yup = require("yup");

const phoneRegExp =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

const pcmsValidation = yup.object({
  name: yup.string()
    .min(5, "Please enter you name at list 5 character")
    .max(50, "Too Long!")
    .required(" Name is required !"),
  email: yup.string().email("Invalid email").required("Please enter  email"),
  telephone: yup.string()
    .required("Phone number is required")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(11, "to short")
    .max(11, "to long")
});

module.exports = pcmsValidation;
