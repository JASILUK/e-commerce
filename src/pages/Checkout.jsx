import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckoutAPI } from "../api/checkout";
import { toast } from "react-toastify";
import AddressDisplay from "../components/AddressDesplay";
import AddressModal from "../components/AddressChangeModel";
import { CreateOrderAPI } from "../api/order";
import StripePayment from "../components/stripComponent";

function Checkout() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const mode = params.get("mode");
  const variant = params.get("variant");
  const qty = params.get("qty") || 1;

  const [checkoutData, setCheckoutData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD"); 
  const [processing, setProcessing] = useState(false);


  // --------------------------
  // CALL BACKEND CHECKOUT API
  // --------------------------
  const fetchCheckout = async () => {
    try {
      let body = {};
      if (mode === "cart") {
        body = { mode: "cart" };
      } else {
        body = {
          mode: "buy_now",
          variant_id: variant,
          quantity: qty,
        };
      }
      const res = await CheckoutAPI(body);
      setCheckoutData(res.data);
    } catch (err) {
      toast.error(err.response?.data?.error || "Checkout failed");
      if (mode === "cart") navigate("/cart");
      else navigate("/product/" + variant);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCheckout();
  }, []);

  // --------------------------
  // HANDLE PLACE ORDER
  // --------------------------
  const handleOrder = async () => {
    setProcessing(true)
    try {
      const payload = {
        payment_method: paymentMethod, // Pass selected payment method
        address: checkoutData.address.id,
        source: mode === "cart" ? "cart" : "buy_now",
        variant_id: mode === "cart" ? null : variant,
        qty: mode === "cart" ? null : qty,
      };

      const res = await CreateOrderAPI(payload);

      if (!res.data.payment_required || paymentMethod === "COD") {
        toast.success("Order placed successfully!");
        navigate("/orders");
        return;
      }

      // Online payment: Save client secret & show Stripe UI
    setClientSecret(res.data.client_secret);

    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.error || "Order failed!");
    }finally{
      setProcessing(false)
    }
  };

  if (loading) return <h2 className="text-center mt-5">Loading checkout...</h2>;
  if (!checkoutData)
    return <h3 className="text-danger text-center">Unable to load checkout</h3>;

  return (
    <div className="container py-4">
      {/* Stripe Payment UI */}
      {paymentMethod === "STRIPE" && clientSecret && (
   <StripePayment clientSecret={clientSecret} onSuccess={() => navigate("/orders")} />
)}

      <h2 className="text-center mb-4">Checkout</h2>

      <div className="row">
        {/* LEFT SIDE: SHIPPING & PAYMENT */}
        <div className="col-md-6">
          <AddressDisplay
            address={checkoutData.address}
            onChangeClick={() => setShowAddressModal(true)}
          />

          <AddressModal
            show={showAddressModal}
            onClose={() => setShowAddressModal(false)}
            onUpdated={fetchCheckout}
          />

          {/* Payment Method Selection */}
          <div className="mt-4">
            <h5>Select Payment Method</h5>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="cod"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />
              <label className="form-check-label" htmlFor="cod">
                Cash on Delivery
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="stripe"
                value="STRIPE"
                checked={paymentMethod === "STRIPE"}
                onChange={() => setPaymentMethod("STRIPE")}
              />
              <label className="form-check-label" htmlFor="stripe">
                Pay Online
              </label>
            </div>
          </div>

          <button className="btn btn-success mt-4 w-100" onClick={handleOrder} disabled={processing}>
            {processing ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                Processing...
              </>
            ) : (
              "Place Order"
            )}
          </button>
        </div>

        {/* RIGHT SIDE: SUMMARY */}
        <div className="col-md-6">
          <h4>Order Summary</h4>
          <ul className="list-group">
            {checkoutData.items.map((item) => (
              <li
                key={item.variant_id}
                className="list-group-item d-flex justify-content-between"
              >
                <span>
                  {item.product_name} (x{item.quantity})
                </span>
                <strong>₹{item.line_total}</strong>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <p>Subtotal: ₹{checkoutData.subtotal}</p>
            <p>Discount: ₹{checkoutData.total_discount}</p>
            <p>Shipping: ₹{checkoutData.shipping_charges}</p>
            <p>
              <b>Grand Total: ₹{checkoutData.grand_total}</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
