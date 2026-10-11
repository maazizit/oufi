# Photos produit (catalogue)

Convention actuelle (petit catalogue) :

- Fichier : `{productId}.webp` (ex. `p1.webp`)
- URL affichée : `/products/p1.webp` → champ `img` / admin « Photo produit — chemin »
- Format conseillé : WebP, ~800×600, ratio 4:3

Sans fichier ou sans chemin renseigné, la fiche affiche l’icône de catégorie.

Plus tard : les mêmes chemins ou une URL Supabase Storage peuvent être stockés en `image_path` (DB) sans changer les composants vitrine.
