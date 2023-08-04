//create a new page component to display the plans and the checkout button to subscribe to the plan
//available plans are premium and basic
"use client";
import React from "react";
// import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
// import CheckoutForm from '@payments/checkout';
import "./page.styles.css";
import { payment, payment2 } from "../payments/checkout/page";
import CheckOutPage from "../payments/checkout/page";

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

const PlansPage = () => {
  return (
    <div className="plans-page">
      <h1 style={{ color: "black" }}>Plans</h1>
      <div className="plans-container">
        {/* <div className="plan">
          <h2>Premium</h2>
          <p>Access to all the features</p>
          <p>Price: $50.00</p>
          <button className="subscribe-button" onClick={()=>{payment('price_1NIHkrHWWssUp0efxecdFddg')}}>Subscribe</button>
        </div>
        <div className="plan">
          <h2>Basic</h2>
          <p>Access to some of the features</p>
          <p>Price: $10.00</p>
          <button className="subscribe-button" onClick={()=>{payment('price_1NIK4PHWWssUp0efsIL1UqXL')}}>Subscribe</button>
        </div> */}
        {/* <div className="plan">
          <h2>Early Subscription</h2>
          <p>Get a special offer for subscribing now!</p>
          <p>Price: $150.00</p>
          <button className="subscribe-button" onClick={()=>{CheckOutPage(15000)}}>Subscribe</button>
        </div> */}
          <CheckOutPage/>
      </div>
    </div>
  );
};

export default PlansPage;
