
import baseUrl, { categoryUrl } from "@/services/baseUrl";
import AllProducts from "./AllProduct";
import { notFound } from "next/navigation";

interface ICategory {
  id: number;
  slug: string;
  nameBn: string;
  icon: string;
}

interface IProps {
  categorySlug: string;
}

const getcategories = async () => {
  const res = await fetch(categoryUrl);

  const data = await res.json();
  return data;
};

const getCategoryProduct = async (categorySlug: string) => {
  const res = await fetch(`${baseUrl}?category=${categorySlug}`);

  const data = await res.json();
  return data;
};

const CategoryProductContent = async ({ categorySlug }: IProps) => {
  const categoryProduct = await getCategoryProduct(categorySlug);
  const categories = await getcategories();

  const currentCategory = categories.find(
    (c: ICategory) => c.slug === categorySlug,
  );

  if (!currentCategory) {
    notFound();
  }

  return (
    <div>
      <div className="mx-auto mt-4 w-full max-w-6xl px-3 sm:mt-5 sm:px-4">
        <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center text-4xl sm:h-20 sm:w-20 sm:text-5xl">
            {currentCategory.icon}
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="whitespace-normal text-xl font-bold text-gray-800 sm:text-2xl">
              {currentCategory.nameBn}
            </h1>

            <p className="mt-1 text-sm leading-6 text-gray-500">
              {categoryProduct.length.toLocaleString("bn-BD")}
              টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 lg:mt-10">
          <AllProducts products={categoryProduct} />
        </div>
      </div>
    </div>
  );
};

export default CategoryProductContent;
