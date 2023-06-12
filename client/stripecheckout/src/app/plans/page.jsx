//create a new page component to display the plans and the checkout button to subscribe to the plan
//available plans are premium and basic
"use client";
import React from "react";
// import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
// import CheckoutForm from '@payments/checkout';
import "./page.styles.css";

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

const PlansPage = () => {
  return (
    <div className="plans-page">
      <h1 style={{ color: "black" }}>Plans</h1>
      <div className="plans-container">
        <div className="plan">
          <h2>Premium</h2>
          <p>Access to all the features</p>
          <p>Price: $50.00</p>
          <button className="subscribe-button">Subscribe</button>
        </div>
        <div className="plan">
          <h2>Basic</h2>
          <p>Access to some of the features</p>
          <p>Price: $10.00</p>
          <button className="subscribe-button">Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default PlansPage;
