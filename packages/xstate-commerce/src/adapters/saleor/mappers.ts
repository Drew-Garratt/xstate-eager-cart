import { type LineItem, type Cart } from '../../types/cart';
import {
  type Product,
  type ProductVariant,
  type ProductOption,
} from '../../types/index';
import { parseEditorJsToHtml } from './editorjs';
import {
  type CheckoutFragment,
  type GetProductBySlugQuery,
  type VariantFragment,
} from './generated/graphql';

export function saleorProductToVercelProduct(
  product: Exclude<GetProductBySlugQuery['product'], null | undefined>
): Product {
  const images =
    product.media
      ?.filter((media) => media.type === 'IMAGE')
      .map((media) => {
        return {
          url: media.url,
          altText: media.alt,
          width: 2048,
          height: 2048,
        };
      }) || [];

  return {
    id: product.id,
    handle: product.slug,
    title: product.name,
    description: product.description || '',
    availableForSale: product.isAvailableForPurchase || true,
    featuredImage: images[0] ?? '',
    descriptionHtml: product.description
      ? parseEditorJsToHtml(product.description)
      : '',
    options: saleorVariantsToVercelOptions(product.variants),
    priceRange: {
      maxVariantPrice: {
        amount: product.pricing?.priceRange?.stop?.gross.amount || 0,
        currencyCode: product.pricing?.priceRange?.stop?.gross.currency || '',
      },
      minVariantPrice: {
        amount: product.pricing?.priceRange?.start?.gross.amount || 0,
        currencyCode: product.pricing?.priceRange?.start?.gross.currency || '',
      },
    },
    seo: {
      title: product.seoTitle || product.name,
      description: product.seoDescription || '',
    },
    updatedAt: product.updatedAt,
    tags: product.collections?.map((c) => c.name) || [],
    variants: saleorVariantsToVercelVariants(
      product.variants,
      product.isAvailableForPurchase
    ),
    images: images,
  };
}

export function saleorVariantsToVercelOptions(
  variants: VariantFragment[] | null | undefined
): ProductOption[] {
  const options: ProductOption[] = [];

  if (!variants) return options;

  variants.forEach((variant) => {
    variant.attributes?.forEach((attribute) => {
      options.push({
        id: variant.id,
        name: variant.name,
        values:
          attribute.attribute.choices?.edges.map((choice) => {
            return choice.node.name || '';
          }) || [],
      });
    });
  });

  return options;
}

export function saleorVariantsToVercelVariants(
  variants: null | undefined | VariantFragment[],
  isAvailableForPurchase: null | undefined | boolean
): Array<ProductVariant> {
  const productVariants: Array<ProductVariant> = [];
  if (!variants) return productVariants;

  variants.forEach((variant) => {
    productVariants.push({
      id: variant.id,
      title: variant.name,
      availableForSale: isAvailableForPurchase || true,
      selectedOptions: [],
      price: {
        amount: variant.pricing?.price?.gross.amount || 0,
        currencyCode: variant.pricing?.price?.gross.currency || '',
      },
    });
  });

  return productVariants;
}

export function saleorCheckoutToVercelCart(checkout: CheckoutFragment): Cart {
  const domain = new URL(process.env.NEXT_PUBLIC_SALEOR_INSTANCE_URL ?? '')
    .hostname;
  const checkoutUrl = new URL(`https://demo.saleor.io/checkout/`);
  checkoutUrl.searchParams.append('checkout', checkout.id);
  checkoutUrl.searchParams.append('locale', `en-US`);
  checkoutUrl.searchParams.append('channel', `default-channel`);
  checkoutUrl.searchParams.append(
    'saleorApiUrl',
    process.env.NEXT_PUBLIC_SALEOR_INSTANCE_URL ?? ''
  );
  checkoutUrl.searchParams.append('domain', domain);

  return {
    id: checkout.id,
    url: checkoutUrl.toString(),
    lineItemsSubtotalPrice: checkout.subtotalPrice.gross.amount,
    subtotalPrice: checkout.subtotalPrice.gross.amount,
    totalPrice: checkout.totalPrice.gross.amount,
    currency: { code: checkout.totalPrice.tax.currency },
    createdAt: new Date().toString(),
    taxesIncluded: true,
    lineItems: new Map(
      checkout.lines.map((line) => {
        const lineItem: LineItem = {
          id: line.id,
          quantity: line.quantity,
          variantId: line.variant.id,
          productId: line.variant.product.id,
          name: `${line.variant.product.name} - ${line.variant.name}`,
          discounts: [],
          path: line.variant.product.slug,
          variant: {
            id: line.variant.id,
            options: [],
            price: {
              value: line.variant.pricing?.price?.gross.amount || 0,
            },
          },
          merchandise: {
            id: line.variant.id,
            title: `${line.variant.product.name} - ${line.variant.name}`,
            selectedOptions: line.variant.attributes.flatMap((attribute) => {
              return attribute.values.map((value) => {
                return {
                  name: attribute.attribute.name || '',
                  value: value.name || '',
                };
              });
            }),
            product: saleorProductToVercelProduct(line.variant.product),
          },
        };

        return [line.id, lineItem];
      })
    ),
  };
}
