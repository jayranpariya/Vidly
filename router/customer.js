const express = require("express");
const router = express.Router();
const { Customer, validateCustomer } = require("../models/customer");

router.get("/",  async (req, res) => {
  const customer = await Customer.find().sort({
    name: 1,
  });
  res.send(customer);
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });
  await customer.save();
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const updatecustomer = await Customer.findByIdAndUpdate(req.params.id, {
    $set: {
      isGold: req.body.isGold,
      name: req.body.name,
      phone: req.body.phone,
    },
  });
  if (!updatecustomer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(updatecustomer);
});

router.delete("/:id", async (req, res) => {
  const deletecustomer = await Customer.findByIdAndRemove(req.params.id);
  if (!deletecustomer)
    return res.status(404).send("the customer with thr given id");
  res.send(deletecustomer);
});

router.get("/:id", async (req, res) => {
  const customerwithid = await Customer.findById(req.params.id);
  if (!customerwithid)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  res.send(customerwithid);
});

module.exports = router;
