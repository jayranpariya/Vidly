const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
const customerSchema = new Schema({
  isGold: {
    type: Boolean,
    required: true,
    default: false,
  },
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 10,
  },
  phone: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 10,
  },
});

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(3).required(),
    phone: Joi.string().required(),
    isGold: Joi.boolean(),
  };

  return Joi.validate(customer, schema);
}

const Customer = mongoose.model("Customer", customerSchema);
module.exports = { Customer, validateCustomer };
