import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_KEY!, {
  apiVersion: "2024-06-20",
});

// console.log("inside src stripe.ts file " + process.env.STRIPE_KEY!);
// console.log("show this");
