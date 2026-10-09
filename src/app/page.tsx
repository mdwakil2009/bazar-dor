
import Banner from "@/components/Banner";

import ProductSections from "@/components/ProductSection";

import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<p>loading...</p>}>
      <Banner></Banner>
      <ProductSections></ProductSections>
      </Suspense>
    </div>
  );
}
