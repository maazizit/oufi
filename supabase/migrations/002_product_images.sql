-- Photos produit : chemin relatif stocké dans public/products/ (ex. "/products/p1.webp").
-- Convention : aujourd'hui les fichiers vivent dans le dépôt (public/products/{id}.webp).
-- Plus tard, l'admin pourra uploader vers Supabase Storage et stocker l'URL publique ici
-- sans changer le modèle ni l'UI (ProductCard / ProductDetailClient lisent juste `image_path`).
alter table public.products
  add column if not exists image_path text;

update public.products set image_path = '/products/p1.webp' where id = 'p1';
update public.products set image_path = '/products/p2.webp' where id = 'p2';
update public.products set image_path = '/products/p3.webp' where id = 'p3';
update public.products set image_path = '/products/p9.webp' where id = 'p9';
update public.products set image_path = '/products/p11.webp' where id = 'p11';
update public.products set image_path = '/products/p14.webp' where id = 'p14';
