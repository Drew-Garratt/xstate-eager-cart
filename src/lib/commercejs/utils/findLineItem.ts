import { LineItem } from '@/lib/vercelCommerce/types/cart';

export const findLineItem = ({
  productId,
  lineItems,
}: {
  productId: string;
  lineItems: Map<string, LineItem>;
}): { lineItemId: string; lineItem: LineItem } | null => {
  /**
   * Line Item Walker
   *
   * This is a generator that will walk through the line items in the cart
   */
  const lineItemWalker = lineItems.entries();

  /**
   * Line Item ID
   *
   * This will be the ID of the line item that matches the product ID
   *
   */
  let lineItemId: string | null = null;

  /**
   * Loop through the line items until we find the line item that matches the product ID
   */
  while (!lineItemId) {
    const line = lineItemWalker.next().value;
    if (line[1].productId === productId) {
      lineItemId = line[0];
    }
  }

  if (!lineItemId) return null;

  return { lineItemId, lineItem: lineItems.get(lineItemId) };
};
