import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealAnimation } from "@/components/ui/reveal-animation";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image_url?: string;
  published_at: string;
  read_time: number;
  author?: string;
};

const defaultBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "5 Lý Do Chuyển Đổi Sang CNC Gỗ Hiện Đại",
    slug: "5-ly-do-chuyen-doi-sang-cnc-go-hien-dai",
    excerpt:
      "Khám phá những lợi ích mà máy CNC gỗ hiện đại mang lại cho doanh nghiệp của bạn, từ tăng năng suất đến nâng cao chất lượng sản phẩm.",
    image_url:
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&q=80",
    published_at: "2023-05-15T10:30:00Z",
    read_time: 5,
    author: "Nguyễn Văn A",
  },
  {
    id: "2",
    title: "Hướng Dẫn Bảo Trì Máy CNC Kim Loại Đúng Cách",
    slug: "huong-dan-bao-tri-may-cnc-kim-loai-dung-cach",
    excerpt:
      "Bài viết chia sẻ các bước bảo trì máy CNC kim loại đúng cách để kéo dài tuổi thọ và đảm bảo hiệu suất làm việc tối ưu.",
    image_url:
      "https://images.unsplash.com/photo-1565034957450-e7f4e4d04193?w=600&q=80",
    published_at: "2023-06-22T14:45:00Z",
    read_time: 8,
    author: "Trần Văn B",
  },
  {
    id: "3",
    title: "Xu Hướng Công Nghệ CNC 2025: Tự Động Hóa và AI",
    slug: "xu-huong-cong-nghe-cnc-2025-tu-dong-hoa-va-ai",
    excerpt:
      "Khám phá những xu hướng công nghệ CNC mới nhất sẽ định hình ngành công nghiệp trong năm 2025, với trọng tâm là tự động hóa và trí tuệ nhân tạo.",
    image_url:
      "https://images.unsplash.com/photo-1624365169198-38255ba54160?w=600&q=80",
    published_at: "2023-07-10T09:15:00Z",
    read_time: 6,
    author: "Lê Thị C",
  },
];

interface BlogSectionProps {
  customPosts?: any[];
}

export function BlogSection({ customPosts }: BlogSectionProps) {
  const blogPosts = customPosts?.length ? customPosts : defaultBlogPosts;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <RevealAnimation>
          <SectionHeading
            badge="Blog & Tin Tức"
            title="Bài Viết Mới Nhất"
            subtitle="Cập nhật những thông tin mới nhất về công nghệ CNC, xu hướng ngành và các mẹo hữu ích."
            center
          />
        </RevealAnimation>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <RevealAnimation key={post.id} delay={index * 100}>
              <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <div className="flex items-center mr-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        {new Date(post.published_at).toLocaleDateString(
                          "vi-VN",
                        )}
                      </span>
                    </div>
                    <div className="flex items-center mr-4">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{post.read_time} phút đọc</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-gray-600 mb-6 flex-1">{post.excerpt}</p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-500">
                        {post.author}
                      </span>
                    </div>

                    <Button
                      variant="link"
                      className="p-0 h-auto text-blue-600"
                      asChild
                    >
                      <Link href={`/blog/${post.slug}`}>
                        Đọc tiếp <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </RevealAnimation>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" asChild>
            <Link href="/blog">
              Xem tất cả bài viết <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
