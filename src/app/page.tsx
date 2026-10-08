
import Marquee from "@/components/Marquee";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<p>loading...</p>}>
      <Marquee></Marquee>
      </Suspense>

      HomePage
    </div>
  );
}