import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { STRIPE_PUBLISHABLE_KEY } from "../Config";

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

const PaymentComponent: React.FC = () => {
  return (
    <React.Fragment>
      <h1 className="text-2xl font-semibold mb-2">Stripe Payment</h1>
      {/* Wrap the CheckoutForm component with the Elements component and provide the Stripe promise */}
      <Elements
        stripe={getStripe()}
        options={{
          appearance: {
            theme: "night",
            labels: "floating",
          },
          loader: "always",
        }}
      >
        <CheckoutForm />
      </Elements>
    </React.Fragment>
  );
};

export default PaymentComponent;
