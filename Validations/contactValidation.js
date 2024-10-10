const yup = require("yup");


const phoneRegExp =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
                                                             
const contact = yup.object({
  fullname: yup.string().required(),
  email: yup.string().email().required(),
  telephone: yup
    .string()
    .required("Phone number is required")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(11, "to short must be list 11 numbers")
    .max(11, "to long must be 11 numbers"),
  message: yup.string().required(),
});

module.exports = contact;
