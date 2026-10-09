"use client";

import { useState } from "react";
import ProductGrid from "./ProductGrid";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  today: number;
  unit: string;
image: string;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

interface Props {
  products: Product[];
}

const SortProducts = ({ products }: Props) => {
  const [sort, setSort] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "price-low") return a.today - b.today;
    if (sort === "price-high") return b.today - a.today;
    return 0;
  });

  return (
    <div>
      <div className="mb-4 flex items-center justify-end gap-2">
        <span className="text-sm text-gray-600">সাজান</span>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select select-sm"
        >
          <option value="default">ডিফল্ট</option>
          <option value="price-low">দাম: কম থেকে বেশি</option>
          <option value="price-high">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <ProductGrid products={sortedProducts} />
    </div>
  );
};

export default SortProducts;