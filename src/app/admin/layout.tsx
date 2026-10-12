import { AdminLangProvider } from "@/components/admin/AdminLangProvider";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <AdminLangProvider>{children}</AdminLangProvider>;
}
