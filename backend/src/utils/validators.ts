import { NextFunction,Response,Request } from "express"
import { body,ValidationChain, validationResult } from "express-validator"

export const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        for (let validation of validations) {   
            await validation.run(req); // Ensure all validations run
        }

        const errors = validationResult(req);
        console.log(errors.array()); // Debugging log

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        next();
    };
};


export const loginValidation = [
    body("email").trim().isEmail().withMessage("Email is Required"),
    body("password").trim().isLength({min:8}).withMessage("Password should contain atleast 8 charachters"),
]
export const signupValidation = [
    body("name").notEmpty().withMessage("Name is Required"),
    ...loginValidation,
]
export const chatCompletionValidation = [
    body("message").notEmpty().withMessage("message is Required"),
]