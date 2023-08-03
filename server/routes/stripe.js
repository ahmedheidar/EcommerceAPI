import { Router} from "express";
import Stripe from "stripe";
import express from "express";

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


router.post('/create-checkout-session', async (req, res) => {
    const { plan } = req.body;

    try {
      // Create a Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: plan,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/payments/success',
        cancel_url: 'http://localhost:3000/payments/cancel',
      });
      res.json(session);
    } catch (error) {
      // Handle error
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
  

  const endpointSecret = "whsec_2c07da2ee69fdfe51d10ab37b0e5c2c1387d74eb4fd75e7e390ee85ba41beef7";

  router.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
    const sig = request.headers['stripe-signature'];
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    // Handle the event
    switch (event.type) {
      case 'checkout.session.async_payment_failed':
        const checkoutSessionAsyncPaymentFailed = event.data.object;
        // Then define and call a function to handle the event checkout.session.async_payment_failed
        console.log(checkoutSessionAsyncPaymentFailed);
        break;
      case 'checkout.session.async_payment_succeeded':
        const checkoutSessionAsyncPaymentSucceeded = event.data.object;
        // Then define and call a function to handle the event checkout.session.async_payment_succeeded
        console.log(checkoutSessionAsyncPaymentSucceeded);
        break;
      case 'checkout.session.completed':
        const checkoutSessionCompleted = event.data.object;
        // Then define and call a function to handle the event checkout.session.completed
        console.log(checkoutSessionCompleted);
        break;
      case 'checkout.session.expired':
        const checkoutSessionExpired = event.data.object;
        // Then define and call a function to handle the event checkout.session.expired
        console.log(checkoutSessionExpired);
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  });
  

export default router;