//create a new page component to display the plans and the checkout button to subscribe to the plan
//available plans are premium and basic
"use client";
import React from "react";
// import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
// import CheckoutForm from '@payments/checkout';
import "./page.styles.css";
import CheckOutPage from "../payments/checkout/page";


const payment = async () => {
  const stripePromise = loadStripe('pk_test_51NGnGsHWWssUp0efQhuaRItb7FlRhAQIUbLfKC8t9Jet4QpnfnLGSRKBEiOz3A0rBfclw5Q0AtAAXaUgfV8nyNIo00CCNSkGGn');
  const priceId = "price_1Nan2XHWWssUp0ef5IXneAXw";
  const stripe = await stripePromise;
  const email = "ahmedtest@gmail.com";
  const customer = await fetch("http://localhost:5000/payments/create-customer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      email: email
      }),
  }).then((response) => response.json());

  console.log(customer);

  const response = await fetch("http://localhost:5000/payments/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      priceId: priceId,
      customer: customer.id,
     }),
  });
  const session = await response.json();
  // When the customer clicks on the button, redirect them to Checkout.
  const result = await stripe.redirectToCheckout({
    sessionId: session.id,
  });
  console.log(result);
  if (result.error) {
    alert(result.error.message);
  }
}

const PlansPage = () => {
  return (
    <div className="plans-page">
      <h1 style={{ color: "black" }}>Plans</h1>
      <div className="plans-container">
        <div className="plan">
          <h2>Premium</h2>
          <p>Access to all the features</p>
          <p>Price: $50.00</p>
          <button className="subscribe-button" onClick={()=>{payment()}}>Subscribe</button>
        </div>
        <div className="plan">
          <h2>Basic</h2>
          <p>Access to some of the features</p>
          <p>Price: $10.00</p>
          <button className="subscribe-button" onClick={()=>{payment()}}>Subscribe</button>
        </div>
          {/* <CheckOutPage/> */}
      </div>
    </div>
  );
};

export default PlansPage;
