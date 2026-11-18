"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { useCatalog } from "@/components/catalog/CatalogProvider";
import { getWhatsAppUrl } from "@/data/site";
import { OrderError, placeOrder } from "@/lib/catalog";
import { cn, formatPrice } from "@/lib/utils";

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

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm font-normal text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10";

export default function CheckoutView() {
  const { items, total, count, setQty, removeItem, clearCart } = useCart();
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
    setErrors((current) => ({ ...current, [name]: undefined }));
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
    return <OrderConfirmation order={order} />;
  }

  if (items.length === 0) {
    return <EmptyCart products={products || []} />;
  }

  const itemCount = count || items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <section className="bg-zinc-100 py-8 sm:py-12">
      <form
        onSubmit={submitOrder}
        noValidate
        className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22.5rem] lg:items-start lg:px-8"
      >
        <div className="order-2 space-y-4 lg:order-1">
          <div>
            <p className="text-sm text-zinc-500">
              <Link href="/shop" className="hover:text-zinc-950">
                Shop
              </Link>
              <span className="px-2">/</span>
              Checkout
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
              Checkout
            </h1>
            <ol className="mt-4 flex items-center gap-2 text-sm">
              <li className="font-medium text-zinc-400">Cart</li>
              <li className="text-zinc-300" aria-hidden="true">
                /
              </li>
              <li className="font-semibold text-zinc-950">Delivery</li>
              <li className="text-zinc-300" aria-hidden="true">
                /
              </li>
              <li className="font-medium text-zinc-400">Confirmation</li>
            </ol>
          </div>

          <section className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
            <h2 className="text-base font-semibold text-zinc-950">Contact</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field
                label="Full name"
                name="name"
                value={form.name}
                onChange={updateField}
                error={errors.name}
                autoComplete="name"
                placeholder="Ayesha Khan"
              />
              <Field
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={updateField}
                error={errors.phone}
                autoComplete="tel"
                inputMode="tel"
                placeholder="03xx xxxxxxx"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
            <h2 className="text-base font-semibold text-zinc-950">Delivery</h2>
            <p className="mt-1 text-sm text-zinc-500">
              We use this to arrange delivery after the order is confirmed.
            </p>
            <div className="mt-4 grid gap-4">
              <Field
                label="City"
                name="city"
                value={form.city}
                onChange={updateField}
                error={errors.city}
                autoComplete="address-level2"
                placeholder="Lahore"
              />
              <Field
                label="Address"
                name="address"
                value={form.address}
                onChange={updateField}
                error={errors.address}
                autoComplete="street-address"
                placeholder="House, street, area"
              />
              <label className="text-sm font-medium text-zinc-900">
                Order note
                <span className="ml-2 font-normal text-zinc-500">Optional</span>
                <textarea
                  name="note"
                  rows={3}
                  value={form.note}
                  onChange={updateField}
                  placeholder="Landmark, preferred time, or anything we should know"
                  className="mt-1.5 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm font-normal outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
                />
              </label>
            </div>
          </section>

          {formError ? (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
              {formError}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-zinc-950 px-5 text-sm font-semibold text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400 lg:hidden"
          >
            {pending ? "Placing order…" : `Place order · ${formatPrice(total)}`}
          </button>
        </div>

        <aside className="order-1 h-fit rounded-2xl border border-zinc-200 bg-white p-5 lg:sticky lg:top-24 lg:order-2 sm:p-6">
          <div className="flex items-baseline justify-between">
            <h2 className="text-base font-semibold text-zinc-950">Order summary</h2>
            <p className="text-sm text-zinc-500">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          </div>
          <ul className="mt-4 divide-y divide-zinc-100">
            {items.map((item) => (
              <li key={item.id} className="flex gap-3 py-4 first:pt-0">
                <Link
                  href={`/products/${item.slug}`}
                  className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-zinc-100"
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
                      className="text-sm font-medium text-zinc-950 hover:underline"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm font-semibold text-zinc-950">
                      {formatPrice(item.price * item.qty)}
                    </p>
                  </div>
                  <p className="mt-0.5 text-xs text-zinc-500">
                    {formatPrice(item.price)} each
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-lg border border-zinc-200">
                      <button
                        type="button"
                        className="inline-flex h-8 w-8 items-center justify-center text-zinc-700"
                        aria-label={`Decrease quantity of ${item.name}`}
                        onClick={() => setQty(item.id, item.qty - 1)}
                      >
                        −
                      </button>
                      <span className="min-w-6 text-center text-sm font-medium">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        className="inline-flex h-8 w-8 items-center justify-center text-zinc-700 disabled:text-zinc-300"
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
                      className="text-xs font-medium text-zinc-500 underline underline-offset-2 hover:text-zinc-950"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <dl className="space-y-2 border-t border-zinc-100 pt-4 text-sm">
            <div className="flex justify-between text-zinc-600">
              <dt>Subtotal</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
            <div className="flex justify-between text-zinc-600">
              <dt>Delivery</dt>
              <dd>Confirmed after checkout</dd>
            </div>
            <div className="flex justify-between pt-2 text-base font-semibold text-zinc-950">
              <dt>Total</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>
          <button
            type="submit"
            disabled={pending}
            className="mt-5 hidden min-h-12 w-full items-center justify-center rounded-xl bg-zinc-950 px-5 text-sm font-semibold text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400 lg:inline-flex"
          >
            {pending ? "Placing order…" : "Place order"}
          </button>
          <p className="mt-3 text-xs leading-relaxed text-zinc-500">
            You will get an order number for tracking. Message us on WhatsApp if you want the delivery confirmed right away.
          </p>
        </aside>
      </form>
    </section>
  );
}

function OrderConfirmation({ order }) {
  return (
    <section className="bg-zinc-100 py-10 sm:py-14">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-8">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
          <p className="text-sm font-semibold text-emerald-700">Order placed</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
            Thanks, {order.customer.name}
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-zinc-600">
            Your order is saved. Send it on WhatsApp so we can confirm delivery to{" "}
            {order.customer.city}.
          </p>
          <dl className="mt-6 grid gap-4 rounded-xl bg-zinc-50 p-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-zinc-500">Order number</dt>
              <dd className="mt-1 font-semibold text-zinc-950">{order.id}</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">Status</dt>
              <dd className="mt-1 font-semibold text-zinc-950">New</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs text-zinc-500">Deliver to</dt>
              <dd className="mt-1 text-sm text-zinc-800">
                {order.customer.name}
                <br />
                {order.customer.phone}
                <br />
                {order.customer.address}, {order.customer.city}
              </dd>
            </div>
          </dl>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={getWhatsAppUrl(orderMessage(order))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-zinc-950 px-5 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Send order on WhatsApp
            </a>
            <Link
              href={`/track-parcel?order=${order.id}`}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-zinc-300 bg-white px-5 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
            >
              Track this order
            </Link>
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
          <h2 className="text-base font-semibold text-zinc-950">Receipt</h2>
          <ul className="mt-4 space-y-3">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between gap-4 text-sm">
                <span className="text-zinc-700">
                  {item.name}
                  <span className="text-zinc-500"> × {item.qty}</span>
                </span>
                <span className="font-medium text-zinc-950">
                  {formatPrice(item.price * item.qty)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-zinc-100 pt-4 text-base font-semibold">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
          <Link
            href="/shop"
            className="mt-5 inline-flex text-sm font-semibold text-zinc-950 underline decoration-zinc-300 underline-offset-4"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </section>
  );
}

function EmptyCart({ products }) {
  const suggestions = products.slice(0, 3);

  return (
    <section className="bg-zinc-100 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="rounded-2xl border border-zinc-200 bg-white px-6 py-10 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
            Your cart is empty
          </h1>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-zinc-600">
            Add a product from the shop. You can review it here before placing the order.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-zinc-950 px-5 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            Shop now
          </Link>
        </div>

        {suggestions.length > 0 ? (
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-zinc-950">Start with</h2>
            <ul className="mt-3 divide-y divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
              {suggestions.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-zinc-50"
                  >
                    <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-zinc-50">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-contain p-1"
                        />
                      ) : null}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-zinc-950">
                        {product.name}
                      </span>
                      <span className="text-sm text-zinc-500">
                        {formatPrice(product.price)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Field({ label, name, error, className, ...props }) {
  return (
    <label className={cn("text-sm font-medium text-zinc-900", className)}>
      {label}
      <input
        name={name}
        aria-invalid={error ? "true" : undefined}
        {...props}
        className={cn(fieldClass, error && "border-red-400 focus:border-red-600 focus:ring-red-600/10")}
      />
      {error ? <span className="mt-1 block font-normal text-red-600">{error}</span> : null}
    </label>
  );
}
