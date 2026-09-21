import { NextResponse } from "next/server";
import { getSearchIndex } from "@/lib/posts";

export const dynamic = "force-static";

export function GET() {
  const index = getSearchIndex();
  return NextResponse.json(index, {
    headers: {
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
    },
  });
}
