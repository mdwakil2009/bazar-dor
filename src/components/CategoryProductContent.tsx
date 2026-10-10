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
  params: Promise<{
    categorySlug: string;
  }>;
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

const CategoryProductContent = async ({ params }: IProps) => {
  const { categorySlug } = await params;

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
      <div className="mx-auto mt-5 max-w-6xl px-4">
        <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex h-20 w-20 items-center justify-center text-5xl">
            {currentCategory.icon}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {currentCategory.nameBn}
            </h1>

            <p className=" text-sm text-gray-500">
              {categoryProduct.length.toLocaleString("bn-BD")}
              টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        <div className="mt-10" >
          <AllProducts products={categoryProduct} />
        </div>

        <div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProductContent;
