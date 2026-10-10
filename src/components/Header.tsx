
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Userinfo from "./Userinfo";
import { categoryUrl } from "@/services/baseUrl";

interface ICategoty {
  id: string;
  nameBn: string;
  icon: string;
  slug: string;
}

const Header = () => {
  const [date, setDate] = useState("");
  const [categories, setCategories] = useState<ICategoty[]>([]);
  const pathname = usePathname();

  
  useEffect(() => {
    const currentDate = new Date().toLocaleDateString("bn-BD", {
      dateStyle: "full",
    });

    setDate(currentDate);
  }, []);

  useEffect(() => {
    fetch(categoryUrl)
      .then((res) => {
        return res.json();
      })
      .then((data: ICategoty[]) => {
        setCategories(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <header className="bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between py-4">
    
        <Link href="/" className="flex items-center gap-4">
          <Image
            className="rounded-2xl bg-green-700 p-3"
            src="/logo-icon.png"
            alt="bazar-dor"
            width={60}
            height={60}
          />

          <div className="flex flex-col">
            <span className="text-2xl font-bold">বাজার দর</span>
            <small>{date}</small>
          </div>
        </Link>

        <Userinfo></Userinfo>
      </div>

      <nav className="border-y border-gray-200">
        <div className="mx-auto flex max-w-6xl gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className={`my-2 flex gap-1 rounded-md px-2 py-2 font-bold transition-colors ${
                pathname === `/category/${category.slug}`
                  ? "bg-green-600 text-white"
                  : "hover:bg-gray-300"
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.nameBn}</span>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
