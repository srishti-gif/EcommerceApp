import { create } from 'zustand';

export type Product = {
  id: number;
  title: string;
  price: number;
  description?: string;
  category?: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
};

export type CartItem = Product & {
  quantity: number;
};

type CartState = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalAmount: () => string;
};

const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],

  // Add to cart
  addToCart: (product: Product) => {
    const { cartItems } = get();
    const existing = cartItems.find(item => item.id === product.id);

    if (existing) {
      // already exists — increase quantity
      set({
        cartItems: cartItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      });
    } else {
      // new item
      set({ cartItems: [...cartItems, { ...product, quantity: 1 }] });
    }
  },

  // Remove from cart completely
  removeFromCart: (id: number) => {
    set({ cartItems: get().cartItems.filter(item => item.id !== id) });
  },

  // Increase quantity
  increaseQty: (id: number) => {
    set({
      cartItems: get().cartItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    });
  },

  // Decrease quantity
  decreaseQty: (id: number) => {
    const { cartItems } = get();
    const item = cartItems.find(i => i.id === id);

    if (!item) return;

    if (item.quantity === 1) {
      // remove if quantity reaches 0
      set({ cartItems: cartItems.filter(i => i.id !== id) });
    } else {
      set({
        cartItems: cartItems.map(i =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
        ),
      });
    }
  },

  // Clear entire cart
  clearCart: () => set({ cartItems: [] }),

  // Total items count (for badge)
  getTotalItems: () => {
    return get().cartItems.reduce((sum, item) => sum + item.quantity, 0);
  },

  // Total amount
  getTotalAmount: () => {
    return get()
      .cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  },
}));

export default useCartStore;
