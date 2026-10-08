"use client";
interface ICategoty {
     id:string
     nameBn:string
     icon:string
}
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const [date, setDate] = useState("");
const [categories, setCategories] = useState<ICategoty[]>([]);

 
  useEffect(() => {
    const currentDate = new Date().toLocaleDateString("bn-BD", {
      dateStyle: "full",
    });

    setDate(currentDate);
  }, []);

 
  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/bazardor/categories")
      .then((res) => res.json())
      .then((data:ICategoty[]) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <header className="bg-[#FFFFFF]">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 ">
        <div className="flex items-center gap-4">
          <Image
            className="bg-green-700 rounded-2xl p-3"
            src="/logo-icon.png"
            alt="bazar-dor"
            width={60}
            height={60}
          />

          <div className="flex flex-col">
            <span className="font-bold text-2xl">বাজার দর</span>

            <small>{date}</small>
                
          </div>
        </div>
      
        <div className="flex items-center gap-5">
          <button className="px-4 py-3 rounded-md font-semibold hover:bg-gray-300 transition-colors">
            সাইন ইন
          </button>

          <button className="px-4 py-3 rounded-md font-semibold bg-green-700 text-white">
            সাইন আপ
          </button>
        </div>
      </div>
             <nav className="border-y border-gray-200">
        <div className="max-w-6xl mx-auto flex  gap-8 p-2">
          {categories.map((category) => (
            <Link
              key={category?.id}
              href={`/category/${category?.id}`}
              className=" flex gap-1 font-bold px-2 py-2 rounded-md hover:bg-gray-300 transition-colors "
            >
              <span>{category?.icon}</span>
              <span>{category?.nameBn}</span>
            </Link>
          ))}
        </div>
      </nav>

    </header>
  );
};

export default Header;