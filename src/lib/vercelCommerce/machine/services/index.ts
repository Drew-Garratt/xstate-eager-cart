import { type StoreMachineOptions } from '..';

const openCart: StoreMachineOptions['services']['openCart'] =
  () => (sendBack) => {
    sendBack({ type: 'OPEN_CART_DRAW' });
  };

const services = {
  openCart,
};

export default services;
