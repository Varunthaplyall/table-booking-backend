const joi = require("joi");

const bookingSchema = joi.object({
  name: joi.string().min(2).max(50).required(),
  phoneNumber: joi
    .string()
    .pattern(/^[0-9]{10}$/)
    .required(),
  numberOfGuests: joi.number().min(1).max(10).required(),
  date: joi.date().required(),
  time: joi
    .string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/)
    .required(),
});
module.exports = bookingSchema;
