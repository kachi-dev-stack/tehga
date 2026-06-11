import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SessionProvider } from "@/app/admin/SessionProvider";

export const metadata = {
  title: "Admin — TEHGA Consulting",
  robots: "noindex",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}
