"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const Banner = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString("bn-BD", {
      dateStyle: "full",
    });

    setDate(currentDate);
  }, []);

  return (
    <div>
      <div className="mx-3 mt-5 grid grid-cols-1 items-center justify-between gap-6 rounded-3xl bg-[#FFFFFF] px-4 py-6 sm:mx-4 sm:mt-8 sm:gap-8 sm:px-6 sm:py-8 md:grid-cols-2 lg:mx-auto lg:mt-10 lg:max-w-6xl lg:px-8">
        <div className="min-w-0 space-y-4">
          <p className="inline-flex max-w-full rounded-3xl bg-green-50 px-4 py-2 text-sm text-green-700 sm:text-base">
            {date}
          </p>

          <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h2>

          <p className="text-sm leading-7 text-gray-500 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <a href="/#all-products"  className="btn border-0 bg-green-700 font-bold text-white hover:bg-green-800" >
            সব পণ্য দেখুন ➜
          </a>
        </div>

        <div className="flex items-center justify-center">
          <Image
            src="/bazar-hero.png"
            width={400}
            height={400}
            alt="hero logo"
            className="h-auto w-full max-w-[280px] h-auto sm:max-w-[340px] lg:max-w-[400px]"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;