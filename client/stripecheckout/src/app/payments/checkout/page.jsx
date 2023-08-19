"use client";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";


export default function CheckOutPage() {
  const [Loading, setLoading] = useState(true);
  const [StripeHandler, setStripeHandler] = useState(null);
  const [cardElementHandler, setCardelementHandler] = useState(null);

  async function AddStripeComp() {
    const stripe = await loadStripe(
      "pk_test_51NGnGsHWWssUp0efQhuaRItb7FlRhAQIUbLfKC8t9Jet4QpnfnLGSRKBEiOz3A0rBfclw5Q0AtAAXaUgfV8nyNIo00CCNSkGGn"
    );
    setStripeHandler(stripe);
    const elements = stripe.elements();
    const cardElement = elements.create("card");
    setCardelementHandler(cardElement);
    cardElement.mount("#card-element");
  }

  useEffect(() => {
    setLoading(true);
    AddStripeComp();
    setLoading(false);
  }, []);

  async function CreatePaymentIntent(amount) {
    const res = await fetch(
      "http://localhost:5000/payments/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amount }),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch payment intent");
    }

    const paymentIntent = await res.json();
    return paymentIntent; // Return the paymentIntent object
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await StripeHandler.createPaymentMethod({
      type: "card",
      card: cardElementHandler,
    });
    if (!error) {
      const { id } = paymentMethod;
      try {
        const result = await CreatePaymentIntent(15000);
        console.log(result);
        const { error } = await StripeHandler.confirmCardPayment(
          result.client_secret,
          {
            payment_method: id,
          }
        );
        if (error) {
          alert('Payment Unsuccessful')
          throw new Error(error.message);
        }else{
          alert('Payment Successful')
          try{
            const res = await fetch('http://localhost:5000/payments/saveEarlySubscription',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({customerId: result.customer, paymentIntentId: result.id})
            })
            if(!res.ok){
              throw new Error('Failed to save subscription')
            }
          }catch(error){
            console.log(error)
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (Loading)
    return (
      <div className=" loadingText">
        <p>Loading...</p>
      </div>
    );

  return (
    // call payment2
    <div className="paymentCont">
      <form id="payment-form">
        <div id="card-element"></div>
        <button id="submit-payment" onClick={handleSubmit}>
          Pay Now
        </button>
      </form>
    </div>
  );
}
