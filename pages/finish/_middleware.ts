import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const { cookies } = req;

  const { origin } = req.nextUrl;

  if (cookies.token === "") {
    return NextResponse.redirect(`${origin}/login`);
  }
}
