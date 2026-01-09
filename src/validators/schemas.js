const Joi = require("joi");

const auth = {
    register:Joi.object({
        name:Joi.string().min(3).max(30).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(6).required()
    }),
    login:Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(6).required()
    })
};
const product = {
  create: Joi.object({
    name: Joi.string().min(2).required(),
    description: Joi.string().allow("").optional(),
    price: Joi.number().positive().required(),
    stock: Joi.number().integer().min(0).required()
  }),
  update: Joi.object({
    name: Joi.string().min(2).optional(),
    description: Joi.string().allow("").optional(),
    price: Joi.number().positive().optional(),
    stock: Joi.number().integer().min(0).optional()
  })
};
const cart = {
  add: Joi.object({
    productId: Joi.number().integer().required(),
    quantity: Joi.number().integer().min(1).required()
  })
};
const order = {
  place: Joi.object({}) 
};

module.exports = {
    auth,
    product,
    cart,
    order
};
