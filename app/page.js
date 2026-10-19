import Benefits from "@/components/home/Benefits";
import BrandIntro from "@/components/home/BrandIntro";
import CallToAction from "@/components/home/CallToAction";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: "Home",
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Benefits />
      <BrandIntro />
      <CallToAction />
    </>
  );
}
