import express from "express"
import { userLogin, userSignup } from "../controllers/authController.js"
import { loginValidationRules, userValidationRules } from "../validators/userValidator.js"
import { validate } from "../middleware/validate.js"

const router = express.Router()

router.post("/signup", userValidationRules, validate, userSignup) // user signup

router.post("/login", loginValidationRules, validate, userLogin); //user login route

export default router