import { StatusCodes } from "http-status-codes"


class ApiError {

    constructor(code, message){
        this.code = code
        this.message = message
    }

    static notFound() {
        return new ApiError(StatusCodes.NOT_FOUND, `Requested resource not found`)
    }

    static badRequest(message){
        return new ApiError(StatusCodes.BAD_REQUEST, message)
    }

    static internalError() {
        return new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, `Internal server error`)
    }

}




export default ApiError