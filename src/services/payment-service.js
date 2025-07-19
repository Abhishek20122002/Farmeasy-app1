import { privateAxios } from "./helper";

// Create a PaymentIntent for a specific item booking
export const createPaymentIntent = (bookingId) => {
  return privateAxios
    .post(`/payments/create/${bookingId}`)
    .then((res) => res.data);
};

// Update the payment status after confirmation (Stripe webhook simulation)
export const updatePaymentStatus = (paymentData) => {
  // paymentData = {
  //   paymentIntentId: 'pi_123456',
  //   status: 'succeeded' | 'failed',
  //   paymentMode: 'card' | 'upi' | etc.
  // }
  return privateAxios.post("/payments/update", paymentData).then((res) => res.data);
};