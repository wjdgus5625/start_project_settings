const test = (req, res, next) => {
    try {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json(errors)
        }

        return res.json({ text: 'test' })
    } catch (error) {
        res.status(400).json(err)
    }
}

export { test };
