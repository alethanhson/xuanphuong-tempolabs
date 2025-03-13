"use client";

import { useEffect } from "react";
import { createClient } from "../../../supabase/client";

interface ProductViewTrackerProps {
  productId: string;
  productSlug: string;
  productName: string;
}

export function ProductViewTracker({
  productId,
  productSlug,
  productName,
}: ProductViewTrackerProps) {
  const supabase = createClient();

  useEffect(() => {
    const trackProductView = async () => {
      try {
        // Track the product view in Supabase
        await supabase.from("product_views").insert([
          {
            product_id: productId,
            product_slug: productSlug,
            product_name: productName,
            user_agent: navigator.userAgent,
          },
        ]);

        // Also update the views_count in the products table
        await supabase.rpc("increment_product_views", {
          product_id_param: productId,
        });
      } catch (error) {
        // Silent fail - don't affect user experience if tracking fails
        console.error("Error tracking product view:", error);
      }
    };

    trackProductView();
  }, [productId, productSlug, productName, supabase]);

  return null; // This component doesn't render anything
}
