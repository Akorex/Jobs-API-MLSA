export const errorResponse = (res, statusCode, error) => {

    res.status(statusCode).send({status: 'error', error})

}

export const successResponse = (res, statusCode, message, data) => {
    res.status(statusCode).send({
        status: 'success',
        message: message,
        data
    })
}