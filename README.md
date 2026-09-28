# Oufi Sécurité — site vitrine + back-office

Application Next.js (App Router) + Tailwind CSS + Supabase pour une entreprise
marocaine d’installation et de vente de caméras, réseau et informatique.

La maquette source reste dans `maquettes/prototype.html`.

## Fonctionnalités

**Site public (FR / AR)**
- Accueil (plan de couverture animé, services, équipe, témoignages, compteurs)
- Services, Catalogue (filtres, détail, panier sans paiement)
- Devis en 3 étapes, demande panier, Suivi par référence / téléphone, Contact
- Frais de déplacement affichés selon la ville

**Back-office (authentifié)**
- Tableau de bord, demandes (filtres, fiche, notes, assignation, historique)
- Catalogue (CRUD, stock, publication)
- Interventions (planning, clôture)
- Réglages (identité, frais, canaux, équipe)

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind CSS 4
- Supabase (Postgres + Auth + RLS)
- Déployable sur Vercel (free tier)

## Démarrage local

```bash
cp .env.example .env.local
npm install
npm run dev
```

Sans variables Supabase, l’app tourne en **mode démo** (données en mémoire) :
- Site public : http://localhost:3000
- Back-office : http://localhost:3000/admin/login  
  Mot de passe : `ADMIN_DEMO_PASSWORD` (défaut `oufi-admin`)

## Configuration Supabase (production)

1. Créez un projet sur [supabase.com](https://supabase.com).
2. SQL Editor → exécutez `supabase/migrations/001_initial.sql` (schéma + seed).
3. Authentication → Users → invitez / créez l’admin (ex. Ibrahim Oufi).
4. Project Settings → API → copiez URL et `anon` key dans `.env.local` / Vercel.
5. (Optionnel) désactivez les inscriptions publiques (Auth → Providers / settings).

RLS :
- Lecture publique : réglages, produits actifs, équipe active
- Insertion publique : demandes / notifications
- Suivi public via RPC `track_request`
- CRUD admin : rôle `authenticated` uniquement

## Déploiement Vercel

1. Importez le dépôt GitHub dans Vercel.
2. Ajoutez les env vars :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy. Créez ensuite l’utilisateur admin dans Supabase Auth.

Ne définissez **pas** `ADMIN_DEMO_PASSWORD` en production une fois Supabase branché.

## Scripts

| Commande        | Description              |
|-----------------|--------------------------|
| `npm run dev`   | Serveur de développement |
| `npm run build` | Build production         |
| `npm run start` | Serveur production       |
| `npm run lint`  | ESLint                   |

## Structure

```
src/app/(site)/     pages publiques
src/app/admin/      back-office + login
src/app/api/        API demandes / suivi / admin
src/components/     UI site & admin
src/lib/data/       i18n, seed, repository
supabase/migrations schéma SQL
maquettes/          prototype HTML d’origine
```

## Notes produit

- Aucun paiement en ligne : panier + devis → rappel sous 24 h ouvrées.
- Le nom d’entreprise se change dans Back-office › Réglages.
- Les données de démo (témoignages, seed catalogue) sont fictives.
