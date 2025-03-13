import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tân Tiến Vinh - Máy Gia Công Nội Thất",
    short_name: "Tân Tiến Vinh",
    description:
      "Cung cấp máy gia công nội thất chất lượng cao, máy gỗ, máy dán cạnh, máy khoan ngang, máy cưa bàn trượt",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1e40af",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
