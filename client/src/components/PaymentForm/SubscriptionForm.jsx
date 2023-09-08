import React, { useState } from "react";
import { Elements, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useSelector } from "react-redux";

const SubscriptionForm = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const usersEmail = useSelector(state => state.users.user.email)
  const customerId = useSelector(state => state.users.user.customerId)



  const handleSubscribe = async () => {
    if (!stripe || !elements || !selectedPlan) {
      return;
    }

    // Collect payment method details using CardElement
    const cardElement = elements.getElement(CardElement);

    // Create a payment method
    // const { paymentMethod, error } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: cardElement,
    // });

    // if (error) {
    //   // Handle payment method creation error
    //   console.error(error);
    //   return;
    // }

    // Send payment method ID and selected plan's price to your backend
    try {
      const response = await axios.post("http://localhost:5500/payment/subscribe", {
        // paymentMethodId: paymentMethod.id,
        price: selectedPlan,
        email: usersEmail,
        customerId
      });

      // Handle the response from your backend
      console.log(response.data);
    } catch (error) {
      // Handle subscription request error
      console.error(error);
    }
  };

  return (
    <div>
      <select onChange={(e) => setSelectedPlan(e.target.value)}>
        <option value="1000">Basic - $10</option>
        <option value="2000">Pro - $20</option>
      </select>
      <CardElement />
      <button onClick={handleSubscribe}>Subscribe</button>
    </div>
  );
};

export default SubscriptionForm;
