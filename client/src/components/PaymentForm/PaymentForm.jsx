import React, { useState } from "react";
import "./PaymentForm.css";
import { useElements, useStripe, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux-toolkit/features/users/userSlice";

const inputStyle = {
  fontWeight: '500',
  fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
  fontSize: '16px',
  fontSmoothing: 'antialiased',
  '::placeholder': {
    color: 'rgb(175, 175, 217)',
    fontWeight: 'bolder',
    // paddingLeft: '20px'
  },
  // padding: '10px'
}

const PaymentForm = ({ paymentMethods }) => {
  const [name, setName] = useState("");
  const elements = useElements();
  const stripe = useStripe();
  const [message, setMessage] = useState(null);
  const [isSave, setIsSave] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch()

  const usersEmail = useSelector(state => state.users.user.email)

  const handlePayment = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const cardElement = elements.getElement(CardNumberElement);

      if (cardElement) {
        const { paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            name,
          },
        });

        const res = await axios.post('http://localhost:5500/payment/create-payment-intent', {
          paymentMethod,
          email: usersEmail,
          isSave
        });

        if (res) {
          setMessage('Payment Successful!');
        }

        if (res.data.customerId) {
          dispatch(updateUser(res.data.customerId))
        }
      }
    } catch (err) {
      setMessage(err.message);
    }

    setIsProcessing(false);
  };

  return (
    <div className="custom-card-form">
      {(paymentMethods?.length !== 0 && paymentMethods !== undefined) && !showForm ? (
        <div className="payment-method-selector">
          <select className="payment-method-dropdown">
            {paymentMethods?.map((item, index) => (
              <option key={index} value={item.card.id}>
                {item.card.brand} - {item.card.country}
              </option>
            ))}
          </select>
          <button
            className="add-card-button"
            onClick={() => setShowForm(!showForm)}
          >
            Add New Card
          </button>
        </div>

      ) : (
        <form onSubmit={handlePayment}>
          <h2>Custom Card Payment</h2>
          <div className="input-wrapper">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name on the Card"
            />
          </div>

          <div className="input-wrapper">
            <CardNumberElement
              options={{
                style: {
                  base: inputStyle,
                },
                placeholder: "Card Number"
              }}
            />
          </div>
          <table>
            <tbody>
              <tr>
                <td>
                  <div className="input-wrapper">
                    <CardExpiryElement
                      options={{
                        style: {
                          base: inputStyle,
                        },
                        placeholder: "Expiration Date (mm/yy)"
                      }}
                    />
                  </div>
                </td>
                <td>
                  <div className="input-wrapper">
                    <CardCvcElement
                      className="cvc"
                      options={{
                        style: {
                          base: inputStyle,
                          // width: '50%',
                        },
                        placeholder: "CVC"
                      }}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          {message && <div className="message">{message}</div>}
          <p><input type="radio" onChange={() => setIsSave(true)} />Save</p>
          <button disabled={isProcessing || !stripe || !elements} id="submit">
            <span id="button-text">
              {isProcessing ? 'Processing ... ' : 'Pay now'}
            </span>
          </button>
        </form>
      )}
    </div>
  );
};

export default PaymentForm;
