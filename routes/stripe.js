import { Router } from "express";
import Stripe from "stripe";

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
  

export default router;