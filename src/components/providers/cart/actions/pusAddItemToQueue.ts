import { assign } from 'xstate';
import { CartMachineContext } from '../CartProvider';
import { AddItemEvent } from '../machine/cartMachine';

const pusAddItemToQueue = assign<CartMachineContext, AddItemEvent>({
  queue: (context, event) => [...context.queue, event],
  cart: (context, event) => {
    if (context.cart) {
      const { cart } = context;
      const { lineItems } = cart;
      const { item } = event.input;

      const existingItem = lineItems.find(
        (lineItem) => lineItem.id === item.productId
      );

      if (existingItem) {
        return {
          ...cart,
          line_items: lineItems.map((lineItem) => {
            if (lineItem.id === item.productId) {
              return {
                ...lineItem,
                quantity: lineItem.quantity + (item.quantity ?? 0),
              };
            }

            return lineItem;
          }),
        };
      }

      return {
        ...cart,
        lineitems: [...lineItems, item],
      };
    }

    return context.cart;
  },
});

export default pusAddItemToQueue;
