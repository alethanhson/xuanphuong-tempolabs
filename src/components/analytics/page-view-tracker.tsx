"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "../../../supabase/client";

export function PageViewTracker() {
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        // Get visitor information
        const userAgent = navigator.userAgent;
        const referrer = document.referrer;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // Track the page view in Supabase
        await supabase.from("page_views").insert([
          {
            path: pathname,
            user_agent: userAgent,
            referrer: referrer || null,
            screen_size: `${screenWidth}x${screenHeight}`,
          },
        ]);
      } catch (error) {
        // Silent fail - don't affect user experience if tracking fails
        console.error("Error tracking page view:", error);
      }
    };

    trackPageView();
  }, [pathname, supabase]);

  return null; // This component doesn't render anything
}
