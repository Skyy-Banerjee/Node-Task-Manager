const asyncWrapper = (fx) => {
    return async (req, res, next) => {
        try {
            await fx(req, res, next);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = asyncWrapper