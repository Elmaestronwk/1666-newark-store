import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product, quantity = 1, options = {}) => {
        // CATALOG MODE PROTECTION
        console.warn('1666 // SYSTEM: CART_UPLINK_DISABLED (CATALOG_MODE_ACTIVE)');
        return;
        
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (i) => i.id === product.id && i.size === options.size && i.color === options.color && i.fit === options.fit
          );

          if (existingItemIndex >= 0) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += quantity;
            return { items: updatedItems };
          }

          return { 
            items: [...state.items, { 
              ...product, 
              quantity, 
              size: options.size, 
              color: options.color,
              fit: options.fit,
              cartItemId: Date.now().toString() + Math.random().toString()
            }] 
          };
        });
      },
      removeFromCart: (cartItemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.cartItemId !== cartItemId),
        }));
      },
      updateQuantity: (cartItemId, quantity) => {
         set((state) => ({
           items: state.items.map(item => 
             item.cartItemId === cartItemId ? { ...item, quantity: Math.max(1, quantity) } : item
           )
         }));
      },
      clearCart: () => set({ items: [] }),
      getSubtotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const numericPrice = parseFloat(item.price.replace(/[^0-9.-]+/g,""));
          return total + (numericPrice * item.quantity);
        }, 0);
      }
    }),
    {
      name: '1666-cart-storage',
    }
  )
);
