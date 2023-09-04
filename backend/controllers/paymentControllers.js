const { default: Stripe } = require('stripe');
const stripe = require("stripe")("sk_test_51KnkeqIqyrZ1HZmgbOiUeTEmoPs7quZco6vYxIUk4nv7d0qvIGjJXjaXSkBmqf1xdq294RbIpxhhyxwzYexRw4GK00Y6H5fM2e")

const stripeIntent = async (req, res) => {
    try {
        const { paymentMethod } = req.body;

        // Create a Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1099, // Amount in cents ($10.99)
            currency: 'usd',
            payment_method: paymentMethod.id,
            confirm: true,
            off_session: true,
        });

        // Send the client_secret back to the frontend
        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        // Handle any errors that may occur during Payment Intent creation
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the Payment Intent.' });
    }
}
module.exports = {
   stripeIntent
};