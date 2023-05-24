import AddToCart from '@/components/cart/addTo/addToCart';
import { commercejsGetProduct } from '@/lib/commercejs/getProduct';
import { commercejsGetVariants } from '@/lib/commercejs/getVariants';
import { notFound } from 'next/navigation';

const ProductPage = async ({ params }: { params: { permalink: string } }) => {
  const product = await commercejsGetProduct({ permalink: params.permalink });

  if (!product) {
    notFound();
  }

  const variants = await commercejsGetVariants({ productId: product.id });

  if (!variants) {
    notFound();
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.id}</p>
      <p>{variants[0]}</p>
      <AddToCart
        item={{
          variantId: product.id,
          quantity: 1,
        }}
      />
    </div>
  );
};

export default ProductPage;
