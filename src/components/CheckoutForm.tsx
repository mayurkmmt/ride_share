//@ts-nocheck
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useBookingFormData } from "../context/BookingFormDataCtx";

// Define the CheckoutForm functional component
const CheckoutForm = () => {
  // Get access to the stripe and elements objects
  const stripe = useStripe();
  const elements = useElements();

  // State to manage payment success and error messages
  const { formData, setFormData } = useBookingFormData();

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if Stripe and Elements are available
    if (!stripe || !elements) {
      return;
    }

    // Get the instance
    const cardNumElement = elements.getElement(CardNumberElement);

    try {
      const payload = await stripe.createPaymentMethod({
        type: "card",
        card: cardNumElement,
      });
      //Greate the token using the createToken method
      const { token } = await stripe.createToken(cardNumElement);
      await handlePayment(token.id);
    } catch (error) {
      console.error(error);
      // Set payment error state if an error occurs
      setFormData((prev) => ({
        ...prev,
        paymentSuccess: null,
        paymentError: error.message || "An error occurred during payment.",
      }));
    }
  };

  // Function to handle the payment and get the token.id
  const handlePayment = async (tokenId) => {
    try {
      const response = await fetch(`url`, {
        headers: { Authorization: tokenId },
      }).then((response) => response.json());

      if (response?.data?.success || response?.data?.status == 200) {
        // Set payment success state if successful
        setFormData((prev) => ({
          ...prev,
          paymentSuccess: "Payment successful!",
          paymentError: null,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          paymentSuccess: null,
          paymentError: "Payment failed. Please try again.",
        }));
      }
    } catch (error) {
      console.error(error);
      // Set payment error state if an error occurs
      setFormData((prev) => ({
        ...prev,
        paymentSuccess: null,
        paymentError: "An error occurred while processing your payment.",
      }));
    }
  };

  // Render the form with CardElement and submit button
  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
      <label>
        Card number
        <CardNumberElement
          onReady={() => {
            console.log("CardNumberElement [ready]");
          }}
          onChange={(event) => {
            console.log("CardNumberElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardNumberElement [blur]");
          }}
          onFocus={() => {
            console.log("CardNumberElement [focus]");
          }}
        />
      </label>
      <label>
        Expiration date
        <CardExpiryElement
          onReady={() => {
            console.log("CardNumberElement [ready]");
          }}
          onChange={(event) => {
            console.log("CardNumberElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardNumberElement [blur]");
          }}
          onFocus={() => {
            console.log("CardNumberElement [focus]");
          }}
        />
      </label>
      <label>
        CVC
        <CardCvcElement
          onReady={() => {
            console.log("CardNumberElement [ready]");
          }}
          onChange={(event) => {
            console.log("CardNumberElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardNumberElement [blur]");
          }}
          onFocus={() => {
            console.log("CardNumberElement [focus]");
          }}
        />
      </label>
      <button
        className="w-1/2 mt-3 flex justify-center mx-auto px-6 p-2 bg-green-800 rounded-xl"
        type="submit"
        disabled={!stripe}
      >
        Pay
      </button>
      {/* Display payment error or success message if available */}
      {formData.paymentError && (
        <div className="text-red-600 text-sm mt-2">{formData.paymentError}</div>
      )}
      {formData.paymentSuccess && (
        <div className="text-green-600 mt-2">{formData.paymentSuccess}</div>
      )}
    </form>
  );
};
export default CheckoutForm;
