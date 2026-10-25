"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ORDER_STATUSES, lookupOrderStatus } from "@/lib/catalog";

const progress = ORDER_STATUSES.filter((status) => status !== "Cancelled");

export default function TrackParcel() {
  const params = useSearchParams();
  const initialOrder = params.get("order") || "";
  const [orderId, setOrderId] = useState(initialOrder);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const initial = initialOrder;
    if (!initial) return undefined;

    let ignore = false;
    setPending(true);
    lookupOrderStatus(initial)
      .then((next) => {
        if (ignore) return;
        if (next.invalid) {
          setError("Enter an order number like OA-104821.");
          return;
        }
        setResult(next);
      })
      .catch(() => {
        if (!ignore) setError("Could not look up that order. Try again.");
      })
      .finally(() => {
        if (!ignore) setPending(false);
      });

    return () => {
      ignore = true;
    };
  }, [initialOrder]);

  async function lookup(event) {
    event.preventDefault();
    setError("");
    setResult(null);
    setPending(true);

    try {
      const next = await lookupOrderStatus(orderId);
      if (next.invalid) {
        setError("Enter an order number like OA-104821.");
        return;
      }
      setResult(next);
    } catch {
      setError("Could not look up that order. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold tracking-[0.14em] text-blue-600 uppercase">
          Track parcel
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
          Check an order
        </h1>
        <p className="mt-3 text-base leading-relaxed text-zinc-600">
          Enter the order number from checkout. You will see the current
          status only.
        </p>

        <form onSubmit={lookup} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <label className="flex-1 text-sm font-medium text-zinc-900">
            <span className="sr-only">Order number</span>
            <input
              name="order"
              value={orderId}
              onChange={(event) => setOrderId(event.target.value)}
              placeholder="OA-104821"
              autoComplete="off"
              className="w-full rounded-xl border border-zinc-300 px-3 py-2.5 text-sm font-normal outline-none focus:border-blue-600"
            />
          </label>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-zinc-950 px-5 text-sm font-semibold text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
          >
            {pending ? "Checking…" : "Track"}
          </button>
        </form>

        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

        {result ? (
          <div className="mt-6 rounded-[1.5rem] border border-zinc-200 bg-white p-6">
            <p className="text-sm text-zinc-500">Order number</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950">
              {result.id}
            </p>
            {result.status ? (
              <StatusList status={result.status} />
            ) : (
              <p className="mt-4 text-sm leading-relaxed text-zinc-600">
                No order matches {result.id}.
              </p>
            )}
            <Link
              href="/shop"
              className="mt-6 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              Back to shop
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function StatusList({ status }) {
  if (status === "Cancelled") {
    return (
      <p className="mt-5 text-lg font-semibold text-zinc-950">Cancelled</p>
    );
  }

  return (
    <ol className="mt-6 space-y-3">
      {progress.map((item) => {
        const current = item === status;
        return (
          <li
            key={item}
            className={
              current
                ? "rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-800"
                : "px-4 py-2 text-sm text-zinc-500"
            }
            aria-current={current ? "step" : undefined}
          >
            {item}
          </li>
        );
      })}
    </ol>
  );
}
