import { body } from "express-validator";

const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username should not be empty")
      .isLowercase()
      .withMessage("Username must be in lower case")
      .isLength({ min: 3 })
      .withMessage("Username must be atleast of 3 characters long"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password should not be empty")
      .isLength({ min: 3 })
      .withMessage("Username must be atleast of 3 characters long"),
    body("fullname").optional().trim(),
  ];
};

export { userRegisterValidator };
