"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { useCatalog } from "@/components/catalog/CatalogProvider";
import { getWhatsAppUrl } from "@/data/site";
import { OrderError, placeOrder } from "@/lib/catalog";
import { formatPrice } from "@/lib/utils";

const emptyForm = {
  name: "",
  phone: "",
  city: "",
  address: "",
  note: "",
};

function validate(form) {
  const errors = {};
  const phoneDigits = form.phone.replace(/\D/g, "");

  if (!form.name.trim()) errors.name = "Enter your full name.";
  if (phoneDigits.length < 10 || phoneDigits.length > 13) {
    errors.phone = "Enter a phone number we can reach you on.";
  }
  if (!form.city.trim()) errors.city = "Enter your city.";
  if (form.address.trim().length < 8) {
    errors.address = "Enter a delivery address.";
  }

  return errors;
}

function orderMessage(order) {
  const lines = order.items
    .map(
      (item) =>
        `- ${item.name} x${item.qty} — ${formatPrice(item.price * item.qty)}`,
    )
    .join("\n");

  return [
    `New order ${order.id}`,
    `Name: ${order.customer.name}`,
    `Phone: ${order.customer.phone}`,
    `City: ${order.customer.city}`,
    `Address: ${order.customer.address}`,
    "Items:",
    lines,
    `Total: ${formatPrice(order.total)}`,
    order.customer.note ? `Note: ${order.customer.note}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export default function CheckoutView() {
  const { items, total, setQty, removeItem, clearCart } = useCart();
  const { products } = useCatalog();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);
  const [order, setOrder] = useState(null);

  function stockFor(id) {
    const product = products?.find((item) => item.id === id);
    return product ? product.stock : null;
  }

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function submitOrder(event) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setFormError("");
    if (Object.keys(nextErrors).length > 0 || items.length === 0 || pending) return;

    setPending(true);
    try {
      const placed = await placeOrder({
        items,
        customer: {
          name: form.name.trim(),
          phone: form.phone.trim(),
          city: form.city.trim(),
          address: form.address.trim(),
          note: form.note.trim(),
        },
      });
      setOrder(placed);
      clearCart();
    } catch (error) {
      setFormError(
        error instanceof OrderError
          ? error.message
          : "Could not place the order. Try again.",
      );
    } finally {
      setPending(false);
    }
  }

  if (order) {
    return (
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[1.75rem] border border-zinc-200 bg-white p-6 sm:p-8">
            <p className="text-sm font-semibold tracking-[0.14em] text-blue-600 uppercase">
              Order placed
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">
              {order.id}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-zinc-600">
              Thanks, {order.customer.name}. Your order for{" "}
              {formatPrice(order.total)} is ready to send. Message us on
              WhatsApp so we can confirm delivery to {order.customer.city}.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-zinc-700">
              {order.items.map((item) => (
                <li key={item.id} className="flex justify-between gap-4">
                  <span>
                    {item.name} × {item.qty}
                  </span>
                  <span>{formatPrice(item.price * item.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={getWhatsAppUrl(orderMessage(order))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Send order on WhatsApp
              </a>
              <Link
                href={`/track-parcel?order=${order.id}`}
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-zinc-300 bg-white px-5 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
              >
                Track this order
              </Link>
              <Link
                href="/shop"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-zinc-300 bg-white px-5 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
          <p className="text-sm font-semibold tracking-[0.14em] text-blue-600 uppercase">
            Checkout
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">
            Your cart is empty
          </h1>
          <p className="mt-3 text-base leading-relaxed text-zinc-600">
            Add a pair from the shop, then come back here to enter your
            delivery details.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Shop earbuds
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-8">
        <form onSubmit={submitOrder} noValidate className="order-2 lg:order-1">
          <p className="text-sm font-semibold tracking-[0.14em] text-blue-600 uppercase">
            Checkout
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            Delivery details
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-zinc-600">
            Tell us where to send this order. We confirm it with you on
            WhatsApp.
          </p>

          <div className="mt-8 grid gap-5 rounded-[1.5rem] border border-zinc-200 bg-white p-5 sm:grid-cols-2 sm:p-6">
            <Field
              label="Full name"
              name="name"
              value={form.name}
              onChange={updateField}
              error={errors.name}
              autoComplete="name"
            />
            <Field
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={updateField}
              error={errors.phone}
              autoComplete="tel"
              placeholder="03xx xxxxxxx"
            />
            <Field
              label="City"
              name="city"
              value={form.city}
              onChange={updateField}
              error={errors.city}
              autoComplete="address-level2"
            />
            <div className="sm:col-span-2">
              <Field
                label="Delivery address"
                name="address"
                value={form.address}
                onChange={updateField}
                error={errors.address}
                autoComplete="street-address"
              />
            </div>
            <label className="sm:col-span-2 text-sm font-medium text-zinc-900">
              Note
              <span className="ml-2 font-normal text-zinc-500">Optional</span>
              <textarea
                name="note"
                rows={3}
                value={form.note}
                onChange={updateField}
                className="mt-1.5 w-full rounded-xl border border-zinc-300 px-3 py-2.5 text-sm font-normal outline-none focus:border-blue-600"
              />
            </label>
          </div>

          {formError ? (
            <p className="mt-4 text-sm text-red-600" role="alert">
              {formError}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-zinc-950 px-5 text-sm font-semibold text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400 sm:w-auto"
          >
            {pending ? "Placing order…" : `Place order · ${formatPrice(total)}`}
          </button>
        </form>

        <aside className="order-1 h-fit rounded-[1.5rem] border border-zinc-200 bg-white p-5 lg:order-2 sm:p-6">
          <h2 className="text-lg font-semibold text-zinc-950">Your cart</h2>
          <ul className="mt-4 space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex gap-3">
                <Link
                  href={`/products/${item.slug}`}
                  className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-zinc-50"
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-contain p-1"
                    />
                  ) : null}
                </Link>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      href={`/products/${item.slug}`}
                      className="text-sm font-semibold text-zinc-950 hover:text-blue-700"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm font-semibold text-zinc-950">
                      {formatPrice(item.price * item.qty)}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <div className="inline-flex items-center rounded-full border border-zinc-200">
                      <button
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center text-lg"
                        aria-label={`Decrease quantity of ${item.name}`}
                        onClick={() => setQty(item.id, item.qty - 1)}
                      >
                        −
                      </button>
                      <span className="min-w-6 text-center text-sm font-semibold">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center text-lg disabled:text-zinc-300"
                        aria-label={`Increase quantity of ${item.name}`}
                        disabled={
                          stockFor(item.id) != null && item.qty >= stockFor(item.id)
                        }
                        onClick={() => setQty(item.id, item.qty + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="text-sm font-medium text-zinc-500 hover:text-zinc-950"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4">
            <p className="text-sm text-zinc-600">Total</p>
            <p className="text-lg font-semibold text-zinc-950">
              {formatPrice(total)}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Field({ label, name, error, ...props }) {
  return (
    <label className="text-sm font-medium text-zinc-900">
      {label}
      <input
        name={name}
        {...props}
        className="mt-1.5 w-full rounded-xl border border-zinc-300 px-3 py-2.5 text-sm font-normal outline-none focus:border-blue-600"
      />
      {error ? <span className="mt-1 block font-normal text-red-600">{error}</span> : null}
    </label>
  );
}
