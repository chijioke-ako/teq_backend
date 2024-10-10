

const yup = require("yup");

const SUPPORTED_FORMATS = [
  // 'image/jpg',
  // 'image/jpeg',
  // 'image/png',
  "application/pdf",
];



const resumeValidation = yup.object({
  surname: yup.string()
    .min(5, "Please enter you at list 5 character")
    .required("surnname is required !"),
  firstname: yup.string()
    .min(3, "Please enter your name")
    .required("firstname is required !"),
  email: yup.string().email().required(),
  resume: yup.mixed()
    .nullable()
    .required("Please upload a pdf only!")
    .test(
      "FILE_SIZE",
      "upload file is too big",
      (value) => !value || (value && value.size <= 1024 * 1024)
    )
    .test(
      "FILE_FORMAT",
      "upload file has unsupported format",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
    ),
});

module.exports = resumeValidation;
