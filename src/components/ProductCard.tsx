import Link from "next/link";

interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
 image: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const unit =
    product.unit === "kg"  ? "প্রতি কেজি"  : product.unit === "litre"  ? "প্রতি লিটার" : product.unit === "dozen"   ? "প্রতি ডজন"  : "প্রতি পিস";

const changeIcon =
  product.change?.dir === "up" ? "▼" : product.change?.dir === "down"? "▲" :""

 const changeColor =
  product.change?.dir === "up"  ? "text-red-600"  : product.change?.dir === "down"   ? "text-green-600"  : "text-gray-500";

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-5 ">

      
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12  items-center justify-center rounded-lg bg-gray-50 text-3xl">
            {product.image}
          </div>

          <div>
            <h2 className="font-semibold text-gray-800 ">
              {product.nameBn}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {unit}
            </p>
          </div>
        </div>
        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-500">
              আজকের দাম
            </p>

            <p className="mt-1 text-xl font-bold text-gray-800">
              {product.today?.toLocaleString("bn-BD")} টাকা
            </p>
          </div>
          <span className={`text-sm font-semibold ${changeColor}`}>
            {changeIcon}
            {Math.abs(product.change?.pct ?? 0).toLocaleString("bn-BD")}%
          </span>
        </div>

      </div>
    </Link>
  );
};

export default ProductCard;