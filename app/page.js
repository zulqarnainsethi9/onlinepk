import CallToAction from "@/components/home/CallToAction";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";
import OrderSteps from "@/components/home/OrderSteps";
import TrustBar from "@/components/home/TrustBar";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: "Home",
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <FeaturedProducts />
      <OrderSteps />
      <CallToAction />
    </>
  );
}
