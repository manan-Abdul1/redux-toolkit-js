const stripe = require("stripe")("sk_test_51KnkeqIqyrZ1HZmgbOiUeTEmoPs7quZco6vYxIUk4nv7d0qvIGjJXjaXSkBmqf1xdq294RbIpxhhyxwzYexRw4GK00Y6H5fM2e");
const userModel = require('../models/usersSchema');

const stripeIntent = async (req, res) => {
    try {
        const { paymentMethod, email, isSave } = req.body;

        // Check if a customer with the provided email already exists
        const existingCustomers = await stripe.customers.list({ email: email });
        let customerId;
        if (existingCustomers.data.length === 0) {
            // If no customer found, create a new customer
            const customer = await stripe.customers.create({
                payment_method: paymentMethod.id,
                email: email,
                invoice_settings: {
                    default_payment_method: paymentMethod.id,
                },
            });
            customerId = customer.id;
            await userModel.findOneAndUpdate({ email: email }, { customerId: customerId });
        }
        else {
            customerId = existingCustomers.data[0].id;
        }
        if (isSave) {
            const attachPaymentToCustomer = await stripe.paymentMethods.attach(
                paymentMethod.id,
                { customer: customerId }
            );
        }
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1099, // Amount in cents ($10.99)
            currency: 'usd',
            payment_method: paymentMethod.id,
            customer: customerId,
            confirm: true,
            off_session: true,
        });
        // Send the client_secret back to the frontend
        return res.status(200).json({ clientSecret: paymentIntent.client_secret, customerId: paymentIntent.customer });

    } catch (error) {
        // Handle any errors that may occur during Payment Intent creation
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the Payment Intent.' });
    }
};
const getPaymentMethods = async (req, res) => {
    try {
        const { customerId } = req.query;
        const paymentMethod = await stripe.customers.listPaymentMethods(customerId);
        res.json({ paymentMethods: paymentMethod.data });
    } catch (error) {
        // Handle any errors that may occur during Payment Intent creation
        console.error(error);
        res.status(500).json({ error: 'An error occurred while get the Payment Methods.' });
    }
};
const subscribe = async (req, res) => {
    try {
        const {  price, customerId } = req.body;
        //create a plan
        
        // const plan = await stripe.plans.create({
        //     amount: price,
        //     currency: 'usd',
        //     interval: 'month',
        //     product: 'prod_M6W5bcLO3xnfPy',
        // });
        // console.log(plan, 'plan')

        const priceMethod = await stripe.prices.create({
            unit_amount: price,
            currency: 'usd',
            recurring: {interval: 'month'},
            product: 'prod_M6W5bcLO3xnfPy',
          });
          console.log(priceMethod,'price method')
        // Create a customer in Stripe
        // const customer = await stripe.customers.create({
        //     payment_method: paymentMethodId,
        //     email: email, 
        //     invoice_settings: {
        //         default_payment_method: paymentMethodId,
        //     },
        // });
        console.log(customerId, 'customerId')

        // Subscribe the customer to the selected plan
        const subscription = await stripe.subscriptions.create({
            customer: customerId,
            items: [
                {
                    price: priceMethod.id
                    // plan: plan.id,
                },
            ],
            // expand: ['latest_invoice.payment_intent'],
        });
        console.log(subscription, 'subscription')

        // Return the subscription status to the client
        res.json({ subscription });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the subscription.' });
    }
}
module.exports = {
    stripeIntent,
    getPaymentMethods,
    subscribe
};
