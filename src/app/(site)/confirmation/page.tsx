import { Suspense } from "react";
import { ConfirmClient } from "@/components/site/ConfirmClient";
import { getRequest, getSettings } from "@/lib/data/repository";

export const metadata = { title: "Confirmation" };

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const sp = await searchParams;
  const [settings, request] = await Promise.all([
    getSettings(),
    sp.ref ? getRequest(sp.ref) : Promise.resolve(null),
  ]);
  return (
    <Suspense>
      <ConfirmClient settings={settings} request={request} />
    </Suspense>
  );
}
