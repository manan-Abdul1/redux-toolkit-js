const express = require('express');
const { stripeIntent, getPaymentMethods } = require('../controllers/paymentControllers');
const router = express.Router();


//Routes
router.post("/create-payment-intent", stripeIntent)
router.get("/get-payment-methods", getPaymentMethods)

module.exports = router;
