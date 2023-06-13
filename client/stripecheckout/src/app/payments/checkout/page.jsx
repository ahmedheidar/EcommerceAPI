import { loadStripe } from "@stripe/stripe-js";



const response = async (plan) => {
    const res =  await fetch('http://localhost:5000/api/payment/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ plan: plan })
    });
    
    const session = await res.json();
    return session;
}


export async function payment(plan) {
    const session = await response(plan);
    const stripe = await loadStripe("pk_test_51NGnGsHWWssUp0efQhuaRItb7FlRhAQIUbLfKC8t9Jet4QpnfnLGSRKBEiOz3A0rBfclw5Q0AtAAXaUgfV8nyNIo00CCNSkGGn");
    const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
    });
    if (error) {
        console.log(error);
    }
}
