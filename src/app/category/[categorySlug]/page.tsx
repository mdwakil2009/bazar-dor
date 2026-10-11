

import CategoryProductContent from "@/components/CategoryProductContent";

interface IProps {
  params: Promise<{
    categorySlug: string;
  }>;
}

const CategoryProduct = async ({ params }: IProps) => {
  const { categorySlug } = await params;

  return (
  
      <CategoryProductContent categorySlug={categorySlug} />
    
  );
};

export default CategoryProduct;
