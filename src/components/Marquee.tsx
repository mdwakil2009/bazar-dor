
import baseUrl from "@/services/baseUrl";
import MarqueeText from "react-marquee-text";

interface IProduct {
  id: number;
  image: string;
  nameBn: string;
  today: number;
  unit: string;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

const Marquee = async () => {
  const res = await fetch(baseUrl);
  const data = await res.json();
  const headline: IProduct[] = data;

  return (
    <div className="w-full overflow-hidden">
      <div className="w-full bg-white">
        <MarqueeText
          direction="right"
          duration={10}
          pauseOnHover={true}
        >
          {headline.map((products) => (
            <span
              key={products.id}
              className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap border-r border-b border-gray-100 px-3 py-3 text-xs sm:gap-3 sm:px-5 sm:text-sm md:px-6 lg:px-8"
            >
              <span className="text-base sm:text-lg">
                {products.image}
              </span>

              <span className="font-medium text-gray-800">
                {products.nameBn}
              </span>

              <span className="text-gray-600">
                {products.today.toLocaleString("bn-BD")} টাকা/
                {products.unit === "kg"
                  ? "কেজি"
                  : products.unit === "liter"
                    ? "লিটার"
                    : products.unit === "piece"
                      ? "পিস"
                      : "ডজন"}
              </span>

              <span
                className={
                  products.change.dir === "up"
                    ? "font-semibold text-green-700"
                    : "font-semibold text-red-700"
                }
              >
                {products.change.dir === "up" ? "▲" : "▼"}
                {Math.abs(products.change.pct).toLocaleString("bn-BD")}%
              </span>
            </span>
          ))}
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;
