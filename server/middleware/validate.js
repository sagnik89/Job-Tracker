import { validationResult } from "express-validator";

export const validate = async function (req, res, next) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((e) => e.msg)
        return res.status(400).json({error: errorMessages})
    }

    next()
}
