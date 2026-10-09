
import { Suspense } from "react";
import CategoryProductContent from "@/components/CategoryProductContent";
import Link from "next/link";

interface IProps {
  params: Promise<{
    categorySlug: string;
  }>;
}

const CategoryProduct = ({ params }: IProps) => {
  return (
     <div>  
    <Suspense fallback={<p className="p-5">loading...</p>}>
      <CategoryProductContent params={params} />
    </Suspense>

    <div>
    </div>
 </div>


  );
};

export default CategoryProduct;

