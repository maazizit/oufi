import { getNotifs, getRequests, getSettings } from "@/lib/data/repository";
import { getAdminSession } from "@/lib/admin/session";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AdminChrome } from "@/components/admin/AdminChrome";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();
  if (!session) {
    if (isSupabaseConfigured()) {
      const supabase = await createClient();
      if (supabase) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          await supabase.auth.signOut();
          redirect("/admin/login?err=access");
        }
      }
    }
    redirect("/admin/login");
  }

  const [settings, requests, notifs] = await Promise.all([
    getSettings(),
    getRequests(),
    getNotifs(),
  ]);
  const newCount = requests.filter((r) => r.status === "new").length;
  const unreadNotifs = notifs.filter((n) => !n.read).length;

  return (
    <AdminChrome
      session={session}
      company={settings.company}
      newCount={newCount}
      unreadNotifs={unreadNotifs}
      notifs={notifs}
    >
      {children}
    </AdminChrome>
  );
}
