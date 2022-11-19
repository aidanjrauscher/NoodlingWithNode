const errors = require('../errors/errors')
const {StatusCodes} = require("http-status-codes")

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof errors.CustomAPIError) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message })
  }
  return res.status(500).send('Something went wrong try again later')
}

module.exports = errorHandlerMiddleware
