const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

// validateRegisterInput is a combination Express middleware that uses the
// `check` middleware to validate the keys in the body of a request to
// register a user

function isValidDate(dateString) {
  const dateObject = new Date(dateString);
  return !isNaN(dateObject.getTime());
}

const validateRegisterInput = [
  //Email Validation
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Email is invalid"),

  //Username Validation
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 2, max: 30 })
    .withMessage("Username must be between 2 and 30 characters")
    .custom((value) => {
      if (value.includes(" ")) {
        throw new Error("Username should not contain spaces");
      }
      return true;
    }),

  //Address Validation
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Address is required"),
  check("address")
    .isLength({ min: 2, max: 50 })
    .withMessage("Address must be between 2 and 50 characters"),

  //Password Validation
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6, max: 30 })
    .withMessage("Password must be between 6 and 30 characters")
    .custom((value) => {
      if (value.includes(" ")) {
        throw new Error("Password should not contain spaces");
      }
      return true;
    }),

  //Birthday Validation
  // check("birthdate")
  //   .exists({ checkFalsy: true })
  //   .withMessage("Birthdate is required"),
  // check("birthdate")
  //   .custom((value) => isValidDate(value))
  //   .withMessage("Birthdate is not valid"),

  //Age Validation
  check("age").custom((value) => {
    if (value == null || value === undefined) {
      throw new Error("Age is required");
    }
   
  }),

  handleValidationErrors,
];

module.exports = validateRegisterInput;
