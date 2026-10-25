import CheckoutView from "@/components/checkout/CheckoutView";

export const metadata = {
  title: "Checkout",
  description:
    "Review the earbuds in your cart and place an order with your delivery details.",
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
