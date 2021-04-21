import { validationResult } from "express-validator";

const search = (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    return res.json({ reqParams: req.query });
  } catch (error) {
    res.status(400).json(err);
  }
};

export { search };
