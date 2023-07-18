import { type LineItem } from '../../../types/cart';

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
  let lineItem: LineItem | null = null;

  /**
   * Loop through the line items until we find the line item that matches the product ID
   */
  while (!lineItemId) {
    const line = lineItemWalker.next().value;

    if (!line) break;

    if (line[1].productId === productId || line[1].variantId === productId) {
      lineItemId = line[0];
      lineItem = line[1];
    }
  }

  if (!lineItemId || !lineItem) return null;

  return { lineItemId, lineItem };
};
