import baseUrl from "@/services/baseUrl";
import ProductGrid from "./ProductGrid";
import SortProducts from "./SortProducts";

interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  categoryIcon: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}
const ProductSections = async () => {
  const res = await fetch(baseUrl);

  const products = await res.json();

  const upProduct = products
    .filter((product:IProduct) => product.change?.dir === "up")
    .slice(0, 6);

  const downProduct = products
    .filter((product:IProduct) => product.change?.dir === "down")
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-10">
      <section>
        <div className=" flex items-center gap-3 mb-5">
          <span className="text-red-600">▲</span>
          <h2 className="text-2xl font-semibold text-gray-800">
            আজ দাম বেড়েছে
          </h2>
        </div>

        <ProductGrid products={upProduct} />
      </section>

      <section>
        <div className=" flex  items-center gap-3 mb-5">
          <span className="text-green-700">▼</span>
          <h2 className="text-2xl font-semibold text-gray-800">আজ দাম কমেছে</h2>
        </div>

        <ProductGrid products={downProduct} />
      </section>

      <section>
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-800">সব পণ্য</h2>
       <div className="flex items-center justify-between">
          <p className="mt-1 text-sm text-gray-500">
         মোট {products.length.toLocaleString("bn-BD")} টি পণ্য দেখানো হচ্ছে </p>

        </div>
        <SortProducts products={products} />
       </div>
       
         
       <ProductGrid products={products} />
      </section>
    </div>
  );
};

export default ProductSections;
