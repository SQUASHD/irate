import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  ignoredRoutes: [],
  publicRoutes: ["/", "/about", "/api/cron(.*)"],
});

export const config = {
  matcher: [
    "/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)",
    "/",
    "/about",
    "/api/cron(.*)",
  ],
};
