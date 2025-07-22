import { body } from "express-validator";

export const userValidationRules = [
    body("name")
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 3 }).withMessage("Name should be more than 3 letters")
        .isLength({ max: 20 }).withMessage("Name is too long"),
    body("email")
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage("Invalid Email"),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({min: 6}).withMessage("Password should be atleast 6 characters")
]

export const loginValidationRules = [
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid Email"),
    body("password").notEmpty().withMessage("Password is required")
]