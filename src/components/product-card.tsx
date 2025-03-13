import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { LazyImage } from "@/components/ui/lazy-image";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string;
    images: string[];
    category: string;
    price?: number | null;
    highlights?: string[];
    features?: string[];
    featured?: boolean;
  };
  index?: number;
  variant?: "default" | "compact" | "featured";
}

export function ProductCard({
  product,
  index = 0,
  variant = "default",
}: ProductCardProps) {
  // Extract features from either highlights or features array
  const getProductFeatures = (): string[] => {
    if (product.highlights && product.highlights.length > 0) {
      return product.highlights.slice(0, variant === "compact" ? 2 : 4);
    }
    return product.features || [];
  };

  const features = getProductFeatures();

  if (variant === "compact") {
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px] h-full flex flex-col">
        <div className="h-48 overflow-hidden">
          <LazyImage
            src={
              product.images && product.images.length > 0
                ? product.images[0]
                : "https://via.placeholder.com/600x400?text=No+Image"
            }
            alt={product.name}
            width={600}
            height={400}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            quality={75}
          />
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-lg font-bold mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-4 text-sm line-clamp-2">
            {product.description}
          </p>

          <div className="mt-auto">
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
              <Link href={`/san-pham/${product.slug}`}>
                {product.price === null ? "Liên hệ" : "Xem chi tiết"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px] border border-blue-100">
        <div className="md:flex">
          <div className="md:w-2/5 relative">
            <div className="h-64 md:h-full overflow-hidden">
              <LazyImage
                src={
                  product.images && product.images.length > 0
                    ? product.images[0]
                    : "https://via.placeholder.com/600x400?text=No+Image"
                }
                alt={product.name}
                width={600}
                height={400}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={85}
                priority={index === 0}
              />
            </div>
            {product.featured && (
              <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold">
                Nổi bật
              </div>
            )}
          </div>
          <div className="p-6 md:w-3/5">
            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-4">{product.description}</p>

            {features.length > 0 && (
              <ul className="mb-6 space-y-2">
                {features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start text-sm text-gray-700"
                  >
                    <Check className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            <Button
              asChild
              className="bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow transition-all"
            >
              <Link href={`/san-pham/${product.slug}`}>
                {product.price === null ? "Liên hệ" : "Xem chi tiết"}{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
      <div className="h-56 overflow-hidden">
        <LazyImage
          src={
            product.images && product.images.length > 0
              ? product.images[0]
              : "https://via.placeholder.com/600x400?text=No+Image"
          }
          alt={product.name}
          width={600}
          height={400}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          quality={80}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>

        {features.length > 0 && (
          <ul className="mb-6 space-y-2">
            {features.slice(0, 2).map((feature, idx) => (
              <li key={idx} className="flex items-start text-sm text-gray-700">
                <Check className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
          <Link href={`/san-pham/${product.slug}`}>
            {product.price === null ? "Liên hệ" : "Xem chi tiết"}{" "}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
