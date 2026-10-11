
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
    product.unit === "kg"
      ? "প্রতি কেজি"
      : product.unit === "litre"
        ? "প্রতি লিটার"
        : product.unit === "dozen"
          ? "প্রতি ডজন"
          : "প্রতি পিস";

  const changeIcon =
    product.change?.dir === "up"
      ? "▼"
      : product.change?.dir === "down"
        ? "▲"
        : "";

  const changeColor =
    product.change?.dir === "up"
      ? "text-red-600"
      : product.change?.dir === "down"
        ? "text-green-600"
        : "text-gray-500";

  const changePercent = product.change?.pct ?? 0;

  const positivePercent =
    changePercent < 0 ? -changePercent : changePercent;

  return (
    <Link href={`/product/${product.slug}`} className="block min-w-0">
      <div className="group h-full cursor-pointer rounded-xl border border-gray-200 bg-white p-3 transition-shadow hover:shadow-md sm:p-4 lg:p-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-2xl sm:h-12 sm:w-12 sm:text-3xl">
            {product.image}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="whitespace-normal text-sm font-semibold text-gray-800 sm:text-base">
              {product.nameBn}
            </h2>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              {unit}
            </p>
          </div>
        </div>

        <div className="mt-4 flex min-w-0 items-end justify-between gap-2 sm:mt-5">
          <div className="min-w-0">
            <p className="text-xs text-gray-500">আজকের দাম</p>

            <p className="mt-1 whitespace-normal text-base font-bold text-gray-800 sm:text-lg lg:text-xl">
              {product.today?.toLocaleString("bn-BD")} টাকা
            </p>
          </div>

          <span
            className={`shrink-0 text-xs font-semibold sm:text-sm ${changeColor}`}
          >
            {changeIcon}
            {positivePercent.toLocaleString("bn-BD")}%
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
