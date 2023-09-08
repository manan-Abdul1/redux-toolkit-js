const express = require('express');
const { stripeIntent, getPaymentMethods, subscribe } = require('../controllers/paymentControllers');
const router = express.Router();


//Routes
router.post("/create-payment-intent", stripeIntent)
router.get("/get-payment-methods", getPaymentMethods)
router.post("/subscribe", subscribe)

module.exports = router;
