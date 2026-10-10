"use client"
import Image from "next/image";
import { useEffect, useState } from "react";


const Banner = () => {
const [date ,setDate] = useState('')

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString("bn-BD", {
      dateStyle: "full",
    });

    setDate(currentDate);
  }, []);
     return (
          <div>
               <div className="grid grid-cols-2 justify-between items-center bg-[#FFFFFF] mt-10 rounded-3xl max-w-6xl mx-auto ">
                    <div className="space-y-4 mx-4 ">
                    <p className="text-green-700 btn rounded-3xl ">{date}</p>
                    <h2 className="text-5xl font-bold ">আজকের বাজারের দাম এক নজরে</h2>
                    <p className="text-gray-500">চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
                   <a  href="/#all-products"><button className="btn bg-green-700 font-bold text-white">সব পণ্য দেখুন ➜</button></a>
                    </div>
                    <div className="flex justify-center items-center" >
                         <Image src={'/bazar-hero.png'} width={400} height={400} alt="hero logo"></Image>
                    </div>
                     
               </div>
          </div>
     );
};

export default Banner;