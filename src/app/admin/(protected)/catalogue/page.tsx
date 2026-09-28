import { getProducts } from "@/lib/data/repository";
import { CATS } from "@/lib/data/constants";
import { AdminCatalogClient } from "@/components/admin/AdminCatalogClient";

export default async function AdminCatalogPage() {
  const products = await getProducts(false);
  return (
    <>
      <div className="topbar">
        <h2>Catalogue</h2>
      </div>
      <div className="content">
        <AdminCatalogClient
          products={products}
          categories={CATS.map((c) => ({ id: c.id, label: c.fr }))}
        />
      </div>
    </>
  );
}
