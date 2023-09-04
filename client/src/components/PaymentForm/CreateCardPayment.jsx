import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe('pk_test_51KnkeqIqyrZ1HZmgUEhmVWrDqSZ5qqjzQy5rgeY5YoACMA0Y9MEBVMLK1ppgtb3kJd1x5JhWt96Jvo6qyIBnzkLo00MdZdGSJS');


const CreateCardPayment = () => {
  return (
      <Elements stripe={stripePromise}> 
        <PaymentForm />
      </Elements>
  );
};

export default CreateCardPayment;
