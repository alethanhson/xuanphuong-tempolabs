import { ProductsSection } from "@/components/products-section";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

export default function ProductsPage() {
  return (
    <div>
      <div className="pt-24 bg-blue-50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-4">Sản Phẩm</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Khám phá các dòng máy CNC chất lượng cao của chúng tôi, được thiết
            kế đặc biệt cho ngành gỗ và kim loại, giúp tối ưu hóa quy trình sản
            xuất của bạn.
          </p>
        </div>
      </div>
      <ProductsSection />
    </div>
  );
}
