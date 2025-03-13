import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

// Secret token to prevent unauthorized webhook calls
const WEBHOOK_SECRET =
  process.env.SUPABASE_WEBHOOK_SECRET || "default-webhook-secret";

export async function POST(request: NextRequest) {
  try {
    // Verify the webhook signature
    const signature = request.headers.get("x-supabase-webhook-signature");
    if (!signature || signature !== WEBHOOK_SECRET) {
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { type, table, record } = body;

    // Handle different event types
    if (type === "INSERT" || type === "UPDATE" || type === "DELETE") {
      // Revalidate based on table
      switch (table) {
        case "products":
          // Revalidate product pages
          revalidateTag("products");
          if (record?.slug) {
            revalidatePath(`/san-pham/${record.slug}`);
          }
          revalidatePath("/san-pham");
          revalidatePath("/");
          break;

        case "blog_posts":
          // Revalidate blog pages
          revalidateTag("blog");
          if (record?.slug) {
            revalidatePath(`/blog/${record.slug}`);
          }
          revalidatePath("/blog");
          revalidatePath("/");
          break;

        case "testimonials":
          // Revalidate testimonials
          revalidateTag("testimonials");
          revalidatePath("/");
          revalidatePath("/khach-hang");
          break;

        default:
          // Revalidate homepage for other changes
          revalidatePath("/");
      }

      return NextResponse.json({
        success: true,
        message: `Revalidated paths for ${table} ${type}`,
      });
    }

    return NextResponse.json({
      success: false,
      message: "Unsupported event type",
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { success: false, message: "Error processing webhook" },
      { status: 500 },
    );
  }
}

export const dynamic = "force-dynamic";
