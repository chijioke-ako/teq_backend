const yup = require("yup");


const pubValidation = yup.object({
  title: yup.string()
    .min(5, 'Please enter you at list 5 character')
    .required('Please enter you, Title is required !'),
  author: yup.string()
    .min(3, 'Please enter your name')
    .required('author is required !'),
  feature_image: yup.mixed()
    .nullable()
    .required()
    .test(
      'FILE_SIZE',
      'upload file is too big',
      (value) => !value || (value && value.size <= 1024 * 1024)
    )
    .test(
      'FILE_FORMAT',
      'upload file has unsupported format',
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
    ),

});

module.exports = pubValidation;