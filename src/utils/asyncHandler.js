const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}


export { asyncHandler }

/* const asyncHandler = (fun) =>
    async(req, res, next) => {
        try {
            await fun(req, res, next)
        } catch (error) {
            res.ststus(err.code || 500).json({
                success: fals,
                message: err.message
            })
        }
    }
        */