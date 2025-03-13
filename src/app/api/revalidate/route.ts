import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

// Secret token to prevent unauthorized revalidation
const REVALIDATE_TOKEN = process.env.REVALIDATE_TOKEN || "default-token";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, path, tag } = body;

    // Validate token
    if (token !== REVALIDATE_TOKEN) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 },
      );
    }

    // Revalidate path or tag
    if (path) {
      revalidatePath(path);
      return NextResponse.json({ success: true, revalidated: true, path });
    }

    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({ success: true, revalidated: true, tag });
    }

    return NextResponse.json(
      { success: false, message: "No path or tag provided" },
      { status: 400 },
    );
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { success: false, message: "Error revalidating" },
      { status: 500 },
    );
  }
}
