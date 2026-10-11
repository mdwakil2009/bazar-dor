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
      <div className="mx-auto flex max-w-6xl flex-row items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-4 sm:py-4 lg:px-0">
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-4">
          <Image
            className="h-12 w-12 shrink-0 rounded-2xl bg-green-700 p-2 sm:h-[60px] sm:w-[60px] sm:p-3"
            src="/logo-icon.png"
            alt="bazar-dor"
            width={60}
            height={60}
          />

          <div className="flex min-w-0 flex-col">
            <span className="text-xl font-bold sm:text-2xl">বাজার দর</span>
            <small className="text-xs sm:text-sm">{date}</small>
          </div>
        </Link>

        <div className="shrink-0">
          <Userinfo />
        </div>
      </div>

      <nav className="border-y border-gray-200">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-3 sm:gap-4 sm:px-4 lg:gap-8 lg:px-0">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className={`my-2 flex shrink-0 items-center gap-1 rounded-md px-2 py-2 text-sm font-bold transition-colors sm:px-3 sm:text-base ${
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
