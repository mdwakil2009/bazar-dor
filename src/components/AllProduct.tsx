
"use client";

import { useState } from "react";
import ProductGrid from "./ProductGrid";
import SortProducts from "./SortProducts";

interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

interface Props {
  products: IProduct[];
}

const AllProducts = ({ products }: Props) => {
  const [sort, setSort] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "price-low") return a.today - b.today;
    if (sort === "price-high") return b.today - a.today;
    return 0;
  });

  return (
    <section>


      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="mt-1 text-sm text-gray-500">
          মোট {products.length.toLocaleString("bn-BD")} টি পণ্য দেখানো হচ্ছে
        </p>

        <SortProducts sort={sort} setSort={setSort} />
      </div>

      <ProductGrid products={sortedProducts} />
    </section>
  );
};

export default AllProducts;
