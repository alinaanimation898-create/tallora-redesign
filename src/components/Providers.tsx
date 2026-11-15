"use client";

import React from "react";
import { ShopProvider } from "@/context/ShopContext";
import CartDrawer from "@/components/CartDrawer";
import QuickViewModal from "@/components/QuickViewModal";

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ShopProvider>
      {children}
      <CartDrawer />
      <QuickViewModal />
    </ShopProvider>
  );
};
