import { StoreActor } from "..";

const openCart: StoreActor = () => (sendBack) => {
  sendBack({ type: 'OPEN_CART_DRAW' });
}

const services = {
  openCart
}

export default services;