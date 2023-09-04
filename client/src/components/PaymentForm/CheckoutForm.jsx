import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import './PaymentForm.css';
import axios from 'axios';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const initializeStripe = async () => {
      if (!stripe || !elements) {
        return;
      }
      // Create individual card elements
      // const cardElement = elements.create('card');
      const cardNumberElement = elements.create('cardNumber',{
        placeholder: "Card Number"
      });
      const cardExpiryElement = elements.create('cardExpiry', {
        placeholder:" Expiration Date(mm/yy) "
      });
      const cardCvcElement = elements.create('cardCvc');


      // Mount the CardElement to your desired DOM element
      // cardElement.mount('#card-element');
      cardNumberElement.mount('#card-number-element');
      cardExpiryElement.mount('#card-expiry-element');
      cardCvcElement.mount('#card-cvc-element');
    };

    initializeStripe();
  }, [elements,stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("stripe:: ",stripe);
    console.log("elements:: ",elements);
    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);

    try {
      // Create a Payment Method
      const { paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      console.log("paymentMethod:: ",paymentMethod);
      // If the Payment Method is successfully created, send it to your server
      if (paymentMethod) {
        const res = await axios.post('http://localhost:5500/user/create-payment-intent', {
          paymentMethod
        });

        const clientSecret = res.data.clientSecret;

        // Use the clientSecret to confirm the Payment Intent
        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: "testett",
            },
          },
        });

        if (error) {
          setMessage(`Payment failed: ${error.message}`);
        } else if (paymentIntent.status === 'succeeded') {
          setMessage('Payment Successful!');
        }
      } else {
        setMessage('Payment failed.');
      }
    } catch (error) {
      setMessage('Payment failed.');
    }

    setIsProcessing(false);
  };

  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit}>

        {/* <div id="card-element"></div> */}
        <div className='custom-card-container'>
          <input className="card-name" placeholder='Name on the Card'></input>
          <div id="card-number-element"></div>
          <table>
            <tr>
              <td><div id="card-expiry-element"></div></td>
              <td><div id="card-cvc-element"></div></td>
            </tr>
          </table>
        </div>
        
        <button disabled={isProcessing || !stripe || !elements} id="submit">
          <span id="button-text">
            {isProcessing ? 'Processing ... ' : 'Pay now'}
          </span>
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>
    </>
  );
};

export default PaymentForm;
