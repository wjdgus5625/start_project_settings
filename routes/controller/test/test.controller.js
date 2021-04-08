import { validationResult } from "express-validator";

const test = (req, res, next) => {
    try {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json(errors)
        }

        return res.json({ text: 'test' })
    } catch (error) {
        console.log(err)
        res.status(400).json(err)
    }
    
}

export {
    test
}