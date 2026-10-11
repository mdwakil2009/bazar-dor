
import baseUrl from "@/services/baseUrl";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
  markets: Market[];
}

interface IProps {
  params: Promise<{ slug: string }>;
}

const formatPrice = (price: number): string =>
  price.toLocaleString("bn-BD");

const getUnitText = (unit: string): string =>
  ({
    kg: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    piece: "পিস",
    dozen: "ডজন"
  })[unit.toLowerCase()] ?? unit;

const getSingleProduct = async (
  slug: string,
): Promise<Product | null> => {
  const res = await fetch(baseUrl);

  const data: Product[] = await res.json();

  return data.find((item) => item.slug === slug) ?? null;
};

const ProductDetailsContent = async ({ params }: IProps) => {
  const { slug } = await params;
  const product = await getSingleProduct(slug);

  if (!product) {
    notFound();
  }

  const markets = product.markets ?? [];

  const minPrice = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : product.today;

  const maxPrice = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : product.today;

  const averagePrice = markets.length
    ? markets.reduce(
        (sum, market) => sum + (market.min + market.max) / 2,
        0,
      ) / markets.length
    : product.today;

  const sortedMarkets = [...markets].sort((a, b) => a.min - b.min);

  const isUp = product.change.dir === "up";
  const unitBn = getUnitText(product.unit);

  return (
    <main className=" px-3 py-4 text-gray-800 sm:px-4 sm:py-6">
      <div className="mx-auto max-w-6xl space-y-5 sm:space-y-6">
        <nav className="flex flex-wrap items-center gap-2 text-xs text-gray-500 sm:text-sm">
          <Link href="/" className="shrink-0 hover:underline">
            হোম
          </Link>

          <span>❯</span>

          <Link
            href={`/category/${product.category}`}
            className="hover:underline"
          >
            {product.categoryNameBn}
          </Link>

          <span>❯</span>

          <span className="min-w-0 whitespace-normal font-semibold text-gray-900">
            {product.nameBn}
          </span>
        </nav>

        <section className="flex flex-col justify-between gap-5 rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 md:flex-row md:items-center">
          <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 text-2xl sm:h-16 sm:w-16 sm:text-3xl">
              {product.image}
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="whitespace-normal text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                প্রতি {unitBn} · {product.categoryNameBn}
              </p>

              <p className="mt-2 text-xs leading-6 sm:text-sm">
                গতকালের তুলনায় আজ দাম{" "}
                {isUp ? "বেড়েছে" : "কমেছে"}{" "}
                {formatPrice(product.change.pct)}%
              </p>
            </div>
          </div>

          <div className="w-full rounded-2xl border border-gray-100 bg-[#f0f5f0] p-4 text-center md:w-48 md:shrink-0">
            <p className="text-sm font-medium text-gray-500">
              আজকের দাম
            </p>

            <p className="my-1 text-2xl font-bold text-gray-900 sm:text-3xl">
              {formatPrice(product.today)}
            </p>

            <p className="text-xs text-gray-500">
              টাকা / {unitBn}
            </p>

            <p
              className={`mt-2 text-sm font-semibold ${
                isUp ? "text-red-500" : ""
              }`}
            >
              {isUp ? "▲" : "▼"} {formatPrice(product.change.pct)}%
            </p>
          </div>
        </section>

        <section className="space-y-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:space-y-7 sm:p-5">
          <div>
            <h2 className="mb-4 text-lg font-bold text-gray-900">
              দামের সারসংক্ষেপ
            </h2>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              <div className="rounded-xl border border-gray-100 p-4">
                <p className="text-sm text-gray-500">
                  সর্বনিম্ন দাম
                </p>

                <p className="mt-2 text-xl font-bold text-green-600 sm:text-2xl">
                  {formatPrice(minPrice)} টাকা
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  সবচেয়ে কম দামের বাজার
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 p-4">
                <p className="text-sm text-gray-500">
                  সর্বোচ্চ দাম
                </p>

                <p className="mt-2 text-xl font-bold text-red-600 sm:text-2xl">
                  {formatPrice(maxPrice)} টাকা
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  সবচেয়ে বেশি দামের বাজার
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 sm:col-span-2 lg:col-span-1">
                <p className="text-sm text-gray-500">
                  গড় দাম
                </p>

                <p className="mt-2 text-xl font-bold text-green-600 sm:text-2xl">
                  {formatPrice(averagePrice)} টাকা
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  প্রতি {unitBn}-এর হিসাবে
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          <div>
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-900">
                বাজারভিত্তিক আজকের দাম
              </h2>
            </div>

            {sortedMarkets.length > 0 && (
              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full min-w-[650px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold text-gray-500">
                      <th className="whitespace-nowrap px-4 py-3">
                        বাজার
                      </th>

                      <th className="whitespace-nowrap px-4 py-3">
                        বিভাগ
                      </th>

                      <th className="whitespace-nowrap px-4 py-3">
                        সর্বনিম্ন
                      </th>

                      <th className="whitespace-nowrap px-4 py-3">
                        সর্বোচ্চ
                      </th>

                      <th className="whitespace-nowrap px-4 py-3 text-right">
                        গড়
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100 text-sm">
                    {sortedMarkets.map((market, index) => {
                      const marketAverage =
                        (market.min + market.max) / 2;

                      return (
                        <tr
                          key={`${market.market}-${market.division}`}
                          className={
                            index % 2 === 0
                              ? "bg-white"
                              : "bg-gray-200"
                          }
                        >
                          <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-800">
                            {market.market}
                          </td>

                          <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                            {market.division}
                          </td>

                          <td className="whitespace-nowrap px-4 py-3 font-medium">
                            {formatPrice(market.min)} টাকা
                          </td>

                          <td className="whitespace-nowrap px-4 py-3 font-medium">
                            {formatPrice(market.max)} টাকা
                          </td>

                          <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-gray-900">
                            {formatPrice(marketAverage)} টাকা
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetailsContent;
