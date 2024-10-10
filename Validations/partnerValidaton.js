const yup = require("yup");


const partnerValidation = yup.object({
  name: yup.string().required("Partners is required !"),
  url: yup.string().required("url is required !"),
  logo: yup.mixed()
    .nullable()
    .required()
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

module.exports = partnerValidation;