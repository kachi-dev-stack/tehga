import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};
console.log("=== ENV CHECK ===");
console.log("DATABASE_URL:", !!process.env.DATABASE_URL);
console.log("NEXTAUTH_SECRET:", !!process.env.NEXTAUTH_SECRET);
console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
console.log("ADMIN_EMAIL:", !!process.env.ADMIN_EMAIL);
console.log("ADMIN_PASSWORD_HASH:", !!process.env.ADMIN_PASSWORD_HASH);
console.log("RESEND_API_KEY:", !!process.env.RESEND_API_KEY);
console.log("=================");
export default nextConfig;
