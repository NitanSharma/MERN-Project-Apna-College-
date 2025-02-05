const Joi = require('joi'); // npm package use for server side schema validations

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required()   ,
        price: Joi.number().required().min(0),
        location :Joi.string().required() ,
        country :Joi.string().required() ,
        image : Joi.string().allow(" ", null)
    }).required()
})
