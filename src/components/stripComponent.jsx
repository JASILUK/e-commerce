import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";

function StripePayment({ clientSecret, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();

  const handlePay = async () => {
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
        },
      }
    );

    if (error) {
      toast.error(error.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      toast.success("Payment success!");
      onSuccess();
    }
  };

  return (
    <div className="card p-3 mt-3">
      <CardElement />
      <button onClick={handlePay} className="btn btn-primary mt-3">
        Pay Now
      </button>
    </div>
  );
}

export default StripePayment;
