
import { Suspense } from "react";
import ProductDetailsContent from "@/components/ProductDetailsContent";

interface IProps {
  params: Promise<{ slug: string }>;
}

const ProductDetailsPage = ({ params }: IProps) => {
  return (
    <Suspense fallback={<p className="p-5">loading...</p>}>
      <ProductDetailsContent params={params} />
    </Suspense>
  );
};

export default ProductDetailsPage;