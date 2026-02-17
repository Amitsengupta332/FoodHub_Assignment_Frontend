export type CartItem = {
  mealId: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

const CART_KEY = "foodhub_cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(item: CartItem) {
  const cart = getCart();
  const existing = cart.find((i) => i.mealId === item.mealId);

  if (existing) {
    existing.qty += item.qty;
  } else {
    cart.push(item);
  }

  saveCart(cart);
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
}
