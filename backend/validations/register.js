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
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Email is invalid"),
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
  check("address")
    .exists({ checkFalsy: true })
    .isLength({ min: 2, max: 50 })
    .withMessage("Address is not valid"),
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
  check("birthdate")
    .exists({ checkFalsy: true })
    .custom((value) => isValidDate(value))
    .withMessage("Birthdate is not valid"),
  handleValidationErrors,
];

module.exports = validateRegisterInput;
