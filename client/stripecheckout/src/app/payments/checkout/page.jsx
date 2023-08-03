import { loadStripe } from "@stripe/stripe-js";
import React from "react";

const stripe = await loadStripe(
  "pk_test_51NGnGsHWWssUp0efQhuaRItb7FlRhAQIUbLfKC8t9Jet4QpnfnLGSRKBEiOz3A0rBfclw5Q0AtAAXaUgfV8nyNIo00CCNSkGGn"
);
let clientSecret;
const response = async (plan) => {
  const res = await fetch(
    "http://localhost:5000/connect/create-checkout-session",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plan: plan }),
    }
  );

  const session = await res.json();
  return session;
};

 async function payment(plan) {
  const session = await response(plan);
  const { error } = await stripe.redirectToCheckout({
    sessionId: session.id,
  });
  if (error) {
    console.log(error);
  }
}

async function payment2(amount) {
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

const CheckOutPage = () => {
  const elements = stripe.elements();
  const cardElement = elements.create("card");
  cardElement.mount("#card-element");
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    // Call payment2 function to get the clientSecret
    const fetchClientSecret = async () => {
      try {
        const result = await payment2(15000);
        setClientSecret(result.clientSecret);
      } catch (error) {
        // Handle error here
      }
    };

    fetchClientSecret();
  }, [amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
    if (!error) {
      const { id } = paymentMethod;
      try {
        const { error } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: id,
        });
        if (error) {
          throw new Error(error.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    // call payment2
    <div>
      <form id="payment-form">
        <div id="card-element"></div>

        <button id="submit-payment" onClick={handleSubmit}>
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default CheckOutPage;
