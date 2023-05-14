import Hero from "@/components/LandingPage/Hero";
import Stats from "@/components/LandingPage/Stats";
import Testimonial from "@/components/LandingPage/Testimonial";
import Features from "@/components/LandingPage/Features";

export const metadata = {
  title: "iRate",
  description:
    "Your one stop shop for rating Nespresso capsules. You're welcome, dad.",
};
export default function Home() {
  return (
    <>
      <Hero />
      {/* @ts-expect-error */}
      <Stats />
      <Features />
      <Testimonial />
    </>
  );
}
