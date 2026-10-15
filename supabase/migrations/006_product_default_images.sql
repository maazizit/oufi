-- Photos catalogue (chemins publics) pour les fiches sans image_path.

update public.products
set image_path = case id
  when 'p1' then '/products/p1.webp'
  when 'p2' then '/products/p2.webp'
  when 'p3' then '/products/p3.webp'
  when 'p4' then '/products/p1.webp'
  when 'p5' then '/products/p14.webp'
  when 'p6' then '/products/p14.webp'
  when 'p7' then '/products/p14.webp'
  when 'p8' then '/products/p9.webp'
  when 'p9' then '/products/p9.webp'
  when 'p10' then '/products/p11.webp'
  when 'p11' then '/products/p11.webp'
  when 'p12' then '/products/p14.webp'
  when 'p13' then '/products/p2.webp'
  when 'p14' then '/products/p14.webp'
  when 'p15' then '/products/p14.webp'
  when 'p16' then '/products/p11.webp'
  when 'p17' then '/products/p9.webp'
  else image_path
end
where image_path is null or trim(image_path) = '';
