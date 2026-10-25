import { Suspense } from "react";
import TrackParcel from "@/components/track/TrackParcel";

export const metadata = {
  title: "Track parcel",
  description: "Look up an onlineAccessories order status with your order number.",
};

export default function TrackParcelPage() {
  return (
    <Suspense
      fallback={
        <section className="py-16">
          <p className="mx-auto max-w-xl px-4 text-sm text-zinc-500">
            Loading tracker…
          </p>
        </section>
      }
    >
      <TrackParcel />
    </Suspense>
  );
}
