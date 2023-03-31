import { commercejsGetProduct } from '@/lib/commercejs/getProduct';
import { commercejsGetVariants } from '@/lib/commercejs/getVariants';
import { notFound } from 'next/navigation';

const ProductPage = async ({ params }: { params: { permalink: string } }) => {
  const product = await commercejsGetProduct({ permalink: params.permalink });

  if (!product) {
    notFound();
  }

  const variants = await commercejsGetVariants({ productId: product.id });

  return <div>Product Page</div>;
};

export default ProductPage;
