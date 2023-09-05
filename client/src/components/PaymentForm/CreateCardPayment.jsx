import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import axios from "axios";
import { useSelector } from "react-redux";

const stripePromise = loadStripe('pk_test_51KnkeqIqyrZ1HZmgUEhmVWrDqSZ5qqjzQy5rgeY5YoACMA0Y9MEBVMLK1ppgtb3kJd1x5JhWt96Jvo6qyIBnzkLo00MdZdGSJS');

const CreateCardPayment = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const customerId = useSelector(state => state.users.user.customerId)
  
  
  const getPaymentMethods = async () => {
    try {
      const response = await axios.get(`http://localhost:5500/payment/get-payment-methods?customerId=${customerId}`);
      return response.data.paymentMethods;
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      return;
    }
  };
  
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      const methods = await getPaymentMethods();
      setPaymentMethods(methods);
    };

    fetchPaymentMethods();
  }, []);
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm paymentMethods={paymentMethods} />
    </Elements>
  );
};

export default CreateCardPayment;
