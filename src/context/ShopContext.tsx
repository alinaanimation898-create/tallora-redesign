"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, ShoeSize, CartItem } from "@/types";
import { PRODUCTS } from "@/data/mockData";

interface ShopContextType {
  selectedSize: ShoeSize | null;
  setSelectedSize: (size: ShoeSize | null) => void;
  cart: CartItem[];
  addToCart: (product: Product, size: ShoeSize) => void;
  removeFromCart: (productId: string, size: ShoeSize) => void;
  updateQuantity: (productId: string, size: ShoeSize, delta: number) => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSizeModalOpen: boolean;
  setIsSizeModalOpen: (open: boolean) => void;
  isVeraOpen: boolean;
  setIsVeraOpen: (open: boolean) => void;
  isPriveMember: boolean;
  setIsPriveMember: (member: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedSize, setSelectedSizeState] = useState<ShoeSize | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [isVeraOpen, setIsVeraOpen] = useState(false);
  // Privé price applies only after joining the club on /prive; remembered in this browser
  const [isPriveMember, setIsPriveMemberState] = useState(false);
  const setIsPriveMember = (v: boolean) => {
    setIsPriveMemberState(v);
    try {
      if (v) localStorage.setItem("tallora_prive", "1");
      else localStorage.removeItem("tallora_prive");
    } catch {
      // storage unavailable: membership lasts for this visit only
    }
  };
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Initialize from localStorage if present
  useEffect(() => {
    try {
      const savedSize = localStorage.getItem("tallora_saved_size");
      if (savedSize) {
        setSelectedSizeState(Number(savedSize) as ShoeSize);
      }
      if (localStorage.getItem("tallora_prive") === "1") setIsPriveMemberState(true);
      const savedCart = localStorage.getItem("tallora_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      } else {
        // Pre-populate with one item for realistic demo feeling
        setCart([
          {
            product: PRODUCTS[0],
            selectedSize: 43,
            quantity: 1,
          },
        ]);
      }
    } catch {
      // fallback
    }
  }, []);

  const setSelectedSize = (size: ShoeSize | null) => {
    setSelectedSizeState(size);
    if (size) {
      localStorage.setItem("tallora_saved_size", String(size));
    } else {
      localStorage.removeItem("tallora_saved_size");
    }
  };

  const addToCart = (product: Product, size: ShoeSize) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      let updated: CartItem[];
      if (existing) {
        updated = prev.map((item) =>
          item.product.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updated = [...prev, { product, selectedSize: size, quantity: 1 }];
      }
      try {
        localStorage.setItem("tallora_cart", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size: ShoeSize) => {
    setCart((prev) => {
      const updated = prev.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size)
      );
      try {
        localStorage.setItem("tallora_cart", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const updateQuantity = (productId: string, size: ShoeSize, delta: number) => {
    setCart((prev) => {
      const updated = prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
      try {
        localStorage.setItem("tallora_cart", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        selectedSize,
        setSelectedSize,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        isSizeModalOpen,
        setIsSizeModalOpen,
        isVeraOpen,
        setIsVeraOpen,
        isPriveMember,
        setIsPriveMember,
        quickViewProduct,
        setQuickViewProduct,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
