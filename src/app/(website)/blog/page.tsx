import { BlogSection } from "@/components/blog-section";
import { RevealAnimation } from "@/components/ui/reveal-animation";
import { SectionHeading } from "@/components/ui/section-heading";
import { createClient } from "@/app/supabase/server";
import Image from "next/image";

export const revalidate = 60; // Revalidate mỗi 60 giây

export default async function BlogPage() {
  const supabase = await createClient();

  // Fetch blog posts from database
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  return (
    <div>
      <div className="pt-24 bg-blue-50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Cập nhật những thông tin mới nhất về công nghệ CNC, xu hướng ngành
            và các mẹo hữu ích.
          </p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <RevealAnimation>
            <SectionHeading
              title="Bài Viết Mới Nhất"
              subtitle="Khám phá những bài viết mới nhất về công nghệ CNC và ngành nội thất"
              center
            />
          </RevealAnimation>

          <BlogSection customPosts={posts ?? []} />
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <RevealAnimation>
            <SectionHeading
              title="Chủ Đề Phổ Biến"
              subtitle="Khám phá các chủ đề được quan tâm nhiều nhất"
              center
            />
          </RevealAnimation>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Công Nghệ CNC",
                description:
                  "Tìm hiểu về công nghệ CNC hiện đại và ứng dụng trong ngành nội thất",
                image:
                  "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&q=80",
                count: 12,
              },
              {
                title: "Bảo Trì Máy Móc",
                description:
                  "Hướng dẫn bảo trì máy móc đúng cách để kéo dài tuổi thọ và tối ưu hiệu suất",
                image:
                  "https://images.unsplash.com/photo-1565034957450-e7f4e4d04193?w=600&q=80",
                count: 8,
              },
              {
                title: "Xu Hướng Ngành",
                description:
                  "Cập nhật những xu hướng mới nhất trong ngành công nghiệp nội thất",
                image:
                  "https://images.unsplash.com/photo-1624365169198-38255ba54160?w=600&q=80",
                count: 10,
              },
            ].map((topic, index) => (
              <RevealAnimation key={index} delay={index * 100}>
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
                  <div className="h-48 overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&q=80"
                      alt="Mô tả hình ảnh"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
                    <p className="text-gray-600 mb-4">{topic.description}</p>
                    <div className="text-sm text-blue-600">
                      {topic.count} bài viết
                    </div>
                  </div>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
