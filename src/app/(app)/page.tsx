import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Testimonial from "@/components/Testimonial";
import Features from "@/components/Features";

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
