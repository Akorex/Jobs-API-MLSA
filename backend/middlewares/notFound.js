import ApiError from "./errorHandler/api-error.js"


const notFound = (req, res, next) => {

    next(ApiError.notFound())
}

export default notFound