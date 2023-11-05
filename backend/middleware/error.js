const ErrorHandler=require("../utils/errorHandler.js")

module.exports=(err,res,req,next)=>{
    err.statusCode=err.statusCode||500;

    res.status(err.statusCode).json(err)
}