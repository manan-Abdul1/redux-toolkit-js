const express = require('express');
const { stripeIntent } = require('../controllers/paymentControllers');
const router = express.Router();


//Routes
router.post("/create-payment-intent", stripeIntent)

module.exports = router;
