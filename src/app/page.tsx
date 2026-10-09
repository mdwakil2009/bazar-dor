import Banner from "@/components/Banner";
import Marquee from "@/components/Marquee";
import ProductSections from "@/components/ProductSection";

import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<p>loading...</p>}>
        <Marquee></Marquee>
      <ProductSections></ProductSections>
      </Suspense>
      <Banner></Banner>
      <main>
    </main>
      HomePage
      <div></div>
    </div>
  );
}
