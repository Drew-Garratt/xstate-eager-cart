import { useCartLine } from '@your-org/xstate-commerce';
import Image from 'next/image';
import Link from 'next/link';
import Price from '../price';
import DeleteItemButton from './delete-item-button';
import EditItemQuantityButton from './edit-item-quantity-button';

const CartLine = ({ id, onClose }: { id: string; onClose: () => void }) => {
  const item = useCartLine(id);

  if (!item) return null;

  return (
    <li data-testid="cart-item">
      <Link
        className="flex flex-row space-x-4 py-4"
        href={item.path}
        onClick={onClose}
      >
        <div className="relative h-16 w-16 cursor-pointer overflow-hidden bg-white">
          <Image
            className="h-full w-full object-cover"
            width={item.merchandise?.product.featuredImage.width ?? 0}
            height={item.merchandise?.product.featuredImage.height ?? 0}
            alt={item.merchandise?.product.featuredImage.altText || item.name}
            src={item.merchandise?.product.featuredImage.url ?? ''}
          />
        </div>
        <div className="flex flex-1 flex-col text-base">
          <span className="font-semibold">{item.name}</span>
          {item.merchandise && item.merchandise.selectedOptions.length > 0 ? (
            <p className="text-sm" data-testid="cart-product-variant">
              {item.merchandise?.selectedOptions[0].name}{' '}
              {item.merchandise?.selectedOptions[0].value}
            </p>
          ) : null}
        </div>
        <Price
          className="flex flex-col justify-between space-y-2 text-sm"
          amount={item.variant.price?.value ?? 0}
          currencyCode={
            item.merchandise?.product.priceRange.minVariantPrice.currencyCode ??
            'USD'
          }
        />
      </Link>
      <div className="flex h-9 flex-row">
        <DeleteItemButton item={item} />
        <p className="ml-2 flex w-full items-center justify-center border dark:border-gray-700">
          <span className="w-full px-2">{item.quantity}</span>
        </p>
        <EditItemQuantityButton item={item} type="minus" />
        <EditItemQuantityButton item={item} type="plus" />
      </div>
    </li>
  );
};

export default CartLine;
