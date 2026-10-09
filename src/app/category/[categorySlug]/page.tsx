
import { Suspense } from "react";
import CategoryProductContent from "@/components/CategoryProductContent";

interface IProps {
  params: Promise<{
    categorySlug: string;
  }>;
}

const CategoryProduct = ({ params }: IProps) => {
  return (
    <Suspense fallback={<p className="p-5">লোড হচ্ছে...</p>}>
      <CategoryProductContent params={params} />
    </Suspense>
  );
};

export default CategoryProduct;

