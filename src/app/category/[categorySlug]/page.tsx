
import { Suspense } from "react";
import CategoryProductContent from "@/components/CategoryProductContent";

interface IProps {
  params: Promise<{
    categorySlug: string;
  }>;
}

const CategorySkeleton = () => {
  return (
    <div className="mx-auto mt-5 max-w-6xl px-4">
     
      <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5">
        <div className="skeleton h-20 w-20 shrink-0 rounded-2xl" />

        <div className="flex-1 space-y-3">
          <div className="skeleton h-7 w-40 rounded-md" />
          <div className="skeleton h-4 w-64 rounded-md" />
        </div>
      </div>

  
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 bg-white p-5"
          >
            <div className="flex items-center gap-3">
              <div className="skeleton h-12 w-12 shrink-0 rounded-lg" />

              <div className="flex-1 space-y-2">
                <div className="skeleton h-5 w-3/4 rounded-md" />
                <div className="skeleton h-4 w-1/3 rounded-md" />
              </div>
            </div>

            <div className="mt-5 flex items-end justify-between">
              <div className="space-y-2">
                <div className="skeleton h-3 w-16 rounded-md" />
                <div className="skeleton h-6 w-28 rounded-md" />
              </div>

              <div className="skeleton h-4 w-12 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CategoryProduct = ({ params }: IProps) => {
  return (
    <Suspense fallback={<CategorySkeleton />}>
      <CategoryProductContent params={params} />
    </Suspense>
  );
};

export default CategoryProduct;
