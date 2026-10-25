"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { mergeCatalog, subscribeProducts } from "@/lib/catalog";

const CatalogContext = createContext(null);

export default function CatalogProvider({ children }) {
  const [products, setProducts] = useState(() => mergeCatalog([]));

  useEffect(() => {
    return subscribeProducts(
      (remote) => {
        setProducts(mergeCatalog(remote));
      },
      () => {},
    );
  }, []);

  return (
    <CatalogContext.Provider value={{ products, error: "" }}>
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const catalog = useContext(CatalogContext);
  if (!catalog) {
    throw new Error("useCatalog must be used within CatalogProvider");
  }
  return catalog;
}
